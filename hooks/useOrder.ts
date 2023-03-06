import { useState, useEffect } from "react";

import Cookies from "js-cookie";
import router from "next/router";
import { useCart } from "./useCart";


export const useOrder = () => {

    const { createOrder } = useCart();

    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
//Este código es para verificar si hay una dirección colocada en las Cookies, ya que para esta pantalla es necesario

        if( !Cookies.get('firstName') ) { 
            router.push('/checkout/address')
        }

    }, [ router ]);

    const onCreateOrder = async() => {
        setIsPosting(true);

        const { hasError, message } = await createOrder(); 

        if ( hasError ) {
            setIsPosting(false);
            setErrorMessage( message );
            return;
        }

        router.replace(`/orders/${message}`);

    }

    return {
        isPosting,
        errorMessage,
        
        //Methods
        onCreateOrder
    }

}