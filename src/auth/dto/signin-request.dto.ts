import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  // here i can use constructor instead of ! syntax
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}