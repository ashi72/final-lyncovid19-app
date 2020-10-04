const express = require ('express');
const router = express.Router();
const User = require("../../models/User");


router.post('/login', (req, res) => {
  console.log('I hit the endpoint')
  User.findOne({email: req.body.email}).then(user => {
    if (user) {
      return res.status(404).send({
        message: "This user already exists"
      });
    } else {
      const newUser = new User ({
        first_name : req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        google_url: ''
      })
      newUser
        .save()
        .then (user => res.json ({status: 'Success'}))
        .then (user => res.json (console.log('add user')))
        .catch (err => res.json (console.log(err)))
      res.json(201, newUser)
    }
  })

  router.put("/update/:email", (req, res) => {
    User.findOneAndUpdate({email: req.params.email}, {
      google_url: req.body.google_url
    }).then(user => {
      if (!user) {
        return res.status(400).send({
          message: "This user does not exist"
        })
      }
      return res.status(200).send(user);
    })
  })

  router.get("/geturl/:email", (req, res) => {
    User.findOne({email: req.params.email}).then(user => {
      if (!user) {
        return res.status(400).send({
          message: "This user does not exist!"
        })
      }
      return res.status(200).send(user.google_url);
    })
  })
})

module.exports = router;
