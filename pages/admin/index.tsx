import { AttachMoneyOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';

import { AdminLayout } from '../../components/layouts'
import { Grid, Typography } from '@mui/material'
import { SummaryTile } from '../../components/admin';
import { useDashboard } from '../../hooks';

const Index = () => {

    const { data, error, refreshIn } = useDashboard();

    if( !error && !data ){
        return <></>
    }

    if( error ) {
        console.log(error);
        return <Typography>Error al cargar la información</Typography>
    }

    const {
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders,
    } = data!;

  return (
    <AdminLayout
        title='Dashboard'
        subTitle='Estadísticas generales'
        icon={ <DashboardOutlined /> }
    >
        
    <Grid container spacing={2}>

        <SummaryTile 
            title={ numberOfOrders }
            subTitle='Ordenes totales'
            icon={ <CreditCardOutlined color='secondary' sx={{ fontSize: 37 }} /> }
        />

        <SummaryTile 
            title={ paidOrders }
            subTitle='Ordenes pagadas'
            icon={ <AttachMoneyOutlined color='success' sx={{ fontSize: 37 }} /> }
        />

        <SummaryTile 
            title={ notPaidOrders }
            subTitle='Ordenes pendientes'
            icon={ <CreditCardOffOutlined color='error' sx={{ fontSize: 37 }} /> }
        />

        <SummaryTile 
            title={ numberOfClients }
            subTitle='Clientes'
            icon={ <GroupOutlined color='primary' sx={{ fontSize: 37 }} /> }
        />

        <SummaryTile 
            title={ numberOfProducts }
            subTitle='Productos'
            icon={ <CategoryOutlined color='warning' sx={{ fontSize: 37 }} /> }
        />

        <SummaryTile 
            title={ productsWithNoInventory }
            subTitle='Productos sin existencias'
            icon={ <CancelPresentationOutlined color='error' sx={{ fontSize: 37 }} /> }
        />

        <SummaryTile 
            title={ lowInventory }
            subTitle='Bajo inventario'
            icon={ <ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 37 }} /> }
        />

        <SummaryTile 
            title={ refreshIn }
            subTitle='Actualización en: '
            icon={ <AccessTimeOutlined color='secondary' sx={{ fontSize: 37 }} /> }
        />

    </Grid>

    </AdminLayout>
  )
}

export default Index