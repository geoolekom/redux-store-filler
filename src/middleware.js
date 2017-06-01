/**
 * Created by geoolekom on 01.06.17.
 */

export const initMiddleware = (actionTypes, resolve, get) => {
    return store => next => action => {
        if (action.type in actionTypes) {
            const entity = actionTypes[action.type];
            const receivedEntities = action.payload.entities || {};
            const absentEntities = resolve(entity, store.getState().entities, receivedEntities);
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
