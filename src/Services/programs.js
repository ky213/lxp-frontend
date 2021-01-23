import axios from 'Config/axios';

export function getPrograms(organizationId, pageId, perPage) {
  return axios.get(`/programs/v2?organizationId=${organizationId}&pageId=${pageId}&recordsPerPage=${perPage}`);
}
