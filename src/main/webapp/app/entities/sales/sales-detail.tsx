import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Card, CardActions, CardContent, Typography, Grid, Button as ButtonMat, Avatar } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    secondary: {
      color: theme.palette.getContrastText(theme.palette.secondary.main),
      backgroundColor: theme.palette.secondary.main,
      padding: theme.spacing(0, 1, 0)
    }
  }),
);

export interface ISalesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SalesDetail = (props: ISalesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const classes = useStyles();

  const { salesEntity } = props;
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="primary.main"
              border={1}
              borderColor="primary.main"
              p={1 / 2}
            >
              <Avatar className={classes.secondary}>{salesEntity.id}</Avatar>
            </Box>
            <CardContent>
              <Typography
                variant="h4"
                component="h1"
                color="textPrimary"
                align="center"
              >
                <Translate contentKey="testApp.sales.detail.title">
                  Sales
                </Translate>
              </Typography>
              <Typography variant="h6" component="h2">
                <Box fontWeight="fontWeightBold">
                  <Translate contentKey="testApp.sales.description">
                    Description
                  </Translate>
                </Box>
              </Typography>
              <Typography variant="body1" gutterBottom>
                {salesEntity.description}
              </Typography>
              <Typography variant="h6" component="h2">
                <Box fontWeight="fontWeightBold">
                  <Translate contentKey="testApp.sales.state">State</Translate>
                </Box>
              </Typography>
              <Typography variant="body1" gutterBottom>
                {salesEntity.state}
              </Typography>
              <Typography variant="h6" component="h2">
                <Box fontWeight="fontWeightBold">
                  <Translate contentKey="testApp.sales.date">Date</Translate>
                </Box>
              </Typography>
              <Typography variant="body1">
                {salesEntity.date ? (
                  <TextFormat
                    value={salesEntity.date}
                    type="date"
                    format={APP_LOCAL_DATE_FORMAT}
                  />
                ) : null}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/sales">
                <ButtonMat variant="outlined" startIcon={<ArrowBackIcon />}>
                  <Translate contentKey="entity.action.back">Back</Translate>
                </ButtonMat>
              </Link>
              <Link to={`/sales/${salesEntity.id}/edit`}>
                <ButtonMat variant="outlined" color="primary" startIcon={<EditIcon />}>
                  <Translate contentKey="entity.action.edit">Edit</Translate>
                </ButtonMat>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesEntity: sales.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalesDetail);
