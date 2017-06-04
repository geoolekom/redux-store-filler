/**
 * Created by geoolekom on 01.06.17.
 */

import update from 'react-addons-update';

export const initEntitiesReducer = (actionTypes, schema) => {
    const defaultStore = {};
    for (let key in schema) {
        defaultStore[key] = {};
    }
    return (entities = defaultStore, action) => {
        if (action.type in actionTypes) {
            const processedData = {};
            const receivedData = action.payload.entities || {};
            for (let entity in receivedData) {
                processedData[entity] = { $merge: receivedData[entity] };
            }
            return update(entities, processedData);
        } else {
            return entities;
        }
    };
};

export const initTimestampReducer = (actionTypes, lifetime) => {
    const defaultStore = {};
    for (let key in lifetime) {
        defaultStore[key] = {};
    }
    return (timestamp = defaultStore, action) => {
        if (action.type in actionTypes) {
            const processedData = {};
            const receivedData = action.payload.entities || {};
            for (let entity in receivedData) {
                const entityData = {};
                const now = Date.now();
                for (let id in receivedData[entity]) {
                    entityData[id] = now;
                }
                processedData[entity] = { $merge: entityData };
            }
            return update(timestamp, processedData);
        } else {
            return timestamp;
        }
    };
};
