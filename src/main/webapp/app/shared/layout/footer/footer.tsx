import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';
import { Box, Typography } from '@material-ui/core';

const Footer = props => (
  <Box
    component="footer"
    display="flex"
    justifyContent="center"
    alignItems="center"
    p={2}
    bgcolor="primary.main"
    color="primary.contrastText"
  >
    <Typography>
      <Translate contentKey="footer">Your footer</Translate>
    </Typography>
  </Box>
);

export default Footer;
