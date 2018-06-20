const mongoose = require('mongoose');

const { Schema } = mongoose;

const ApartmentType = require('./apartment-type');
const HeatingType = require('./heating-type');
const WaterType = require('./water-type');

const demographicDataSchema = new Schema({
  refrigerator: {
    type: Boolean,
    required: 'El campo `refrigerador` es requerido',
  },
  electricity: {
    type: Boolean,
    required: 'El campo `electricidad` es requerido',
  },
  pet: {
    type: Boolean,
    required: 'El campo `mascota` es requerido',
  },
  apartmentType: {
    type: Schema.Types.ObjectId,
    ref: 'ApartmentType',
    required: 'El campo `tipo de vivienda` es requerido',
  },
  heatingType: {
    type: Schema.Types.ObjectId,
    ref: 'HeatingType',
    required: 'El campo `tipo de calefacción` es requerido',
  },
  waterType: {
    type: Schema.Types.ObjectId,
    ref: 'WaterType',
    required: 'El campo `tipo de agua` es requerido',
  },
});

module.exports = mongoose.model('DemographicData', demographicDataSchema);
