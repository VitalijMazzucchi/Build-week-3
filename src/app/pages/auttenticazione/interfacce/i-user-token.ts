export interface IUserToken {
  AccessToken: string;
  user: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    roles: string;
  };
}
