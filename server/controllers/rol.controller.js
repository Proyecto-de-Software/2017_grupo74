const Permission = require('../models/permission');
const Rol = require('../models/rol');

/**
 * Get all roles
 * @param req
 * @param res
 * @returns void
 */
exports.getRoles = async function(req, res) {
  try {
    const roles = await Rol.find({}).populate('permissions').exec();

    res.status(200).send({roles});
  } catch (e) {
    res.status(500).send(e);
  }
};

/**
 * Save a rol
 * @param req
 * @param res
 * @returns void
 */
exports.addRol = async function(req, res) {
  try {
    const {rol} = req.body;

    if (!rol.name) {
      return res.status(403).end();
    }

    const badRequest = rol.permissions.find(permissionId => {
      let permission = Permission.findOne({id: permissionId}).exec();
      return !permission;
    });

    if (badRequest) {
      return res.status(403);
    }

    const newRol = new Rol(rol);
    const saved = await newRol.save();

    return res.status(200).send({rol: saved});
  } catch (e) {
    res.status(500).send(e);
  }
};

/**
 * Get a single rol by slug
 * @param req
 * @param res
 * @returns void
 */
exports.getRol = async function(req, res) {
  try {
    const rol = await Rol.findOne({
      id: req.params.id
    }).populate('permissions').exec();

    if (!rol) {
      return res.sendStatus(404);
    }

    res.status(200).json({rol});
  } catch (e) {
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
exports.deleteRol = async function(req, res) {
  try {
    const rol = await Rol.findOne({id: req.params.id}).exec();

    if (!rol) {
      return res.sendStatus(404);
    }

    await rol.remove();
    res.sendStatus(200);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.sendStatus(400);
    }

    return res.status(500).send(e);
  }
};

exports.deleteRolPermission = async function(req, res) {
  try {

  } catch (e) {
    res.status(500).send(e);
  }
};