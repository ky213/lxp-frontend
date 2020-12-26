import config from '@/config'
import { authHeader, handleResponse, buildQuery } from '@/helpers'

const routePrefixUsers = `${config.apiUrl}/users`

export const speechService = {
  recognizeSpeech,
}

function recognizeSpeech(audioData, currentWord) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({ audioStream: audioData, textToCheck: currentWord }),
  }

  return fetch(`${routePrefixUsers}/speechToText`, requestOptions)
    .then(handleResponse)
    .then(data => {
      return data
    })
}
