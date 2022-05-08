import { Injectable } from '@nestjs/common';
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Action } from './action.enum';

import { Client } from '../entities/client.entity'
import { Account } from '../../accounts/entities/account.entity'

type Subjects = InferSubjects<typeof Account | typeof Client> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(account: Account) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (account.client) {
      can(Action.UPDATE, Client, { id: account.client.id });
      can(Action.REMOVE, Client, { id: account.client.id });
    }

    can(Action.CREATE, Client);
    can(Action.FIND_ALL, Client);
    can(Action.FIND_ONE, Client);
    can(Action.UPDATE, Client);
    can(Action.REMOVE, Client);
    can(Action.AUTH, Client);

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
