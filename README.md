# redux-store-filler

### Installation

`redux-store-filler` is available on [npm](https://www.npmjs.com/package/redux-store-filler).

```
$ npm install redux-store-filler --save-dev
```

Use it with standard Redux store. For more information, consult the [Redux documentation](http://redux.js.org).

### Description

`redux-store-filler` allows you to forget about retrieving data via API at all. 
You just need to write config and receive data - asynchronously and entirely.

`redux-store-filler` will retrieve data via API, normalize it, put it in Redux store and follow foreign keys if necessary.
If data is already present in store, it will call API if only it's outdated.

### Simple example of usage

1. Add config of your entities schema - each object should contain foreign keys to follow:

    ```js
    const schema = {
        users: {},
        posts: {
            author: "users"
        }
    };
    ```
2. Add config of your API.

    ```js
    const api = {
        users: {
            endpoint: "api/v1/users/",
            types: ['USERS_GET', 'USERS_SUCCESS', 'USERS_FAILURE'],
        },
        posts: {
            endpoint: "api/v1/posts/",
            types: ['POSTS_GET', 'POSTS_SUCCESS', 'POSTS_FAILURE'],
        }
    };
    ```
3. Add lifetime limits of your entities in milliseconds.

    ```js
    const lifetime = {
        users: 20000,
        posts: 10000
    };
    ```
4. Add it to global config.

    ```js
    const config = {
        schema,
        api,
        lifetime
    };
    ```
4. Create reducers, action creator and middleware using this config. 

    ```js
    import {config} from './config';
    import {configureMiddleware, configureActionCreator} from 'redux-store-filler';
    import {configureEntitiesReducer, configureTimestampReducer} from 'redux-store-filler';
    
    const entitiesReducer = configureEntitiesReducer(config);
    const timestampReducer = configureTimestampReducer(config);
    const middleware = configureMiddleware(config);
    const get = configureActionCreator(config);
    ```
5. Use it in your application. 
In React, for example, you put middleware and reducers in place and bind action creator.
Then you can call it and get data, for example, in your React component:

    ```js
    componentDidMount = () => {
       this.props.get("users", {id: [111, 122, 4]})
    }
    ```
    
