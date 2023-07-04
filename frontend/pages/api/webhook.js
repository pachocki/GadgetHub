import { mongooseConnect } from "@/lib/mongoose";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { buffer } from "micro";
import { Order } from "@/models/Order";

// The endpoint secret for verifying webhook events
const endpointSecret =
  "whsec_634d3142fd2755bd61adaef74ce0504bd2044848c8aac301ffdb56339a0ca78d";

export default async function handler(req, res) {
    // Connect to MongoDB using mongoose
  await mongooseConnect();
  // Extract the signature from the request headers
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    // Construct the event object from the request payload and signature
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
     // Return an error response if the event verification fails
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event based on its type
  switch (event.type) {
    case "checkout.session.completed":
        // Retrieve relevant data from the event object
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
      // Update the order status to paid if the payment was successful
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
 // Return a success response
  res.status(200).send("ok");
}

export const config = {
  api: { bodyParser: false },
};
