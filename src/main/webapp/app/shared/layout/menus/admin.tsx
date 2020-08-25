import React, { useState } from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';
import { Translate, translate } from 'react-jhipster';
import { Button, Menu, MenuItem as MenuItemMat } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleIcon from '@material-ui/icons/People';
import AssessmentIcon from '@material-ui/icons/Assessment';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import SettingsIcon from '@material-ui/icons/Settings';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import BookIcon from '@material-ui/icons/Book';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";


export const AdminMenu = ({ showSwagger }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const adminMenuItems = (
    <span>
      <MenuItemMat component={Link} to="/admin/user-management" onClick={handleClose}>
        <PeopleIcon fontSize="small"/>&#8199;
        <Translate contentKey="global.menu.admin.userManagement">User management</Translate>
      </MenuItemMat>
      <MenuItemMat component={Link} to="/admin/metrics" onClick={handleClose}>
        <AssessmentIcon fontSize="small"/>&#8199;
        <Translate contentKey="global.menu.admin.metrics">Metrics</Translate>
      </MenuItemMat>
      <MenuItemMat component={Link} to="/admin/health" onClick={handleClose}>
        <LocalHospitalIcon fontSize="small"/>&#8199;
          <Translate contentKey="global.menu.admin.health">Health</Translate>
      </MenuItemMat>
      <MenuItemMat component={Link} to="/admin/configuration" onClick={handleClose}>
        <SettingsIcon fontSize="small"/>&#8199;
        <Translate contentKey="global.menu.admin.configuration">Configuration</Translate>
      </MenuItemMat>
      <MenuItemMat component={Link} to="/admin/audits" onClick={handleClose}>
        <VerifiedUserIcon fontSize="small"/>&#8199;
        <Translate contentKey="global.menu.admin.audits">Audits</Translate>
      </MenuItemMat>
      <MenuItemMat component={Link} to="/admin/logs" onClick={handleClose}>
        <PlaylistAddCheckIcon fontSize="small"/>&#8199;
        <Translate contentKey="global.menu.admin.logs">Logs</Translate>
      </MenuItemMat>
    </span>
  )

  const swaggerItem = (
      <MenuItemMat component={Link} to="/admin/apidocs" onClick={handleClose}>
        <BookIcon fontSize="small"/>&#8199;
        <Translate contentKey="global.menu.admin.apidocs">API</Translate>
      </MenuItemMat>
  );
  
  return(
    <>
      {isMobile ? (
        <>
          <Button
            aria-controls="admin-menu"
            aria-haspopup="true"
            startIcon={<PersonAddIcon />}
            color="inherit"
            onClick={handleClick}
            fullWidth
          >
            <Translate contentKey="global.menu.admin.main">
              Administration
            </Translate>
          </Button>
        </>
        ) : (
          <>
            <Button
              aria-controls="admin-menu"
              aria-haspopup="true"
              startIcon={<PersonAddIcon />}
              color="inherit"
              onClick={handleClick}
            >
              <Translate contentKey="global.menu.admin.main">
                Administration
              </Translate>
            </Button>
          </>
        )
      }
      <Menu
        id="admin-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {adminMenuItems}
        {showSwagger && swaggerItem}
      </Menu>
    </>
  )
};

export default AdminMenu;
