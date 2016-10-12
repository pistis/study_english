import {
    CARD_POST,
    CARD_POST_SUCCESS,
    CARD_POST_FAILURE,
    CARD_LIST,
    CARD_LIST_SUCCESS,
    CARD_LIST_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* CARD POST */
export function cardPostRequest(contents, means, examples){
    return (dispatch) =>{
        // inform Idiom POST API is starting
        dispatch(cardPost());

        return axios.post('/api/card/', {contents, means, examples})
            .then((response) =>{
                dispatch(cardPostSuccess());
            }).catch((error) =>{
                dispatch(cardPostFailure(error.response.data.code));
            });
    };
}

export function cardPost(){
    return {
        type: CARD_POST
    };
}

export function cardPostSuccess(){
    return {
        type: CARD_POST_SUCCESS
    };
}

export function cardPostFailure(error){
    return {
        type: CARD_POST_FAILURE,
        error
    };
}

/* Idiom LIST */

/*
 Parameter:
 - isInitial: whether it is for initial loading
 - listType:  OPTIONAL; loading 'old' card or 'new' card
 - id:        OPTIONAL; card id (one at the bottom or one at the top)
 - username:  OPTIONAL; find cards of following user
 */
export function cardListRequest(isInitial, listType, id, username){
    return (dispatch) =>{
        // inform card list API is starting
        dispatch(cardList());

        let url = '/api/card';

        if(typeof username === "undefined"){
            // username not given, load public card
            url = isInitial ? url : `${url}/${listType}/${id}`;
            // or url + '/' + listType + '/' +  id
        }else{
            // load cards of specific user
            /* to be implemented */
        }

        return axios.get(url)
            .then((response) =>{
                dispatch(cardListSuccess(response.data, isInitial, listType));
            }).catch((error) =>{
                dispatch(cardListFailure());
            });
    };
}

export function cardList(){
    return {
        type: CARD_LIST
    };
}

export function cardListSuccess(data, isInitial, listType){
    return {
        type: CARD_LIST_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function cardListFailure(){
    return {
        type: CARD_LIST_FAILURE
    };
}