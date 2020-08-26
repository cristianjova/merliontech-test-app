import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import { logout } from 'app/shared/reducers/authentication';
import { Box, Grid, Typography, Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export interface ILogoutProps extends StateProps, DispatchProps {
  idToken: string;
  logoutUrl: string;
}

export const Logout = (props: ILogoutProps) => {
  useLayoutEffect(() => {
    props.logout();
    const logoutUrl = props.logoutUrl;
    if (logoutUrl) {
      // if Keycloak, logoutUrl has protocol/openid-connect in it
      window.location.href = logoutUrl.includes('/protocol')
        ? logoutUrl + '?redirect_uri=' + window.location.origin
        : logoutUrl + '?id_token_hint=' + props.idToken + '&post_logout_redirect_uri=' + window.location.origin;
    }
  });

  return (
    <Box p={2}>
      <Typography variant="h3" component="h1" align="center">
        Logged out successfully!
      </Typography>
      <Grid container justify="center" alignItems="center">
        <Grid container justify="center" item xs={12} md={6}>
          <Button component={Link} to="/" color="primary" >
            <Translate contentKey="global.menu.home">Home</Translate>
          </Button>
          <Button component={Link} to="/login" color="primary" >
            <Translate contentKey="global.menu.account.login">Sign in</Translate>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  logoutUrl: storeState.authentication.logoutUrl,
  idToken: storeState.authentication.idToken,
});

const mapDispatchToProps = { logout };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
