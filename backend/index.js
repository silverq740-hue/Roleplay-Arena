const express = require('express');
const cors = require('cors');
const path = require('path');
const chatRoutes = require('./routes/chat');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Chat API
app.use('/chat', chatRoutes);

// Character upload route
app.post('/upload', upload.single('image'), (req, res) => {
  if(!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ path: `/uploads/${req.file.filename}` });
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
