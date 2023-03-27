import { useContext, useState } from "react";

import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined, DashboardOutlined } from '@mui/icons-material';

import { AuthContext, UiContext } from "../../context"
import { useRouter } from 'next/router';



export const SideMenu = () => {

    const router = useRouter();
    const { isMenuOpen, toggleSideMenu } = useContext( UiContext );
    const { isLoggedIn, user, logout } = useContext( AuthContext );
    const [searchTerm, setSearchTerm] = useState('')


    const onSearchTerm = () => {
        if ( searchTerm.trim().length === 0 ) return;

        navigateTo(`/search/${ searchTerm }`)
    }

    const navigateTo = ( url: string ) => {
        toggleSideMenu();
        router.push(url);
    }


  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 1s ease-out' }}
        onClose={ toggleSideMenu }
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                        autoFocus
                        value={ searchTerm }
                        onChange={ (e) => setSearchTerm( e.target.value ) }
                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                        type='text'
                        placeholder="Search..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={ onSearchTerm }
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                {
                    isLoggedIn && (
                        <div>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircleOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Profile'} />
                            </ListItem>

                            <ListItem button onClick={() => navigateTo('/orders/history')}>
                                <ListItemIcon >
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'My orders'} />
                            </ListItem>
                        </div>
                    )
                }


                <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={ () => navigateTo('/category/men') }>
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Men'} />
                </ListItem>

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={ () => navigateTo('/category/women') }>
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Women'} />
                </ListItem>

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={ () => navigateTo('/category/kid') }>
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Kids'} />
                </ListItem>


                {
                    !isLoggedIn 
                    ? (
                        <ListItem button onClick={ () => navigateTo(`/auth/login?p=${ router.asPath }`) }>
                            {/* Esto se hace para saber en qué pagina estaba la persona al cerrar sección, para que cuando e vuelva logear aparezca en la misma. */}
                            <ListItemIcon>
                                <VpnKeyOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Join'} />
                        </ListItem>
                    )
                    : (
                        <ListItem button onClick={ logout }>
                            <ListItemIcon>
                                <LoginOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Exit'} />
                        </ListItem>
                    )
                }


                {/* Admin */}
                {
                    user?.role === "admin" && (
                        <div>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItem 
                                button
                                onClick={ () => navigateTo('/admin/') }>
                                <ListItemIcon>
                                    <DashboardOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Dashboard'} />
                            </ListItem>

                            <ListItem 
                                button
                                onClick={ () => navigateTo('/admin/products')}
                            >
                                <ListItemIcon>
                                    <CategoryOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Products'} />
                            </ListItem>

                            <ListItem 
                                button 
                                onClick={ () => navigateTo('/admin/orders') }
                            >
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Orders'} />
                            </ListItem>

                            <ListItem 
                            button
                            onClick={ () => navigateTo('/admin/users') }
                            >
                                <ListItemIcon>
                                    <AdminPanelSettings/>
                                </ListItemIcon>
                                <ListItemText primary={'Users'} />
                            </ListItem>
                        </div>
                    )
                }
            </List>
        </Box>
    </Drawer>
  )
}
