import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

const xapiUrl = `${config.apiUrl.replace('/api', '/xapi')}`;

export const reportingService = {
    getAll,
    getById,
};

function getAll({ selectedInstituteId, statementId, voidedStatementId, registration, agent, verb, activity, since, until, limit, ascending, page, take }) {    
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({ statementId, voidedStatementId, registration, agent, verb, activity, since, until, limit, ascending, page, take, selectedInstituteId });
    return fetch(`${xapiUrl}/statements?${query}`, requestOptions).then(handleResponse);    
}

function getById(id, statementId, selectedInstituteId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({ statementId, selectedInstituteId });

    return fetch(`${xapiUrl}/statements?${query}`, requestOptions).then(handleResponse);
}
