import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { Website } from './entities/website.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

import * as jwt from "jsonwebtoken";

import * as sha512 from 'crypto-js/sha512'

@Injectable()
export class WebsitesService {
  constructor(
    public eventEmitter: EventEmitter2,
    @InjectRepository(Website)
    private readonly websitesRepository: Repository<Website>
  ) {}

  // register
  create(createWebsiteDto: CreateWebsiteDto): Promise<Website> {
    const website = new Website();
    website.email = createWebsiteDto.email;
    website.username = createWebsiteDto.username;
    website.password = sha512(createWebsiteDto.password).toString();
    website.subscribe = createWebsiteDto.subscribe;
    website.agreement = createWebsiteDto.agreement;

    return this.websitesRepository.save(website)
  }

  update(updateWebsiteDto: UpdateWebsiteDto): Promise<Website> {
    const website = new Website();
    website.id = updateWebsiteDto.id;
    website.email = updateWebsiteDto.email;
    website.username = updateWebsiteDto.username;
    website.password = updateWebsiteDto.password;
    if (updateWebsiteDto.password) {
      website.password = sha512(updateWebsiteDto.password).toString();
    }
    website.subscribe = updateWebsiteDto.subscribe;
    website.agreement = updateWebsiteDto.agreement;
    website.isRoot = updateWebsiteDto.isRoot;

    return this.websitesRepository.update({ id: website.id }, website).then(r => {
      return r.raw
    })
  }

  async findAll(): Promise<Website[]> {
    return this.websitesRepository.find();
  }

  findOne(id: string): Promise<Website> {
    return this.websitesRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.websitesRepository.delete(id);
  }

  // findOneWithHosts(id: string): Promise<Website> {
  //   return this.websitesRepository.findOne(id, {
  //     relations: ["collaborations", "ownerships"]
  //   });
  // }
}