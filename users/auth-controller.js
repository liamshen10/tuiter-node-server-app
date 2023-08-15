import * as usersDao from "./users-dao.js";


const AuthController = (app) =>   {

  const register = async (req, res) => {
    const user = await usersDao.findUserByUsername(req.body.username);
    if (user) {
      res.sendStatus(403);
      return;
    }
    const newUser = await usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };
  
 
  const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        req.session["currentUser"] = user;
        res.json(user);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  };
  
 
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  };
 
  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  
 
  const update = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    const updates = req.body;
    const user = usersDao.updateUser(currentUser._id, updates);
    req.session["currentUser"] = usersDao.findUserById(currentUser._id);
    res.json(req.session["currentUser"]);
  };
  


  
 app.post("/api/users/register", register);
 app.post("/api/users/login",    login);
 app.post("/api/users/profile",  profile);
 app.post("/api/users/logout",   logout);
 app.put ("/api/users",          update);
 //For testing and seeing registered users
 app.get("/api/testing", (req, res) => {
  const users = usersDao.findAllUsers();
  res.json(users);
});
};
export default AuthController;