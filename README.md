
## Pre-requisites
- Node v8.9.1+
- npm v5.5.1+

_NOTE: Please use this particular versions to ensure your environment matches the staging/production versions_

## Getting Started

After running `npm install`, you need to change your `restconfig.js` file to start using the correct data server.

On that file you'll find the following lines, just comment the one that you don't plan to use and uncomment the other one

```
// MOCK
const rest = new RestConfig('http://localhost:3000').dev();

// LIVE LOCAL SERVER (this will be the setting for production)
const rest = new RestConfig('').prod();
```

### Running Development mode

- `$ npm run mock`
- `$ npm run dev`

_Mock server will run at port 3000 by default, and devserver will boot up at port 8080_

check following link for network topology chart . http://localhost:8080/discovery/location/topology

and check other tabs as well .
