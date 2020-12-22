import React, { useState } from 'react'
import { hot } from 'react-hot-loader'
import getUserMedia from 'getusermedia'

import {
  EmptyLayout,
  Container,
  Row,
  Col,
  Alert,
  Button,
  Card,
} from '@/components'
import { isNil } from 'lodash'

const SpeechRecognition = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const startRecording = () =>
    getUserMedia({ video: false, audio: true }, function (err, stream) {
      if (err) {
        setErrorMessage(`Error: ${err.message || 'unknown error'}`)
      } else {
        setErrorMessage(null)
      }
    })

  return (
    <EmptyLayout className="bg-white">
      <Container className="w-50 mt-5">
        <Row>
          <Col>
            {errorMessage && (
              <Alert
                color="danger"
                isOpen={!isNil(errorMessage)}
                toggle={() => setErrorMessage(null)}
              >
                {errorMessage}
              </Alert>
            )}
          </Col>
        </Row>
        <Row>
          <Col className="h-50  mb-4 text-right" style={{ height: '200px' }}>
            <Card className="p-5" style={{ height: '200px' }}>
              <h4> مرحبا بالعالم</h4>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              color="info"
              size="lg"
              block
              outline
              onClick={startRecording}
            >
              <i className="fa fa-fw fa-microphone"></i> Start Recording
            </Button>
          </Col>
        </Row>
      </Container>
    </EmptyLayout>
  )
}

export default hot(module)(SpeechRecognition)
