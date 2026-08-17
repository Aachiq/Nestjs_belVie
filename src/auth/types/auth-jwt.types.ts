export interface JwtPayloadType {
  sub: number;
  email: string;
  iat?: number;
  exp?: number;
}