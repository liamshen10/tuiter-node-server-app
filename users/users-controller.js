import * as usersDao from "./users-dao.js";

const UserController = (app) => {
   app.get('/api/users', findAllUsers)
   app.get('/api/users/:uid', findUserById);
   app.post('/api/users', createUser);
   app.delete('/api/users/:uid', deleteUser);
   app.put('/api/users/:_id', updateUser);
}
const updateUser = async (req, res) => {
  const id = req.params._id;
  console.log("id: " + id);
  const status = await usersDao.updateUser(id, req.body);
  console.log(status);
  const user = await usersDao.findUserById(id);
  console.log(user);
  req.session["currentUser"] = user;
  res.json(status);
};

   
   const createUser = async (req, res) => {
    const newUser = await usersDao.createUser(req.body);
    res.json(newUser);
  };
  
  const deleteUser = async (req, res) => {
    const id = req.params._id;
    const status = await usersDao.deleteUser(id);
    res.json(status);
  };
  
  const findUserById = async (req, res) => {
    const id = req.params._id;
    const user = await usersDao.findUserById(id);
    res.json(user);
  };
  
  const findAllUsers = async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } else if (username) {
      const user = await usersDao.findUserByUsername(username);
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } else {
      const users = await usersDao.findAllUsers();
      res.json(users);
    }
  };
  
export default UserController;