import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

const routePrefix = `${config.apiUrl}/exp-levels`;

export const expLevelService = {
  getAll,
  getByProgramId
};

function getAll() {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${routePrefix}`, requestOptions).then(handleResponse);
}

function getByProgramId(programId) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  let query = buildQuery({programId});
  return fetch(`${routePrefix}/getByProgramId?${query}`, requestOptions).then(handleResponse);
}