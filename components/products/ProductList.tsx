import { FC } from "react"
import { Grid } from "@mui/material"
import { IProduct } from "../../interfaces"
import { ProductCart } from "./ProductCart"

interface Props {
    products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {

  const filterProducts = products.filter(item => item.active !== false)

  return (
    <Grid container spacing={4}>
       {
         filterProducts.map( product => (
            <ProductCart
                key={ product.slug }
                product={ product }
            />
        ) )
       }
    </Grid>
  )
}
