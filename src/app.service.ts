import { Injectable } from '@nestjs/common';

var whois = require('whois')

@Injectable()
export class AppService {
  getHello(): string {
    return `/istrav/v${process.env.npm_package_version}`;
  }

  async getHowis(id): Promise<string> {
    return new Promise((resolve, reject) => {
      whois.lookup(id, function (err, data) {
        resolve(data);
      })
    })
  }
}
