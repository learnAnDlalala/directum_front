/* const { configure } = require("babelify"); */

export const client = async function (endpoint, {body, ...customConfig}={}) {
    const headers = {'content-type': 'application/json', 'Accept': 'application/json','mode': 'no-cors'};
    const config = {
        method: body? 'POST' : 'GET',
        credentials: 'include',
        ...customConfig,
        headers: {
        ...headers,
        ...customConfig.headers,
        },
    }
    if (body) {
        config.body= JSON.stringify(body);
    }
    return window.fetch(`http://localhost:62265/api/${endpoint}`,config)
    .then(async responce => {
        try {
            const data = await responce.json();
        if(responce.ok) {
            return data
        } else {
            return Promise.reject(data)
        } 
        }
        catch(err) {
            return null;
        }
    })
};
