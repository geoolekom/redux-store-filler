/**
 * Created by geoolekom on 01.06.17.
 */

import {initGet} from './api';
import {initResolve} from './resolve';
import {initMiddleware} from './middleware';
import {initEntitiesReducer, initTimestampReducer} from './reducer';

const getSuccessActionTypes = (api) => {
    let actionTypes = {};
    for (let key in api) {
        actionTypes[api[key].types[1]] = key;
    }
    return actionTypes;
};

export const configureMiddleware = (config) => {
    const get = initGet(config.api);
    const resolve = initResolve(config.schema, config.lifetime);
    return initMiddleware(getSuccessActionTypes(config.api), config.schema, resolve, get);
};

export const configureEntitiesReducer = (config) => {
    return initEntitiesReducer(getSuccessActionTypes(config.api), config.schema);
};

export const configureTimestampReducer = (config) => {
    return initTimestampReducer(getSuccessActionTypes(config.api), config.lifetime);
};
