import axios from 'Config/axios';

import { buildQuery } from 'Utils/buildQuery';
export function getPrograms(organizationId, pageId, perPage) {
  return axios.get(`/programs/v2?organizationId=${organizationId}&pageId=${pageId}&recordsPerPage=${perPage}`);
}
