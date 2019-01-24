const INITIAL_STATE = {
    isLoading: false,
};


const loadingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_DISCOVERYPROTOCOLS_PENDING':
        case 'GET_DEVICE_TYPES_HAS_STARTED':
        case 'GET_DEVICE_TYPES_DATA_HAS_STARTED':
        case 'GET_DEVICE_MANUFACTURERS_HAS_STARTED':
        case 'GET_DEVICE_MANUFACTURERS_CHART_DATA_HAS_STARTED':
        case 'GET_DEVICE_OS_HAS_STARTED':
        case 'GET_DEVICE_OS_CHART_DATA_HAS_STARTED':
        case 'GET_DEVICE_TYPES_PAGE_NUMBER_HAS_STARTED':
        case 'GET_DEVICE_TYPES_TREND_DATA_HAS_STARTED':
        case 'GET_DEVICE_CONNECTIVITY_DATA_HAS_STARTED':
        case 'GET_DEVICE_OWNERSHIP_DATA_HAS_STARTED':
        case 'GET_DISCOVERY_PROTOCOLS_API_HAS_STARTED':
        case 'GET_DISCOVERY_CATEGORY_COUNTS_API_HAS_STARTED':
            return {
                ...state,
                isLoading: true,
            };
        case 'GET_DISCOVERYPROTOCOLS_SUCCESS':
        case 'GET_DEVICE_TYPES_HAS_FINISHED':
        case 'GET_DEVICE_TYPES_DATA_HAS_FINISHED':
        case 'GET_DEVICE_MANUFACTURERS_HAS_FINISHED':
        case 'GET_DEVICE_MANUFACTURERS_CHART_DATA_HAS_FINISHED':
        case 'GET_DEVICE_OS_HAS_FINISHED':
        case 'GET_DEVICE_OS_CHART_DATA_HAS_FINISHED':
        case 'GET_DEVICE_TYPES_PAGE_NUMBER_HAS_FINISHED':
        case 'GET_DEVICE_TYPES_TREND_DATA_HAS_FINISHED':
        case 'GET_DEVICE_CONNECTIVITY_DATA_HAS_FINISHED':
        case 'GET_DEVICE_OWNERSHIP_DATA_HAS_FINISHED':
        case 'GET_DISCOVERY_PROTOCOLS_API_HAS_FINISHED':
        case 'GET_DISCOVERY_CATEGORY_COUNTS_API_HAS_FINISHED':
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default loadingReducer;
