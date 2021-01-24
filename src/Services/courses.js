import axios from 'axios';

export function getCourses(organizationId, page, take) {
  return axios.get(`/courses?organizationId=${organizationId}&page=${page}&take=${take}`);
}
