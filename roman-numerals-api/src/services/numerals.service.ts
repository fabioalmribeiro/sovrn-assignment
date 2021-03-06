import _ from 'lodash';

import NumeralModel from '../models/Numeral';
import Params from '../interfaces/Params';
import Numeral from '../interfaces/Numeral';

const ROMAN_NUMERAL = {
  'M': 1000,
  'CM': 900,
  'D': 500,
  'CD': 400,
  'C': 100,
  'XC': 90,
  'L': 50,
  'XL': 40,
  'X': 10,
  'IX': 9,
  'V': 5,
  'IV': 4,
  'I': 1
};

class NumeralsService {

  async getAllNumeralsList(): Promise<Numeral[]> {
    return await NumeralModel.find({});
  }

  async getArabicNumeral({ inputValue }: Params): Promise<Numeral> {
    const numeral = await NumeralModel.findOne({ roman: inputValue });

    if (!numeral) {
      const arabic = this.convertToArabic(inputValue);

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

  async removeAllNumerals(): Promise<{ deletedCount: number }> {
    return await NumeralModel.deleteMany();
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

  convertToArabic(roman: string) {
    return _.reduce(roman, (total: number, curr: string, index: number, value: string) => {
      if (ROMAN_NUMERAL[value[index + 1]] > ROMAN_NUMERAL[curr]) {
        return total -= ROMAN_NUMERAL[curr];
      } else {
        return total += ROMAN_NUMERAL[curr];
      }
    }, 0);
  }

}

export default NumeralsService;
