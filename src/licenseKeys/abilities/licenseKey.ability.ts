import { Injectable } from '@nestjs/common';
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Action } from './action.enum';

import { LicenseKey } from '../entities/licenseKey.entity'
import { Account } from '../../accounts/entities/account.entity'

type Subjects = InferSubjects<typeof Account | typeof LicenseKey> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(account: Account) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (account.admin) {
      can(Action.UPDATE, LicenseKey, { tenantId: account.admin.id });
      can(Action.REMOVE, LicenseKey, { tenantId: account.admin.id });
    }
    
    can(Action.CREATE, LicenseKey);
    can(Action.FIND_ALL, LicenseKey);
    can(Action.FIND_ONE, LicenseKey);
    can(Action.UPDATE, LicenseKey);
    can(Action.REMOVE, LicenseKey);

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
