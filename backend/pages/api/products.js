import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);
  if (method === "GET") {
    if (req.query?.id) {
      const product = await Product.findOne({ _id: req.query.id }).populate(
        "category"
      );
      res.json(product);
    } else {
      const products = await Product.find().populate("category");
      res.json(products);
    }
  }

  if (method === "POST") {
    const {
      title,
      description,
      shortDescription,
      price,
      images,
      category: categoryId,
      properties,
    } = req.body;

    // Find the category document by ID
    const category = await Category.findById(categoryId);

    // Create the product with the populated category
    const productDoc = await Product.create({
      title,
      description,
      shortDescription,
      price,
      images,
      category,
      properties,
    });

    res.json(productDoc);
  }

  if (method === "PUT") {
    const {
      title,
      description,
      shortDescription,
      price,
      images,
      category: categoryId,
      properties,
      _id,
    } = req.body;

    // Find the category document by ID
    const category = await Category.findById(categoryId);

    // Update the product with the populated category
    await Product.updateOne(
      { _id },
      { title,shortDescription, description, price, images, category, properties }
    );

    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
