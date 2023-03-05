import { useState, useEffect, useContext } from "react";
import { getProviders, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { AuthContext } from "../context";

type FormData = {
    name: string;
    email: string,
    password: string,
  };

export const useAuth = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    //El register va a trabajar los texfield, los va a asociar y mantener, creando una realacion por ejemplo entre el email y el formulario
    //cada que escriba los valores los va a mostrar en pantalla.
    const [showError, setShowError] = useState(false);

    const [providers, setProviders] = useState<any>({});

    //Estados del Register
    const { registerUser } = useContext(AuthContext)
    
    useEffect(() => {
        getProviders().then( prov => {
            setProviders(prov)
        } )
    }, [])

    const onLoginUser = async( { email, password }: FormData ) => {
        setShowError(false);

        await signIn( 'credentials', { email, password } );

    }

    const onRegisterForm = async( { name, email, password }: FormData ) => {

        setShowError(false);

        const { hasError } = await registerUser( name, email, password );

        if ( hasError ) {
            setShowError(true);
            setTimeout( () => { setShowError(false) }, 3000 )
            return;
        }

        await signIn( 'credentials', { email, password } );

    }

    return {
        errors,
        showError,
        providers,

        //Methods
        register,
        handleSubmit,
        onLoginUser,
        onRegisterForm
    }

}