import { useEffect, useState } from 'react';
import NextLink from 'next/link'
import { GetServerSideProps } from 'next'
import { getSession, signIn, getProviders } from 'next-auth/react';
import { useRouter } from 'next/router';

import { Box, Button, Chip, Grid, Link, TextField, Typography, Divider } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layouts'
import { validation } from '../../utils';

type FormData = {
    email: string,
    password: string,
  };

const LoginPage = () => {

    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    //El register va a trabajar los texfield, los va a asociar y mantener, creando una realacion por ejemplo entre el email y el formulario
    //cada que escriba los valores los va a mostrar en pantalla.
    const [showError, setShowError] = useState(false);

    const [providers, setProviders] = useState<any>({});
    
    useEffect(() => {
        getProviders().then( prov => {
            setProviders(prov)
        } )
    }, [])

    const onLoginUser = async( { email, password }: FormData ) => {
        setShowError(false);

        await signIn( 'credentials', { email, password } );

    }

  return (
    <AuthLayout title='Ingresar'>
        <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'display='flex' justifyContent='center' > Iniciar sección </Typography>

                        <Chip 
                            label='No conocemos ese correo / contraseña'
                            color='error'
                            icon={ <ErrorOutline /> }
                            className='fadeIn'
                            sx={{ mt: 1, display: showError ? 'flex' : 'none' }}
                        />

                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            type='email' 
                            label='Correo' 
                            variant='filled' 
                            fullWidth
                            //Este codigo es la propagacion de ciertas propiedades que el register nos va a dar
                            { 
                                ...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validation.isEmail

                                }) 
                            }
                            //La doble negacion es para convertir el campo en un valor booleano
                            error={ !!errors.email }
                            helperText={ errors.email?.message }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField  
                            label='Contraseña' 
                            type='password' 
                            variant='filled' 
                            fullWidth
                            { 
                                ...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 5, message: 'Mínimo 6 caracteres' }
                                }) 
                            }
                            error={ !!errors.password }
                            helperText={ errors.password?.message }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button 
                            color='secondary' 
                            className='circular-btn' 
                            size='large' 
                            type='submit'
                            fullWidth>
                            Ingresar
                        </Button>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='center'>
                    <NextLink href={ !router.query.p?.toString() ? '/auth/register' : `/auth/register?p=${ router.query.p?.toString() }`} passHref legacyBehavior>
                            <Link underline='always'>
                                ¿No tienes cuenta?
                            </Link>
                    </NextLink>
                    </Grid>

                    <Grid item xs={12} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                        <Divider sx={{ width: '100%', mb: 2  }} />
                        <Typography sx={{ mb: 2 }}>También puedes loguearte con</Typography>
                        { //Obtengo primero los valores del objeto para luego mapearlos
                            Object.values( providers ).map( ( provider: any ) =>{

                                if ( provider.id === 'credentials' ) return (<div key='credentials'></div>);

                                return (
                                    <Button
                                        key={ provider.id }
                                        variant='outlined'
                                        fullWidth
                                        color='primary'
                                        sx={{ mb: 1 }}
                                        onClick={ ()  => signIn( provider.id ) }
                                    >
                                        { provider.name }
                                    </Button>
                                )
                            } )
                        }
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req });

    const { p = '/' } = query;

    if ( session ) { //Si hay una session iniciada no debe de mostrar el login
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {  }
    }
}

export default LoginPage