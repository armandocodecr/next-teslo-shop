import NextLink from 'next/link'
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';

import { ItemCounter } from '../ui';
import { FC } from 'react';
import { ICartProduct, IOrderItem } from '../../interfaces';
import { useCart } from '../../hooks';

interface Props {
    editable?: boolean;
    products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {

    const { cart, removeCartProduct, onNewCartQuantityValue } = useCart();

    const productsToShow = products ? products : cart;

  return (
    <>
        {
            productsToShow.map( product => (
                //Agrego en la key "+ size" ya que react se queja de cuando agregamos al carritos un producto con el mismo slug pero diferente talla
                <Grid container spacing={2} key={ product.slug + product.size } sx={{ mb: 1, mt: 1 }} > 
                    <Grid item xs={ 3 }>
                        <NextLink href={`/product/${ product.slug }`} passHref legacyBehavior>
                            <Link>
                                <CardActionArea>
                                    <CardMedia 
                                        image={ product.image } 
                                        component='img'
                                        sx={{ borderRadius: '5px' }}
                                    />
                                </CardActionArea>
                            </Link>
                        </NextLink>
                    </Grid> 

                    <Grid item xs={ 5 }>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='body1'>{ product.title }</Typography>
                            <Typography variant='body1'>Size: <strong>{ product.size }</strong></Typography>

                            {
                                editable
                                ?  (
                                    <ItemCounter currentValue={ product.quantity } 
                                    maxValue={10} 
                                    updatedQuantity={( newValue ) => { onNewCartQuantityValue( product as ICartProduct, newValue ) }} />
                                )
                                : (
                                    <Typography variant='h6'>{ product.quantity } { product.quantity > 1 ? 'products' : 'product' }</Typography>
                                )
                            }
                           
                        </Box>
                    </Grid>

                    <Grid item xs={ 4 } display='flex' alignItems='center' flexDirection='column'>
                        <Typography variant='subtitle1'>{ `$${ product.price }` }</Typography>
                        {
                             editable && (
                                <Button 
                                variant='text' 
                                color='secondary'
                                onClick={ () => removeCartProduct(product as ICartProduct) }
                                >
                                Remove
                                </Button>
                             )

                        }

                    </Grid>
                </Grid>
             ))
        }
    </>
  )
}
