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
} from './../../../components'
import { HeaderAuth } from '../../components/Pages/HeaderAuth'
import { FooterAuth } from '../../components/Pages/FooterAuth'
import { userService } from '@/services'

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const resetPassword = async event => {
    try {
      event.preventDefault()
      setLoading(true)
      await userService.sendPassResetRequest({ email: event.target[0].value })
      setLoading(false)
      setSuccess(true)
    } catch (error) {
      setSuccess(false)
      setLoading(false)
    }
  }

  return (
    <EmptyLayout>
      <EmptyLayout.Section center>
        <HeaderAuth
          title={
            !success
              ? 'Forgot Password'
              : 'Success, please check your email for instructions.'
          }
        />
        {!success && (
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
        )}
        <FooterAuth />
      </EmptyLayout.Section>
    </EmptyLayout>
  )
}

export default hot(module)(ForgotPassword)
