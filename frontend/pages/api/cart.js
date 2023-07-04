import { mongooseConnect } from "@/lib/mongoseConnect";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  // Connect to MongoDB using mongoose
  await mongooseConnect();
  // Extract the IDs from the request body
  const ids = req.body.ids;
  // Find products in the database based on the provided IDs

  // Return the found products as a JSON response
  res.json(await Product.find({ _id: ids }));
}
