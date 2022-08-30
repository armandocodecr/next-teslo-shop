import type { NextPage, GetServerSideProps } from 'next'
import { Box, Typography } from '@mui/material'

import { ShopLayout } from '../../components/layouts'

import { ProductList } from '../../components/products';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {

  return (
   <ShopLayout title={ 'Tesla-Shop - Search'} pageDescription={'Encuentra los mejores productos de Teslo aqui'} >
      <Typography variant='h1' component='h1'>Buscar producto</Typography> 

        {
            foundProducts
                ? <Typography variant='h2' sx={{ mb: 1 }} textTransform='capitalize'>Resultado de búsqueda de: <strong>{ query }</strong></Typography>
                : (
                    <Box display='flex'>
                        <Typography variant='h2' sx={{ mb: 1 }}>No encontramos ningún producto relacionado con:</Typography>
                        <Typography variant='h2' sx={{ ml: 1 }} color="secondary" textTransform='capitalize'>{ query }</Typography>
                    </Box>
                )
        }

      <ProductList products={ products }/>

   </ShopLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { query = '' } = params as { query: string };

    if ( query.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true //Esto para indicar que si no envian informacion al query es porque no va a existir
            }
        }
    }

    //Hay una posibilidad de que no hayan productos
    let products = await dbProducts.getProductByTerm( query );
    const foundProducts = products.length > 0;

    // TODO: Retornar otros productos
    if (!foundProducts) {
        // products = await dbProducts.getAllProducts();
         products = await dbProducts.getProductByTerm( 'kid' );
    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}

export default SearchPage