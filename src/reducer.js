/**
 * Created by geoolekom on 01.06.17.
 */

import update from 'react-addons-update';

export const initReducer = (actionTypes, schema) => {
    const defaultStore = {};
    for (let key in schema) {
        defaultStore[key] = {};
    }
    return (entities = defaultStore, action) => {
        if (action.type in actionTypes) {
            const processedData = {};
            const receivedData = action.payload.entities || {};
            for (let entity in action.payload.entities) {
                processedData[entity] = { $merge: receivedData[entity] };
            }
            return update(entities, processedData);
        } else {
            return entities;
        }
    };
};
