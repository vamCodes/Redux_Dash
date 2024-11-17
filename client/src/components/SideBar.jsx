import React, { useEffect, useState } from 'react';
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme ,Divider} from '@mui/material';
import { ChevronLeft, ChevronRightOutlined, HomeOutlined, ShoppingCartOutlined, Groups2Outlined, ReceiptLongOutlined, PublicOutlined, PointOfSaleOutlined, TodayOutlined, CalendarMonthOutlined, AdminPanelSettingsOutlined, TrendingUpOutlined, PieChartOutlined, SettingsOutlined } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import ProfileImage from "../assets/picture.jpeg"

const navItems = [
    { text: "Dashboard", icon: <HomeOutlined /> },
    { text: "Client Facing", icon: null },
    { text: "Products", icon: <ShoppingCartOutlined /> },
    { text: "Customers", icon: <Groups2Outlined /> },
    { text: "Transactions", icon: <ReceiptLongOutlined /> },
    { text: "Geography", icon: <PublicOutlined /> },
    { text: "Sales", icon: null },
    { text: "Overview", icon: <PointOfSaleOutlined /> },
    { text: "Daily", icon: <TodayOutlined /> },
    { text: "Monthly", icon: <CalendarMonthOutlined /> },
    { text: "Breakdown", icon: <PieChartOutlined /> },
    { text: "Management", icon: null },
    { text: "Admin", icon: <AdminPanelSettingsOutlined /> },
    { text: "Performance", icon: <TrendingUpOutlined /> },
];

const SideBar = ({user, drawerWidth, isNonMobile, isSidebarOpen, setIsSidebarOpen }) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    // Set active item based on current path
    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant='persistent'
                    anchor='left'
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth,
                        },
                    }}
                >
                    <Box width="100%">
                        <Box m="1rem 1.5rem 1rem 2rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant='h5' fontWeight="bold" sx={{marginLeft: 5, paddingTop: 1}}>
                                        VAMDASH 
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, icon }) => {
                                if (!icon) {
                                    return (
                                        <Typography key={text} sx={{ m: "1rem 0rem 0.5rem 2rem", fontSize: "0.9rem" }}>
                                            {text}
                                        </Typography>
                                    );
                                }
                                const lcText = text.toLowerCase();
                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/${lcText}`);
                                                setActive(lcText);
                                            }}
                                            sx={{
                                                backgroundColor: active === lcText ? theme.palette.secondary[300] : "transparent",
                                                color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[200],
                                                padding: '0.25rem 0.5rem', // Smaller padding
                                            }}
                                        >
                                            <ListItemIcon sx={{
                                                ml: "0.5rem", // Smaller margin-left for icon
                                                color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[200],
                                            }}>
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} sx={{
                                                typography: "body2",
                                                fontSize: "0.7rem",
                                                paddingLeft: '0.25rem', // Smaller padding for text
                                                paddingRight: '0.25rem', // Smaller padding for text
                                            }} />
                                            {active === lcText && (
                                                <ChevronRightOutlined sx={{ ml: "auto" }} />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                    <Box position="absolute" bottom="2rem">
                        <Divider />
                        <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0rem 3rem">
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
                                <SettingsOutlined
                                sx-={{color: theme.palette.secondary[300]}}
                                fontSize='25px'
                                >
                                    
                                </SettingsOutlined>


                           
                        </FlexBetween>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
}

export default SideBar;

