var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var manufacturerRouter = require('./routes/manufacturerRoute');
var modelRouter = require('./routes/modelRoute');
var departmentRouter = require('./routes/departmentRoute');
var addressRouter = require('./routes/addressRoute');

var manApiRouter = require('./routes/api/ManufacturerApiRoute');
var modApiRouter = require('./routes/api/ModelApiRoute');
var depApiRouter = require('./routes/api/DepartmentApiRoute');
var adrsApiRouter = require('./routes/api/AddressApiRoute');

var app = express();
var cors = require('cors');

//Cross-Origin Resource Sharing
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/manufacturer', manufacturerRouter);
app.use('/model', modelRouter);
app.use('/department', departmentRouter);
app.use('/address', addressRouter);

app.use('/api/manufacturers', manApiRouter);
app.use('/api/models', modApiRouter);
app.use('/api/departments', depApiRouter);
app.use('/api/addresses', adrsApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
