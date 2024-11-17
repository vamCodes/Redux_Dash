import React, { useState } from 'react'
import { Box, useTheme } from '@mui/material';
import { useGetPerformanceQuery } from '../../state/api';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import Header from "../../components/Header"
import CustomColumnMenu from "../../components/DataGridCustomColumnMenu"

const Performance = () => {
  const theme = useTheme();
  const userId =  useSelector((state) => state.global.userId);

  const {data,isLoading}  = useGetPerformanceQuery(userId);
   console.log(data)
   const columns = [
    {
        field: "_id",
        headerName: "ID",
        flex: 1,
   },
   {
    field: "userId",
    headerName: "User ID",
    flex: 1,
},
{
field: "createdAt",
headerName: "createdAt",
flex: 1,
},
{
    field: "products",
    headerName: "# of Products",
    flex: 0.5,
    sortable: false,
renderCell: (params) => {
    return params.value.length;
    // Explanation:
    // $1 - The first group captures the first 3 digits
    // $2 - The second group captures the next 3 digits
    // $3 - The third group captures the last 4 digits
}
}
,
{
field: "cost",
headerName: "Cost",
flex: 1,
renderCell: (params) => {
   `$${Number(params.value).toFixed(2)}`
   
   }
   }
]
  return (
    <Box m="1.5rem 2.5rem">
    <Header title="Performance" subtitle="Track your affiliate sales performance here"   />
    <Box mt="40px"
    height="75vh"
 //    sx = {{
 //     "& .MuiDataGrid-root" :{
 //         border: "none"
 //     },
 //     "& .MuiDataGrid-cell" :{
 //         border: "none"
 //     },"& .MuiDataGrid-columnHeaders" :{
 //         backgroundColor: theme.palette.background.alt,
 //         color: theme.palette.secondary[100],
 //         borderBottom: "none",
 //     },"& .MuiDataGrid-virtualScroller" :{
 //      backgroundColor: theme.palette.primary.light    
 //     },"& .MuiDataGrid-footerContainer" :{
 //         backgroundColor: theme.palette.background.alt,
 //         color : theme.palette.secondary[100],
 //         borderBottom: "none"
 //     }
 //     ,"& .MuiDataGrid-toolContainer .MuiButton-text" :{
 //         color: `${theme.palette.secondary[200]} !important`,
 //     }
 //    }}

    >
        <DataGrid
        loading = {isLoading|| !data}
        getRowId={(row) => row._id}
        rows={(data && data.sales) || []}
        columns={columns}
         components = {{
          ColumnMenu : CustomColumnMenu
         }}
        
        />
    </Box>
 </Box>
  )
}

export default Performance;