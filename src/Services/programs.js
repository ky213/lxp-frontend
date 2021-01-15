import axios from 'axios';

export function getPrograms(organizationId, pageId, perPage) {
  return axios.get(`programs?organizationId=${organizationId}&pageId=${pageId}&recordsPerPage=${perPage}`).then(response => response.data);
}
