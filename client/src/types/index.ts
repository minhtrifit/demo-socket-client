export interface UserType {
  id: number;
  name: { firstname: string; lastname: string };
  token: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}
