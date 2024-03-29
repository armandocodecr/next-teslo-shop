import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { PayPalButtons } from '@paypal/react-paypal-js';

import { Card, CardContent, Grid, Typography, Divider, Box, Chip, CircularProgress } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts'
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { tesloApi } from '../../api';
import Cookie from 'js-cookie';

export type OrderResponseBody = {
    id: string;
    status:
        | "COMPLETED"
        | "SAVED"
        | "APPROVED"
        | "VOIDED"
        | "PAYER_ACTION_REQUIRED"
};

interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

    const router = useRouter();
    const { shippingAddress } = order;
    const [isPaying, setIsPaying] = useState(false);

    const onOrderCompleted = async ( details: OrderResponseBody ) => { //Esta funcion evita que se hagan pagos dobles

        if( details.status !== 'COMPLETED' ){
            return alert('NO HAY PAGO EN PAYPAL');
        }

        setIsPaying(true);

        try {

            const { data } = await tesloApi.post(`/orders/pay`, {
                transactionId: details.id,
                orderId: order._id
            }); //llamamos al end point

            router.reload(); //Al recargar la pagina va a volver a hacer la peticion la backend par asegurarse de que todo esté bien, y nos regresa la orden pagada
            deleteCookiesAddress()
        } catch (error) {
            setIsPaying(false);
            console.log(error);
            alert('ERROR')
        }

    }

    const deleteCookiesAddress = () => {
        Cookie.remove('firstName')
        Cookie.remove('lastName')
        Cookie.remove('address')
        Cookie.remove('address2')
        Cookie.remove('zip')
        Cookie.remove('city')
        Cookie.remove('country')
        Cookie.remove('phone')
    }

  return (
    <ShopLayout title='Summary order' pageDescription={'Resumen de la orden'}>

        <Typography variant='h1' component='h1' sx={{ mb: 2 }}>Order: { order._id }</Typography>
        {
            order.isPaid
            ? (
                <Chip 
                    sx={{ my: 2 }}
                    label='Paid order'
                    variant='outlined'
                    color='success'
                    icon={ <CreditScoreOutlined /> }
                />
            ):
            (
                <Chip 
                    sx={{ my: 2 }}
                    label='Pending'
                    variant='outlined'
                    color='error'
                    icon={ <CreditCardOffOutlined /> }
                /> 
            )
        }

        <Grid container className='fadeIn'>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList products={ order.orderItems } />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Summary ({ order.numberOfItems } { order.numberOfItems >1 ? 'products' : 'product' } )</Typography>
                        <Divider sx={{ my: 1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Delivery address</Typography>
                        </Box>

                        <Typography>{ shippingAddress.firstName } { shippingAddress.lastName }</Typography>
                        <Typography>{ shippingAddress.address } { shippingAddress.address2 ? `, ${shippingAddress.address2}`: '' } </Typography>
                        <Typography>{ shippingAddress.city }, { shippingAddress.zip }</Typography>
                        <Typography>{ shippingAddress.country }</Typography>
                        <Typography>{ shippingAddress.phone }</Typography>  

                        <Divider sx={{ my: 1 }} />              

                        <OrderSummary 
                            orderValues={{ 
                                numberOfItems: order.numberOfItems,
                                subTotal: order.subTotal,
                                total: order.total,
                                tax: order.tax,
                             }}
                         />

                        <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                            
                            <Box 
                                display="flex" 
                                justifyContent='center' 
                                className='fadeIn'
                                sx={{ display: isPaying ? 'flex' : 'none' }}
                            >
                                <CircularProgress />
                            </Box>
                            
                            {/* Flex: 1  es para que see expanda toda la caja */}
                             <Box sx={{ display: isPaying ? 'none' : 'flex', flex: 1 }} flexDirection='column'> 
                                {
                                    order.isPaid
                                    ? (
                                        <Chip 
                                            sx={{ my: 2 }}
                                            label='Paid order'
                                            variant='outlined'
                                            color='success'
                                            icon={ <CreditScoreOutlined /> }
                                        />
                                    )
                                    : (
                                        <PayPalButtons 
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                value: order.total.toString(),
                                                            },
                                                        },
                                                    ],
                                                });
                                            }}
                                            onApprove={(data, actions) => {
                                                return actions.order!.capture().then((details) => {
                                                    onOrderCompleted(details);
                                                });
                                            }}
                                        />
                                    )
                                }
                             </Box>


                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id= '' } = query;
    const session:any = await getSession({ req });

    if( !session ){
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${ id }`,
                permanent: false,
            }
        }
    }

    const order = await dbOrders.getOrderById( id.toString() );

    if( !order ){ // Verificamos que la orden sea de esa persona
        return{
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }

    if( order.user != session.user._id ){ //Verificamos que la session sea del cliente que la solicitó
        return{
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage