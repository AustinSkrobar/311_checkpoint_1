const users = require("../data/index");
const apiError = require("../error/ApiError");

const list = (req, res, next) => {
  if (!users) {
    next(apiError.badRequest("msg field is required and must be non blank"));
    return;
  }
  res.send(users);
};

const show = (req, res, next) => {
  let id = parseInt(req.params.id);
  let user = users.find((user) => user.id === id);

  if (!user) {
    next(apiError.badRequest("No such user exist."));
    return;
  }
  res.send(user);
};

const create = (req, res, next) => {
  let payload = req.body;
  
  if(payload.id == undefined || payload.id == false){
    next(apiError.badRequest("either no id was given or no information was sent"));
    return;
  }
  
  payload.id = users.length + 1;

  users.push(payload);

  res.send(users);
};

const update = (req, res, next) => {
  let id = parseInt(req.params.id);

  let payload = req.body;

  //look up user
  let user = users.find((user) => user.id === id);

  if (users.length < id) {
    next(apiError.badRequest("No such user exist."));
    return;
  }else  if (user.id !== payload.id) {
    next(apiError.badRequest("No user with that id"));
    return;
  }

  //change value on the user
  Object.keys(payload).map((key) => {
    user[key] = payload[key];
  });


  payload.id = users[id].id - 1;
  //return the update
  res.send(users);
};

const remove = (req, res, next) => {
  let id = parseInt(req.params.id);

  let user = users.find((user) => user.id === id);
  //checking to make sure there is a user to delete
  if (!user) {
    next(apiError.badRequest("bad request"));
    return;
  }

  //had to get the id subtracted by 1 for 0 value in splice
  const properId = user.id - 1;
  //splice to remove the user at the proper id
  users.splice(properId, 1);
  //then for the rest of the elements that are greater than the user we just erased subtract their ID by 1 to keep the list consistant
  users.forEach((element) => {
    if (element.id > user.id) {
      element.id -= 1;
    }
  });

  res.send(users);
};

module.exports = { list, show, create, update, remove };
