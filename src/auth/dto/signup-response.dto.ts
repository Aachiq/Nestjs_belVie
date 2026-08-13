import { UserRole } from "src/users/entities/user.entity";

export class SignUpResponseDto {
  id!: number;
  name!: string;
  email!: string;
  role!: UserRole;
}