import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';
import moment from "moment";
import axios from 'axios';
const routePrefix = `${config.apiUrl}/courses`;

export const courseService = {
    getAll,
    getById,
    update,
    create,
    uploadFile
};

function getAll(instituteId, programId, page, take, filter) {    
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({ instituteId, programId, page, take, filter });
    return fetch(`${config.apiUrl}/courses?${query}`, requestOptions).then(handleResponse);    
}

function getById(courseId, instituteId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({courseId, instituteId});
    return fetch(`${routePrefix}/getById?${query}`, requestOptions).then(handleResponse);
}

function create(courseData, selectedInstitute) {
    
    const formData = new FormData();
    formData.append('file', courseData.fileData);
    formData.append('name', courseData.name);
    formData.append('description', courseData.description);
    formData.append('programId', courseData.programId);
    formData.append('periodDays', courseData.periodDays);
    formData.append('startingDate', moment(courseData.startingDate).format('L'));
    formData.append('selectedInstitute', selectedInstitute);              

    axios({
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            ...authHeader()
        },
        data: formData,
        url: routePrefix,
        onUploadProgress: (ev) => {
            const progress = ev.loaded / ev.total * 100;
            setUploadProgress(Math.round(progress));
        },
    })
    .then((resp) => {
        return resp;
    })
    .catch((err) => console.error(err));
}

function update(courseData, selectedInstitute) {
    const formData = new FormData();
    formData.append('file', courseData.fileData);
    formData.append('name', courseData.name);
    formData.append('description', courseData.description);
    formData.append('programId', courseData.programId);
    formData.append('periodDays', courseData.periodDays);
    formData.append('startingDate', moment(courseData.startingDate).format('L'));
    formData.append('selectedInstitute', selectedInstitute);              
    formData.append('courseId', courseData.courseId);
    formData.append('contentPath', courseData.contentPath);

    axios({
        method: 'PUT',
        headers: {
            'Content-Type': 'multipart/form-data',
            ...authHeader()
        },
        data: formData,
        url: routePrefix,
        onUploadProgress: (ev) => {
            const progress = ev.loaded / ev.total * 100;
            setUploadProgress(Math.round(progress));
        },
    })
    .then((resp) => {
        return resp;
    })
    .catch((err) => console.error(err));
}

function uploadFile(file) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(file)
  };
  console.log('file', file);

  return fetch(`${routePrefix}/uploadFile`, requestOptions)
      .then(handleResponse)
      .then((data) => {
          return data;
      });
}
