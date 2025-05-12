export class UserInformationDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;

  constructor(partial: Partial<UserInformationDto>) {
    Object.assign(this, partial);
  }
}