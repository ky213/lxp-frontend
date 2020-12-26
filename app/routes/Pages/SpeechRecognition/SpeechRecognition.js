import React, { useState, useEffect } from 'react'
import { hot } from 'react-hot-loader'
import { useReactMediaRecorder } from 'react-media-recorder'
import { isNil } from 'lodash'

import { speechService } from '@/services'
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
    mediaBlobUrl,
    error: recorderError,
  } = useReactMediaRecorder({
    audio: true,
  })
  const recording = status === 'recording'

  useEffect(() => {
    if (mediaBlobUrl) handleRecognition()
  }, [mediaBlobUrl])

  useEffect(() => {
    if (recorderError) setErrorMessage(recorderError)
  }, [recorderError])

  const getSpeechRecognition = async data => {
    try {
      setRecognizing(true)
      setRecognitionResult(null)

      const result = await speechService.recognizeSpeech(data, currentWord)

      setRecognitionResult(result)
      setRecognizing(false)
    } catch (error) {
      setRecognizing(false)
      setErrorMessage(error.message)
      setRecognitionResult(null)
    }
  }

  const handleRecognition = async () => {
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
          <Col
            className="h-50 my-4 position-relative"
            style={{ height: '200px' }}
          >
            <WordsSlide
              setCurrentWord={setCurrentWord}
              setRecognitionResult={setRecognitionResult}
            />
            <h3
              className="position-absolute text-center w-100 "
              style={{ bottom: '30px', left: '0' }}
            >
              {recognitionResult?.found &&
                recognitionResult?.transcription === currentWord && (
                  <span className="text-info">
                    <img
                      src="/static/very_good.png"
                      style={{ height: '52px', width: '166px' }}
                    />
                  </span>
                )}
              {recognitionResult &&
                recognitionResult.transcription !== currentWord && (
                  <span className="text-danger">
                    <img
                      src="/static/try_again.png"
                      style={{ height: '52px', width: '166px' }}
                    />
                  </span>
                )}
            </h3>
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
