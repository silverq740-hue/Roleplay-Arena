const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend')); // serve index.html, css, js

app.use('/chat', chatRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
