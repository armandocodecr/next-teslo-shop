import type { NextPage } from 'next'
import { Typography } from '@mui/material'

import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';

const WomenPage: NextPage = () => {

  const { products, isLoading } = useProducts('/products?gender=women')

  return (
   <ShopLayout title={ 'Tesla-Shop - Women'} pageDescription={'Los mejores productos para mujeres'} >
      <Typography variant='h1' component='h1'>Women</Typography> 
      {/* "component" le indica al SEO que es el titulo de la pagina */}
      <Typography variant='h2' sx={{ mb: 1 }}>Products for women</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products }/>
      }

   </ShopLayout>
  )
}

export default WomenPage