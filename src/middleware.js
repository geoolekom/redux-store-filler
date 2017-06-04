/**
 * Created by geoolekom on 01.06.17.
 */

import {normalize} from 'normalizr';
import {convertConfigToNormalizrSchema} from './normalizr';

export const initMiddleware = (actionTypes, schema, resolve, get) => {
    const normalizrConfig = convertConfigToNormalizrSchema(schema);
    return store => next => action => {
        if (action.type in actionTypes) {
            const entity = actionTypes[action.type];
            action.payload = normalize(action.payload, [ normalizrConfig[entity] ]);
            const receivedEntities = action.payload.entities || {};
            let absentEntities = resolve(entity, store.getState(), receivedEntities);
            for (let key in absentEntities) {
                const ids = absentEntities[key];
                if (ids instanceof Array && ids.length > 0) {
                    store.dispatch(get(key, {id: ids}));
                }
            }
        }
        return next(action);
    };
};
