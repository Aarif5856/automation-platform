const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Mock user storage (in production, use MongoDB)
let users = [];
let nextUserId = 1;

// Configure Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let user = users.find(u => u.googleId === profile.id);
      
      if (user) {
        return done(null, user);
      }
      
      // Create new user
      const newUser = {
        id: nextUserId++,
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        provider: 'google',
        createdAt: new Date(),
        isActive: true
      };
      
      users.push(newUser);
      return done(null, newUser);
    } catch (error) {
      return done(error, null);
    }
  }
));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

module.exports = { passport, users };
