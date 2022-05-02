/community_folder/ - Backend
========

Allows "mobile" and "frontend" to connect with one another.

main:
- https://github.com/trabur/communityfolder.com

source code:
- https://github.com/trabur/communityfolder-backend
- https://github.com/trabur/communityfolder-frontend
- https://github.com/trabur/communityfolder-mobile

containers:
- https://hub.docker.com/r/istrav/communityfolder-backend
- https://hub.docker.com/r/istrav/communityfolder-frontend

### start:
```bash
$ npm install -g @nestjs/cli
$ nest new
```

### production
```bash
# install cli
$ curl https://cli-assets.heroku.com/install-ubuntu.sh | sh
$ sudo apt install heroku
$ heroku --version

# auth
$ heroku login
# add ons
$ heroku addons:create heroku-postgresql:hobby-dev

# https://devcenter.heroku.com/articles/getting-started-with-nodejs

# make git repo
$ heroku git:remote -a communityfolder

# push to production
$ git push heroku main

# check logs
$ heroku logs --tail

# scale prod
$ heroku ps:scale web=1

# run app locally
$ heroku local web

# provision addons
$ heroku addons

# configuration
$ heroku config:set TIMES=2
$ heroku config

# check config
$ heroku config

# provision a database
$ heroku addons:create heroku-postgresql:hobby-dev
# run a SQL command
$ heroku pg:psql
```

### vnc
https://www.makeuseof.com/install-ubuntu-vnc-server-linux/

### developer-station
```bash
# node.js
$ curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
$ sudo apt-get install nodejs -y

# show firewall
$ sudo ufw status verbose

# toggle
$ sudo ufw enable
$ sudo ufw disable
# command line
$ sudo ufw allow ssh
$ sudo ufw allow http
$ sudo ufw allow https
# app
$ sudo ufw allow 3000/tcp
$ sudo ufw allow 3000/udp
# vnc
$ sudo ufw allow 5900/tcp
$ sudo ufw allow 5900/udp
# apply
$ sudo ufw reload
# delete ufw rules
$ sudo ufw status numbered
$ sudo ufw delete 3

# fix reverse tabbing in vscode
$ xmodmap -e 'keycode 23 = Tab'
$ sudo vim /usr/share/X11/xkb/symbols/pc
# change line from:
key <TAB> { [ Tab, ISO_Left_Tab ] };
# change line to:
key <TAB> { [ Tab ] };
```

### init project
```bash
nest g module
# ? What name would you like to use for the module? accounts
# CREATE src/accounts/accounts.module.ts (85 bytes)
# UPDATE src/app.module.ts (324 bytes)

nest g resource accounts
# ? What transport layer do you use? REST API
# ? Would you like to generate CRUD entry points? Yes
# CREATE src/accounts/accounts.controller.spec.ts (596 bytes)
# CREATE src/accounts/accounts.controller.ts (957 bytes)
# CREATE src/accounts/accounts.module.ts (268 bytes)
# CREATE src/accounts/accounts.service.spec.ts (474 bytes)
# CREATE src/accounts/accounts.service.ts (651 bytes)
# CREATE src/accounts/dto/create-account.dto.ts (33 bytes)
# CREATE src/accounts/dto/update-account.dto.ts (181 bytes)
# CREATE src/accounts/entities/account.entity.ts (24 bytes)
# UPDATE package.json (2045 bytes)
# UPDATE src/app.module.ts (406 bytes)
# ✔ Packages installed successfully.
```

### database
```bash
# https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e
$ sudo -u postgres psql
postgres=# create database community_folder;
postgres=# create user istrav with encrypted password 'furlong';
postgres=# grant all privileges on database community_folder to istrav;
```

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
