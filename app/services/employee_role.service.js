import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

export const employeeRoleService = {
  getByRoleId,
  createEmployeeRole
};

function getByRoleId(roleId, instituteId) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  let query = buildQuery({roleId, instituteId});
  return fetch(`${config.apiUrl}/user_roles?${query}`, requestOptions).then(handleResponse);
}

function createEmployeeRole(employeeId, roleId) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({employeeId, roleId})
  };

  return fetch(`${config.apiUrl}/user_roles`, requestOptions)
      .then(handleResponse)
      .then((data) => {
          return data;
      });
}
