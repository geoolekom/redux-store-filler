# redux-store-filler

### Installation

`redux-store-filler` is available on [npm](https://www.npmjs.com/package/redux-store-filler).

```
$ npm install redux-store-filler --save-dev
```

Use it with standard Redux store. For more information, consult the [Redux documentation](http://redux.js.org).

### Simple example of usagei

1. Add config of your entities schema and API.

    ```js

    const schema = {
        users: {},
        posts: {
            author: "users"
        },
    };

    const api = {
        users: {
            endpoint: "api/v1/users/",
            types: ['USERS_GET', 'USERS_SUCCESS', 'USERS_FAILURE'],
        },
        posts: {
            endpoint: "api/v1/posts/",
            types: ['POSTS_GET', 'POSTS_SUCCESS', 'POSTS_FAILURE'],
        },
    };

    const config = {
        schema,
        api,
    };

    ```
2. Create reducer and middleware using this config.
    ```js
    import {config} from './config';
    import {configureMiddleware} from 'redux-store-filler';
    import {configureReducer} from 'redux-store-filler';
    
    const reducer = configureReducer(config);
    const middleware = configureMiddleware(config);
    ```
3. Use it in your Redux application.
    
