const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
      if (!rolesPermitidos.includes(req.user.rol)) {
        return res.status(403).json({ mensaje: 'No autorizado para realizar esta acción' });
      }
      next();
    };
  };
  
  module.exports = { verificarRol };
  