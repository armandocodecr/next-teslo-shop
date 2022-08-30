import { useEffect, useState } from 'react'
import { PeopleOutline } from '@mui/icons-material'
import { Grid, MenuItem, Select } from '@mui/material'

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import useSWR from 'swr'

import { AdminLayout } from '../../components/layouts'
import { IUser } from '../../interfaces'
import tesloApi from '../../api/tesloApi';

const UsersPage = () => {

    const { data, error } = useSWR<IUser[]>('/api/admin/users');
    const [ users, setUsers ] = useState<IUser[]>([]);

    useEffect(() => { //Esto lo hacemos para que cada que cambie la data el useEffect se ejecute y llene de nuevo el estado con el update
        //Esto evita que el usuario tenga que recargar la página para ver los cambios
      if( data ) {
        setUsers(data)
      }
    }, [data])
    

    if( !data && !error ) return (<></>);

    const onRoleUpdate = async( userId: string, newRole: string ) => {

        const previousUsers = users.map( user => ({ ...user }) ); //Copia de la información antes del cambio por si hay un error
        const updatedUsers = users.map( user => ({
            ...user,
            role: userId === user._id ? newRole : user.role
        }) );

        setUsers(updatedUsers);

        try {
            await tesloApi.put('/admin/users', { userId, role: newRole }) //Esos dos parametros ya que es lo que pide el API
        } catch (error) {
            setUsers(previousUsers);
            console.log(error);
            alert('No se pudo actualizar el role del usuario')
        } 

    }

    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Correo', width: 250 },
        { field: 'name', headerName: 'Nombre completo', width: 300 },
        { 
            field: 'role', 
            headerName: 'Rol', 
            width: 300 ,
            renderCell: ({ row }: GridValueGetterParams) => {
                return (
                    <Select
                        value={ row.role }
                        label="Rol"
                        onChange={ ({ target }) => onRoleUpdate( row.id, target.value ) }
                        sx={{ width: '300px' }}
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="client">Client</MenuItem>
                        <MenuItem value="super-user">Super-user</MenuItem>
                        <MenuItem value="SEO">SEO</MenuItem>
                    </Select>
                )
            }
        },
    ];

    const rows = users.map( user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }) )

  return (
    <AdminLayout
        title='Usuarios'
        subTitle='Mantenimiento de usuarios'
        icon={ <PeopleOutline /> }
    >

        <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid 
                        rows={ rows }
                        columns={ columns }
                        pageSize={ 10 }
                        rowsPerPageOptions={ [10] }

                    />
            </Grid>
        </Grid>

    </AdminLayout>
  )
}

export default UsersPage