import { AttachMoneyOutlined, CreditCardOffOutlined, 
    CreditCardOutlined, DashboardOutlined, GroupOutlined, 
    CategoryOutlined, CancelPresentationOutlined, 
    ProductionQuantityLimitsOutlined, AccessTimeOutlined 
    } from '@mui/icons-material';

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
        return <Typography>Error loading information</Typography>
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
        subTitle='General Statistics'
        icon={ <DashboardOutlined /> }
    >
        
    <Grid container spacing={2}>

        <SummaryTile 
            title={ numberOfOrders }
            subTitle='Total orders'
            icon={ <CreditCardOutlined color='secondary' sx={{ fontSize: 37 }} /> }
        />

        <SummaryTile 
            title={ paidOrders }
            subTitle='Paid orders'
            icon={ <AttachMoneyOutlined color='success' sx={{ fontSize: 37 }} /> }
        />

        <SummaryTile 
            title={ notPaidOrders }
            subTitle='Pending orders'
            icon={ <CreditCardOffOutlined color='error' sx={{ fontSize: 37 }} /> }
        />

        <SummaryTile 
            title={ numberOfClients }
            subTitle='Clients'
            icon={ <GroupOutlined color='primary' sx={{ fontSize: 37 }} /> }
        />

        <SummaryTile 
            title={ numberOfProducts }
            subTitle='Products'
            icon={ <CategoryOutlined color='warning' sx={{ fontSize: 37 }} /> }
        />

        <SummaryTile 
            title={ productsWithNoInventory }
            subTitle='Not available'
            icon={ <CancelPresentationOutlined color='error' sx={{ fontSize: 37 }} /> }
        />

        <SummaryTile 
            title={ lowInventory }
            subTitle='Inventory'
            icon={ <ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 37 }} /> }
        />

        <SummaryTile 
            title={ refreshIn }
            subTitle='Updated: '
            icon={ <AccessTimeOutlined color='secondary' sx={{ fontSize: 37 }} /> }
        />

    </Grid>

    </AdminLayout>
  )
}

export default Index