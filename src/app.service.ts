import { Injectable } from '@nestjs/common';

const pkg = require('../package.json');
var whois = require('whois')

@Injectable()
export class AppService {
  getHello(): string {
    return `/community_folder/v${pkg.version}`;
  }

  async getHowis(id): Promise<string> {
    return new Promise((resolve, reject) => {
      whois.lookup(id, function (err, data) {
        resolve(data);
      })
    })
  }
}
