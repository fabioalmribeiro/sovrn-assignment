import NumeralsService from './numerals.service';

describe('Numerals Service', () => {

  let service: NumeralsService;

  beforeAll(() => {
    service = new NumeralsService();
  });

  test('convertToRoman should return XI', () => {
    expect.assertions(1);

    const roman = service.convertToRoman(11);

    expect(roman).toEqual('XI');
  });

});
