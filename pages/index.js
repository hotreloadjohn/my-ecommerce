import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../components/Product";
import { initMongoose } from "../config/database";
import { findAllProducts } from "./api/products";

export default function Home({ products }) {
  const [searchTerm, setSearchTerm] = useState("");

  const categoriesNames = [...new Set(products?.map((p) => p.category))];
  // console.log(categoriesNames);

  if (searchTerm) {
    products = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="p-5">
      <input
        className="bg-gray-100 w-full py-2 px-4 rounded-xl outline-none"
        type="text"
        value={searchTerm}
        placeholder="Search john products..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {categoriesNames.map((catName) => (
          <div key={catName}>
            {products.find((p) => p.category === catName) && (
              <>
                <h2 className="text-2xl capitalize py-5">{catName}</h2>
                <div className="flex gap-4 overflow-x-scroll snap-x scrollbar-hide">
                  {products
                    .filter((fp) => fp.category === catName)
                    .map((productInfo) => (
                      <div key={productInfo._id} className="snap-start">
                        <Product {...productInfo} />
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  await initMongoose();
  const products = await findAllProducts();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};
