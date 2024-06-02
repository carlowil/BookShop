const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser");
const multer  = require("./middleware/image");

const app = express();
app.use(express.json());
app.use(cookieParser());

const connectDb = require("./db");
const homeRouter = require("./routes/homeRouter");
const bookRouter = require("./routes/bookRouter");
const loginRouter = require("./routes/loginRouter");
const feedbackRouter = require("./routes/feedbackRouter");

connectDb();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/images')));
app.use(express.static(path.join(__dirname, '/store')));
app.use(multer.multer);
app.use("/", homeRouter);
app.use("/api/auth", loginRouter);
app.use("/api/book", bookRouter);
app.use("/api/feedback", feedbackRouter);

app.get("*", function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(404).render('404', {});
});

const server = app.listen(8080, () => {
    console.log("server listening on port 8080");
})

process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
  })

