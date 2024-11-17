import React from 'react';
import { Search } from '@mui/icons-material';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { 
    GridToolbarContainer, 
    GridToolbarColumnsButton, 
    GridToolbarDensitySelector, 
    GridToolbarExport 
} from '@mui/x-data-grid';
import FlexBetween from './FlexBetween';

const DataGridCustomToolBar = ({ searchInput, setSearchInput, setSearch }) => {
    return (
        <GridToolbarContainer>
            <FlexBetween width="100%">
                <FlexBetween>
                    <GridToolbarColumnsButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                </FlexBetween>
                <TextField
                    label="Search..."
                    sx={{
                        mb: "0.5rem",
                        width: "15rem",
                    }}
                    onChange={(e) => setSearchInput(e.target.value)} // Update the search state
                    value={searchInput}
                    variant='standard'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() =>  {
                                        setSearch(searchInput);
                                        setSearchInput("");
                                    }}
                                >
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </FlexBetween>
        </GridToolbarContainer>
    );
};

export default DataGridCustomToolBar;
