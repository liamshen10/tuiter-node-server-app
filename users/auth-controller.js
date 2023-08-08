import * as usersDao from "./users-dao.js";


const AuthController = (app) => {
  
  const register = (req, res) => {
    const username = req.body.username;
    const user = usersDao.findUserByUsername(username);
    if (user) {
      res.sendStatus(409);
      return;
    }
    const newUser = usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };
 
  const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = usersDao.findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.sendStatus(404);
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
  const userId = req.params.id; // assuming you pass the user ID in the URL
  const updates = req.body;

  const user = usersDao.findUserById(userId);
  if (!user) {
    res.sendStatus(404); // Not found if the user doesn't exist
    return;
  }

  // Check if the current user is allowed to update this profile
  const currentUser = req.session["currentUser"];
  if (currentUser.id !== userId) {
    res.sendStatus(403); // Forbidden if not the current user
    return;
  }

  const updatedUser = usersDao.updateUser(userId, updates);
  res.json(updatedUser);
};

 app.post("/api/users/register", register);
 app.post("/api/users/login",    login);
 app.post("/api/users/profile",  profile);
 app.post("/api/users/logout",   logout);
 app.put ("/api/users",          update);
 app.get("/api/blah", (req, res) => {
  const users = usersDao.findAllUsers();
  res.json(users);
});
};
export default AuthController;