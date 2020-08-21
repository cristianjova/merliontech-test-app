import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Box, Card, CardContent, CardActions, Grid, Typography, Hidden } from '@material-ui/core';
import { OutlinedInput, FormHelperText, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { TextField, Select} from 'formik-material-ui'
import { Button as ButtonMat, LinearProgress } from '@material-ui/core';
;
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISalesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}
import { State } from 'app/shared/model/enumerations/state.model';
interface Values {
  id: number;
  description: string;
  state: State;
  date: string;
}


export const SalesUpdate = (props: ISalesUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { salesEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/sales');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...salesEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };
  
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} md={8}>
        <Card variant="outlined">
          <Box bgcolor="primary.main" color="primary.contrastText" p={1}>
            <Typography variant="h4" component="h1">
              <Translate contentKey="testApp.sales.home.createOrEditLabel">
                Create or edit a Sales
              </Translate>
            </Typography>
          </Box>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={1}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Formik
              initialValues={
                isNew
                  ? {
                      description: '',
                      state: 'IN_CHARGE',
                      date: new Date(),
                    }
                  : {
                      id: salesEntity.id,
                      description: salesEntity.description,
                      state: salesEntity.state,
                      date: salesEntity.date,
                    }
              }
              onSubmit={(values: Values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  const entity = {
                    ...salesEntity,
                    ...values,
                  };

                  if (isNew) {
                    props.createEntity(entity);
                  } else {
                    props.updateEntity(entity);
                  }
                  // alert(JSON.stringify(values, null, 2));
                }, 500);
              }}
            >
              {({ submitForm, isSubmitting }) => (
                <Form>
                  <CardContent>
                    {!isNew && (
                      <Box mb={2}>
                        <Field
                          component={TextField}
                          variant="outlined"
                          fullWidth
                          label={
                            <Translate contentKey="global.field.id">
                              ID
                            </Translate>
                          }
                          name="id"
                          id="sales-id"
                          type="text"
                          disabled
                          required
                        />
                      </Box>
                    )}
                    <Box mb={2}>
                      <Field
                        component={TextField}
                        variant="outlined"
                        fullWidth
                        label={
                          <Translate contentKey="testApp.sales.description">
                            Description
                          </Translate>
                        }
                        name="description"
                        id="sales-description"
                        type="text"
                        required
                      />
                    </Box>
                    <Box mb={2}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel id="sales-state-label">
                          <Translate contentKey="testApp.sales.state">
                            State
                          </Translate>
                        </InputLabel>
                        <Field
                          component={Select}
                          name="state"
                          inputProps={{
                            id: 'sales-state',
                          }}
                          labelId="sales-state-label"
                          label={
                            <Translate contentKey="testApp.sales.state">
                              State
                            </Translate>
                          }
                        >
                          <MenuItem value={'IN_CHARGE'}>
                            {translate('testApp.State.IN_CHARGE')}
                          </MenuItem>
                          <MenuItem value="SHIPPED">
                            {translate('testApp.State.SHIPPED')}
                          </MenuItem>
                          <MenuItem value="DELIVERED">
                            {translate('testApp.State.DELIVERED')}
                          </MenuItem>
                        </Field>
                      </FormControl>
                    </Box>
                    <Box mb={2}>
                      <Field
                        component={TextField}
                        variant="outlined"
                        fullWidth
                        name="date"
                        id="sales-date"
                        label={
                          <Translate contentKey="testApp.sales.date">
                            Date
                          </Translate>
                        }
                        type="date" 
                        defaultValue="dd/mm/aaaa"
                        InputLabelProps={{ 
                          shrink: true,
                        }}
                      />
                    </Box>
                    {isSubmitting && <LinearProgress />}
                  </CardContent>
                  <CardActions>
                    <Hidden mdUp>
                      <Box width="100%">
                        <Box mb={1}>
                          <Link to="/sales">
                            <ButtonMat
                              variant="outlined"
                              fullWidth
                              startIcon={<ArrowBackIcon />}
                            >
                              <Translate contentKey="entity.action.back">
                                Back
                              </Translate>
                            </ButtonMat>
                          </Link>
                        </Box>
                        <Box mb={1}>
                          <ButtonMat
                            variant="outlined"
                            fullWidth
                            color="primary"
                            startIcon={<SaveIcon />}
                            onClick={submitForm}
                          >
                            <Translate contentKey="entity.action.save">
                              Save
                            </Translate>
                          </ButtonMat>
                        </Box>
                      </Box>
                    </Hidden>
                    <Hidden only={['xs', 'sm']}>
                      <Link to="/sales">
                        <ButtonMat
                          variant="outlined"
                          startIcon={<ArrowBackIcon />}
                        >
                          <Translate contentKey="entity.action.back">
                            Back
                          </Translate>
                        </ButtonMat>
                      </Link>
                      <ButtonMat
                        variant="outlined"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={submitForm}
                      >
                        <Translate contentKey="entity.action.save">
                          Save
                        </Translate>
                      </ButtonMat>
                    </Hidden>
                  </CardActions>
                </Form>
              )}
            </Formik>

            // <AvForm model={isNew ? {} : salesEntity} onSubmit={saveEntity}>
            //   {!isNew ? (
            //     <AvGroup>
            //       <Label for="sales-id">
            //         <Translate contentKey="global.field.id">ID</Translate>
            //       </Label>
            //       <AvInput
            //         id="sales-id"
            //         type="text"
            //         className="form-control"
            //         name="id"
            //         required
            //         readOnly
            //       />
            //     </AvGroup>
            //   ) : null}
            //   {/* <FormControl variant="outlined" fullWidth>
            //       <InputLabel htmlFor="sales-description">
            //         <Translate contentKey="testApp.sales.description">
            //           Description
            //         </Translate>
            //       </InputLabel>
            //       <OutlinedInput
            //         id="sales-description"
            //         name="description"
            //         label={
            //           <Translate contentKey="testApp.sales.description">
            //             Description
            //           </Translate>
            //         }
            //       />
            //     </FormControl> */}
            //   <TextField
            //     id="sales-description"
            //     name="description"
            //     label={
            //       <Translate contentKey="testApp.sales.description">
            //         Description
            //       </Translate>
            //     }
            //     variant="outlined"
            //   />
            //   {/* <AvGroup>
            //     <Label id="descriptionLabel" for="sales-description">
            //       <Translate contentKey="testApp.sales.description">
            //         Description
            //       </Translate>
            //     </Label>
            //     <AvField
            //       id="sales-description"
            //       type="text"
            //       name="description"
            //     />
            //   </AvGroup> */}
            //   <AvGroup>
            //     <Label id="stateLabel" for="sales-state">
            //       <Translate contentKey="testApp.sales.state">
            //         State
            //       </Translate>
            //     </Label>
            //     <AvInput
            //       id="sales-state"
            //       type="select"
            //       className="form-control"
            //       name="state"
            //       value={(!isNew && salesEntity.state) || 'IN_CHARGE'}
            //     >
            //       <option value="IN_CHARGE">
            //         {translate('testApp.State.IN_CHARGE')}
            //       </option>
            //       <option value="SHIPPED">
            //         {translate('testApp.State.SHIPPED')}
            //       </option>
            //       <option value="DELIVERED">
            //         {translate('testApp.State.DELIVERED')}
            //       </option>
            //     </AvInput>
            //   </AvGroup>
            //   <AvGroup>
            //     <Label id="dateLabel" for="sales-date">
            //       <Translate contentKey="testApp.sales.date">Date</Translate>
            //     </Label>
            //     <AvField
            //       id="sales-date"
            //       type="date"
            //       className="form-control"
            //       name="date"
            //     />
            //   </AvGroup>
            //   <Button
            //     tag={Link}
            //     id="cancel-save"
            //     to="/sales"
            //     replace
            //     color="info"
            //   >
            //     <FontAwesomeIcon icon="arrow-left" />
            //     &nbsp;
            //     <span className="d-none d-md-inline">
            //       <Translate contentKey="entity.action.back">Back</Translate>
            //     </span>
            //   </Button>
            //   &nbsp;
            //   <Button
            //     color="primary"
            //     id="save-entity"
            //     type="submit"
            //     disabled={updating}
            //   >
            //     <FontAwesomeIcon icon="save" />
            //     &nbsp;
            //     <Translate contentKey="entity.action.save">Save</Translate>
            //   </Button>
            // </AvForm>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  salesEntity: storeState.sales.entity,
  loading: storeState.sales.loading,
  updating: storeState.sales.updating,
  updateSuccess: storeState.sales.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalesUpdate);
