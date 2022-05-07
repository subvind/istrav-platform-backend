import { Injectable } from '@nestjs/common';
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Action } from './action.enum';

import { Tenant } from '../entities/tenant.entity'
import { Account } from '../../accounts/entities/account.entity'

type Subjects = InferSubjects<typeof Account | typeof Tenant> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(account: Account) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (account.client) {
      can(Action.UPDATE, Tenant, { ownerId: account.client.id });
      can(Action.REMOVE, Tenant, { ownerId: account.client.id });
    }
    
    can(Action.CREATE, Tenant);
    can(Action.FIND_ALL, Tenant);
    can(Action.FIND_ONE, Tenant);
    can(Action.UPDATE, Tenant);
    can(Action.REMOVE, Tenant);

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
