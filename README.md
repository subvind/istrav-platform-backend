istrav-platform-backend
========
Innovation Management Software (IMS)

istrav source code:
- istrav.com: https://github.com/trabur/istrav.com
- trabur.workers.dev: https://github.com/trabur/istrav-global
- istrav.net: https://github.com/trabur/istrav-platform-frontgate
- meta.istrav.net: https://github.com/trabur/istrav-platform-frontend
- istrav.istrav.dev: https://github.com/trabur/istrav-platform-backend
- istrav-load-balancer: https://github.com/trabur/istrav-load-balancer
- istrav.dev: https://github.com/trabur/istrav.dev
- istrav-headquarters: https://github.com/trabur/istrav-headquarters
- istrav.stream: https://github.com/trabur/istrav.stream

istrav.istrav.dev tech:
- NestJS
- TypeORM

## Production
```bash
# firewall
$ sudo ufw allow 3000:65000/tcp
$ sudo ufw reload

# start
$ PORT=3000 pm2 start dist/main.js --update-env --name="istrav"

# stop
$ pm2 stop dist/main.js --name="istrav"

# logs
$ pm2 logs istrav

# delete
$ pm2 delete istrav

# list
$ pm2 status

# Generate Startup Script
$ pm2 startup

# Freeze your process list across server restart
$ pm2 save

# Remove Startup Script
$ pm2 unstartup

# after code change
$ pm2 reload all
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```