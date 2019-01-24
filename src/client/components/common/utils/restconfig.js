class RestConfig {
    constructor(base) {
        this.base = base;
    }
    dev() {
        return {
            GET_ALL_USERS: `${this.base}/users`,
            LOGIN: `${this.base}/api/login`,
            DEVICE_SUMMARY: `${this.base}/api/discovery/summary`,
            DEVICE_TYPES: `${this.base}/api/discovery/types`,
            GET_DEVICE_MANUFACTURERS: `${this.base}/api/discovery/deviceManufacturers`,
            GET_DEVICE_OS: `${this.base}/api/discovery/deviceOs`,
            GET_DEVICE_PROTOCOLS: `${this.base}/api/discovery/protocols`,
            GET_DEVICE_SPECTRUM: `${this.base}/api/discovery/spectrum`,
            GET_DEVICE_LOCATIONS: `${this.base}/api/discovery/locations`,
            GET_DEVICE_CONNECTIONS: `${this.base}/api/discovery/connections`,
            GET_DEVICE_CONTROL: `${this.base}/api/discovery/control`,
            GET_DEVICE_CATEGORY_CONTROL: `${this.base}/api/discovery/category/control`,
            GET_DEVICE_TOPOLOGY_DATA: `${this.base}/api/devices/topology`,
            GET_DEVICE_OWNERSHIP_DATA:`${this.base}/api/discovery/deviceOwnership`,
            GET_DEVICE_CONNECTIVITY_DATA:`${this.base}/api/discovery/deviceConnectivity`,
            GET_SPECTRUM_LIST: `${this.base}/api/discovery/spectrumlist`,
            GET_DEVICE_DETAIL_DATA: `${this.base}/api/device`,
        };
    }
    prod() {
        return {
            GET_ALL_USERS: `${this.base}/api/users`,
            LOGIN: `${this.base}/api/login`,
            DEVICE_SUMMARY: `${this.base}/api/discovery/count`,
            DEVICE_TYPES: `${this.base}/api/discovery/count`,
            GET_DEVICE_MANUFACTURERS: `${this.base}/api/discovery/count`,
            GET_DEVICE_OS: `${this.base}/api/discovery/count`,
            GET_DEVICE_PROTOCOLS: `${this.base}/api/discovery/count`,
            GET_DEVICE_SPECTRUM: `${this.base}/api/discovery/count`,
            GET_DEVICE_LOCATIONS: `${this.base}/api/discovery/count`,
            GET_DEVICE_CONNECTIONS: `${this.base}/api/discovery/count`,
            GET_DEVICE_CONTROL: `${this.base}/api/discovery/count`,
            GET_DEVICE_CATEGORY_CONTROL: `${this.base}/api/discovery/count`,
            GET_DEVICE_TOPOLOGY_DATA: `${this.base}/api/devices/topology`,
            GET_DEVICE_OWNERSHIP_DATA:`${this.base}/api/discovery/count`,
            GET_DEVICE_CONNECTIVITY_DATA:`${this.base}/api/discovery/count`,
            GET_SPECTRUM_LIST: `${this.base}/api/discovery/detail`,
            GET_DEVICE_DETAIL_DATA: `${this.base}/api/device/detail`,
        };
    }
}


// MOCK
 const rest = new RestConfig('http://localhost:3000').dev();

// LIVE LOCAL SERVER (this will be the setting for production
//const rest = new RestConfig('').prod();

export default rest;
