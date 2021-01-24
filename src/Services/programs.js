import axios from 'axios';

import { buildQuery } from 'Utils/buildQuery';

export function createProgram(programData) {
  return axios.post(`/programs`, programData);
}

export function updateProgram(program) {
  return axios.put(`/programs`, program);
}

export function getPrograms(organizationId, pageId, perPage) {
  const query = buildQuery({ organizationId, pageId, perPage });

  return axios.get(`/programs/v2?${query}`);
}
