import { NextRouter, useRouter } from 'next/router';
import Swal from "sweetalert2";

import { tesloApi } from "../../api";

export const windowsDeleteConfirmation = ( id: string, images: string[], router: NextRouter ) => {
  
    const onDeleteProduct = async ( id: string, imagenes: string[] ) => {
    
        const dataProduct = {
            id,
            images: imagenes
        }
    
        try {
            
            const { data } = await tesloApi({
                url: '/admin/products',
                method: 'DELETE',
                data: dataProduct,
            })
    
            router.replace('/admin/products');
    
        } catch (error) {
            console.log(error)
        }
    
    }

    Swal.fire({
        title: '¿Estás seguro/a de eliminar este producto?',
        text: "¡Después de confirmar no habrá vuelta atrás!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, bórralo!',
        cancelButtonText: ' Cencelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '¡Eliminado!',
            'Este producto ha sido eliminado.',
            'success'
          )
          onDeleteProduct( id, images );
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto eliminado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
}