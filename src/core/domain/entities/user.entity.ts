export class User {
  id: number;
  username: string;
  password: string;

  constructor(username: string, password: string) {
    if (!username) {
      throw new Error("Username can't be empty");
    }

    if (!password) {
      throw new Error("Password can't be empty");
    }

    this.username = username;
    this.password = password;
  }
}
