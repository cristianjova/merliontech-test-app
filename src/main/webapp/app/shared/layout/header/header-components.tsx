import React from 'react';
import { Translate } from 'react-jhipster';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import HomeIcon from '@material-ui/icons/Home';

import appConfig from 'app/config/constants';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo-jhipster.png" alt="Logo" />
  </div>
);

export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="brand-title">
      <Translate contentKey="global.title">Test</Translate>
    </span>
    <span className="navbar-version">{appConfig.VERSION}</span>
  </NavbarBrand>
);

export const Home = props => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
  <>
    {!isMobile ? (
      <>
        <Button component={Link} to="/" color="inherit" startIcon={<HomeIcon />}>
          <Translate contentKey="global.menu.home">Home</Translate>
        </Button>
      </>
    ) : (
      <>
        <Button component={Link} to="/" color="inherit" startIcon={<HomeIcon />} fullWidth>
          <Translate contentKey="global.menu.home">Home</Translate>
        </Button>
      </>
    )}
  </>
)};
