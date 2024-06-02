const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const jwtSecret = 'c0b28f95dc7ae195437b83f13b1a98c13a9126c0272bc0de3d1a3933cbf670914377cf'

class loginController {

    async register(req, res, next) {
        const { username, password } = req.body
        if (password.length < 6) {
          return res.status(400).json({ 
            status: 400,
            message: "Password less than 6 characters" 
          })
        }
        bcrypt.hash(password, 10).then(async (hash) => {
            await User.create({
              username,
              password: hash,
            })
              .then((user) => {
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                  { id: user._id, username, role: user.role },
                  jwtSecret,
                  {
                    expiresIn: maxAge, // 3hrs in sec
                  }
                );
                res.cookie("jwt", token, {
                  httpOnly: true,
                  maxAge: maxAge * 1000, // 3hrs in ms
                });
                res.status(201).json({
                  status: 200,
                  message: "User successfully created",
                  user: user._id,
                  role: user.role
                });
              })
              .catch((error) =>
                res.status(400).json({
                  status: 400,
                  message: "User not successful created",
                  error: error.message,
                })
              );
          });
    }

    async login(req, res) {
        const { username, password } = req.body
        // Check if username and password is provided
        if (!username || !password) {
          return res.status(400).json({
            status: 400,
            message: "Username or Password not present"
          })
        }

        try {
            User.findOne({ username })
            .then((user) => {
              if (!user) {
                res.status(400).json({
                  status: 400,
                  message: "Login not successful",
                  error: "User not found",
                })
              } else {
                  bcrypt.compare(password, user.password).then(function (result) {
                      if (result) {
                        const maxAge = 3 * 60 * 60;
                        const token = jwt.sign(
                          { id: user._id, username, role: user.role },
                          jwtSecret,
                          {
                            expiresIn: maxAge, // 3hrs in sec
                          }
                        );
                        res.cookie("jwt", token, {
                          httpOnly: true,
                          maxAge: maxAge * 1000, // 3hrs in ms
                        });
                        res.status(201).json({
                          status: 200,
                          message: "User successfully Logged in",
                          user: user._id,
                          role: user.role
                        });
                      } else {
                        res.status(400).json({ 
                          status: 400,
                          message: "Login not succesful" 
                        });
                      }
                    });
                  }
            })
          } catch (error) {
            res.status(400).json({
              status: 400,
              message: "An error occurred",
              error: error.message
            })
          }
    }
}

module.exports = new loginController();