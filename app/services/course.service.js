import config from '@/config'
import { authHeader, handleResponse, buildQuery } from '@/helpers'
const routePrefix = `${config.apiUrl}/courses`

export const courseService = {
  getAll,
  getById,
  getLearners,
  deleteCourses,
  getAllJoinedCourses,
  joinCourse,
  getAllUsersJoinedCourse,
  progressBreakdown,
  attemptedUsers,
  notAttemptedUsers,
  completedUsers,
  unjoinLearners,
}

function getAll(organizationId, programId, page, take, filter) {
  const requestOptions = { method: 'GET', headers: authHeader() }
  let query = buildQuery({ organizationId, programId, page, take, filter })
  return fetch(`${config.apiUrl}/courses?${query}`, requestOptions).then(
    handleResponse
  )
}

function getById(courseId, organizationId) {
  const requestOptions = { method: 'GET', headers: authHeader() }
  let query = buildQuery({ courseId, organizationId })
  return fetch(`${routePrefix}/getById?${query}`, requestOptions).then(
    handleResponse
  )
}

function getLearners(programId, courseId, organizationId, offset, pageSize) {
  const requestOptions = { method: 'GET', headers: authHeader() }
  let query = buildQuery({
    programId,
    courseId,
    organizationId,
    pageSize,
  })
  return fetch(
    `${routePrefix}/allCourseUsers?${query}&offset=${offset - 1}`,
    requestOptions
  ).then(handleResponse)
}

function deleteCourses(courseIds, organizationId) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({ courseIds, organizationId }),
  }

  return fetch(`${routePrefix}/deleteCourses`, requestOptions).then(
    handleResponse
  )
}

function getAllJoinedCourses(organizationId, page, take, filter) {
  const requestOptions = { method: 'GET', headers: authHeader() }
  let query = buildQuery({ organizationId, page, take, filter })
  return fetch(`${routePrefix}/allJoinedCourses?${query}`, requestOptions).then(
    handleResponse
  )
}

function joinCourse(courseId) {
  const requestOptions = { method: 'POST', headers: authHeader() }
  let query = buildQuery({ courseId })
  return fetch(`${routePrefix}/joinCourse?${query}`, requestOptions).then(
    handleResponse
  )
}

function getAllUsersJoinedCourse(organizationId, programId, courseId) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({ programId, organizationId, courseId }),
  }

  return fetch(
    `${config.apiUrl}/dashboards/distribution/progress`,
    requestOptions
  )
    .then(handleResponse)
    .then(data => {
      return data
    })
}

function progressBreakdown(courseId) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({ courseId }),
  }

  return fetch(
    `${config.apiUrl}/dashboards/distribution/breakdown`,
    requestOptions
  )
    .then(handleResponse)
    .then(data => {
      return data
    })
}

function attemptedUsers(organizationId, programId, courseId, offset, pageSize) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({
      organizationId,
      courseId,
      programId,
      offset,
      pageSize,
    }),
  }

  return fetch(
    `${config.apiUrl}/dashboards/distribution/progress/users/attempted`,
    requestOptions
  )
    .then(handleResponse)
    .then(data => {
      return data
    })
}

function notAttemptedUsers(
  organizationId,
  programId,
  courseId,
  offset,
  pageSize
) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({
      organizationId,
      courseId,
      programId,
      offset,
      pageSize,
    }),
  }

  return fetch(
    `${config.apiUrl}/dashboards/distribution/progress/users/not_attempted`,
    requestOptions
  )
    .then(handleResponse)
    .then(data => {
      return data
    })
}

function completedUsers(organizationId, programId, courseId, offset, pageSize) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({
      organizationId,
      courseId,
      programId,
      offset,
      pageSize,
    }),
  }

  return fetch(
    `${config.apiUrl}/dashboards/distribution/progress/users/completed`,
    requestOptions
  )
    .then(handleResponse)
    .then(data => {
      return data
    })
}

function unjoinLearners(courseId, learnersList) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(learnersList),
    headers: authHeader(),
  }
  let query = buildQuery({
    courseId,
  })
  return fetch(`${routePrefix}/unjoinCourse?${query}`, requestOptions).then(
    handleResponse
  )
}
