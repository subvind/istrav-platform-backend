import { Injectable } from '@nestjs/common';
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Action } from './action.enum';

import { Bill } from '../entities/bill.entity'
import { Account } from '../../accounts/entities/account.entity'

type Subjects = InferSubjects<typeof Account | typeof Bill> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(account: Account) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (account.admin) {
      can(Action.UPDATE, Bill, { ownerId: account.admin.id });
      can(Action.REMOVE, Bill, { ownerId: account.admin.id });
    }
    
    can(Action.CREATE, Bill);
    can(Action.FIND_ALL, Bill);
    can(Action.FIND_ONE, Bill);
    can(Action.UPDATE, Bill);
    can(Action.REMOVE, Bill);

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
