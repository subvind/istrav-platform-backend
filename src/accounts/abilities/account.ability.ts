import { Injectable } from '@nestjs/common';
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Action } from './action.enum';

import { Account } from '../entities/account.entity'

type Subjects = InferSubjects<typeof Account> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(account: Account) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (account.user) {
      can(Action.UPDATE, Account, { id: account.user.id });
      can(Action.REMOVE, Account, { id: account.user.id });
    }

    can(Action.CREATE, Account);
    can(Action.FIND_ALL, Account);
    can(Action.FIND_ONE, Account);
    can(Action.UPDATE, Account);
    can(Action.REMOVE, Account);
    can(Action.AUTH, Account);

    // cannot(Action.UPDATE, Account);
    // cannot(Action.REMOVE, Account);

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
