import { mongooseConnect } from "@/lib/mongoseConnect";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";

export async function fetchData() {
  const featuredProductId = "647327bef3fa7bb9d49a2a56";
  await mongooseConnect();

  const featuredProduct = await Product.findById(featuredProductId);

  const products = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 100,
  }).populate("category");

  const categories = await Category.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });

  return {
    featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
    products: JSON.parse(JSON.stringify(products)),
    categories: JSON.parse(JSON.stringify(categories)),
  };
}
