var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');

var galery = require('./routes/galery');
var config = require('./config');
var session = require('cookie-session');
var reg = require('./routes/reg');

var checkAuth = require('./utils/checkAuth');
var auth = require('./routes/auth');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));//шаблоны
app.set('view engine', 'jade');//указываем какие шаблоны будем использовать

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));// все статичные файлы должны находится в папке паблик

app.use(session({
  keys: ['key1', 'key2']
}))

app.use(function(req, res, next){
  res.locals = {
  userid: req.session.user
  };
  next();
});

app.get('/logout',checkAuth, reg.logout);
app.get('/cabinet',checkAuth, auth.cabinet);

app.get('/reg', reg.index);
app.get('/', routes.index);//добавляются прослушиватели
app.use('/users', users);
app.get('/galery', galery.index);
app.get('/index/add', routes.add);// прослушка добавления данных к БД
app.get('/:id', routes.index);

app.post('/reg', reg.send);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
//добавляет к коду промежуточное ПО, которое выыполняется до контроллеров
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
styles = config.get('styles');
scripts = config.get('scripts');




/*
app.use(function(req, res, next){
    res.locals = {
	scripts: config.get('scripts'),
	styles: config.get('styles'),
	title: 'Название сайта',
	}
	next();
});
*/
//app.local.styles = config.get('style');

app.listen(config.get('port'));
module.exports = app;
