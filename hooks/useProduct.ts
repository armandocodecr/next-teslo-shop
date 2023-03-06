import router from "next/router"
import { useState } from "react"
import { ICartProduct, ISize } from "../interfaces"
import { IProduct } from '../interfaces/products';
import { useCart } from "./useCart";


export const useProduct = ( product: IProduct ) => {

  const { addProductToCart } = useCart();

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })

  const selectedSize = ( size: ISize ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      size
    }) )
  }

  const onUpdatedQuantity = ( quantity: number ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity
    }) )
  }

  const onAddProduct = () => {
    
    if ( !tempCartProduct.size ) { return };

    addProductToCart(tempCartProduct);
    
    router.push('/cart')
  }

  return {
    tempCartProduct,

    //Methods
    selectedSize,
    onUpdatedQuantity,
    onAddProduct
  }

}