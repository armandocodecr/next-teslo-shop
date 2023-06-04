import { createContext } from 'react';

interface ContextProps {
     isMenuOpen: boolean;
     isDropdownOpen: boolean;
     isDialogOpen: boolean;

     // Methods
     toggleSideMenu: () => void
     toggleDropdownMenu: (state: boolean) => void
     handleCloseDialog: () => void
}

export const UiContext = createContext({} as ContextProps)