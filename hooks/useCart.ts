import { useContext } from "react";

import { CartContext } from "../context";
import { ICartProduct } from "../interfaces";


export const useCart = () => {

    const { updatedCartQuantity, ...props } = useContext( CartContext );

    const onNewCartQuantityValue = ( product: ICartProduct, newQuantityValue: number ) => {
        product.quantity = newQuantityValue;
        updatedCartQuantity( product );
    };

    return{
        ...props,
        onNewCartQuantityValue
    }

}