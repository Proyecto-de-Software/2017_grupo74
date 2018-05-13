const HealthControl = require('../models/health-control');

const permissionsCheck = require('../modules/permissions-check');

/**
 * Get all health controls
 * @param req
 * @param res
 * @returns void
 */
exports.getHealthControls = async function getHealthControls(req, res) {
  try {
    permissionsCheck(req.user, 'control_salud_index');

    const active = req.query.active || true;
    const { pageNumber, configuration } = req;
    const { webpage } = configuration;
    const { amountPerPage } = webpage;

    const healthControls = await HealthControl.find({ active })
      .populate('patient user')
      .limit(amountPerPage)
      .skip(amountPerPage*pageNumber)
      .exec();

    res.status(200).send({ healthControls });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};

/**
 * Save a health control
 * @param req
 * @param res
 * @returns void
 */
exports.addHealthControl = async function addHealthControl(req, res) {
  try {
    permissionsCheck(req.user, 'control_salud_new');

    const { healthControl } = req.body;

    if (!healthControl.date ||
        !healthControl.weight ||
        !healthControl.pc ||
        !healthControl.ppc ||
        !healthControl.height ||
        !healthControl.patient ||
        !healthControl.user) {
      return res.status(400).end();
    }

    const newHealthControl = new HealthControl(healthControl);
    const saved = await newHealthControl.save();

    return res.status(200).send({ healthControl: saved });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};

/**
 * Get a single health control by slug
 * @param req
 * @param res
 * @returns void
 */
exports.getHealthControl = async function getHealthControl(req, res) {
  try {
    permissionsCheck(req.user, 'control_salud_show');

    const healthControl = await HealthControl.findById(req.params.id)
      .populate('patient user')
      .exec();

    if (!healthControl) {
      return res.sendStatus(404);
    }

    res.status(200).json({ healthControl });
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
 * Delete a health control by slug
 * @param req
 * @param res
 * @returns void
 */
exports.deleteHealthControl = async function deleteHealthControl(req, res) {
  try {
    permissionsCheck(req.user, 'control_salud_destroy');

    await healthControl.findByIdAndUpdate(req.params.id, { active: false })
      .exec((error, healthControl) => {
        if (error || healthControl == null) {
          res.status(422).json({ error: 'No healthControl found with that id' });
          return next(error);
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

exports.updateHealthControl = async function updateHealthControl(req, res) {
  try {
    permissionsCheck(req.user, 'control_salud_update');

    await healthControl.findByIdAndUpdate(req.params.id, req.body.healthControl)
      .exec((error, healthControl) => {
        if (error || healthControl == null) {
          res.status(422).json({ error: 'No healthControl found with that id' });
          return next(error);
        }

        return res.status(200).json({ healthControl });
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
