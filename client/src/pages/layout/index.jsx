import React, {useState} from 'react'
import {Box, useMediaQuery} from "@mui/material"
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import NavBar from "../../components/NavBar"
import SideBar from '../../components/SideBar'
import { useGetUserQuery } from '../../state/api'

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)"); // gives a true or false boolean
  // mobile will give a false value and on web desktops will say yes
  const userId = useSelector((state) => state.global.userId);
  const [isSidebarOpen,setIsSidebarOpen] = useState(true);
  const {data} =useGetUserQuery(userId); 
  // // highlight asnd control alt l
  //  console.log('data', data);
// now we will send this data to our sidebar
  return (
    // describing the layout here
    // the main box wraps around everything
    // on larger screens this is displayed side by side and on smaller ones they happen to stack on top of one another.
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%" >
      <SideBar isNonMobile={isNonMobile} 
      // by the time it gets fetched we pass an empty object so that oour code does;nt work
      user = {data || {}}
      drawerWidth = "250px"
      isSidebarOpen = {isSidebarOpen}
      setIsSidebarOpen = {setIsSidebarOpen}
      />
      {/* The other box is rendered aside and it has navbar as the top component followed by the outlet */}
      <Box flexGrow={1}>
        <NavBar    isSidebarOpen = {isSidebarOpen}
        user = {data || {}}
      setIsSidebarOpen = {setIsSidebarOpen}/>
        {/* navbar will exist on every single page */}
        {/* When you define child routes in your routing configuration (for example, using Routes and Route), those child components will be rendered in place of the <Outlet />. */}
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout