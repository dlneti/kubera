import { Middleware, AnyAction } from "redux"

const logger: Middleware = store => next => (action: AnyAction) => {
    if (action.type !== 'STREAM_DATA') {
        console.group(action.type)
        console.info('dispatching', action)
        let result = next(action)
        console.log('next state', store.getState())
        console.groupEnd()
        return result
    }
    return next(action);
}

export default logger;