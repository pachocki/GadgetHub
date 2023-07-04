import { mongooseConnect } from "@/lib/mongoseConnect";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }

  // Extract the required data from the request body
  const { name, email, city, code, street, country, cartProducts } = req.body;
  // Connect to MongoDB using mongoose
  await mongooseConnect();
  const productsIds = cartProducts;
  // Retrieve the unique product IDs from the cartProducts array
  const uniqueIds = [...new Set(productsIds)];
  // Fetch the product information for the unique product IDs
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;
    // If the product quantity is greater than 0 and product information is available, create a line item
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }
  // Create an order document in the database
  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    code,
    street,
    country,
    paid: false,
  });
  // Create a checkout session using Stripe
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString(), test: "ok" },
  });
  // Return the URL of the checkout session to the client
  res.json({
    url: session.url,
  });
}
