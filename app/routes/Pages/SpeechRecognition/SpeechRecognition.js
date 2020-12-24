import React, { useState, useEffect } from 'react'
import { hot } from 'react-hot-loader'
import { useReactMediaRecorder } from 'react-media-recorder'
import { isNil } from 'lodash'

import WordsSlide from './WordsSlide'
import {
  EmptyLayout,
  Container,
  Row,
  Col,
  Alert,
  Button,
  Loading,
} from '@/components'

const SpeechRecognition = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [recognizing, setRecognizing] = useState(false)
  const [recognitionResult, setRecognitionResult] = useState(null)
  const [currentWord, setCurrentWord] = useState('')
  const {
    status,
    startRecording,
    stopRecording,
    clearBlobUrl,
    mediaBlobUrl,
    error,
  } = useReactMediaRecorder({ audio: true })
  const recording = status === 'recording'

  useEffect(() => {
    if (status === 'stopped') handleRecognition(mediaBlobUrl)
  }, [status])

  if (error) setErrorMessage(error)

  const getSpeechRecognition = async data => {
    try {
      setRecognizing(true)

      const response = await fetch(
        'https://speech.googleapis.com/v1/speech:recognize',
        {
          method: 'POST',
          headers: {
            Authorization:
              'Bearer ya29.a0AfH6SMAZPgd8H5jgoPIPHPC2uJM9-5UaXp826ZSqkC9T7EfOiHU8_btRujvEtbJL8qtLkbGlBxi2MeJgm7ZgLOnOsLQwxR7rjJAD-TuEHjwfeChvIcDHfQt9xCK0Ka70R88u40na6cpDJ01ZbaAdy6t0F4GeUMw65yEBpT43Dq9jsg',
          },
          body: JSON.stringify({
            audio: {
              content: data,
            },
            config: {
              //enableAutomaticPunctuation: true,
              //enableSpeakerDiarization: true,
              audioChannelCount: 2,
              //enableSeparateRecognitionPerChannel: true,
              encoding: 'FLAC',
              sampleRateHertz: 48000,
              languageCode: 'ar-SA',
              model: 'default',
            },
          }),
        }
      )
      const result = await response.json()

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
      if (!recognizing) getSpeechRecognition(base64data)
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
            <WordsSlide setCurrentWord={setCurrentWord} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col>
                <Button
                  color={`${recording ? 'danger' : 'info'}`}
                  size="lg"
                  block
                  outline={!recording}
                  disabled={recognizing}
                  onClick={() => {
                    if (['idle', 'stopped'].includes(status)) startRecording()
                    else {
                      stopRecording()
                      clearBlobUrl()
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
                        {recording ? ' Stop Recording' : ' Start Recording'}
                      </span>
                    </>
                  )}
                </Button>
              </Col>
              <Col>
                <audio
                  src={mediaBlobUrl}
                  controls
                  autoplay
                  loop
                  style={{ maxHeight: '40px', width: '100%' }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </EmptyLayout>
  )
}

export default hot(module)(SpeechRecognition)
