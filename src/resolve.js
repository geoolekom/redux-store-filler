/**
 * Created by geoolekom on 01.06.17.
 */

import {validateType} from './validate';

export const initResolve = (schema) => {
    return (type, entities, receivedEntities) => {
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
                    if (!entities[keyType].hasOwnProperty(keyId)
                        && !(receivedEntities.hasOwnProperty(keyType)
                        && receivedEntities[keyType].hasOwnProperty(keyId))) {
                        absentEntities[keyType].push(keyId);
                    }
                }
            }
        }
        return absentEntities;
    }
};
