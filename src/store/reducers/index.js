
const defaultState = {
    db: null,
    replError: null,
    error: null,
    ready: false,
}

const reducer = (state = defaultState, action) => {
    console.log(action, state);
    switch (action.type) {
        case 'initSQL/pending':  {
            return ({
              ...state,
              ready: false
            });
        }
        case 'initSQL/fulfilled':  {
            return ({
              ...state,
              ready: true,
              db: action.payload
            });
        }
        case 'initSQL/error':  {
            return ({
              ...state,
              error: action.payload,
            });
        }
        case 'exec/fulfilled': {
            return ({
                ...state,
                results: action.payload
            });
        }
        case 'exec/rejected': {
            return ({
                ...state,
                results: null,
                replError: action.error.message
            });
        }
        default:
            return state;
    }
}

// const reducer = (state, action) => {
//     console.log('in reducer', state, action);
//     return handleActions(
//     {
//         [ACTIONS.createDatabase]: (state, action) => {
//             console.log(action);
//             return ({
//             ...state,
//             db: action.payload
//         })},
//         [ACTIONS.createSQL]: (state, {payload}) => {
//             console.log('createSQL');
//             return {
//             ...state,
//             initInProgress: false,
//             SQL: payload};
//         },
//         [ACTIONS.initSQL]: (state) => {
//             console.log('initSQL');

//             return {
//             ...state,
//             initInProgress: true,};
//         },
//         [ACTIONS.setError]: (state, {payload}) => {
//             console.log('setError');
//             return {
//             ...state,
//             error: payload};
//         },

//     },
//     defaultStore
// );
// }

 export default reducer;
