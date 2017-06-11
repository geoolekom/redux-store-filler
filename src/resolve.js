/**
 * Created by geoolekom on 01.06.17.
 */

import {validateType} from './validate';

export const initResolve = (schema, lifetime) => (type, state, receivedEntities) => {
    const typeName = validateType(schema, type);
    if (!receivedEntities.hasOwnProperty(type)) {
        throw new Error('Absence of data.')
    }
    let absentEntities = {};
    for (let key in schema[typeName]) {
        const keyType = schema[typeName][key];
        absentEntities[keyType] = [];
        for (let id in receivedEntities[type]) {
            let keyIdList = receivedEntities[type][id][key];
            if (!(keyIdList instanceof Array)) {
                keyIdList = [keyIdList];
            }
            for (let keyId of keyIdList) {
                const present = state.entities.hasOwnProperty(keyType) && state.entities[keyType].hasOwnProperty(keyId);
                const received = receivedEntities.hasOwnProperty(keyType) && receivedEntities[keyType].hasOwnProperty(keyId);
                const relevant = present && !!lifetime ? state.timestamp[keyType][keyId] + lifetime[keyType] > Date.now() : true;
                if (!(received || (present && relevant)) && absentEntities[keyId].indexOf(keyId) === -1) {
                    absentEntities[keyType].push(keyId);
                }
            }
        }
    }
    return absentEntities;
};
