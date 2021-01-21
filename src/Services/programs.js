import axios from 'Config/axios';

export function getPrograms(organizationId, pageId, perPage) {
  return axios.get(`/programs?organizationId=${organizationId}&pageId=${pageId}&recordsPerPage=${perPage}`);
}
