const fs = require('fs');
const path = require('path');

// Create .env file for server if it doesn't exist
const serverEnvPath = path.join(__dirname, 'server', '.env');
const serverEnvExamplePath = path.join(__dirname, 'server', '.env.example');

if (!fs.existsSync(serverEnvPath)) {
  const envContent = `MONGODB_URI=mongodb://localhost:27017/driving-school
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random-123456789
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key`;

  fs.writeFileSync(serverEnvPath, envContent);
  console.log('✅ Created server/.env file');
}

// Create .env.example file for server
const envExampleContent = `MONGODB_URI=mongodb://localhost:27017/driving-school
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key`;

fs.writeFileSync(serverEnvExamplePath, envExampleContent);
console.log('✅ Created server/.env.example file');

console.log('\n🚀 Setup complete!');
console.log('\nTo start the application:');
console.log('1. Make sure MongoDB is running');
console.log('2. Run: npm run dev');
console.log('\nOr start servers separately:');
console.log('- Backend: cd server && npm run dev');
console.log('- Frontend: cd client && npm start');
