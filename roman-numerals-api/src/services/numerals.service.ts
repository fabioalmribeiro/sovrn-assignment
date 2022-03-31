import NumeralModel from '../models/Numeral';

class NumeralsService {

  async getAllNumeralsList(): Promise<any[]> {
    const numerals = await NumeralModel.find({});

    return numerals;
  }

}

export default NumeralsService;
