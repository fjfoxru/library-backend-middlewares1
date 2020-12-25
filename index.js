const express = require('express');
const formData = require("express-form-data");
const cors = require('cors');


const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');
const fileMiddleware = require('./middleware/file');

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');
const userRouter = require('./routes/user');

const app = express();


app.use(formData.parse());
app.use(cors());
app.use(loggerMiddleware);
app.use(fileMiddleware);

app.use('/files', express.static(__dirname+'/public'));

app.use('/', indexRouter);
app.use('/api/books', booksRouter);
app.use('/user', userRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`server listen ${PORT}`);
});