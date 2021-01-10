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
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(fileData),
  }

  return fetch(`${routePrefix}/upload/${organizationId}`, requestOptions)
    .then(handleResponse)
    .then(data => {
      return data
    })
}
