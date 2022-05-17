module.exports = class UserDTO {
  email;
  id;
  activated;
  role;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.activated = model.activated;
    this.role = model.role;
  }
};
