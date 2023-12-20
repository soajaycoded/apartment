const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const path = require('path');

const app = express();
const PORT = process.env.PORT || 3140;

// Middleware
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(path.join(__dirname, 'public')));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})




// MongoDB connection
mongoose.connect("mongodb+srv://empirorgodz:5s5gFYrpblgsiHz5@cluster0caps.acf3erq.mongodb.net/ABMS", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


//create data schema

const bookingsSchema = {
  name: String,
  email: String,
  contactno: String,
  address: String,
  roomtype: String,
  payment: String,
  gcash: String,
  referenceno: String
}

//model

const bookings = mongoose.model("bookings", bookingsSchema);

app.post("/", function(req, res) {
  let newbookings = new bookings({
    name: req.body.name,
    email: req.body.email,
    contactno: req.body.contactno,
    address: req.body.address,
    roomtype: req.body.roomtype,
    payment: req.body.payment,
    gcash: req.body.gcash,
    referenceno: req.body.referenceno
  })
  newbookings.save();
  res.redirect('/');
})



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



