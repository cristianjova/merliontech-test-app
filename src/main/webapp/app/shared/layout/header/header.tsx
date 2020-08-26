import './header.scss';

import React, { useState, useEffect } from 'react';
import { Translate, Storage } from 'react-jhipster';

import { NavLink as Link } from 'react-router-dom';
import { withRouter, useLocation } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from '../menus';
import { AppBar, Toolbar, Button, Menu, MenuItem, Box, Drawer, List, ListItem } from '@material-ui/core';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    offset: theme.mixins.toolbar,
    list: {
      width: 250,
    }
  }),
);


export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false);
  }, [location])

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    props.onLocaleChange(langKey);
  };

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */
  const classes = useStyles();
  return (
    <div id="app-header">
      {renderDevRibbon()}
      <LoadingBar className="loading-bar" />
      <AppBar position="fixed">
        <Toolbar className={classes.root}>
          {isMobile ? (
            <>
            <Brand />
            <Button color="inherit" aria-label="open-drawer" onClick={handleDrawerToggle}> 
              <MenuIcon />
            </Button>
            </>
          ) : (
            <>
              <Brand />
              <Box>
                <Home />
                {props.isAuthenticated && <EntitiesMenu />}
                {props.isAuthenticated && props.isAdmin && <AdminMenu showSwagger={props.isSwaggerEnabled} />}
                <AccountMenu isAuthenticated={props.isAuthenticated} />
              </Box> 
            </>
          )}
          <Drawer variant="temporary" anchor='left' open={mobileOpen} onClose={handleDrawerToggle}>
            <List className={classes.list}>
              <ListItem>
                <Home />
              </ListItem>
              {props.isAuthenticated && (
                <ListItem>
                  <EntitiesMenu />
                </ListItem>
              )}
              {props.isAuthenticated && props.isAdmin && (
                <ListItem>
                  <AdminMenu showSwagger={props.isSwaggerEnabled} />
                </ListItem>
              )}
              <ListItem>
                <AccountMenu isAuthenticated={props.isAuthenticated}/>
              </ListItem>
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
      <div className={classes.offset}></div>
    </div>
  );
};

export default Header;
