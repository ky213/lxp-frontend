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

let mediaRecorder
const SpeechRecognition = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [recording, setRecording] = useState(false)
  const [audioSrc, setAudioSrc] = useState('')

  const handleRecording = () => {
    if (!recording) {
      getUserMedia({ audio: true }, function (err, stream) {
        const chunks = []

        if (err) {
          setErrorMessage(`Error: ${err.message || 'unknown error'}`)
        } else {
          setRecording(true)
          setErrorMessage(null)
          mediaRecorder = new MediaRecorder(stream)
          mediaRecorder.ondataavailable = e => {
            chunks.push(e.data)
          }

          mediaRecorder.onStop = e => {
            const blob = new Blob(chunks, { type: 'audio/wav; codecs=opus' })
            const audioURL = URL.createObjectURL(blob)
            console.log('Stoped:', audioURL)
            setAudioSrc(audioURL)
          }
          mediaRecorder.start()
        }
      })
    } else {
      setRecording(false)
      mediaRecorder.stop()
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
          <audio src={audioSrc} controls></audio>
          <Col>
            <Button
              color={`${recording ? 'danger' : 'info'}`}
              size="lg"
              block
              outline={!recording}
              onClick={handleRecording}
            >
              <i
                className={`fa fa-fw fa-${recording ? 'stop' : 'microphone'}`}
              ></i>{' '}
              {recording ? 'Stop' : 'Start'} Recording
            </Button>
          </Col>
        </Row>
      </Container>
    </EmptyLayout>
  )
}

export default hot(module)(SpeechRecognition)
