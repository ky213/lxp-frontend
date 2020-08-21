import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import {
  FormGroup,
  FormText,
  Input,
  CustomInput,
  Button,
  Label,
  EmptyLayout,
  Col,
  ThemeConsumer,
} from '@/components';

import { HeaderAuth } from '../../components/Pages/HeaderAuth';
import { FooterAuth } from '../../components/Pages/FooterAuth';
import { authenticationService } from '@/services';
import { AppStateContext } from '@/components/AppState';
import { LOGIN_USER_SUCCESS } from '@/actions';
import { Consumer } from '@/components/Theme/ThemeContext';

class Login extends React.Component {
  static contextType = AppStateContext;

  constructor(props) {
    super(props);

    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      this.props.history.push('/');
    }
  }

  render() {
    const [{ currentUser }, dispatch] = this.context;

    return (
      <EmptyLayout>
        <EmptyLayout.Section center>
          {/* START Header */}
          <HeaderAuth title="Sign In" />
          {/* END Header */}
          {/* START Form */}
          <Consumer>
            {(themeState) => (
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().required('Email is required'),
                  password: Yup.string().required('Password is required'),
                })}
                onSubmit={async (
                  { email, password },
                  { setStatus, setSubmitting }
                ) => {
                  setStatus();
                  try {
                    const user = await authenticationService.login(
                      email,
                      password
                    );
                    dispatch({ type: LOGIN_USER_SUCCESS, user });

                    themeState.onChangeTheme({
                      backgroundColor: user.user.organizationBackgroundColor,
                      foregroundColor: user.user.organizationForegroundColor,
                      organizationLogo: user.user.organizationLogo,
                      organizationName: user.user.organizationName,
                    });

                    const { from } = this.props.location.state || {
                      from: { pathname: '/' },
                    };
                    this.props.history.push(from);
                  } catch (error) {
                    setSubmitting(false);
                    setStatus(error);
                  }
                }}
                render={({ errors, status, touched, isSubmitting }) => (
                  <React.Fragment>
                    {status && (
                      <div className={'alert alert-danger'}>{status}</div>
                    )}
                    <Form className="mb-3">
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Field
                          type="text"
                          name="email"
                          id="email"
                          placeholder="Enter email address..."
                          className={
                            'bg-white form-control' +
                            (errors.email && touched.email ? ' is-invalid' : '')
                          }
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="password">Password</Label>
                        <Field
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Password..."
                          className={
                            'bg-white form-control' +
                            (errors.password && touched.password
                              ? ' is-invalid'
                              : '')
                          }
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup
                        className="mt-5 d-flex"
                        style={{ alignItems: 'center' }}
                      >
                        <button
                          type="submit"
                          className="btn btn-primary btn-block login__submit"
                          block
                          tag={Link}
                          to="/"
                          disabled={isSubmitting}
                        >
                          Sign In
                        </button>

                        <Link
                          to="/pages/forgot-password"
                          className="text-decoration-none login__forgot-password"
                        >
                          Forgot Password
                        </Link>
                      </FormGroup>
                    </Form>
                  </React.Fragment>
                )}
              />
            )}
          </Consumer>
          {/* END Form */}
          {/* START Bottom Links */}
          {/* END Bottom Links */}
          {/* START Footer */}
          <FooterAuth />
          {/* END Footer */}
        </EmptyLayout.Section>
      </EmptyLayout>
    );
  }
}

export default Login;
