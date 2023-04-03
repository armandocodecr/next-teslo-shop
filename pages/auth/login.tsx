import NextLink from 'next/link'
import { GetServerSideProps } from 'next'
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import { Box, Button, Chip, Grid, Link, TextField, Typography, Divider } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from '../../components/layouts'
import { validation } from '../../utils';
import { useAuth } from '../../hooks';

const LoginPage = () => {

    const router = useRouter();
    const { 
        errors,
        showError,
        providers,
        //Methods
        register,
        handleSubmit,
        onLoginUser, 
        } = useAuth();

  return (
    <AuthLayout title='Join'>
        <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'display='flex' justifyContent='center' > Login </Typography>

                        <Chip 
                            label='We do not recognize this email / password'
                            color='error'
                            icon={ <ErrorOutline /> }
                            className='fadeIn'
                            sx={{ mt: 1, display: showError ? 'flex' : 'none' }}
                        />

                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            type='email' 
                            label='Email' 
                            variant='filled' 
                            fullWidth
                            //Este codigo es la propagacion de ciertas propiedades que el register nos va a dar
                            { 
                                ...register('email', {
                                    required: 'This field is required',
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
                            label='Password' 
                            type='password' 
                            variant='filled' 
                            fullWidth
                            { 
                                ...register('password', {
                                    required: 'This field is required',
                                    minLength: { value: 5, message: 'min 5 characters' }
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
                            Sign in
                        </Button>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='center'>
                    <NextLink href={ !router.query.p?.toString() ? '/auth/register' : `/auth/register?p=${ router.query.p?.toString() }`} passHref legacyBehavior>
                            <Link underline='always'>
                                ¿Not a member?
                            </Link>
                    </NextLink>
                    </Grid>

                    <Grid item xs={12} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                        <Divider sx={{ width: '100%', mb: 2  }} />
                        <Typography sx={{ mb: 2 }}>Or sign up using</Typography>
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