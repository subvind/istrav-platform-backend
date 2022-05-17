import { Injectable } from '@nestjs/common';
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Action } from './action.enum';

import { Amount } from '../entities/amount.entity'
import { Account } from '../../accounts/entities/account.entity'

type Subjects = InferSubjects<typeof Account | typeof Amount> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(account: Account) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (account.admin) {
      can(Action.UPDATE, Amount, { tenantId: account.admin.id });
      can(Action.REMOVE, Amount, { tenantId: account.admin.id });
    }
    
    can(Action.CREATE, Amount);
    can(Action.FIND_ALL, Amount);
    can(Action.FIND_ONE, Amount);
    can(Action.UPDATE, Amount);
    can(Action.REMOVE, Amount);

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
