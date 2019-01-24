import Constants from './Constants';
import moment from 'moment-timezone';
export default class Utility {
    static substituteGetParams(url, obj) {
        for(let key in obj) {
            let keyToFind = ":" + key.toUpperCase();
            url = url.replace(keyToFind, obj[key]);
        }
        return url;
    }
    static getClientId() {
        const user = window.sessionStorage.getItem('user');
        const userObj = JSON.parse(user);
        return userObj["client-id"];
    }
    static getSecretKey() {
        const user = window.sessionStorage.getItem('user');
        const userObj = JSON.parse(user);
        return userObj["secret-key"];
    }
    static strumberify(number) {
        if (isNaN(number) || number == 0) {
            return number;
        }
        let totalCount = number;
        if (totalCount > 999 && totalCount < 999999) {
            totalCount = (totalCount / 1000).toFixed(1) + "K";
        } else if (totalCount > 999999 && totalCount < 999999999) {
            totalCount = (totalCount / 1000000).toFixed(1) + "M";
        } else if (totalCount > 999999999 && totalCount < 999999999999) {
            totalCount = (totalCount / 1000000000).toFixed(1) + "B"
        }
        return totalCount;
    }
    static createQueryStringObject(props, type) {
        if (type === undefined) {
            throw new Error('type cannot be undefined');
        }
        let obj = {};
        // let time = moment(parseInt(props.starttime)).format('YYYY-MM-DD[T]HH:mm:ss[-00:00]');
        if (props.interval === 'bot') {
            obj = {
                type,
                interval: 'daily',
                filter: props.filter,
                noise: props.noiseFilter,
            };
        } else {
            obj = {
                type,
                interval: ((props.interval === undefined) ? 'daily' : props.interval),
                starttime: moment.tz(props.starttime, 'America/Los_Angeles').utc().format('YYYY-MM-DD[T]HH:mm:ss[-00:00]'),
                endtime: moment.tz(props.endtime, 'America/Los_Angeles').utc().format('YYYY-MM-DD[T]HH:mm:ss[-00:00]'),
                filter: props.filter,
                noise: props.noiseFilter,
            };
        }
        if (type === 'summary') {
            delete (obj.filter);
        }
        return obj;
    }
    static getErrorCodes() {
        const errorcodes = [{
            id: 1,
            type: 'Session no longer established',
            cure: 'Need to Relogin',
        }, {
            id: 2,
            type: 'Not authorised to make this api call',
            cure: 'Why are you making this call in the first place?',
        }];
        return errorcodes;
    }
    static normalizeString(string) {
        if (string) {
            return string.toLowerCase().replace('/', '-');
        }
        return '';
    }
    static capitalizeFirstLetter(string) {
        if (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        return '';
    }

    static isString(o) {
        return typeof o === 'string';
    }

    static isEmpty(o) {
        return typeof o === 'undefined' || o === null || (this.isString(o) && o.length === 0) || (typeof o === 'object' && Object.keys(o).length === 0);
    }
}

export const helpers = {
    getRoleHomePage(userRole) {
        return Constants.ROLES.find(role => role.display.toUpperCase() == userRole).home;
    },
};
