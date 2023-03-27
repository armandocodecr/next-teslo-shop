import { PeopleOutline } from '@mui/icons-material'
import { Grid, MenuItem, Select } from '@mui/material'

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

import { AdminLayout } from '../../components/layouts'
import { useUsers } from '../../hooks'

const UsersPage = () => {

    const { users, data, error, onRoleUpdate } = useUsers();

    if( !data && !error ) return (<></>);

    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'name', headerName: 'Name', width: 300 },
        { 
            field: 'role', 
            headerName: 'Role', 
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
        title='Users'
        subTitle='Users maintenance'
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