import { Box, Button, FormControl, Grid, MenuItem, TextField, Typography } from "@mui/material"
import Cookies from "js-cookie";

import { ShopLayout } from "../../components/layouts"
import { countries } from "../../utils"
import { useAddress } from '../../hooks';

const AddresPage = () => {

    const {register, handleSubmit, errors, onDirectionForm} = useAddress();

  return (
    <ShopLayout title="Direccion" pageDescription="Confirmar direccion del destino">
        <form onSubmit={ handleSubmit(onDirectionForm) } noValidate>
            <Typography variant="h1" component="h1">Dirección</Typography>

            <Grid container spacing={ 2 } sx={{ mt: 2 }}>
                
                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Nombre' 
                        variant="filled" 
                        fullWidth 
                        {
                            ...register('firstName', {
                                required: 'Este campo es requerido'
                            })
                        }
                        error={ !!errors.firstName }
                        helperText={ errors.firstName?.message }
                    />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Apellido' 
                        variant="filled" 
                        fullWidth
                        {
                            ...register('lastName', {
                                required: 'Este campo es requerido'
                            })
                        }
                        error={ !!errors.lastName }
                        helperText={ errors.lastName?.message }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Direccion' 
                        variant="filled" 
                        fullWidth 
                        {
                            ...register('address', {
                                required: 'Este campo es requerido'
                            })
                        }
                        error={ !!errors.address }
                        helperText={ errors.address?.message }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Direccion 2 (Opcional)' 
                        variant="filled" 
                        fullWidth 
                        {
                            ...register('address2')
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Codigo postal' 
                        variant="filled" 
                        fullWidth 
                        {
                            ...register('zip', {
                                required: 'Este campo es requerido'
                            })
                        }
                        error={ !!errors.zip }
                        helperText={ errors.zip?.message }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Ciudad' 
                        variant="filled" 
                        fullWidth 
                        {
                            ...register('city', {
                                required: 'Este campo es requerido'
                            })
                        }
                        error={ !!errors.city }
                        helperText={ errors.city?.message }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <TextField
                            select
                            variant="filled"
                            label='País'
                            defaultValue={ Cookies.get('country') || countries[0].code }
                            {
                                ...register('country', {
                                    required: 'Este campo es requerido'
                                })
                            }
                            error={ !!errors.city }
                            helperText={ errors.city?.message }
                        >
                            {
                                countries.map( country => (
                                    <MenuItem 
                                        value={country.code}
                                        key={ country.code }
                                    >{ country.name }</MenuItem>
                                ) )
                            }
                        </TextField>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Teléfono' 
                        variant="filled" 
                        fullWidth 
                        {
                            ...register('phone', {
                                required: 'Este campo es requerido'
                            })
                        }
                        error={ !!errors.phone }
                        helperText={ errors.phone?.message }
                    />
                </Grid>

            </Grid>

            <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                <Button type="submit" color="secondary" className="circular-btn" size="large">
                    Revisar pedido
                </Button>
            </Box>
        </form>

    </ShopLayout>
  )
}



export default AddresPage