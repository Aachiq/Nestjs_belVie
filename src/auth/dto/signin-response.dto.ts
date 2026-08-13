export class SignInResponseDto {
  id: number;
  name: string;
  email: string;
  accessToken: string;

  constructor(id: number, name: string, email: string, accessToken: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.accessToken = accessToken;
  }
}