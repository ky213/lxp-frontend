import axios from 'axios';

import { buildQuery } from 'Utils/buildQuery';

export function getPorgramDirectors(filterOrganizationId, filterName, pageId, recordsPerPage) {
  const query = buildQuery({
    pageId,
    recordsPerPage,
    filterName,
    filterOrganizationId,
  });
  return axios.get(`/cm/filter?${query}`);
}
