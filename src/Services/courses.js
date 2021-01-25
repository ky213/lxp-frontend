import axios from 'axios';

import { buildQuery } from 'Utils/buildQuery';

export function getCourses(organizationId, programId, page, take, filter) {
  const query = buildQuery({ organizationId, programId, page, take, filter });

  return axios.get(`/courses?${query}`);
}

export function getJoinedCourses(organizationId, page, take, filter) {
  const query = buildQuery({ organizationId, page, take, filter });

  return axios.get(`/programs/currentUser?${query}`);
}
