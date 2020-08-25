import React, { useState } from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { NavLink as Link } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';
import { Button, Menu, MenuItem as MenuItemMat } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";


export const AccountMenu = ({ isAuthenticated = false }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const accountMenuItemsAuthenticated = (
    <span>
      <MenuItemMat component={Link} to="/account/settings" onClick={handleClose}>
        <SettingsApplicationsIcon fontSize="small"/>&#8199;
        <Translate contentKey="global.menu.account.settings">Settings</Translate>
      </MenuItemMat>
      <MenuItemMat component={Link} to="/account/password" onClick={handleClose}>
        <LockIcon fontSize="small"/>&#8199;
        <Translate contentKey="global.menu.account.password">Password</Translate>
      </MenuItemMat>
      <MenuItemMat component={Link} to="/logout" onClick={handleClose}>
        <ExitToAppIcon fontSize="small"/>&#8199;
        <Translate contentKey="global.menu.account.logout">Sign out</Translate>
      </MenuItemMat>
    </span>
  );

  const accountMenuItems = (
    <span>
      <MenuItemMat component={Link} to="/login" onClick={handleClose}>
        <Translate contentKey="global.menu.account.login">Sign in</Translate>
      </MenuItemMat>
      <MenuItemMat component={Link} to="account/register" onClick={handleClose}>
        <Translate contentKey="global.menu.account.register">Register</Translate>
      </MenuItemMat>
    </span>
  );

  return (
  <>
    {isMobile ? (
      <>
        <Button
          aria-controls="account-menu"
          aria-haspopup="true"
          startIcon={<PersonIcon />}
          color="inherit"
          onClick={handleClick}
          fullWidth
        >
          <Translate contentKey="global.menu.account.main">
            Account
          </Translate>
        </Button>
      </>
    ) : (
      <>
        <Button
          aria-controls="account-menu"
          aria-haspopup="true"
          startIcon={<PersonIcon />}
          color="inherit"
          onClick={handleClick}
        >
          <Translate contentKey="global.menu.account.main">
            Account
          </Translate>
        </Button>
      </>
      )
    }
    <Menu
      id="account-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
    {isAuthenticated
        ? accountMenuItemsAuthenticated
        : accountMenuItems}
    </Menu>
  </>
  )
};

export default AccountMenu;
