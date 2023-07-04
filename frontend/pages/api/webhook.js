import { buffer } from "micro";
import { Order } from "@/models/Order";
import { mongooseConnect } from "@/lib/mongoseConnect";
import stripe from "stripe";

// The endpoint secret for verifying webhook events
const endpointSecret =
  "whsec_634d3142fd2755bd61adaef74ce0504bd2044848c8aac301ffdb56339a0ca78d";

// Initialize Stripe with the secret key
const stripeClient = stripe(process.env.STRIPE_SK);

export default async function handler(req, res) {
  // Connect to MongoDB using mongoose
  await mongooseConnect();

  // Extract the signature from the request headers
  const sig = req.headers["stripe-signature"];

  try {
    // Verify the event using the Stripe webhook signature and payload
    const event = stripeClient.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );

    // Handle the event based on its type
    switch (event.type) {
      case "checkout.session.completed":
        // Retrieve relevant data from the event object
        const session = event.data.object;
        const orderId = session.metadata.orderId;
        const paid = session.payment_status === "paid";

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
  } catch (error) {
    console.error("Webhook Error:", error);

    // Return an error response
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
