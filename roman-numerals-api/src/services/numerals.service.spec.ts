import NumeralsService from './numerals.service';
import NumeralModel from '../models/Numeral';

jest.mock('../models/Numeral');

describe('Numerals Service', () => {

  let service: NumeralsService;
  let mockedModel: jest.Mocked<typeof NumeralModel>;

  beforeAll(() => {
    service = new NumeralsService();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockedModel = NumeralModel as jest.Mocked<typeof NumeralModel>;
  });

  test('convertToRoman should return XI', () => {
    expect.assertions(1);

    const roman = service.convertToRoman(11);

    expect(roman).toEqual('XI');
  });

  test('convertToRoman should return IV (edge case)', () => {
    expect.assertions(1);

    const roman = service.convertToRoman(4);

    expect(roman).toEqual('IV');
  });

  test('convertToRoman should return IX (edge case)', () => {
    expect.assertions(1);

    const roman = service.convertToRoman(9);

    expect(roman).toEqual('IX');
  });

  test('convertToRoman should return XL (edge case)', () => {
    expect.assertions(1);

    const roman = service.convertToRoman(40);

    expect(roman).toEqual('XL');
  });

  test('convertToArabic should return 4', () => {
    expect.assertions(1);

    const roman = service.convertToArabic('IV');

    expect(roman).toEqual(4);
  });

  test('getAllNumeralsList should return an array of numerals', async () => {
    expect.assertions(2);

    mockedModel.find.mockResolvedValue([{ roman: 'X', arabic: 10 }]);

    const list = await service.getAllNumeralsList();

    expect(mockedModel.find).toHaveBeenCalledTimes(1);
    expect(list).toEqual([{ roman: 'X', arabic: 10 }]);
  });

  test('getArabicNumeral should return existing 10', async () => {
    expect.assertions(2);

    mockedModel.findOne.mockResolvedValue({ roman: 'X', arabic: 10 });

    const numeral = await service.getArabicNumeral({ inputValue: 'X' });

    expect(mockedModel.findOne).toHaveBeenCalledTimes(1);
    expect(numeral).toEqual({ roman: 'X', arabic: 10 });
  });

  test('getArabicNumeral should return new 11', async () => {
    expect.assertions(3);

    mockedModel.findOne.mockResolvedValue(null);
    mockedModel.prototype.save.mockResolvedValue({ roman: 'XI', arabic: 11 });

    const numeral = await service.getArabicNumeral({ inputValue: 'XI' });

    expect(mockedModel.findOne).toHaveBeenCalledTimes(1);
    expect(mockedModel.prototype.save).toHaveBeenCalledTimes(1);
    expect(numeral).toEqual({ roman: 'XI', arabic: 11 });
  });

  test('getRomanNumeral should return existing X', async () => {
    expect.assertions(2);

    mockedModel.findOne.mockResolvedValue({ roman: 'X', arabic: 10 });

    const numeral = await service.getRomanNumeral({ inputValue: '10' });

    expect(mockedModel.findOne).toHaveBeenCalledTimes(1);
    expect(numeral).toEqual({ roman: 'X', arabic: 10 });
  });

  test('getRomanNumeral should return new XI', async () => {
    expect.assertions(3);

    mockedModel.findOne.mockResolvedValue(null);
    mockedModel.prototype.save.mockResolvedValue({ roman: 'XI', arabic: 11 });

    const numeral = await service.getRomanNumeral({ inputValue: '11' });

    expect(mockedModel.findOne).toHaveBeenCalledTimes(1);
    expect(mockedModel.prototype.save).toHaveBeenCalledTimes(1);
    expect(numeral).toEqual({ roman: 'XI', arabic: 11 });
  });
  test('removeAllNumerals should return count of deleted rows', async () => {
    expect.assertions(2);

    mockedModel.deleteMany.mockResolvedValue({ acknowledged: true, deletedCount: 1 });

    const deleted = await service.removeAllNumerals();

    expect(mockedModel.deleteMany).toHaveBeenCalledTimes(1);
    expect(deleted).toEqual({ acknowledged: true, deletedCount: 1 });
  });

});
