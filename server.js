var express = require('express'),
app     = express(),
morgan  = require('morgan');
const dirTree = require('directory-tree');
const tree = dirTree('.');
console.log(tree);

console.log(process.env.OPENSHIFT_DATA_DIR );

app.use(morgan('combined')) // http logging

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.use(express.static('.'));

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
