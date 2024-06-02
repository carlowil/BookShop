const jwt = require("jsonwebtoken")
const jwtSecret = 'c0b28f95dc7ae195437b83f13b1a98c13a9126c0272bc0de3d1a3933cbf670914377cf'
exports.adminAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.redirect('/login')
        // return res.status(401).json({
        //   status: 401,
        //   message: "Not authorized" 
        // })
      } else {
        if (decodedToken.role !== "admin") {
          return res.redirect('/login')
          // return res.status(401).json({
          //   status: 401,
          //   message: "Not authorized"
          //  })
        } else {
          next()
        }
      }
    })
  } else {
      res.redirect("/login");
    // return res
    //   .status(401)
    //   .json({ 
    //     status: 401,
    //     message: "Not authorized, token not available" 
    //   })
  }
}

exports.userAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          res.redirect("/login");
          // return res.status(401).json({ 
          //   status: 401,
          //   message: "Not authorized" 
          // })
        } else {
          if (decodedToken.role !== "user") {
            res.redirect("/login");
            // return res.status(401).json({ 
            //   status: 401,
            //   message: "Not authorized" 
            // })
          } else {
            next()
          }
        }
      })
    } else {
      res.redirect("/login");
      // return res
      //   .status(401)
      //   .json({ 
      //     status: 401,
      //     message: "Not authorized, token not available"
      //    })
    }
  }