
const INITIAL_STATE = {
    topologyChartData: {
        nodes: [],
        links: [],
    },
    topologyData: {
        nodes: [],
        links: [],
    },
    topologyChartFilters: {
        nodeFilters: {},
        connectionFilters:{},
    },
};

export default function deviceTopologyReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'GET_DEVICE_TOPOLOGY_CHART_DATA':
            return Object.assign({}, state, {
                topologyChartData: action.data,
            });
        case 'GET_DEVICE_TOPOLOGY_DATA':
            return Object.assign({}, state, {
                topologyData: action.data,
            });
        case 'GET_DEVICE_TOPOLOGY_CHART_FILTERS':
            return Object.assign({}, state, {
                topologyChartFilters: action.data,
            });
        default:
            return state;
    }

}
