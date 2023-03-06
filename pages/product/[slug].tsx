import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { Grid, Box, Typography, Button, Chip } from "@mui/material"

import { ShopLayout } from "../../components/layouts"
import { ProductSlideshow } from "../../components/products"
import { ItemCounter, SizeSelector } from "../../components/ui"

import { dbProducts } from "../../database"
import { IProduct } from '../../interfaces';
import { useProduct } from '../../hooks/useProduct';

interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {

  const { tempCartProduct, selectedSize, onUpdatedQuantity, onAddProduct } = useProduct( product );

  return (
    <ShopLayout title={ product.title } pageDescription={ product.description } >
        <Grid container spacing={ 3 }>

            <Grid item xs={ 12 } sm={ 7 } >
              <ProductSlideshow images={ product.images } />
            </Grid>

            <Grid item xs={ 12 } sm={ 5 } >
              <Box display='flex' flexDirection='column'>

                  {/* titulos */}
                  <Typography variant="h1" component='h1'>
                      { product.title }
                  </Typography>

                  <Typography variant="subtitle1" component='h2'>
                      ${ product.price }
                  </Typography>

                  {/* Cantidad */}

                  <Box sx={{ my: 2 }}>
                    <Typography variant="subtitle2" sx={{ ml: 1.5 }}>Cantidad</Typography>
                        <ItemCounter
                          currentValue={ tempCartProduct.quantity }
                          updatedQuantity={ onUpdatedQuantity }
                          maxValue={ product.inStock }
                        />
                    <SizeSelector 
                      selectedSize={ tempCartProduct.size } 
                      sizes={ product.sizes }
                      onSelectedSize={ selectedSize }
                    />
                  </Box>

                  {/* Agregar al carrito */}

                  {
                    (product.inStock > 0) 
                    ?(
                      <Button color="secondary" className="circular-btn"
                        onClick={ onAddProduct }
                      >
                          {
                            tempCartProduct.size
                              ? 'Agregar al carrito'
                              : 'Seleccione una talla'
                          }
                      </Button>
                    )
                    : (
                      <Chip label='No hay disponibles' color="error" variant='outlined' /> 
                    )
                  }

                  {/* Descripcion */}

                  <Box sx={{ mt: 3 }} >
                      <Typography variant="subtitle2">Descripcion:</Typography>
                      <Typography variant="body2">{ product.description }</Typography>
                  </Box>

              </Box>
            </Grid>

        </Grid>
    </ShopLayout>
  )
}

// getServerSideProps

//* No usar esto - SSR

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
//   const { slug = '' } = params as { slug: string }
  
//   const product = await dbProducts.getProductBySlug( slug )

//   if ( !product ){
//       return {
//           redirect: {
//               destination: '/',
//               permanent: false //Indicamos que esta direccion no es permanente (ya que no sabemos si en un futuro estará)
//           }
//       }
//   }

//   return {
//       props: {
//         product
//       }
//   }
// }

//getStaticPaths

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const productSlugs = await dbProducts.getAllProductsSlugs();

  return {
    paths: productSlugs.map( ({ slug }) => ({
      params: { slug }
    })),
    fallback: "blocking"
  }
}

//getStaticProps

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug = '' } = params as { slug: string }  
  const product = await dbProducts.getProductBySlug( slug )

  if ( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate:86400,
  }
}


export default ProductPage
