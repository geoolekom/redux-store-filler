/**
 * Created by geoolekom on 01.06.17.
 */

export class SchemaError extends Error {
    constructor(message) {
        super();
        this.name = 'SchemaError';
        this.message = message;
    }
}
