import config from '@/config'
import { authHeader, handleResponse, buildQuery } from '@/helpers'
import { fn } from 'moment'

export const organizationService = {
  getAll,
  getById,
  update,
  create,
  deleteOrganizations,
  testMailServerConnection,
  sendEmail,
}

function getAll(pageId, recordsPerPage, filter) {
  const requestOptions = { method: 'GET', headers: authHeader() }
  let query = buildQuery({ pageId, recordsPerPage, filter })
  return fetch(`${config.apiUrl}/organizations?${query}`, requestOptions).then(
    handleResponse
  )
}

function getById(id) {
  const requestOptions = { method: 'GET', headers: authHeader() }
  return fetch(`${config.apiUrl}/organizations/${id}`, requestOptions).then(
    handleResponse
  )
}

function create(organization) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(organization),
  }

  return fetch(`${config.apiUrl}/organizations`, requestOptions)
    .then(handleResponse)
    .then(data => {
      return data
    })
}

function update(organization) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(organization),
  }

  return fetch(`${config.apiUrl}/organizations`, requestOptions)
    .then(handleResponse)
    .then(data => {
      return data
    })
}

function deleteOrganizations(organizations) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(organizations),
  }

  return fetch(`${config.apiUrl}/organizations`, requestOptions)
    .then(handleResponse)
    .then(data => {
      return data
    })
}

function testMailServerConnection(organization, serverSettings) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({ ...organization, ...serverSettings }),
  }

  return fetch(`${config.apiUrl}/organizations/testEmail`, requestOptions)
    .then(handleResponse)
    .then(data => {
      return data
    })
}

function sendEmail(id, email) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(email),
  }

  return fetch(`${config.apiUrl}/organizations/email/${id}`, requestOptions)
    .then(handleResponse)
    .then(data => {
      return data
    })
}
