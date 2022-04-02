import _ from 'lodash';

import NumeralModel from '../models/Numeral';
import Params from '../interfaces/Params';
import Numeral from '../interfaces/Numeral';

const ROMAN_NUMERAL = {
  'I': 1,
  'V': 5,
  'X': 10,
  'L': 50,
  'C': 100,
  'D': 500,
  'M': 1000
};

class NumeralsService {

  async getAllNumeralsList(): Promise<Numeral[]> {
    const numerals = await NumeralModel.find({});

    return numerals;
  }

  async getArabicNumeral({ inputValue }: Params): Promise<Numeral> {
    const numeral = await NumeralModel.findOne({ roman: inputValue });

    if (!numeral) {
      // First time value
      const arabic = _.reduce(inputValue, (total, curr) => {
        return total += ROMAN_NUMERAL[curr];
      }, 0);

      const newNumeral = new NumeralModel({
        roman: inputValue,
        arabic
      });

      return await newNumeral.save();
    }

    return numeral;
  }

}

export default NumeralsService;
