import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

const xapiUrl = process.env.XAPI_URL;

export const dashboardService = {
    getAll,
    getById,
    getExperiences
};

function getExperiences({ programId }) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({ programId });
    return fetch(`${xapiUrl}/statements/experiences?${query}`, requestOptions).then(handleResponse);
}

function getAll({ selectedOrganizationId, statementId, voidedStatementId, registration, agent, verb, activity, since, until, limit, ascending, experiences, page, take }) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({ statementId, voidedStatementId, registration, agent, verb, activity, since, until, limit, ascending, experiences, page, take, selectedOrganizationId });
    return fetch(`${xapiUrl}/statements?${query}`, requestOptions).then(handleResponse);
}

function getById(id, statementId, selectedOrganizationId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({ statementId, selectedOrganizationId });

    return fetch(`${xapiUrl}/statements?${query}`, requestOptions).then(handleResponse);
}
