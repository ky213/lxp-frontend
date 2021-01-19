import instance from './axios';

export const programsApi = {
  getPrograms(organizationId, pageId, perPage){
    return instance.get(`programs?organizationId=${organizationId}&pageId=${pageId}&recordsPerPage=${perPage}`)
    .then(response => response.data);
  }
}
