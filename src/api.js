/**
 * Created by geoolekom on 01.06.17.
 */

import { CALL_API } from "redux-api-middleware";

export const objectToQuery = (params) => {
    if (!params) {
        return '';
    }
    let array = [];
    for (let key in params) {
        if (params[key] instanceof Array) {
            if (params[key].length > 0) {
                for (let val of params[key]) {
                    array.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
                }
            }
        } else {
            array.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
        }
    }
    return `?${array.join('&')}`;
};

export const initGet = (api) => (entity, params) => ({
    [CALL_API]: {
        endpoint: `${api[entity].endpoint}${objectToQuery(params)}`,
        method: 'GET',
        types: api[entity].types,
        credentials: 'same-origin',
        headers: api[entity].headers || {}
    }
});
