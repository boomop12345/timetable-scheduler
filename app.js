const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// User schema & model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  role: { type: String, enum: ['student', 'teacher', 'admin'], required: true}
});
const User = mongoose.model('User', userSchema);

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ role: user.role });
  } catch(err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Server start
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  data: Object,
  createdAt: { type: Date, default: Date.now }
});

