import { initMongoose } from "../../config/database";
import Product from "../../models/Product";

export async function findAllProducts() {
  return await Product.find().exec();
}

export default async function handler(req, res) {
  await initMongoose();

  res.json(await findAllProducts());
}
