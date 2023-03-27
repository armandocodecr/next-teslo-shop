
import NextLink from 'next/link'
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid, Link, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';

import { AdminLayout } from '../../components/layouts'
import { IProduct } from '../../interfaces';
import { DropdownMenu } from '../../components/admin';
import { useContext } from 'react';
import { UiContext } from '../../context';


const columns:GridColDef[] = [
    { 
        field: 'img', headerName: 'Image',
        renderCell: ( { row }: GridValueGetterParams ) =>{
            return (
                <a href={`/product/${ row.slug }`} target="_blank" rel="noreferrer" >
                    <CardMedia 
                        component='img'
                        alt={` ${row.title} `}
                        className='fadeIn'
                        image={ row.img }
                    />
                </a>
            )
        }
    }, //Quitamos el witdh para que eso lo determine la imagen
    { 
        field: 'title', headerName: 'Title', width: 300,
         renderCell:( { row }: GridValueGetterParams ) => {
            return (
                <NextLink href={`/admin/products/${ row.slug }`} passHref legacyBehavior>
                    <Link underline='always'>
                        { row.title }
                    </Link>
                </NextLink>
            )
         }
    },
    { field: 'gender', headerName: 'Gender' },
    { field: 'type', headerName: 'Type' },
    { field: 'inStock', headerName: 'Inventory' },
    { field: 'price', headerName: 'Price' },
    { field: 'sizes', headerName: 'Sizes', width: 200 },

]

const ProductsPage = () => {

    const { data } = useSWR<IProduct[]>('/api/admin/products');
    const { isDropdownOpen } = useContext(UiContext);
    const filterData = data?.filter(product => product.active === isDropdownOpen)
    
    if( !filterData ) return (<></>);

    const rows = filterData!.map( product => ({
        id: product._id,
        img: product.images[0],
        title: product.title,
        gender: product.gender,
        type: product.type,
        inStock: product.inStock,
        price: product.price,
        sizes: product.sizes.join(', '),
        slug: product.slug,
    }) );

  return (
    <AdminLayout
        title={`Products (${ data?.length })`}
        subTitle={'Products maintenance'}
        icon={ <CategoryOutlined/> }
    >

        <Box display='flex' justifyContent='end' sx={{ mb: 2 }} alignItems='center'>

            <Typography>Filter by availability:</Typography>

            <DropdownMenu />

            <Button
                startIcon={ <AddOutlined /> }
                color='secondary'
                href="/admin/products/new"
            >
                Create product
            </Button>
        </Box>

        <Grid container className='fadeIn' sx={{ mt: 2}}>
            <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid 
                        rows={ rows }
                        columns={ columns }
                        pageSize={ 10 }
                        rowsPerPageOptions={ [10] }
                    />
            </Grid>
        </Grid>

    </AdminLayout>
  )
}

export default ProductsPage;