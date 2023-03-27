import { useContext, useState } from "react";
import { UiContext } from "../../context"
import NextLink from 'next/link'

import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material'
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { CartContext } from '../../context/cart/CartContext';

export const Navbar = () => {

    const { asPath, push } = useRouter();
    const { toggleSideMenu } = useContext( UiContext );
    const { numberOfItems} = useContext( CartContext )

    const [searchTerm, setSearchTerm] = useState('')
    const [isSearchVisible, setIsSearchVisible] = useState(false)

    const onSearchTerm = () => {
        if ( searchTerm.trim().length === 0 ) return;
        push(`/search/${ searchTerm }`);
    }


  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref legacyBehavior>
                <Link display='flex' alignItems='center'>
                    <Typography variant='h6'>Teslo |</Typography>
                    <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                </Link>
            </NextLink>

            <Box flex={ 1 } />

                <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
                    className='fadeIn'
                >
                    {/* En pantallas muy pequeñas (xs) no se va a mostrar */}
                    
                    <NextLink href='/category/men' passHref legacyBehavior>
                        <Link>
                            <Button color = { asPath === '/category/men' ? 'primary' : 'info' }>Men</Button>
                        </Link>
                    </NextLink>

                    <NextLink href='/category/women' passHref legacyBehavior>
                        <Link>
                            <Button color = { asPath === '/category/women' ? 'primary' : 'info' }>Women</Button>
                        </Link>
                    </NextLink>

                    <NextLink href='/category/kid' passHref legacyBehavior>
                        <Link>
                            <Button color = { asPath === '/category/kid' ? 'primary' : 'info' }>Kids</Button>
                        </Link>
                    </NextLink>

                </Box>

            <Box flex={ 1 } />

            {/* Pantallas grandes */}

            {
                isSearchVisible
                    ? (
                        <Input
                            sx={{ display: { xs: 'none', sm: 'flex' }}}
                            className="fadeIn"
                            value={ searchTerm }
                            autoFocus
                            onChange={ (e) => setSearchTerm( e.target.value ) }
                            onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={ () => setIsSearchVisible(false) }
                                    >
                                        <ClearOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    )
                    : (
                        <IconButton 
                            onClick={ () => setIsSearchVisible(true) }
                            className='fadeIn'
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                        >
                            <SearchOutlined />
                        </IconButton> 
                    )
            }


            {/* Pantallas pequeñas */}
            <IconButton
                sx={{ display: { xs: 'flex', sm: 'none' } }}
                onClick={ toggleSideMenu }
            >
                <SearchOutlined />
            </IconButton>

            <NextLink href='/cart' passHref legacyBehavior>
                <Link>
                    <IconButton>
                        <Badge badgeContent={ numberOfItems > 9 ? '+9' : numberOfItems } color="secondary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button onClick={ toggleSideMenu }>
                Menú
            </Button>

        </Toolbar>
    </AppBar>
  )
}
