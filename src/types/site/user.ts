export enum Role {
  USER = "User",
  ADMINISTRATOR = "Administrator",
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  phone: string;
  vendor: string;
  enabled: boolean;
  roles: [Role.USER];
}
