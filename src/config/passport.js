const passport = require("passport");
const LocalStrategy = require("passport-local");
const tenantusers = require("../models/TenantUsers");
const User = new tenantusers();

passport.use(
  new LocalStrategy(
    {usernameField: "email", passwordField: "password"},
    async (email, password, done) => {
      let user = await tenantusers.findOne({email});
      if (!user) {
        return done(null, false, {
          message: "El email no se Encuentra Registrado",
          email,
          tipo: "email",
        });
      } else {
        const match = await user.matchPassword(password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Contraseña Errada",
            tipo: "pass",
          });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  tenantusers.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
