const express = require('express');
const morgan = require('morgan');
var path = require('path');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const settingRouter = require('./routes/settingRoutes');
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const subCategoryRouter = require('./routes/subCategoryRoutes');
const commentRouter = require('./routes/commentsRoutes');
const viewsRouter = require('./routes/viewsRoutes');
const userRouter = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

//MIDDLEWARES
app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//ROUTES

app.use('/', viewsRouter);
app.use('/api/settings', settingRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/subcategories', subCategoryRouter);
app.use('/api/products', productRouter);
app.use('/api/comments', commentRouter);
app.use('/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Not found!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;