import { FC, useReducer, useState } from 'react';
import {  UiContext,  uiReducer } from './'

export interface UiState {
    isMenuOpen: boolean
    isDropdownOpen: boolean,
    isDialogOpen: boolean
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

const  UI_INITIAL_STATE:  UiState = {
    isMenuOpen: false,
    isDropdownOpen: true,
    isDialogOpen: true,
}

export const UiProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( uiReducer,  UI_INITIAL_STATE);

    const toggleSideMenu = () => {
        dispatch({ type: '[UI] - ToggleMenu' })
    }

    const toggleDropdownMenu = ( state: boolean ) =>{
        dispatch({ type: '[UI] - ToggleDropdownMenu', payload: state })
    }

    const handleCloseDialog = () => {
        dispatch({ type: '[UI] - CloseDialog'})
    }

    return (
       < UiContext.Provider value={{
           ...state,

           // Methods
           toggleSideMenu,
           toggleDropdownMenu,
           handleCloseDialog
      }}>
          { children }
        </ UiContext.Provider>
    )
}