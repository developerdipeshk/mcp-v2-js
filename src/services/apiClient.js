import config from '../config.js';

const API_BASE = config.API_URL.endsWith('/') ? config.API_URL : `${config.API_URL}/`;

export async function apiRequest({ endpoint, method = 'GET', token, data = null }) {
    const url = API_BASE + endpoint;
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const options = {
        method,
        headers,
    };

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const contentType = response.headers.get('content-type');
    let result;
    if (contentType && contentType.includes('application/json')) {
        result = await response.json();
    } else {
        result = await response.text();
    }

    if (!response.ok) {
        throw { status: response.status, message: result };
    }
    return result;
}
