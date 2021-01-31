import axios from 'axios';

import { buildQuery } from 'Utils/buildQuery';

export function getCourseLessons(organizationId, courseId) {
  const query = buildQuery({ organizationId, courseId });

  return axios.get(`/courses/lesson?${query}`);
}

export function getOneLesson(organizationId, lessonId) {
  const query = buildQuery({ organizationId, lessonId });

  return axios.get(`/courses/lesson?${query}`);
}

export function createLesson(lessonData) {
  return axios.post('/courses/lesson', lessonData);
}

export function updateLesson(lessonData) {
  return axios.put('/courses/lesson', lessonData);
}

export function deleteLesson(organizationId, lessonId) {
  const query = buildQuery({ organizationId, lessonId });

  return axios.delete(`/courses/lesson${query}`);
}
