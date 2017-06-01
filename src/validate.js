/**
 * Created by geoolekom on 01.06.17.
 */
import {SchemaError} from './errors';

export const validateType = (schema, type) => {
    let typeName;
    if (type instanceof Array) {
        if (type.length !== 1) {
            throw new SchemaError(`Array must contain only type name.`);
        } else if (!schema.hasOwnProperty(type[0])) {
            throw new SchemaError('Errors in schema definition.');
        } else {
            typeName = type[0];
        }
    } else if (!schema.hasOwnProperty(type)) {
        throw new SchemaError('Errors in schema definition.');
    } else {
        typeName = type;
    }
    return typeName;
};
