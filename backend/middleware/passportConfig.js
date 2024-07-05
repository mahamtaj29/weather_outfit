const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
// Import the User model for database
const User = require("../models/userModel");
// Define options for JWT authentication strategy
const opts = {
  // Extract JWT from the Authorization header as Bearer token
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  // Secret key used to verify the JWT signature
  secretOrKey: process.env.JWT_SECRET,
};
// Export a function that configures Passport to use JWT authentication
module.exports = (passport) => {
  // Use a new instance of JwtStrategy with defined options and callback function
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        // Find user in the database by ID extracted from JWT payload
        const user = await User.findById(jwt_payload.id);
        // If user is found, authenticate the request
        if (user) {
          // Call done callback with user object (authentication successful)
          return done(null, user);
        }
        // Call done callback with false (authentication failed)
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
