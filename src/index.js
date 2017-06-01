/**
 * Created by geoolekom on 01.06.17.
 */

import {initGet} from './api';
import {initResolve} from './resolve';
import {initMiddleware} from './middleware';
import {initReducer} from './reducer';

export const configureMiddleware = (config) => {
    const get = initGet(config.api);
    const resolve = initResolve(config.schema);
    let actionTypes = {};
    for (let key in config.api) {
        actionTypes[config.api[key].types[1]] = key;
    }
    return initMiddleware(actionTypes, resolve, get);
};

export const configureReducer = (config) => {
    let actionTypes = {};
    for (let key in config.api) {
        actionTypes[config.api[key].types[1]] = key;
    }
    return initReducer(actionTypes, config.schema);
};
