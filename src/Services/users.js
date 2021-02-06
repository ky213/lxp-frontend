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

export function getActiveLearners(filterOrganizationId, filterProgramId) {
  let query = buildQuery({
    filterOrganizationId,
    filterProgramId,
  });

  return axios.get(`/learners/filterActive?${query}`);
}
