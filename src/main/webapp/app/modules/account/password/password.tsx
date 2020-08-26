import React, { useState, useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Grid, Card, CardContent, CardActions, Button as ButtonMat, Box, Typography, Link as LinkMat, LinearProgress } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { savePassword, reset } from './password.reducer';

export interface IUserPasswordProps extends StateProps, DispatchProps {}

interface Values {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const PasswordPage = (props: IUserPasswordProps) => {

  useEffect(() => {
    props.reset();
    props.getSession();
    return () => {
      props.reset();
    };
  }, []);

  return (
    <>
     <Grid container justify="center" alignItems="center">
        <Grid item xs={12} md={8}>
          <Card variant="outlined">
            <Box bgcolor="primary.main" color="primary.contrastText" p={1}>
              <Typography variant="h4" component="h1">
                <Translate contentKey="password.title" interpolate={{ username: props.account.login }}>
                  Password for {props.account.login}
                </Translate>
              </Typography>
            </Box>
            <Formik
            initialValues= {{
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}

            validate={values => {
              const errors: Partial<Values> = {};
              if (!values.currentPassword) {
                errors.currentPassword = translate('global.messages.validate.newpassword.required');
              }

              if (!values.newPassword) {
                errors.newPassword = translate('global.messages.validate.newpassword.required')
              } else if(values.newPassword.length < 4) {
                errors.newPassword = translate('global.messages.validate.newpassword.minlength');
              } else if(values.newPassword.length > 54) {
                errors.newPassword = translate('global.messages.validate.newpassword.maxlength')
              }

              if (!values.confirmPassword) {
                errors.confirmPassword = translate('global.messages.validate.confirmpassword.required')
              } else if(values.confirmPassword.length < 4) {
                errors.confirmPassword = translate('global.messages.validate.confirmpassword.minlength');
              } else if(values.confirmPassword.length > 54) {
                errors.confirmPassword = translate('global.messages.validate.confirmpassword.maxlength')
              } else if(values.confirmPassword !== values.newPassword) {
                errors.confirmPassword = translate('global.messages.error.dontmatch')
              }

              return errors;
            }}

            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                const {currentPassword, newPassword} = values;
                props.savePassword( currentPassword, newPassword );
              }, 500);
            }}
          >
            {({ submitForm, isSubmitting, values}) => (
              <Form>
                <CardContent>
                  <Box mb={2}>
                    <Field 
                      component={TextField}
                      fullWidth
                      name="currentPassword"
                      variant="outlined"
                      label= {
                        translate('global.form.currentpassword.label')
                      }
                      type="password"
                      required
                    />
                  </Box>
                  <Box mb={2}>
                    <Field 
                      component={TextField}
                      fullWidth
                      name="newPassword"
                      variant="outlined"
                      label= {
                        translate('global.form.newpassword.label')
                      }
                      type="password"
                      required
                    />
                  </Box>
                  <Box mb={2}>
                    <PasswordStrengthBar password={values.newPassword} />
                  </Box>
                  <Box mb={2}>
                    <Field 
                      component={TextField}
                      fullWidth
                      name="confirmPassword"
                      variant="outlined"
                      label= {
                        translate('global.form.confirmpassword.label')
                      }
                      type="password"
                      required
                    />
                  </Box>
                  {isSubmitting && <LinearProgress />}
                </CardContent>
                <CardContent>
                  <ButtonMat
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    <Translate contentKey="password.form.button">Save</Translate>
                  </ButtonMat>
                </CardContent>
              </Form>
              
            )}
          </Formik>
          </Card>
        </Grid>
     </Grid>
    </>
  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
});

const mapDispatchToProps = { getSession, savePassword, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PasswordPage);
