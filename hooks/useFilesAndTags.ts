import { ChangeEvent, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { IProduct } from '../interfaces';
import { tesloApi } from '../api';

export const useFilesAndTags = ( product: IProduct ) => {


    const [newTagValue, setNewTagValue] = useState('');
    const { register, handleSubmit, formState:{ errors }, getValues, setValue, control, watch } = useForm<IProduct>({
        //getValues nos devuelve lo que generó el form
        //watch nos permite oberservar los cambios ya sea en un input o un formulario como tal
        defaultValues: product
    })

    useEffect(() => {
        const subscription = watch(( value, { name, type } )  => {
            if( name === 'title' ) {
                const newSlug = value.title?.trim()
                            .replaceAll(' ', '_')
                            .replaceAll("'", '')
                            .toLocaleLowerCase() || '';

                setValue('slug', newSlug)
            }
        } )
    
      return () => subscription.unsubscribe(); //Utilizaremos este return para destruir el watch, ya que el siempre está escuchando aunque nos salgamos de la pantalla
        
    }, [watch, setValue]) //El watch hay ponerlo como dependencia aunque no cambie

    const onNewTag = () => {
        const newTag = newTagValue.trim().toLocaleLowerCase();
        setNewTagValue('');
        const tagsValue = getValues('tags');

        if( newTag === '' || tagsValue.includes(newTag) ){
            return;
        }

        setValue('tags', [ ...tagsValue, newTag ])

    }

    const onDeleteTag = ( tag: string ) => {
        const updatedTags = getValues('tags').filter( (val) => val !== tag );
        setValue('tags', updatedTags, { shouldValidate: true });
    }
    
    const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement> ) => {
        if( !target.files || target.files.length === 0 ){
            return;
        }
    
        try {
    
            for( const file of target.files ) {
                 const formData = new FormData();
                 formData.append('file', file);
                 const { data } = await tesloApi.post<{ message: string }>('/admin/upload', formData);
                 setValue( 'images', [...getValues('images'), data.message ], { shouldValidate: true } )
            }
    
        } catch (error) {
            console.log(error)
        }
    
    }
    
    const onDeleteImage = ( image: string ) => {
         setValue( 
            'images', getValues('images').filter( img => img !== image ),
            { shouldValidate: true }
          );
    }

    return {
        newTagValue,

        //Methods
        setNewTagValue,

        handleSubmit,
        register,
        control,
        errors,
        getValues,

        onDeleteImage,
        onFileSelected,

        onDeleteTag,
        onNewTag
    }
}
