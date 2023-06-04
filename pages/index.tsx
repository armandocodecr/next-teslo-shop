import { useState } from 'react';
import type { NextPage } from 'next'
import { Typography } from '@mui/material'

import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products';
import { useProducts } from '../hooks';
import { FullScreenLoading, DialogComponent } from '../components/ui';

const HomePage: NextPage = () => {

  const { products, isLoading } = useProducts('/products');

  return (
   <ShopLayout title={ 'Tesla-Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo aqui'} >
      <Typography variant='h1' component='h1'>Store</Typography> 
      {/* "component" le indica al SEO que es el titulo de la pagina */}
      <Typography variant='h2' sx={{ mb: 1 }}>All the products</Typography>

      <DialogComponent />

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products }/>
      }

   </ShopLayout>
  )
}

export default HomePage
