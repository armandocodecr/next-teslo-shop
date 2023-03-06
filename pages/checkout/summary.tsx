import NextLink from 'next/link'

import { Card, CardContent, Grid, Typography, Divider, Box, Button, Link, Chip } from '@mui/material';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts'
import { countries } from '../../utils';
import { useCart } from '../../hooks';
import { useOrder } from '../../hooks';

const SummaryPage = () => {

    const { shippingAddress, numberOfItems } = useCart();

    const { isPosting, errorMessage, onCreateOrder } = useOrder();

    if ( !shippingAddress ) {
            return <></>;
    }

    const { firstName, city, address, address2 = '', country, phone, zip } = shippingAddress;


  return (
    <ShopLayout title='Resumen de orden' pageDescription={'Resumen de la orden'}>

        <Typography variant='h1' component='h1' sx={{ mb: 2 }}>Resumen de la orden</Typography>

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen ({ numberOfItems } { numberOfItems === 1 ? 'Producto' : 'Productos' } )</Typography>
                        <Divider sx={{ my: 1 }} />

                        <Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>Direccion de entrega</Typography>
                            <NextLink href='/checkout/address' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <Typography>{ firstName }</Typography>
                        <Typography>{ city }, { zip }</Typography>
                        <Typography>{ address } { address2 ? `, ${address2}` : '' } </Typography>
                        <Typography>{ countries.find( c => c.code === country )?.name  }</Typography>
                        <Typography>{ phone }</Typography>  

                        <Divider sx={{ my: 1 }} />    

                         <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>                  

                        <OrderSummary />

                        <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                            <Button 
                                color='secondary' 
                                className='circular-btn' 
                                fullWidth
                                onClick={ onCreateOrder }
                                disabled={ isPosting }
                                >
                                Confirmar orden
                            </Button>

                            <Chip
                            color='error'
                            label={ errorMessage }
                            sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                            />

                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    </ShopLayout>
  )
}

export default SummaryPage