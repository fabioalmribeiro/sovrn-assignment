import { Schema, model } from 'mongoose';

import Numeral from '../interfaces/Numeral';

const NumeralSchema = new Schema<Numeral>({
  roman: { type: String },
  arabic: { type: Number }
});

const NumeralModel = model<Numeral>('Numeral', NumeralSchema);

export default NumeralModel;
