import config from '@/config'
import { authHeader, handleResponse } from '@/helpers'

const routePrefix = `${config.apiUrl}/activities`

export const libraryService = {
  getAllFiles,
  addFile,
}

function getAllFiles(organizationId) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
  }

  return fetch(`${routePrefix}/allFiles/${organizationId}`, requestOptions)
    .then(handleResponse)
    .then(data => {
      return data
    })
}

function addFile(organizationId, fileData) {
  const formData = new FormData()
  formData.append('file', fileData.name)

  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader() },
    body: formData,
  }

  return fetch(`${routePrefix}/upload/${organizationId}`, requestOptions)
    .then(handleResponse)
    .then(data => {
      return data
    })
}
