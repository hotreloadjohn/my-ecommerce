import {createContext, useContext, useState} from "react";
import useLocalStorageState from 'use-local-storage-state';

export const ProductsContext = createContext({});

export const useProduct = () => useContext(ProductsContext);

export function ProductsContextProvider({children}) {
  const [selectedProducts,setSelectedProducts] = useLocalStorageState('cart', {defaultValue:[]});
//   const [selectedProducts,setSelectedProducts] = useState([]);
  return (
    <ProductsContext.Provider value={{selectedProducts,setSelectedProducts}}>{children}</ProductsContext.Provider>
  );
}