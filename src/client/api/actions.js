import {createAction} from 'redux-actions';

import api from 'api/api';


function* createGuidGenerator() {
    let i = 1;
    while (i) {
        yield i++;
    }
}

const guidGenerator = createGuidGenerator();

export const API_REQUEST_STARTED = 'API_REQUEST_STARTED';
export const apiRequestStarted = createAction(API_REQUEST_STARTED);
export const API_REQUEST_FINISHED = 'API_REQUEST_FINISHED';
export const apiRequestFinished = createAction(API_REQUEST_FINISHED);

export const API_DATA_SERVERS_LOADED = 'API_DATA_SERVERS_LOADED';
export const apiDataServersLoaded = createAction(API_DATA_SERVERS_LOADED);
