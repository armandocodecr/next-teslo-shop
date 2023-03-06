import Cookies from "js-cookie";
import router from "next/router";
import { useForm } from "react-hook-form";
import { useCart } from "./useCart";

type FormData = {
    firstName  : string;
    lastName   : string;
    address    : string;
    address2?  : string;
    zip        : string;
    city       : string;
    country    : string;
    phone      : string;

}

const getAddressFromCookies = ():FormData => {
    return {
        firstName : Cookies.get('firstName') || '',
        lastName  : Cookies.get('lastName') || '',
        address   : Cookies.get('address') || '',
        address2  : Cookies.get('address2') || '',
        zip       : Cookies.get('zip') || '',
        city      : Cookies.get('city') || '',
        country   : Cookies.get('country') || '',
        phone     : Cookies.get('phone') || '',
    }
}

export const useAddress = () => {

    const { updatedAddress } = useCart();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: getAddressFromCookies(),
    });

    const onDirectionForm = ( data: FormData ) => {

        updatedAddress( data );

        router.push('/checkout/summary');

    }

    return {
        register,
        handleSubmit,
        errors,
        onDirectionForm
    }

}