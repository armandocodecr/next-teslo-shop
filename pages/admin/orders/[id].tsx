import { GetServerSideProps, NextPage } from 'next';

import { Card, CardContent, Grid, Typography, Divider, Box, Chip } from '@mui/material';
import { ConfirmationNumberOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { CartList, OrderSummary } from '../../../components/cart';
import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';
import { AdminLayout } from '../../../components/layouts';


interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

    if( !order ) return (<></>);
    
    const { shippingAddress } = order;


  return (
    <AdminLayout title='Resumen de la orden' subTitle={`Orden ID: ${ order._id }`} icon={ <ConfirmationNumberOutlined /> }>

        {
            order.isPaid
            ? (
                <Chip 
                    sx={{ my: 2 }}
                    label='Orden pagada'
                    variant='outlined'
                    color='success'
                    icon={ <CreditScoreOutlined /> }
                />
            ):
            (
                <Chip 
                    sx={{ my: 2 }}
                    label='Pendiente de pago'
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
                        <Typography variant='h2'>Resumen ({ order.numberOfItems } { order.numberOfItems >1 ? 'productos' : 'producto' } )</Typography>
                        <Divider sx={{ my: 1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Direccion de entrega</Typography>
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
                            
                            
                            {/* Flex: 1  es para que see expanda toda la caja */}
                             <Box sx={{ display: 'flex', flex: 1 }} flexDirection='column'> 
                                {
                                    order.isPaid
                                    ? (
                                        <Chip 
                                            sx={{ my: 2 }}
                                            label='Orden pagada'
                                            variant='outlined'
                                            color='success'
                                            icon={ <CreditScoreOutlined /> }
                                        />
                                    )
                                    : (
                                        <Chip 
                                            sx={{ my: 2 }}
                                            label='Orden no paga'
                                            variant='outlined'
                                            color='error'
                                            icon={ <CreditScoreOutlined /> }
                                        />
                                    )
                                }
                             </Box>


                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id= '' } = query;
    const order = await dbOrders.getOrderById( id.toString() );

    if( !order ){ // Verificamos que la orden sea de esa persona
        return{
            redirect: {
                destination: `/admin/orders`,
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