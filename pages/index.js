// https://youtu.be/hlh1zR2Wjvs?list=TLGG2uYuYN_CqREwMjEwMjAyMg

import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../components/Product";

export default function Home() {
  const [productInfo, setProductInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getProductInfo = async () => {
      const { data } = await axios.get("/api/products");
      setProductInfo(data);
    };

    getProductInfo();
  }, []);

  const categoriesNames = [...new Set(productInfo?.map((p) => p.category))];
  // console.log(categoriesNames);

  let products;
  if (searchTerm) {
    products = productInfo.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else {
    products = productInfo;
  }

  return (
    <div className="p-5">
      <input
        className="bg-gray-100 w-full py-2 px-4 rounded-xl outline-none"
        type="text"
        value={searchTerm}
        placeholder="Search products..."
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
