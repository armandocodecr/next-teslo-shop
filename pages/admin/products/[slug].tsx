import { FC, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import { Controller } from 'react-hook-form';

import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';

import { Box, Button, capitalize, Card, CardActions, CardMedia, 
        Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, 
        FormHelperText, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import Swal from 'sweetalert2';

import { useFilesAndTags } from '../../../hooks';
import { windowsDeleteConfirmation } from '../../../services';
import { IProduct, validTypes, validGender, validSizes } from '../../../interfaces';
import { AdminLayout } from '../../../components/layouts'
import { dbProducts } from '../../../database';
import tesloApi from '../../../api/tesloApi';
import { Product } from '../../../models';

interface Props {
    product: IProduct;
    slug: string;
}

const ProductAdminPage:FC<Props> = ({ product, slug }) => {

    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSaving, setIsSaving] = useState(false)
    
    const { handleSubmit, register, 
            onDeleteImage, onFileSelected, 
            onDeleteTag, onNewTag,
            errors, control,
            setNewTagValue, newTagValue,
            getValues, } = useFilesAndTags(product);

    const onSubmit = async ( form: IProduct ) => {
        
        if( form.images.length < 2 ) return alert('Mínimos 2 imagenes');
        setIsSaving(true);

        try {
            const { data } = await tesloApi({
                url: '/admin/products',
                method: form._id ? 'PUT' : 'POST', // si tenemos un _id entonces actualizar, si no crear
                data: form
            })

            if( form._id === undefined ) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Producto almacenado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                  })
                router.replace(`/admin/products/${ form.slug }`);
                setIsSaving(false);
            }else{
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Producto actualizado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                  })
                setIsSaving(false);
            }

        } catch (error) {
            console.log(error)
            setIsSaving(false);
        }

    }

    return (
        <AdminLayout 
            title={'Producto'} 
            subTitle={`Editando: ${ product.title }`}
            icon={ <DriveFileRenameOutline /> }
        >
            <form onSubmit={ handleSubmit( onSubmit ) } >
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '150px', mr: 2 }}
                        type="submit"
                        disabled={ isSaving }
                    >
                        Guardar
                    </Button>

                    {
                        slug !== 'new' && (
                            <Button 
                                color="error"
                                startIcon={ <SaveOutlined /> }
                                sx={{ width: '150px', mr: 2 }}
                                type="button"
                                onClick={ () => windowsDeleteConfirmation( product._id, product.images, router ) }
                                disabled={ isSaving }
                             >
                                 Eliminar
                            </Button>
                        )
                    }

                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Título"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('title', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.title }
                            helperText={ errors.title?.message }
                        />

                        <TextField
                            label="Descripción"
                            variant="filled"
                            fullWidth 
                            multiline
                            rows={4}
                            sx={{ mb: 1 }}
                            { ...register('description', {
                                required: 'Este campo es requerido',
                            })}
                            error={ !!errors.description }
                            helperText={ errors.description?.message }
                        />

                        <TextField
                            label="Inventario"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('inStock', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor 0' }
                            })}
                            error={ !!errors.inStock }
                            helperText={ errors.inStock?.message }
                        />
                        
                        <TextField
                            label="Precio"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('price', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor 0' }
                            })}
                            error={ !!errors.price }
                            helperText={ errors.price?.message }
                        />

                        <Divider sx={{ my: 1 }} />
                            
                        <Controller
                            name="type"
                            control={control}
                            defaultValue={undefined}
                            render={({ field }) => (
                                <FormControl>
                                <FormLabel>Tipo</FormLabel>
                                    <RadioGroup row {...field}>
                                        {validTypes.map((option) => (
                                        <FormControlLabel
                                            key={option}
                                            value={option}
                                            control={<Radio color="secondary" />}
                                            label={capitalize(option)}
                                        />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />

                        <Controller
                            name="gender"
                            control={control}
                            defaultValue={undefined}
                            render={({ field }) => (
                                <FormControl>
                                <FormLabel>Género</FormLabel>
                                <RadioGroup row {...field}>
                                    {validGender.map((option) => (
                                    <FormControlLabel
                                        key={option}
                                        value={option}
                                        control={<Radio color="secondary" />}
                                        label={capitalize(option)}
                                    />
                                    ))}
                                </RadioGroup>
                                </FormControl>
                            )}
                        />

                        <Controller
                            name="sizes"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth margin="dense" error={!!errors.sizes}>
                                <FormLabel>Sizes</FormLabel>
                                <FormGroup>
                                    {validSizes.map((size) => (
                                    <FormControlLabel
                                        key={size}
                                        label={size}
                                        control={
                                        <Checkbox
                                            value={size}
                                            checked={field.value.some((val) => val === size)}
                                            onChange={({ target: { value } }, checked) => {
                                            checked
                                                ? field.onChange([...field.value, value])
                                                : field.onChange(
                                                field.value.filter((val) => val !== value)
                                                );
                                            }}
                                            />
                                        }
                                        />
                                    ))}
                                    </FormGroup>
                                <FormHelperText>
                                    {capitalize(`${(errors.sizes as any)?.message || ''}`)}
                                </FormHelperText>
                                </FormControl>
                            )}
                        />

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            { ...register('slug', {
                                required: 'Este campo es requerido',
                                validate: (val) => val.trim().includes(' ') ? 'No puede tener espacion en blanco' : undefined
                            })}
                            error={ !!errors.slug }
                            helperText={ errors.slug?.message }
                        />

                        <TextField
                            label="Etiquetas"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            helperText="Presiona [spacebar] para agregar"
                            value={ newTagValue }
                            onChange={ ({ target }) => setNewTagValue(target.value) }
                            onKeyUp={ ({ code }) => code === 'Space' ? onNewTag() : undefined }
                        />
                        
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                        component="ul">
                            {
                                getValues('tags').map((tag) => {

                                return (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={ () => onDeleteTag(tag)}
                                        color="primary"
                                        size='small'
                                        sx={{ ml: 1, mt: 1}}
                                    />
                                );
                            })}
                        </Box>

                        <Divider sx={{ my: 2  }}/>
                        
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Imágenes</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                                onClick={ () => fileInputRef.current?.click() }
                            >
                                Cargar imagen
                            </Button>

                            <input
                            ref={ fileInputRef }
                                type='file'
                                multiple
                                accept='image/png, image/gif, image/jpg'
                                style={{ display: 'none' }}
                                onChange={ onFileSelected }
                             />

                            <Chip 
                                label="Es necesario al 2 imagenes"
                                color='error'
                                variant='outlined'
                                sx={{ display: getValues('images').length < 2 ? 'flex' : 'none' }}
                            />

                            <Grid container spacing={2}>
                                {
                                    getValues('images').map( img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia 
                                                    sx={{ mt: 2 }}
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ img }
                                                    alt={ img }
                                                />
                                                <CardActions>
                                                    <Button 
                                                        fullWidth 
                                                        color="error"
                                                        onClick={ () => onDeleteImage(img) }
                                                    >
                                                        Borrar
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AdminLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    
    const { slug = ''} = query;

    let product: IProduct | null;

    if( slug === 'new' ){
        //crear un producto
        const tempProduct = JSON.parse( JSON.stringify( new Product() ) );
        delete tempProduct._id; //Elimino el id por defecto que se crea en el nuevo producto
        product = tempProduct;
    }else{
        product = await dbProducts.getProductBySlug(slug.toString());
    }
    

    if ( !product ) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }
    

    return {
        props: {
            product,
            slug
        }
    }
}


export default ProductAdminPage