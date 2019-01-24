const Constants = {
    MILLISECONDS_IN_HOUR: 3600000,
    MILLISECONDS_IN_DAY: 86400000,
    ROLES: [
        {
            id: 1,
            name: 'admin',
            display: 'Administrator',
            home: '/admin',
        }, {
            id: 2,
            name: 'customer',
            display: 'Customer',
            home: '/dashboard',
        },
    ],
};

export default Constants;
