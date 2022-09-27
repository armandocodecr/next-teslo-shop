import type { NextPage } from 'next'
import { Typography } from '@mui/material'

import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products';
import { useProducts } from '../hooks';
import { FullScreenLoading } from '../components/ui';

const HomePage: NextPage = () => {

  const { products, isLoading } = useProducts('/products')

  console.log('productos: ',products)

  return (
   <ShopLayout title={ 'Tesla-Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo aqui'} >
      <Typography variant='h1' component='h1'>Tienda</Typography> 
      {/* "component" le indica al SEO que es el titulo de la pagina */}
      <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products }/>
      }

   </ShopLayout>
  )
}

export default HomePage
