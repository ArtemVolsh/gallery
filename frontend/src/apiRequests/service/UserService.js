import $api from "..";

export default class UserService {
  static fetchUsers() {
    return $api.get("/users");
  }
}
