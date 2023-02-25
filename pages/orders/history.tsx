import { Chip, Grid, Link, Typography } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

import { PDFViewer } from '@react-pdf/renderer';

import { ShopLayout } from '../../components/layouts'
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder, defaultOrder } from '../../interfaces/order';
import Recibo from '../../components/orders/recibo';
import { useState } from 'react';

interface Props {
    orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {

    const [ verRecibo, setVerRecibo ] = useState(false)
    const [ infoReceipt, setInfoReceipt ] = useState<IOrder>(defaultOrder)

    const showReceipt = ( infoOrder: IOrder ) => {
        setInfoReceipt(infoOrder);
        setVerRecibo(true);
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'fullname', headerName: 'Nombre Completo', width: 300 },

        {
            field: 'paid',
            headerName: 'Pagada',
            description: 'Muestra informacion si está pagada o no',
            width: 200,
            renderCell: (params: GridValueGetterParams) => {
                return (
                    params.row.paid 
                        ? <Chip color='success' label='Pagada' variant='outlined' />
                        : <Chip color='error' label='No pagada' variant='outlined' />
                )
            }
        },

        { field: 'orderId', headerName: 'ID Orden', width: 300 },

        {
            field: 'orden',
            headerName: 'Orden',
            width: 200,
            sortable: false,
            renderCell: (params: GridValueGetterParams) => {
                const ID =  params.row.orderId
                return (
                    <NextLink href={`/orders/${ID}`} passHref legacyBehavior>
                        {
                            params.row.paid
                                ? <Link underline='always'> Ver orden </Link>
                                : <Link underline='always'> Pagar orden </Link>
                        }
                        
                    </NextLink>
                )
            }
        },
        {
            field: 'recibo',
            headerName: 'Recibo',
            width: 200,
            renderCell: (params: GridValueGetterParams) => {
                const order = params.row.orderComplete
                return (
                    order.isPaid ? (
                        <button onClick={() => showReceipt(order) } style={{ cursor: "pointer" }}>
                            Ver recibo
                        </button>
                    )
                    : (
                        <p>Pendiente de pago...</p>
                    )
                )
            }
        }
    ];

    const rows = orders.map( (order, index) => ({
        id: index, 
        paid: order.isPaid, 
        fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`, 
        orderId: order._id,
        orderComplete: order
    }) );

  return (
    <ShopLayout title='Historial de ordenes' pageDescription='Historial de ordenes del cliente'>

        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

        <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid 
                        rows={ rows }
                        columns={ columns }
                        pageSize={ 10 }
                        rowsPerPageOptions={ [10] }
                    />
            </Grid>
        </Grid>

        {
            verRecibo ? (
                <div className="contenedor-pdf">
                    <button id='btn-contenedor-pdf' onClick={ () => setVerRecibo(false) }>
                        Cerrar comprobante
                    </button>
                    <PDFViewer style={{ width: "100%", height: "100vh" }}>
                        <Recibo infoReceipt={infoReceipt!} />
                    </PDFViewer>
                </div>
            )
            : (
                <></>
            )
        }

    </ShopLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    
    const session: any = await getSession({ req });

    if( !session ) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false,
        }
        }
    }

    const orders = await dbOrders.getOrdersByUser( session.user._id );


    return {
        props: {
            orders
        }
    }
}

export default HistoryPage