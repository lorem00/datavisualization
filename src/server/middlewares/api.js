// API
var request = require('request');
let config = require('./../config');

const servers = [
    {id: 1, name: 'a'},
    {id: 2, name: 'b'},
    {id: 3, name: 'c'},
    {id: 6, name: 'BBBB'}
];

module.exports = function setup(app) {

    /** START OF TEST METHODS **/
    app.get('/api/stats', (req, res) => {
        setTimeout(() => {
            res.json({
                // error: 'server error message',
                status: 'online',
                servers
            });
        }, 3000);
    });
    app.post('/api/servers', (req, res) => {
        if (!req.body.name) {
            return res.json({
                error: 'cannot add server with empty name'
            });
        }
        return setTimeout(() => {
            servers.push({
                id: servers[servers.length - 1].id + 1,
                name: req.body.name
            });
            res.json({
                success: true
            });
        }, 3000);
    });
    /** END OF TEST METHODS **/

    //@Allowed to Admin
    app.get('/api/users', (req, res) => {
        let rest = new RestConfig();
        let options = {
            url: (rest.prod().GET_ALL_USERS),
            method: 'GET',
            json: true,
            auth: {
                username: req.session.auth['client-id'],
                password: req.session.auth['secret-key']
            }
        };
        request(options, function (error, response, body) {
            if (error) {
                res.json({
                    success: false
                });
            } else {
                res.json(body);
            }
        });
    });

    //@Allowed to *
    app.post('/api/login', (req, res) => {
        let rest = new RestConfig();
        let jsonData = {
            "id": req.body.id,
            "pass": req.body.pass
        };
        request({
            url: rest.prod().LOGIN,
            json: jsonData,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }, function (error, response, body) {
            if (error) {
                res.json({
                    success: false
                });
            } else {
                req.session.auth = body;
                res.json(body);
            }
        });
    });

    //@Allowed to Customer
    app.post('/api/discovery/count', (req, res) => {
        if (req.session.auth === undefined) {
            res.statusCode = 401;
            res.json({
                id: 1,
                type: 'error',
                errorno: 1,
                message: 'Session no longer established. Please login again.'
            });
            console.warn('Session no longer established. Please login again.');
        } else {
            let rest = new RestConfig();
            let jsonData = {};
            for (let k in req.body) {
                jsonData[k] = req.body[k];
            }
            let options = {
                url: (rest.prod().GET_DEVICE_COUNT + serialize(jsonData)),
                method: 'GET',
                json: true,
                auth: {
                    username: req.session.auth['client-id'],
                    password: req.session.auth['secret-key']
                }
            };
            request(options, function (error, response, body) {
                if (error) {
                    res.json({
                        success: false
                    });
                } else {
                    res.json(body);
                }
            });
        }
    });
    //@Allowed to Customer
    app.post('/api/discovery/detail', (req, res) => {
        if (req.session.auth === undefined) {
            res.statusCode = 401;
            res.json({
                id: 1,
                type: 'error',
                errorno: 1,
                message: 'Session no longer established. Please login again.'
            });
            console.warn('Session no longer established. Please login again.');
        } else {
            let rest = new RestConfig();
            let jsonData = {};
            for (let k in req.body) {
                jsonData[k] = req.body[k];
            }
            let options = {
                url: (rest.prod().GET_DEVICE_DETAIL + serialize(jsonData)),
                method: 'GET',
                json: true,
                auth: {
                    username: req.session.auth['client-id'],
                    password: req.session.auth['secret-key']
                }
            };
            console.log(options);
            request(options, function (error, response, body) {
                if (error) {
                    res.json({
                        success: false
                    });
                } else {
                    res.json(body);
                }
            });
        }
    });

    app.post('/api/device/detail', (req, res) => {
        if (req.session.auth === undefined) {
            res.statusCode = 401;
            res.json({
                id: 1,
                type: 'error',
                errorno: 1,
                message: 'Session no longer established. Please login again.'
            });
            console.warn('Session no longer established. Please login again.');
        } else {
            const rest = new RestConfig();
            const options = {
                url: `${rest.prod().GET_DEVICE_DETAIL_DATA}/${req.body.deviceKey}`,
                method: 'GET',
                json: true,
                auth: {
                    username: req.session.auth['client-id'],
                    password: req.session.auth['secret-key']
                }
            };
            console.log(options);
            request(options, (error, response, body) => {
                if (error) {
                    res.json({
                        success: false,
                    });
                }
                res.json(body);
            });
        }
    });

    app.post('/api/devices/topology', (req, res) => {
        if (req.session.auth === undefined) {
            res.statusCode = 401;
            res.json({
                id: 1,
                type: 'error',
                errorno: 1,
                message: 'Session no longer established. Please login again.'
            });
            console.warn('Session no longer established. Please login again.');
        } else {
          let rest = new RestConfig();
          let jsonData = {};
          for (let k in req.body) {
              jsonData[k] = req.body[k];
          }
          let options = {
              url: (rest.prod().GET_DEVICES_TOPOLOGY_DATA + serialize(jsonData)),
              method: 'GET',
              json: true,
              auth: {
                  username: req.session.auth['client-id'],
                  password: req.session.auth['secret-key']
              }
          };
            console.log(options);
            request(options, (error, response, body) => {
                if (error) {
                    res.json({
                        success: false,
                    });
                }
                res.json(body);
            });
        }
    });
}

const serialize = (obj) => {
    const str = [];
    for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push((p) + "=" + (obj[p]));
        }
    }
    return ("?" + str.join("&"));
};

class RestConfig {
    constructor() {
        this.base = config.apiserver;
    }

    dev() {
        return {
            GET_ALL_USERS: `${this.base}v1/users`,
            LOGIN: `${this.base}login`,
            GET_DEVICE_COUNT: `${this.base}v1/devices/count`,
            GET_DEVICE_TYPES: `${this.base}v1/devices/count`,
            GET_DEVICE_MANUFACTURERS: `${this.base}v1/devices/count`,
            GET_DEVICE_OS: `${this.base}v1/devices/count`,
            GET_DEVICE_PROTOCOLS: `${this.base}v1/devices/count`,
            GET_DEVICE_CONTROL: `${this.base}v1/devices/count`,
            GET_DEVICE_CATEGORY_CONTROL: `${this.base}v1/devices/count`,
            GET_DEVICES_TOPOLOGY_DATA: `${this.base}v1/devices/topology`,
        };
    }

    prod() {
        return {
            GET_ALL_USERS: `${this.base}v1/users`,
            LOGIN: `${this.base}login`,
            GET_DEVICE_COUNT: `${this.base}v1/devices/count`,
            GET_DEVICE_DETAIL: `${this.base}v1/devices/detail`,
            GET_DEVICE_DETAIL_DATA: `${this.base}v1/device`,
            GET_DEVICES_TOPOLOGY_DATA: `${this.base}v1/devices/topology`,
        };
    }
}
