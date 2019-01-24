import {
    List,
    Map,
    OrderedMap,
} from 'immutable';

import {
    API_DATA_SERVERS_LOADED,
    API_REQUEST_FINISHED,
    API_REQUEST_STARTED
} from './actions';

const initialState = Map({
  loading: false,
  requests: OrderedMap({}),
  errors: Map({
    last: null
  }),
  lastUpdate: Map({
    servers: null
  }),
  data: Map({
    servers: List()
  })
});

export default function ApiReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
