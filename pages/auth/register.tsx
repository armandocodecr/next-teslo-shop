import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link'

import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material';


import { AuthLayout } from '../../components/layouts'
import { validation } from '../../utils';
import { useAuth } from '../../hooks';

const RegisterPage = () => {

    const router = useRouter();
    const { 
        errors,
        showError,
        //Methods
        register,
        handleSubmit,
        onRegisterForm, 
        } = useAuth();

  return (
    <AuthLayout title='Ingresar'>
        <form onSubmit={ handleSubmit(onRegisterForm) } noValidate>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'
                        display='flex' justifyContent='center' >
                            Crear cuenta
                        </Typography>
                        <Chip
                            label='Este correo ya está registrado'
                            color='error'
                            icon={ <ErrorOutline /> }
                            className='fadeIn'
                            sx={{ mt: 1, display: showError ? 'flex' : 'none' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField 
                            label='Nombre' 
                            variant='filled' 
                            fullWidth
                            { 
                                ...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                }) 
                            }
                            error={ !!errors.name }
                            helperText={ errors.name?.message }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField 
                            type='email'
                            label='Correo' 
                            variant='filled' 
                            fullWidth
                            { 
                                ...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validation.isEmail

                                }) 
                            }
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
                        <Button type='submit' color='secondary' className='circular-btn' size='large' fullWidth>
                            Ingresar
                        </Button>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='center'>
                    <NextLink href={ !router.query.p?.toString() ? '/auth/login' : `/auth/login?p=${ router.query.p?.toString() }`} passHref legacyBehavior>
                            <Link underline='always'>
                                ¿Ya tienes cuenta?
                            </Link>
                    </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req });

    const { p = '' } = query;

    if ( session ) { //Si hay una session iniciada no debe de mostrar el register
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

export default RegisterPage