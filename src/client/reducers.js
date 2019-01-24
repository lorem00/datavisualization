import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ApiReducer from './api/reducer';
import authenticationReducer from './components/Auth/authReducer';
import globalFiltersReducer from './components/Discovery/GlobalFilters/globalFiltersReducer';
import deviceSummaryReducer from './components/Discovery/DeviceSummary/deviceSummaryReducer';
import adminReducer from './components/Admin/adminReducer';
import deviceTypesReducer from './components/Discovery/DeviceTypes/deviceTypesReducer';
import deviceSpectrumReducer from './components/Discovery/DeviceSpectrum/deviceSpectrumReducer';
import deviceFunctions from './components/Discovery/DeviceFunctions/reducer';
import deviceNetworks from './components/Discovery/DeviceNetworks/reducer';
import discoveryDeviceLocationsReducer from './components/Discovery/DeviceLocations/discoveryDeviceLocationsReducer';
import deviceTopologyReducer from './components/Discovery/DeviceTopology/deviceTopologyReducer';
import deviceOwnershipReducer from './components/Discovery/DeviceOwnership/deviceOwnershipReducer';
import discoverySpectrumDrillDownReducer from './components/Details/DetailsReducer';
import loadingReducer from './components/common/loadingReducer';

export default combineReducers({
    routing: routerReducer,
    authenticationReducer,
    adminReducer,
    api: ApiReducer,
    globalFiltersReducer,
    deviceSummaryReducer,
    deviceTypesReducer,
    deviceFunctions,
    deviceSpectrumReducer,
    discoveryDeviceLocationsReducer,
    deviceTopologyReducer,
    deviceNetworks,
    deviceOwnershipReducer,
    discoverySpectrumDrillDownReducer,
    loadingReducer,
});
