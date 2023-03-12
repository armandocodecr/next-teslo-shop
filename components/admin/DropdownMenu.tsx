import { useContext } from 'react';
import { Box, Button, Menu, MenuItem } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Fade from '@mui/material/Fade';
import { useDropDownMenu } from "../../hooks";
import { UiContext } from "../../context";


export const DropdownMenu = () => {

    const { isDropdownOpen } = useContext(UiContext);
    const { open, anchorEl, handleClick, handleClose } = useDropDownMenu();

    return (
        <Box
            sx={{ mr: 2 }}
        >

            <Button
                id="fade-button"
                sx={{ fontSize: 15 }}
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                 { isDropdownOpen ? 'Actived' : 'Disabled' } <KeyboardArrowDownIcon />
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={() => handleClose(true)}>Active</MenuItem>
                <MenuItem onClick={() => handleClose(false)}>Disabled</MenuItem>
            </Menu>

        </Box>
    )

}