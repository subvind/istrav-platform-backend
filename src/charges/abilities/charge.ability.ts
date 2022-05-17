import { Injectable } from '@nestjs/common';
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Action } from './action.enum';

import { Charge } from '../entities/charge.entity'
import { Account } from '../../accounts/entities/account.entity'

type Subjects = InferSubjects<typeof Account | typeof Charge> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(account: Account) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (account.admin) {
      can(Action.UPDATE, Charge, { tenantId: account.admin.id });
      can(Action.REMOVE, Charge, { tenantId: account.admin.id });
    }
    
    can(Action.CREATE, Charge);
    can(Action.FIND_ALL, Charge);
    can(Action.FIND_ONE, Charge);
    can(Action.UPDATE, Charge);
    can(Action.REMOVE, Charge);

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
