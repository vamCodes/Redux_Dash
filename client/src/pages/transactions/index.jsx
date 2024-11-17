import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useGetTransactionsQuery } from '../../state/api';
import Header from '../../components/Header';
import { Box } from '@mui/material';
import DataGridCustomToolBar from "../../components/DataGrid" // Import correctly

const Transactions = () => {
    const [page, setPage] = useState(1); // Start from 1
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const { data, isLoading } = useGetTransactionsQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
    });

    const columns = [
        { field: "_id", headerName: "ID", flex: 1 },
        { field: "userId", headerName: "User ID", flex: 1 },
        { field: "createdAt", headerName: "Created At", flex: 1 },
        { 
            field: "products", 
            headerName: "# of Products", 
            flex: 0.5, 
            sortable: false, 
            renderCell: (params) => params.value.length 
        },
        { field: "occupation", headerName: "Occupation", flex: 1 },
        { 
            field: "cost", 
            headerName: "Cost", 
            flex: 1, 
            renderCell: (params) => `$${Number(params.value).toFixed(2)}` 
        },
    ];

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Transactions" subtitle="Entire List of Transactions..." />
            <Box height="80vh">
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={(data && data.transactions) || []}
                    columns={columns}
                    rowCount={(data && data.total) || 0}
                    pagination
                    page={page - 1} // Pass zero-based page to DataGrid
                    pageSize={pageSize}
                    paginationMode='server'
                    sortingMode='server'
                    onPageChange={(newPage) => setPage(newPage + 1)} // Adjust to 1-based
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSortModelChange={(newSortModel) => setSort(newSortModel[0])} // Use first sort model
                    slots={{
                        toolbar: DataGridCustomToolBar,
                    }}
                    slotProps={{
                        toolbar: {
                            searchInput,
                            setSearchInput,
                            setSearch
                        }
                    }}
                />
            </Box>
        </Box>
    );
};

export default Transactions;
