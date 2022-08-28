const express = require("express");
const path = require("path"); //deploy
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const User = require("./models/user");
const Note = require("./models/note");
// const { result } = require("lodash");
const secret = process.env.SECRET || "secretcode";

//connecting to db "nazar"
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose Is Connected");
  }
);

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://nazar-job.herokuapp.com", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app;
app.use(
  session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(secret));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//for deploy
app.use(express.static(path.join(__dirname, "client", "build")));
//--------------------- END OF MIDDLEWARE----------------------

//login user
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        // res.send("Successfully Authenticated");
        res.send(req.user.username);
        console.log(req.user.username);
      });
    }
  })(req, res, next);
});

//register new user
app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

//find Note for List page
app.post("/list", (req, res) => {
  Note.find(
    { name: req.body.username, date: req.body.date },
    function (err, doc) {
      if (err) throw err;
      if (doc) {
        console.log(doc);
        res.send(doc);
      }
    }
  );
});

//delete Note
app.post("/delete", (req, res) => {
  Note.findOneAndDelete({ _id: req.body.id }, function (err, doc) {
    if (err) throw err;
    if (doc) {
      console.log(doc);
    }
  });
});

app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

//new note
app.post("/new", (req, res) => {
  let newNote = req.body;
  if (newNote) {
    let amount = Number(newNote.end) - Number(newNote.start);
    newNote.amount = amount;
  }
  const createdNote = new Note({
    name: newNote.userName,
    date: newNote.date,
    place: newNote.place,
    start: newNote.start,
    end: newNote.end,
    amount: newNote.amount,
  });
  createdNote.save();
  res.send("Note Created");

  console.log(newNote);
});

//for deploy
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client","build","index.html"));
});

//Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
