import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { Website } from './entities/website.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

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
    website.domainName = createWebsiteDto.domainName;
    website.displayName = createWebsiteDto.displayName;

    return this.websitesRepository.save(website)
  }

  update(updateWebsiteDto: UpdateWebsiteDto): Promise<Website> {
    const website = new Website();
    website.id = updateWebsiteDto.id;
    website.domainName = updateWebsiteDto.domainName;
    website.displayName = updateWebsiteDto.displayName;

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