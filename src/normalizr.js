/**
 * Created by geoolekom on 04.06.17.
 */

import { schema } from 'normalizr';
import { SchemaError } from './errors';

export const convertConfigToNormalizrSchema = (configSchema) => {
    let normalizrSchema = {};
    for (let key in configSchema) {
        normalizrSchema[key] = new schema.Entity(key, {});
    }
    for (let key in configSchema) {
        let counter = 0;
        for (let innerKey in configSchema[key]) {
            if (!normalizrSchema.hasOwnProperty(configSchema[key][innerKey])) {
                counter ++;
            } else {
                if (configSchema[key][innerKey] instanceof Array) {
                    normalizrSchema[key].define({[innerKey]: [ normalizrSchema[configSchema[key][innerKey][0]] ]});
                } else {
                    normalizrSchema[key].define({[innerKey]: normalizrSchema[configSchema[key][innerKey]]});
                }
            }
        }
        if (counter) {
            throw new SchemaError('Invalid foreign keys in schema.')
        }
    }
    return normalizrSchema;
};
