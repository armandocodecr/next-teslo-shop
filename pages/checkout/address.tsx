import { Box, Button, FormControl, Grid, MenuItem, TextField, Typography } from "@mui/material"
import Cookies from "js-cookie";

import { ShopLayout } from "../../components/layouts"
import { countries } from "../../utils"
import { useAddress } from '../../hooks';

const AddresPage = () => {

    const {register, handleSubmit, errors, onDirectionForm} = useAddress();

  return (
    <ShopLayout title="Address" pageDescription="Confirmar direccion del destino">
        <form onSubmit={ handleSubmit(onDirectionForm) } noValidate>
            <Typography variant="h1" component="h1">Checkout</Typography>

            <Grid container spacing={ 2 } sx={{ mt: 2 }}>
                
                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Name' 
                        variant="filled" 
                        fullWidth 
                        {
                            ...register('firstName', {
                                required: 'This field is required'
                            })
                        }
                        error={ !!errors.firstName }
                        helperText={ errors.firstName?.message }
                    />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Last name' 
                        variant="filled" 
                        fullWidth
                        {
                            ...register('lastName', {
                                required: 'This field is required'
                            })
                        }
                        error={ !!errors.lastName }
                        helperText={ errors.lastName?.message }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Address' 
                        variant="filled" 
                        fullWidth 
                        {
                            ...register('address', {
                                required: 'This field is required'
                            })
                        }
                        error={ !!errors.address }
                        helperText={ errors.address?.message }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Address 2 (Optional)' 
                        variant="filled" 
                        fullWidth 
                        {
                            ...register('address2')
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Postal code' 
                        variant="filled" 
                        fullWidth 
                        {
                            ...register('zip', {
                                required: 'This field is required'
                            })
                        }
                        error={ !!errors.zip }
                        helperText={ errors.zip?.message }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='City' 
                        variant="filled" 
                        fullWidth 
                        {
                            ...register('city', {
                                required: 'This field is required'
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
                                    required: 'This field is required'
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
                        label='Telephone' 
                        variant="filled" 
                        fullWidth 
                        {
                            ...register('phone', {
                                required: 'This field is required'
                            })
                        }
                        error={ !!errors.phone }
                        helperText={ errors.phone?.message }
                    />
                </Grid>

            </Grid>

            <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                <Button type="submit" color="secondary" className="circular-btn" size="large">
                    Review
                </Button>
            </Box>
        </form>

    </ShopLayout>
  )
}



export default AddresPage