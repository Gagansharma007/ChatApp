const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const connectDb = require('./config/db.js');
const { notFound , errorHandler } = require('./middleware/errorMiddleware.js');
const userRoutes = require('./routes/userRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');
const getAllUsersRoutes = require('./routes/getAllUsersRoute.js');
const cors = require('cors');
const port = process.env.PORT || 5000;

connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes );
app.use('/api/allusers', getAllUsersRoutes );

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));