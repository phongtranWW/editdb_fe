export interface User {
  sub: string;
  email: string;
  role: string[];
  iat: number;
  exp: number;
}
