import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    post: {
        status: 'INIT',
        error: -1
    },

    list: {
        status: 'INIT',
        data: [],
        isLast: false
    }
};

export default function card(state, action){
    if(typeof state === "undefined"){
        state = initialState;
    }

    switch(action.type){
        case types.CARD_POST:
            return update(state, {
                post: {
                    status: {$set: 'WAITING'},
                    error: {$set: -1}
                }
            });
        case types.CARD_POST_SUCCESS:
            return update(state, {
                post: {
                    status: {$set: 'SUCCESS'}
                }
            });
        case types.CARD_POST_FAILURE:
            return update(state, {
                post: {
                    status: {$set: 'FAILURE'},
                    error: {$set: action.error}
                }
            });
        case types.CARD_LIST:
            return update(state, {
                list: {
                    status: {$set: 'WAITING'}
                }
            });
        case types.CARD_LIST_SUCCESS:
            if(action.isInitial){
                return update(state, {
                    list: {
                        status: {$set: 'SUCCESS'},
                        data: {$set: action.data},
                        isLast: {$set: action.data.length < 6}
                    }
                })
            }else{
                if(action.listType === 'new'){
                    return update(state, {
                        list: {
                            status: {$set: 'SUCCESS'},
                            data: {$unshift: action.data}
                        }
                    });
                }else{
                    return update(state, {
                        list: {
                            status: {$set: 'SUCCESS'},
                            data: {$push: action.data},
                            isLast: {$set: action.data.length < 6}
                        }
                    });
                }
            }
        case types.CARD_LIST_FAILURE:
            return update(state, {
                list: {
                    status: {$set: 'FAILURE'}
                }
            });
        default:
            return state;
    }
}