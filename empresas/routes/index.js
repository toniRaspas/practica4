
var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
  res.send('Añade a la url /departamento o /empleados en funcion de lo que quieras consultar');
});

module.exports = router;
