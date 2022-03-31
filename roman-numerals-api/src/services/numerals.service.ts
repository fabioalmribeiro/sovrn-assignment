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

// M{0,3} specifies the thousands section and basically restrains it to between 0 and 4000
// (CM|CD|D?C{0,3}) is for the hundreds section.
// (XC|XL|L?X{0,3}) is for the tens place.
// (IX|IV|V?I{0,3}) is the units section.
const romanRegEx = new RegExp('^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$');
class NumeralsService {

  async getAllNumeralsList(): Promise<Numeral[]> {
    const numerals = await NumeralModel.find({});

    return numerals;
  }

  async getArabicNumeral({ inputValue }: Params): Promise<Numeral> {
    if (!inputValue.match(romanRegEx)) {
      // Not a valid roman numeral
      throw 400;
    }

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
