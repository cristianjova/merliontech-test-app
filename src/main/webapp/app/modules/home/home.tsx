import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Grid, Box, Typography, Link as LinkMat} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import logoMerlionTech from '../../../content/images/merlion_tech_logo.png';

import { IRootState } from 'app/shared/reducers';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Typography variant="h3" component="h2">
          <Translate contentKey="home.title">Welcome, Java Hipster!</Translate>
        </Typography>
        <Box component="p" fontSize="h6.fontSize" fontWeight={300}>
          <Translate contentKey="home.subtitle">
            This is your homepage
          </Translate>
        </Box>
        {account && account.login ? (
          <Box
            display="flex"
            alignItems="center"
            bgcolor="secondary.main"
            p={2}
            borderRadius="borderRadius"
            color="background.paper"
          >
            <CheckCircleOutlineIcon />&#8239;
            <Translate
              contentKey="home.logged.message"
              interpolate={{ username: account.login }}
            >
              You are logged in as user {account.login}.
            </Translate>
          </Box>
        ) : (
          <div>
            <Box bgcolor="secondary.main" p={2}  mb={2} borderRadius="borderRadius" color="background.paper">
              <Translate contentKey="global.messages.info.authenticated.prefix">
                If you want to{' '}
              </Translate>
              <LinkMat color="textSecondary" component={Link} to="/login">
                <Translate contentKey="global.messages.info.authenticated.link">
                  {' '}
                  sign in
                </Translate>
              </LinkMat>
              <Translate contentKey="global.messages.info.authenticated.suffix">
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and
                password=&quot;admin&quot;)
                <br />- User (login=&quot;user&quot; and
                password=&quot;user&quot;).
              </Translate>
            </Box>

            <Box bgcolor="secondary.main" p={2}  mb={2} borderRadius="borderRadius" color="background.paper">
              <Translate contentKey="global.messages.info.register.noaccount">
                You do not have an account yet?
              </Translate>
              &nbsp;
              <LinkMat color="textSecondary" component={Link} to="/account/register">
                <Translate contentKey="global.messages.info.register.link">
                  Register a new account
                </Translate>
              </LinkMat>
            </Box>
          </div>
        )}
        <p>
          <Translate contentKey="home.question">
            If you have any question on JHipster:
          </Translate>
        </p>

        <ul>
          <li>
            <a
              href="https://www.jhipster.tech/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Translate contentKey="home.link.homepage">
                JHipster homepage
              </Translate>
            </a>
          </li>
          <li>
            <a
              href="http://stackoverflow.com/tags/jhipster/info"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Translate contentKey="home.link.stackoverflow">
                JHipster on Stack Overflow
              </Translate>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/jhipster/generator-jhipster/issues?state=open"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Translate contentKey="home.link.bugtracker">
                JHipster bug tracker
              </Translate>
            </a>
          </li>
          <li>
            <a
              href="https://gitter.im/jhipster/generator-jhipster"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Translate contentKey="home.link.chat">
                JHipster public chat room
              </Translate>
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/jhipster"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Translate contentKey="home.link.follow">
                follow @jhipster on Twitter
              </Translate>
            </a>
          </li>
        </ul>

        <p>
          <Translate contentKey="home.like">
            If you like JHipster, do not forget to give us a star on
          </Translate>{' '}
          <a
            href="https://github.com/jhipster/generator-jhipster"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          !
        </p>
      </Grid>
      <Grid container justify="center" item xs={12} md={4}>
        <Grid item xs={9} md={12}>
          <Box>
            <img src={logoMerlionTech} alt="Logo Merlion Tech" width="100%"/>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
