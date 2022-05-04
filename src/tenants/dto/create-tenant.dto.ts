export class CreateTenantDto {
  email: string;
  username: string;
  password: string;
  subscribe: boolean;
  agreement: boolean;
}