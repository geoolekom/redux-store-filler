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
    const {schema, lifetime, api} = config;
    const get = initGet(api);
    const resolve = initResolve(schema, lifetime);
    const actionTypes = getSuccessActionTypes(api);
    return initMiddleware(actionTypes, config.schema, resolve, get);
};

export const configureEntitiesReducer = (config) => {
    const {schema, api} = config;
    const actionTypes = getSuccessActionTypes(api);
    return initEntitiesReducer(actionTypes, schema);
};

export const configureTimestampReducer = (config) => {
    const {api, lifetime} = config;
    const actionTypes = getSuccessActionTypes(api);
    return initTimestampReducer(actionTypes, lifetime);
};

export const configureActionCreator = (config) => {
    const {api} = config;
    return initGet(api);
};