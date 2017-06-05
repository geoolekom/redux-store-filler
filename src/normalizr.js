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
            let innerKeyEntity = configSchema[key][innerKey];
            let normalizrEntity;
            if (innerKeyEntity instanceof Array) {
                innerKeyEntity = innerKeyEntity[0];
                normalizrEntity = [ normalizrSchema[innerKeyEntity] ];
            } else {
                normalizrEntity = normalizrSchema[innerKeyEntity];
            }
            if (!normalizrSchema.hasOwnProperty(innerKeyEntity)) {
                counter ++;
            } else {
                normalizrSchema[key].define({[innerKey]: normalizrEntity});
            }
        }
        if (counter) {
            throw new SchemaError('Invalid foreign keys in schema.')
        }
    }
    return normalizrSchema;
};
