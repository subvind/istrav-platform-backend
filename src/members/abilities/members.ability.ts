import { Injectable } from '@nestjs/common';
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Action } from './action.enum';

import { Member } from '../entities/member.entity'
import { Account } from '../../accounts/entities/account.entity'

type Subjects = InferSubjects<typeof Account | typeof Member> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(account: Account) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (account.member) {
      can(Action.MANAGE, 'all'); // read-write access to everything
    } else {
      can(Action.FIND_ALL, 'all'); // read-only access to everything
      can(Action.FIND_ONE, 'all'); // read-only access to everything
    }

    can(Action.CREATE, Member);
    can(Action.FIND_ALL, Member);
    can(Action.FIND_ONE, Member);
    can(Action.UPDATE, Member);
    can(Action.REMOVE, Member);

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
