import { createContext } from 'react';
import { ICartProduct, ShippingAddress } from '../../interfaces';


interface ContextProps {
     isLoaded: boolean;
     cart: ICartProduct[];
     numberOfItems: number;
     subTotal: number;
     tax: number;
     total: number;

     shippingAddress?: ShippingAddress;

     addProductToCart: (product: ICartProduct) => void;
     updatedCartQuantity: (product: ICartProduct) => void;
     removeCartProduct: (product: ICartProduct) => void;
     updatedAddress: (address: ShippingAddress) => void;
     createOrder: () => Promise<{ hasError: boolean;  message: string; }>;
}

export const CartContext = createContext({} as ContextProps)