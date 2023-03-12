import { FC, useReducer, useState } from 'react';
import {  UiContext,  uiReducer } from './'

export interface UiState {
    isMenuOpen: boolean
    isDropdownOpen: boolean
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

const  UI_INITIAL_STATE:  UiState = {
    isMenuOpen: false,
    isDropdownOpen: true
}

export const UiProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( uiReducer,  UI_INITIAL_STATE);

    const toggleSideMenu = () => {
        dispatch({ type: '[UI] - ToggleMenu' })
    }

    const toggleDropdownMenu = ( state: boolean ) =>{
        dispatch({ type: '[UI] - ToggleDropdownMenu', payload: state })
    }

    return (
       < UiContext.Provider value={{
           ...state,

           // Methods
           toggleSideMenu,
           toggleDropdownMenu
      }}>
          { children }
        </ UiContext.Provider>
    )
}