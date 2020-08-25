import React, { useState, useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { IRootState } from 'app/shared/reducers';
import { handleRegister, reset } from './register.reducer';
import { Grid, Card, CardContent, CardActions, Button as ButtonMat, Box, Typography, Link as LinkMat, LinearProgress } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

export interface IRegisterProps extends StateProps, DispatchProps {}

interface Values {
  username: string;
  email: string;
  firstPassword: string;
  secondPassword: string;
}

export const RegisterPage = (props: IRegisterProps) => {

  useEffect(
    () => () => {
      props.reset();
    },
    []
  );

  return (
    <>
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} md={8}>
        <Card variant="outlined">
          <Box bgcolor="primary.main" color="primary.contrastText" p={1}>
            <Typography variant="h4" component="h1">
              <Translate contentKey="register.title">Registration</Translate>
            </Typography>
          </Box>
          <Formik
            initialValues= {{
              username: '',
              email: '',
              firstPassword: '',
              secondPassword: '',
            }}

            validate={values => {
              const errors: Partial<Values> = {};
              if (!values.username) {
                errors.username = translate('register.messages.validate.login.required');
              } else if (
                !/^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/i.test(values.username)
              ) {
                errors.username = translate('register.messages.validate.login.pattern');
              } else if(values.username.length < 1) {
                errors.username = translate('register.messages.validate.login.minlength');
              } else if(values.username.length > 50) {
                errors.username = translate('register.messages.validate.login.maxlength')
              }

              if (!values.email) {
                errors.email = translate('global.messages.validate.email.required')
              } else if(values.email.length < 5) {
                errors.email = translate('global.messages.validate.email.minlength');
              } else if(values.email.length > 254) {
                errors.email = translate('global.messages.validate.email.maxlength')
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }

              if (!values.firstPassword) {
                errors.firstPassword = translate('global.messages.validate.newpassword.required')
              } else if(values.firstPassword.length < 4) {
                errors.firstPassword = translate('global.messages.validate.newpassword.minlength');
              } else if(values.firstPassword.length > 54) {
                errors.firstPassword = translate('global.messages.validate.newpassword.maxlength')
              }

              if (!values.secondPassword) {
                errors.secondPassword = translate('global.messages.validate.confirmpassword.required')
              } else if(values.secondPassword.length < 4) {
                errors.secondPassword = translate('global.messages.validate.confirmpassword.minlength');
              } else if(values.secondPassword.length > 54) {
                errors.secondPassword = translate('global.messages.validate.confirmpassword.maxlength')
              } else if(values.secondPassword !== values.firstPassword) {
                errors.secondPassword = translate('global.messages.error.dontmatch')
              }

              return errors;
            }}

            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                const { username, email, firstPassword } = values;
                props.handleRegister(username, email, firstPassword,  props.currentLocale);
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
                      name="username"
                      variant="outlined"
                      label= {
                        translate('global.form.username.label')
                      }
                      type="text"
                      required
                    />
                  </Box>
                  <Box mb={2}>
                    <Field 
                      component={TextField}
                      fullWidth
                      name="email"
                      variant="outlined"
                      label= {
                        translate('global.form.email.label')
                      }
                      type="email"
                      required
                    />
                  </Box>
                  <Box mb={2}>
                    <Field 
                      component={TextField}
                      fullWidth
                      name="firstPassword"
                      variant="outlined"
                      label= {
                        translate('global.form.newpassword.label')
                      }
                      type="password"
                      required
                    />
                  </Box>
                  <Box mb={2}>
                    <PasswordStrengthBar password={values.firstPassword} />
                  </Box>
                  <Box mb={2}>
                    <Field 
                      component={TextField}
                      fullWidth
                      name="secondPassword"
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
                   <Translate contentKey="register.form.button">Register</Translate>
                  </ButtonMat>
                </CardContent>
              </Form>
              
            )}
          </Formik>
          <Box bgcolor="secondary.main" p={2}  mt={0} m={2} borderRadius="borderRadius" color="background.paper">
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
        </Card>
      </Grid>
    </Grid>
    </>
  );
};

const mapStateToProps = ({ locale }: IRootState) => ({
  currentLocale: locale.currentLocale,
});

const mapDispatchToProps = { handleRegister, reset };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
