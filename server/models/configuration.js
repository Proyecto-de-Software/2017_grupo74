const mongoose = require('mongoose');

const { Schema } = mongoose;

require('./user');

const configurationSchema = new Schema({
  webpage: {
    name: { type: String, required: 'El campo `nombre` es requerido' },
    amountPerPage: { type: Number },
    email: { type: String, trim: true, required: 'El campo `email` es requerido' },
    description: { type: String, trim: true },
  },
  appointments: {
    from: { type: Number },
    delta: { type: Number },
    amount: { type: Number },
  },
  maintenance: { type: Boolean },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

configurationSchema.pre('save', function (next) {
  const { from, delta, amount } = this.appointments;

  if (from + amount * delta / 60 > 24) {
    next(new Error('La cantidad de turnos es invalida.'));
    return;
  }

  next();
});

module.exports = mongoose.model('Configuration', configurationSchema);
