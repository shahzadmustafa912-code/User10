import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';

dotenv.config();

const seedUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'AdminPass123',
    role: 'admin',
    status: 'active',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'UserPass123',
    role: 'user',
    status: 'active',
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'ModPass123',
    role: 'moderator',
    status: 'inactive',
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing users
    await User.deleteMany({});
    console.log('✅ Cleared existing users');

    // Insert seed users
    await User.insertMany(seedUsers);
    console.log('✅ Seed users created successfully');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
