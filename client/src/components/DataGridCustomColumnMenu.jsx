import React from 'react';
import { GridColumnMenuContainer, GridColumnMenuHideItem } from '@mui/x-data-grid';

const CustomColumnMenu = ({ hideMenu, currentColumn, open }) => {
  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      open={open}
    >
      {/* You can add any filter component or logic here if needed */}
      {/* Example of a simple hide column menu item */}
      <GridColumnMenuHideItem onClick={hideMenu} column={currentColumn} />
    </GridColumnMenuContainer>
  );
}

export default CustomColumnMenu;
