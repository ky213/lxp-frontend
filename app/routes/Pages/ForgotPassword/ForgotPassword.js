import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import {
  Form,
  FormGroup,
  FormText,
  Input,
  Button,
  Label,
  EmptyLayout,
  ThemeConsumer,
  Loading,
  Alert,
} from './../../../components'
import { HeaderAuth } from '../../components/Pages/HeaderAuth'
import { FooterAuth } from '../../components/Pages/FooterAuth'
import { userService } from '@/services'

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  const resetPassword = async event => {
    try {
      event.preventDefault()
      setLoading(true)
      await userService.sendPassResetRequest({ email: event.target[0].value })
      setLoading(false)
      setAlert({
        color: 'success',
        title: 'Success',
        message: 'Please check your email for furthr instructions',
      })
    } catch ({ error }) {
      setLoading(false)
      setAlert({
        color: 'danger',
        title: 'Error',
        message: `${error}`,
      })
    }
  }

  return (
    <EmptyLayout>
      <EmptyLayout.Section center>
        <HeaderAuth
          icon="check"
          iconClassName="text-success"
          title={'Forgot Password'}
        />
        {alert && (
          <Alert color={alert.color}>
            <h6 className="mb-1 alert-heading">{alert.title}</h6>
            {alert.message}
            <div className="mt-2 d-flex">
              <Button
                className="ml-auto"
                color={alert.color}
                onClick={() => setAlert(null)}
              >
                ok
              </Button>
            </div>
          </Alert>
        )}
        <Form className="mb-3" onSubmit={resetPassword}>
          <FormGroup>
            <Label for="emailAdress">Email Adress </Label>
            <Input
              type="email"
              name="email"
              id="emailAdress"
              placeholder="Enter..."
              className="bg-white"
            />
            <FormText color="muted">
              We'll never share your email with anyone else.
            </FormText>
          </FormGroup>
          <div className="d-flex">
            <ThemeConsumer>
              {() => (
                <Button
                  style={{
                    backgroundColor: ' #122c49',
                    borderColor: ' #122c49',
                  }}
                  className="align-self-center"
                  type="submit"
                >
                  {loading ? <Loading small /> : 'Reset Password'}
                </Button>
              )}
            </ThemeConsumer>
            <Link
              to="/"
              style={{ color: '#f2f7fe' }}
              className="align-self-center ml-auto pr-0 text-decoration-none"
            >
              <i className="fa fa-angle-left mr-2"></i> Back
            </Link>
          </div>
        </Form>
        <FooterAuth />
      </EmptyLayout.Section>
    </EmptyLayout>
  )
}

export default hot(module)(ForgotPassword)
