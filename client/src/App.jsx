import { React, useMemo, useState } from 'react'
import { CssBaseline,ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material'
import { themeSettings } from './theme'
import { useSelector } from 'react-redux'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Dashboard from "./pages/dashboard"
import { BrowserRouter, Navigate } from 'react-router-dom'
import Layout from "./pages/layout"
import Products from "./pages/products"
import Customers from "./pages/customer"
import Transactions from "./pages/transactions"
import Geography from "./pages/geography"
import Overview from './pages/overview'
import Daily from './pages/daily'
import Monthly from './pages/monthly'
import BreakDown from './pages/breakdown'
import Admin from "./pages/admin"
import Performance from "./pages/performance"
function App() {
  // use Memo is used to memoise a value
  // we will encounter memoisation in dsa
const mode = useSelector((state) => state.global.mode);
const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* any route inside this component will have the parent component as the main layout component */}
        <Route element = {<Layout />} >
        <Route path ="/" element= {<Navigate to="/dashboard" replace />} />
        <Route path ="/dashboard" element= {<Dashboard />} />
        <Route path ="/products" element= {<Products />} />
        <Route path ="/customers" element= {<Customers />} />
        <Route path ="/transactions" element= {<Transactions />} />
        <Route path ="/geography" element = {<Geography />} />
        <Route path ="/overview" element = {<Overview />} />
        <Route path ="/daily" element = {<Daily />} />
        <Route path ="/monthly" element = {<Monthly />} />
        <Route path ="/breakdown" element = {<BreakDown />} />
        <Route path ="/admin" element = {<Admin />} />
        <Route path ="/performance" element = {<Performance />} />
       
        </Route>
      </Routes>
    </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
