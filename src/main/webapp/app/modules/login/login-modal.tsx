import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button as ButtonMat, FormControlLabel, Link as LinkMat, Typography, LinearProgress} from '@material-ui/core';
import { Formik, Form, Field} from 'formik';
import { TextField, Switch } from 'formik-material-ui'
import ErrorIcon from '@material-ui/icons/Error';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: Function;
  handleClose: Function;
}

interface Values {
  username: string;
  password: string;
  rememberMe: boolean
}

class LoginModal extends React.Component<ILoginModalProps>{
  handleSubmit = (event, errors, { username, password, rememberMe }) => {
    const { handleLogin } = this.props;
    handleLogin(username, password, rememberMe);
  };

  handleCloseDialog = () => {
    this.props.handleClose();
  };

  render() {
    const { loginError, handleClose } = this.props;

    return (
      <>
        <Box>
          <Dialog
            open={this.props.showModal}
            onClose={this.handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              <Translate contentKey="login.title">Sign in</Translate>
            </DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  rememberMe: false,
                }}
                validate={values => {
                  const errors: Partial<Values> = {};
                  if (!values.username) {
                    errors.username = 'Username cannot be empty!';
                  }
                  if (!values.password) {
                    errors.password = 'Password cannot be empty!';
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    setSubmitting(false);
                    const { username, password, rememberMe } = values;
                    this.props.handleLogin(username, password, rememberMe);
                  }, 500);
                }}
              >
                {({ submitForm, isSubmitting, errors }) => (
                  <Form>
                     {loginError ? (
                       <Box
                          display="flex"
                          alignItems="center"
                          bgcolor="error.main"
                          p={1}
                          mb={3}
                          borderRadius="borderRadius"
                          color="background.paper"
                        >
                        <ErrorIcon />&#8239;
                        <Translate contentKey="login.messages.error.authentication">
                          <strong>Failed to sign in!</strong> Please check your
                          credentials and try again.
                        </Translate>
                      </Box>
                      ) : null}
                    <Box mb={2}>
                      <Field
                        component={TextField}
                        variant="outlined"
                        fullWidth
                        label={translate('global.form.username.label')}
                        name="username"
                        type="text"
                        required
                      />
                    </Box>
                    <Box mb={2}>
                      <Field
                        component={TextField}
                        variant="outlined"
                        fullWidth
                        label={translate('login.form.password')}
                        name="password"
                        type="password"
                        required
                      />
                    </Box>
                    <Box>
                      <FormControlLabel
                        control={
                          <Field
                            component={Switch}
                            type="checkbox"
                            name="rememberMe"
                          />
                        }
                        label={
                          <Translate contentKey="login.form.rememberme">
                            Remember me
                          </Translate>
                        }
                      />
                    </Box>
                    {isSubmitting && <LinearProgress />}
                    <Box bgcolor="secondary.main" p={2}  mb={2} mt={2} borderRadius="borderRadius" color="background.paper">
                      <LinkMat color="textSecondary" component={Link} to="/account/reset/request">
                        <Translate contentKey="login.password.forgot">
                          Did you forget your password?
                        </Translate>
                      </LinkMat>
                    </Box>
                    <Box bgcolor="secondary.main" p={2}  mb={2} borderRadius="borderRadius" color="background.paper">
                      <Typography component="span">
                        <Translate contentKey="global.messages.info.register.noaccount">
                          You don&apos;t have an account yet?
                        </Translate>
                      </Typography>{' '}
                      <LinkMat color="textSecondary" component={Link} to="/account/register">
                        <Translate contentKey="global.messages.info.register.link">
                          Register a new account
                        </Translate>
                      </LinkMat>
                    </Box>
                    <DialogActions>
                      <ButtonMat
                        onClick={this.handleCloseDialog}
                        color="primary"
                      >
                        <Translate contentKey="entity.action.cancel">
                          Cancel
                        </Translate>
                      </ButtonMat>
                      <ButtonMat
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                      >
                        <Translate contentKey="login.form.button">
                          Sign in
                        </Translate>
                      </ButtonMat>
                    </DialogActions>
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        </Box>
      </>
    );
  }
}

export default LoginModal;
