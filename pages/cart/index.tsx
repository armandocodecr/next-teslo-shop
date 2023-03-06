import { useContext, useEffect } from 'react';
import { Card, CardContent, Grid, Typography, Divider, Box, Button } from '@mui/material';

import { CartContext } from '../../context';
import { ShopLayout } from '../../components/layouts'
import { CartList, OrderSummary } from '../../components/cart';
import { useRouter } from 'next/router';
import { useCart } from '../../hooks';

const CartPage = () => {

    const { isLoaded, cart } = useCart();
    const router = useRouter();

    useEffect(() => {
      
        if( isLoaded && cart.length === 0 ) {
            router.replace('/cart/empty')
        }

    }, [isLoaded, cart, router])

    if ( !isLoaded  || cart.length === 0 ) { //Si no sabemos si se ha cargado entonces devolvemos un fragmento
        //Esto para evitar la milesimas de segundos donde se muestra la pagina del carrito y no la del carrito vacío
        //Evita que se renderize cualquier otra cosa en la pagina del cliente, se verá en blanco hasta que se cargue
        return (<></>);
    }
    

  return (
    <ShopLayout title='Carrito - 3' pageDescription='Carrito de compras de la tienda'>

        <Typography variant='h1' component='h1'>Carrito</Typography>

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList editable />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Orden</Typography>
                        <Divider sx={{ my: 1 }} />

                        <OrderSummary />

                        <Box sx={{ mt: 3 }}>
                            <Button 
                                color='secondary' 
                                className='circular-btn'
                                href='/checkout/address' 
                                fullWidth
                            >
                                Checkout
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    </ShopLayout>
  )
}

export default CartPage