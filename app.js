const express = require('express');
const path = require("node:path");
const indexRouter = require('./routes/indexRouter');
const productsRouter = require('./routes/productsRouter');
const categoryRouter = require('./routes/categoryRouter');
// console.log(categoryRouter)


const app = express();
const port = 3000;



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);
app.use('/product', productsRouter);
app.use('/categories', categoryRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);






