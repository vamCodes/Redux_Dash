import React, { useState } from 'react'
import { LightModeOutlined,DarkModeOutlined,Menu as MenuIcon, Search,SettingsOutlined,ArrowDropDownOutlined } from '@mui/icons-material'
import FlexBetween from "../components/FlexBetween"
import { useDispatch } from 'react-redux'
import { AppBar, IconButton, InputBase, Toolbar,Menu, MenuItem, useMediaQuery, useTheme, Button, Box, Typography } from '@mui/material'
import { setMode } from '../state'
import ProfileImage from "../assets/picture.jpeg"
const NavBar = ({
  user,
  isSidebarOpen,
  setIsSidebarOpen,

}) => {
    const dispatch = useDispatch();
     const theme = useTheme();

     const  [anchorEl, setAnchorEl] = useState(null); 
     const isOpen = Boolean(anchorEl);
     const handleClick = (event) => setAnchorEl(event.currentTarget);
     const handleClose = (event) => setAnchorEl(null);

  return (
    <AppBar sx = {{position: "static",
        background: "none",
        boxShadow: "none",

    }}>
      {/* changing toolbars width is working somehow */}
    <Toolbar sx={{justifyContent:"space-between"}}>
      {/* Left side */}
        <FlexBetween>
          <IconButton  onClick={()=> setIsSidebarOpen(!isSidebarOpen)} >
            <MenuIcon sx={{marginLeft: -2}} />
          </IconButton>
          <FlexBetween 
          backgroundColor = {theme.palette.background.alt}
          borderRadius="9px"
          gap="3rem"
          p="0.1rem 1.5rem">
       <InputBase placeholder='Search...' />
       <IconButton>
        <Search />
       </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* Right side */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())} sx={{marginLeft: 2}}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{fontSize:"25px" }}/>) : (
           <LightModeOutlined sx={{fontSize: "25px"}} />
              )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{fontSize: "25px"}} />
          </IconButton>
          <FlexBetween>
            <Button onClick={handleClick} sx={{display : "flex", justifyContent: "space-between", alignItems: "center", textTransform: "none", gap: "1rem"}}>
            <Box component="img" alt="prrofileimg" src={ProfileImage} height="35px" width="35px" borderRadius="50%" sx={{objectFit: "cover"}} />
                                <Box textAlign="left">
                                <Typography
                                fontWeight="bold"
                                fontSize="0.9rem"
                                sx={{color: theme.palette.secondary[100]}}
                                >
                                    {user.name}

                                </Typography>
                                <Typography
                                fontSize="0.8rem"
                                sx={{color: theme.palette.secondary[200]}}
                                >
                                    {user.occupation}
                             </Typography>
                             </Box>
                             <ArrowDropDownOutlined
                             sx={{color: theme.palette.secondary[300], fontSize: "25px" }}

                             />
              </Button> 
              <Menu anchorEl= {anchorEl} open = {isOpen} onClose= {handleClose} anchorOrigin = {{vertical: "bottom", horizontal : "center"}} >
                 <MenuItem onClick= {handleClose}>Log Out</MenuItem>
                </Menu>
          </FlexBetween>
        </FlexBetween>
    </Toolbar>
    </AppBar>
  )
}

export default NavBar