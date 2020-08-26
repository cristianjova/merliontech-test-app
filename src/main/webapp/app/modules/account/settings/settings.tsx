import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { locales, languages } from 'app/config/translation';
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';
import { Grid, Card, CardContent, FormControl, InputLabel, MenuItem, Button as ButtonMat, Box, Typography, Link as LinkMat, LinearProgress } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField, Select} from 'formik-material-ui';

export interface IUserSettingsProps extends StateProps, DispatchProps {}

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  langKey: string;
}

export const SettingsPage = (props: IUserSettingsProps) => {
  useEffect(() => {
    props.getSession();
    return () => {
      props.reset();
    };
  }, []);


  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} md={8}>
        <Card variant="outlined">
          <Box bgcolor="primary.main" color="primary.contrastText" p={1}>
            <Typography variant="h4" component="h1">
              <Translate
                contentKey="settings.title"
                interpolate={{ username: props.account.login }}
              >
                User settings for {props.account.login}
              </Translate>
            </Typography>
          </Box>
          <Formik
            initialValues={{
              firstName: props.account.firstName,
              lastName: props.account.lastName,
              email: props.account.email,
              langKey: props.account.langKey,
            }}
            validate={values => {
              const errors: Partial<Values> = {};

              if (!values.firstName) {
                errors.firstName = translate(
                  'settings.messages.validate.firstname.required'
                );
              } else if (values.firstName.length < 1) {
                errors.firstName = translate(
                  'settings.messages.validate.firstname.minlength'
                );
              } else if (values.firstName.length > 50) {
                errors.firstName = translate(
                  'settings.messages.validate.firstname.maxlength'
                );
              }

              if (!values.lastName) {
                errors.lastName = translate(
                  'settings.messages.validate.lastname.required'
                );
              } else if (values.lastName.length < 1) {
                errors.lastName = translate(
                  'settings.messages.validate.lastname.minlength'
                );
              } else if (values.lastName.length > 50) {
                errors.lastName = translate(
                  'settings.messages.validate.lastname.maxlength'
                );
              }

              if (!values.email) {
                errors.email = translate(
                  'global.messages.validate.email.required'
                );
              } else if (values.email.length < 5) {
                errors.email = translate(
                  'global.messages.validate.email.minlength'
                );
              } else if (values.email.length > 254) {
                errors.email = translate(
                  'global.messages.validate.email.maxlength'
                );
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                const account = {
                  ...props.account,
                  ...values,
                };

                props.saveAccountSettings(account);
              }, 500);
            }}
          >
            {({ submitForm, isSubmitting, values }) => (
              <Form>
                <CardContent>
                  <Box mb={2}>
                    <Field
                      component={TextField}
                      fullWidth
                      name="firstName"
                      variant="outlined"
                      label={translate('settings.form.firstname')}
                      id="firstName"
                      type="text"
                      required
                    />
                  </Box>
                  <Box mb={2}>
                    <Field
                      component={TextField}
                      fullWidth
                      name="lastName"
                      variant="outlined"
                      label={translate('settings.form.lastname')}
                      id="lastName"
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
                      label={translate('global.form.email.label')}
                      id="email"
                      type="email"
                      required
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="sales-state-label">
                        <Translate contentKey="settings.form.language">
                          Language
                        </Translate>
                      </InputLabel>
                      <Field
                        component={Select}
                        name="langKey"
                        inputProps={{
                          id: 'lang-key',
                        }}
                        labelId="lang-key-label"
                        label={
                          <Translate contentKey="settings.form.language">
                            Language
                          </Translate>
                        }
                      >
                        {locales.map(locale => (
                          <MenuItem value={locale} key={locale}>
                            {languages[locale].name}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>
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
                    <Translate contentKey="settings.form.button">
                      Save
                    </Translate>
                  </ButtonMat>
                </CardContent>
              </Form>
            )}
          </Formik>
        </Card>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
});

const mapDispatchToProps = { getSession, saveAccountSettings, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
