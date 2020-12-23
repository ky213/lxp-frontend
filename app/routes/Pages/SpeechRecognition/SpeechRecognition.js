import React, { useState } from 'react'
import { hot } from 'react-hot-loader'
import getUserMedia from 'getusermedia'
import { ReactMediaRecorder } from 'react-media-recorder'

import {
  EmptyLayout,
  Container,
  Row,
  Col,
  Alert,
  Button,
  Card,
  Loading,
} from '@/components'
import { isNil } from 'lodash'

const SpeechRecognition = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [recognizing, setRecognizing] = useState(false)
  const [recognitionResult, setRecognitionResult] = useState(null)

  const getSpeechRecognition = async data => {
    try {
      setRecognizing(true)

      const response = await fetch(
        'https://speech.googleapis.com/v1/speech:recognize',
        {
          method: 'POST',
          headers: {
            Authorization:
              'Bearer ya29.a0AfH6SMCgEwe1CwnfZOsf-blH7uzR360N2WPDSji8i2u5pOE3Txqx0lApJ71cPJzU4k8-k2S7ILFjI-hVKNBMDlO4BhNw17atdoENOWYVn1mwaw0JetzcFPcVnPo6M5TPhs_BRhGloaasU_hvmHYbUtHzHZ33W309zKvf53EpWYqscg',
          },
          body: data,
        }
      )
      const result = await response.json()

      console.log(result)
      if (result.error) setErrorMessage('error performing recognition')
      else setRecognitionResult(result)
      setRecognizing(false)
    } catch (error) {
      setRecognizing(false)
      setErrorMessage(error.message)
    }
  }

  const handleRecognition = async mediaBlobUrl => {
    const reader = new FileReader()
    const response = await fetch(mediaBlobUrl)
    const blob = await response.blob()

    reader.readAsDataURL(blob)
    reader.onloadend = function () {
      const base64data = reader.result.split(',')[1]
      getSpeechRecognition(base64data)
    }
  }

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
                Error: {errorMessage}
              </Alert>
            )}
          </Col>
        </Row>
        <Row>
          <Col className="h-50  mb-4 text-right" style={{ height: '200px' }}>
            <Card className="p-5" style={{ height: '200px' }}>
              <h1 className="text-center"> مرحبا </h1>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <ReactMediaRecorder
              audio
              render={({
                status,
                startRecording,
                stopRecording,
                mediaBlobUrl,
                error,
              }) => {
                const recording = status === 'recording'
                console.log('HERE???????????????????????')
                if (status === 'stopped') handleRecognition(mediaBlobUrl)

                if (error) setErrorMessage(error)

                return (
                  <Row>
                    <Col>
                      <Button
                        color={`${recording ? 'danger' : 'info'}`}
                        size="lg"
                        block
                        outline={!recording}
                        disabled={recognizing}
                        onClick={() => {
                          if (['idle', 'stopped'].includes(status))
                            startRecording()
                          else {
                            stopRecording()
                          }
                        }}
                      >
                        {recognizing ? (
                          <Loading small />
                        ) : (
                          <>
                            <i
                              className={`fa fa-fw fa-${
                                recording ? 'stop' : 'microphone'
                              }`}
                            ></i>
                            <span>
                              {recording ? 'Stop Recording' : 'Start Recording'}
                            </span>
                          </>
                        )}
                      </Button>
                    </Col>
                    <audio
                      src={mediaBlobUrl}
                      controls
                      autoplay
                      loop
                      style={{ maxHeight: '40px' }}
                    />
                  </Row>
                )
              }}
            />
          </Col>
        </Row>
      </Container>
    </EmptyLayout>
  )
}

export default hot(module)(SpeechRecognition)
