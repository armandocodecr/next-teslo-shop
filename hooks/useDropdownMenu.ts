import { useState, useCallback, useContext } from 'react';
import { UiContext } from '../context';


export const useDropDownMenu = () => {

    const { toggleDropdownMenu } = useContext(UiContext);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = useCallback(( state: boolean ) => {
        setAnchorEl(null);
        toggleDropdownMenu(state);
    }, []);

    return {
        anchorEl,
        open,

        //Methods
        handleClick,
        handleClose
    }

}