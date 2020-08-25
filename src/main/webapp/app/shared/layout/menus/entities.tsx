import React, { useState } from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';
import { Button, Menu, MenuItem as MenuItemMat } from '@material-ui/core';
import ViewListIcon from '@material-ui/icons/ViewList';
import AdjustIcon from '@material-ui/icons/Adjust';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";

export const EntitiesMenu = props => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  return (
    <>
      {isMobile ? (
        <>
          <Button
            aria-controls="entities-menu"
            aria-haspopup="true"
            startIcon={<ViewListIcon />}
            color="inherit"
            onClick={handleClick}
            fullWidth
          >
            <Translate contentKey="global.menu.entities.main">
              Entities
            </Translate>
          </Button>
        </>
        ) : (
          <>
            <Button
              aria-controls="entities-menu"
              aria-haspopup="true"
              startIcon={<ViewListIcon />}
              color="inherit"
              onClick={handleClick}
            >
              <Translate contentKey="global.menu.entities.main">
                Entities
              </Translate>
            </Button>
          </>
        )
      }
      <Menu
        id="entities-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <span>
          <MenuItemMat component={Link} to="/sales" onClick={handleClose}>
            <AdjustIcon fontSize="small"/>&#8199;
            <Translate contentKey="global.menu.entities.sales" />
          </MenuItemMat>
        </span>
      </Menu>
  </>
)
};
