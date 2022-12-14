import React, { useContext } from "react";
import { useProduct } from "../contexts/ProductContext";

const Product = ({ _id, name, description, picture, price }) => {

  const { selectedProducts, setSelectedProducts } = useProduct();

  const addProduct = () => {
    setSelectedProducts((prev => [...prev, _id]))
  }

  return (
    <div className="w-64">
      <div className="bg-blue-100 p-5 rounded-xl">
        <img src={picture} alt={picture} />
      </div>

      <div className="mt-2">
        <h3 className="font-bold text-lg">{name}</h3>
      </div>

      <p className="text-sm mt-1 leading-4">{description}</p>
      <div className="flex mt-1">
        <div className="text-2xl font-bold grow">${price}</div>
        <button onClick={addProduct} className="bg-emerald-400 py-1 px-3 text-white rounded-xl">
          Buy
        </button>
      </div>
    </div>
  );
};

export default Product;
