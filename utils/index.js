import fetch from 'isomorphic-fetch';

function request(url, method, body) {
    method = method.toUpperCase();
    method === 'GET' ? body = undefined : body = JSON.stringify(body);
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: body
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response)
            }
        })
}

export {request}