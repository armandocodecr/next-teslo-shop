import { createContext } from 'react';

interface ContextProps {
     isMenuOpen: boolean;
     isDropdownOpen: boolean;

     // Methods
     toggleSideMenu: () => void
     toggleDropdownMenu: (state: boolean) => void
}

export const UiContext = createContext({} as ContextProps)