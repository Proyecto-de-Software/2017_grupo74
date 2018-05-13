const _ = require('lodash');

const permissionsCheck = require('../modules/permissions-check');

const Permission = require('../models/permission');
const Rol = require('../models/rol');

/**
 * Get all roles
 * @param req
 * @param res
 * @returns void
 */
exports.getRoles = async function getRoles(req, res) {
  try {
    permissionsCheck(req.user, 'rol_index');

    const deleted = req.query.deleted || false;
    const { pageNumber, configuration } = req;
    const { webPage } = configuration;
    const { amountPerPage } = webPage;

    const roles = await Rol.find({ deleted })
      .limit(amountPerPage)
      .skip(amountPerPage*page)
      .populate('permissions')
      .exec();

    res.status(200).send({ roles });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};

/**
 * Save a rol
 * @param req
 * @param res
 * @returns void
 */
exports.addRol = async function addRol(req, res) {
  try {
    permissionsCheck(req.user, 'rol_new');

    const { rol } = req.body;

    if (!rol.name) {
      return res.status(400).end();
    }

    await Permission.count({
      _id: {
        $in: rol.permissions,
      },
    }, (error, count) => {
      if (count > 0) {
        return res.status(403);
      }

      const newRol = new Rol(rol);
      const saved = newRol.save();

      return res.status(201).send({ rol: saved });
    });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};

/**
 * Get a single rol by slug
 * @param req
 * @param res
 * @returns void
 */
exports.getRol = async function getRol(req, res) {
  try {
    permissionsCheck(req.user, 'rol_show');

    const rol = await Rol.findById(req.params.id).populate('permissions').exec();

    if (!rol) {
      return res.sendStatus(404);
    }

    res.status(200).send({ rol });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    if (e.name === 'CastError') {
      return res.sendStatus(400);
    }

    return res.status(500).send(e);
  }
};

/**
 * Delete a rol by slug
 * @param req
 * @param res
 * @returns void
 */
 exports.deleteRol = async function deleteRol(req, res) {
   try {
     permissionsCheck(req.user, 'rol_delete');

     await Rol.findByIdAndUpdate(req.params.id, { deleted: true })
     .exec((err, rol) => {
       if (err || rol == null) {
         res.status(422).json({ error: 'No rol was found with that id' });
         return next(err);
       }

       return res.status(200).end();
     });
   } catch (e) {
     if (e.name === 'NotAllowedError') {
       return res.status(403).send(e);
     }

     if (e.name === 'CastError') {
       return res.sendStatus(400);
     }

     return res.status(500).send(e);
   }
 };

exports.deleteRolPermission = async function deleteRolPermission(req, res) {
  try {
    permissionsCheck(req.user, 'rol_delete');

    await Rol.findById(req.params.id)
    .exec((err, rol) => {
      if (err || rol == null) {
        res.status(422).json({ error: 'No rol was found with that id' });
        return next(err);
      }

      rol.permissions = _.remove(rol.permissions, permission => {
        return permission._id == req.permission;
      });

      return res.status(200).json({ rol });
    });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};

exports.updateRol = async function updateRol(req, res, next) {
  try {
    permissionsCheck(req.user, 'rol_update');

    await Rol.findByIdAndUpdate(req.params.id, req.body.rol)
      .exec((err, rol) => {
        if (err || rol == null) {
          res.status(422).json({ error: 'No rol was found with that id.' });
          return next(err);
        }

        return res.status(200).json({ rol });
      });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    return res.status(500).send(e);
  }
};
