const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  role: { type: String, enum: ['student', 'teacher', 'admin'], required: true}
});

const User = mongoose.model('User', userSchema);

async function createUser(email, plainPassword, role) {
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  const user = new User({ email, password: hashedPassword, role });
  await user.save();
  console.log('User created successfully');
  mongoose.disconnect();
}

// Change the values below to create users:
// Example: createUser('student1@example.com', 'yourpassword', 'student')
createUser('admin@example.com', 'adminpassword', 'admin')
createUser('yash@example.com', 'yashthakur15', 'admin')
createUser('abhi@example.com', 'abhiyadav15', 'admin')
createUser('charan@example.com', 'charan123', 'admin')
createUser('deepak@example.com', 'deepak123', 'admin')
  .catch(console.error);
