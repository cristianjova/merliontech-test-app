import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';


import {TableContainer, Table, TableHead, TableBody, TableCell, TableRow, Hidden, Typography, Grid, Box, Button, IconButton} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { green, red } from '@material-ui/core/colors';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISalesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

const StyledTableCellColor = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    body: {
      padding: theme.spacing('10px', '6px')
    }
  }),
)(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


export const Sales = (props: ISalesProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { salesList, match, loading } = props;
  return (
    <div>
      <Box mb={2}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h3">
              <Translate contentKey="testApp.sales.home.title">Sales</Translate>
            </Typography>
          </Grid>
          <Grid container justify="flex-end" item xs={6}>
            <Button
              component={Link}
              to={`${match.url}/new`}
              variant="outlined"
              color="primary"
              startIcon={<AddCircleIcon />}
            >
              Sales
            </Button>
          </Grid>
        </Grid>
      </Box>
      {salesList && salesList.length > 0 ? (
        <TableContainer>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCellColor>
                  <Translate contentKey="global.field.id">ID</Translate>
                </StyledTableCellColor>
                <StyledTableCellColor align="center">
                  <Translate contentKey="testApp.sales.description">
                    Description
                  </Translate>
                </StyledTableCellColor>
                <Hidden xsDown>
                  <StyledTableCellColor align="center">
                    <Translate contentKey="testApp.sales.state">
                      State
                    </Translate>
                  </StyledTableCellColor>
                </Hidden>
                <Hidden xsDown>
                  <StyledTableCellColor align="center">
                    <Translate contentKey="testApp.sales.date">Date</Translate>
                  </StyledTableCellColor>
                </Hidden>
                <StyledTableCellColor align="center">
                  Actions
                </StyledTableCellColor>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesList.map(sale => (
                <StyledTableRow key={sale.id}>
                  <StyledTableCell component="th" scope="row">
                    {sale.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {sale.description}
                  </StyledTableCell>
                  <Hidden xsDown>
                    <StyledTableCell align="center">
                      {sale.state}
                    </StyledTableCell>
                  </Hidden>
                  <Hidden xsDown>
                    <StyledTableCell align="center">
                      {sale.date ? (
                        <TextFormat
                          type="date"
                          value={sale.date}
                          format={APP_LOCAL_DATE_FORMAT}
                        />
                      ) : null}
                    </StyledTableCell>
                  </Hidden>
                  <StyledTableCell align="center">
                    <Hidden mdUp>
                      <Button
                        fullWidth
                        size="small"
                        style={{ color: green[500] }}
                        component={Link}
                        to={`${match.url}/${sale.id}`}
                      >
                        <VisibilityIcon fontSize="small" />
                      </Button>
                      <Button
                        fullWidth
                        size="small"
                        component={Link}
                        to={`${match.url}/${sale.id}/edit`}
                      >
                        <CreateIcon />
                      </Button>
                      <Button
                        fullWidth
                        size="small"
                        style={{ color: red[500] }}
                        component={Link}
                        to={`${match.url}/${sale.id}/delete`}
                      >
                        <DeleteIcon />
                      </Button>
                    </Hidden>
                    <Hidden only={['xs', 'sm']}>
                      <IconButton
                        component={Link}
                        to={`${match.url}/${sale.id}`}
                      >
                        <VisibilityIcon
                          fontSize="small"
                          style={{ color: green[500] }}
                        />
                      </IconButton>
                      <IconButton
                        component={Link}
                        to={`${match.url}/${sale.id}/edit`}
                      >
                        <CreateIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        component={Link}
                        to={`${match.url}/${sale.id}/delete`}
                      >
                        <DeleteIcon
                          fontSize="small"
                          style={{ color: red[500] }}
                        />
                      </IconButton>
                    </Hidden>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" p={1}>
          <CircularProgress />
        </Box>
      ) : (
        <Box component='div' className="alert alert-warning">
          <Typography>
            <Translate contentKey="testApp.sales.home.notFound">
              No Sales found
            </Translate>
          </Typography>
        </Box>
      )}
    </div>
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesList: sales.entities,
  loading: sales.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
