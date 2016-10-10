import {
    IDIOM_POST,
    IDIOM_POST_SUCCESS,
    IDIOM_POST_FAILURE,
    IDIOM_LIST,
    IDIOM_LIST_SUCCESS,
    IDIOM_LIST_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* IDIOM POST */
export function idiomPostRequest(contents, means, examples){
    return (dispatch) =>{
        // inform Idiom POST API is starting
        dispatch(idiomPost());

        return axios.post('/api/idiom/', {contents, means, examples})
            .then((response) =>{
                dispatch(idiomPostSuccess());
            }).catch((error) =>{
                dispatch(idiomPostFailure(error.response.data.code));
            });
    };
}

export function idiomPost(){
    return {
        type : IDIOM_POST
    };
}

export function idiomPostSuccess(){
    return {
        type : IDIOM_POST_SUCCESS
    };
}

export function idiomPostFailure(error){
    return {
        type : IDIOM_POST_FAILURE,
        error
    };
}

/* Idiom LIST */

/*
 Parameter:
 - isInitial: whether it is for initial loading
 - listType:  OPTIONAL; loading 'old' idiom or 'new' idiom
 - id:        OPTIONAL; idiom id (one at the bottom or one at the top)
 - username:  OPTIONAL; find idioms of following user
 */
export function idiomListRequest(isInitial, listType, id, username){
    return (dispatch) =>{
        // inform idiom list API is starting
        dispatch(idiomList());

        let url = '/api/idiom';

        if(typeof username === "undefined"){
            // username not given, load public idiom
            url = isInitial ? url : `${url}/${listType}/${id}`;
            // or url + '/' + listType + '/' +  id
        }else{
            // load idioms of specific user
            /* to be implemented */
        }

        return axios.get(url)
            .then((response) =>{
                dispatch(idiomListSuccess(response.data, isInitial, listType));
            }).catch((error) =>{
                dispatch(idiomListFailure());
            });
    };
}

export function idiomList(){
    return {
        type : IDIOM_LIST
    };
}

export function idiomListSuccess(data, isInitial, listType){
    return {
        type : IDIOM_LIST_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function idiomListFailure(){
    return {
        type : IDIOM_LIST_FAILURE
    };
}