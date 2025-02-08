const express = require('express');
const cors = require('cors');
const http = require('http');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const authMiddleware = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const initializeSocket = require('./utils/socket');
const profileRoutes = require('./routes/profile');


require('dotenv').config();

const app = express();


app.use(cors({
  origin: "https://event-management-client-x8h9.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));


app.use(cookieParser());
const server = http.createServer(app);

initializeSocket(server);




 


connectDB();


app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/events', authMiddleware, eventRoutes);
app.use('/',authMiddleware, profileRoutes )









const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
