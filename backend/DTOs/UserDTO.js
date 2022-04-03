module.exports = class UserDTO {
  username;
  email;
  id;
  activated;
  role;

  constructor(model) {
    this.username = model.username;
    this.email = model.email;
    this.id = model._id;
    this.activated = model.activated;
    this.role = model.role;
  }
};
