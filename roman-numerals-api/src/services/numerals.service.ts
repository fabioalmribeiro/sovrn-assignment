import _ from 'lodash';

import NumeralModel from '../models/Numeral';
import Params from '../interfaces/Params';
import Numeral from '../interfaces/Numeral';

const ROMAN_NUMERAL = {
  'M': 1000,
  'D': 500,
  'C': 100,
  'L': 50,
  'X': 10,
  'V': 5,
  'I': 1
};

class NumeralsService {

  async getAllNumeralsList(): Promise<Numeral[]> {
    return await NumeralModel.find({});
  }

  async getArabicNumeral({ inputValue }: Params): Promise<Numeral> {
    const numeral = await NumeralModel.findOne({ roman: inputValue });

    if (!numeral) {
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

  async getRomanNumeral({ inputValue }: Params): Promise<Numeral> {
    const numeral = await NumeralModel.findOne({ arabic: inputValue });

    if (!numeral) {
      const arabic = Number(inputValue);
      const roman = this.convertToRoman(arabic);

      const newNumeral = new NumeralModel({ roman, arabic });
      return await newNumeral.save();
    }

    return numeral;
  }

  async removeAllNumerals(): Promise<void> {
    await NumeralModel.deleteMany();
    return;
  }

  convertToRoman(arabic: number) {
    let roman = '';

    for (const key of Object.keys(ROMAN_NUMERAL)) {
      const value = Math.floor(arabic / ROMAN_NUMERAL[key]);
      arabic -= value * ROMAN_NUMERAL[key];
      roman += key.repeat(value);
    }

    return roman;
  }

}

export default NumeralsService;
