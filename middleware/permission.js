module.exports = function permit(...allowed) {
  const isAllowed = user_type_id => allowed.indexOf(user_type_id) > -1;

  return (req, res, next) => {
    if (req.user && isAllowed(req.user.user_type_id)) {
      next();
    } else {
      res.status(403).send("Acceso denegado");
    }
  };
};
