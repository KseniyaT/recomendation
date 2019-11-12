import utils from '../../helpers/utils';

describe('utils', () => {

  it('isObject should returns corect value', () => {
    const nullValue = utils.isObject(null);
    expect(nullValue).toBe(false);
    const emptyValue = utils.isObject();
    expect(emptyValue).toBe(false);
    const objectValue = utils.isObject({});
    expect(objectValue).toBe(true);
    const arrayValue = utils.isObject([]);
    expect(arrayValue).toBe(false);
    const stringValue = utils.isObject([]);
    expect(stringValue).toBe(false);
  });

  it('getLisHeight should return sum of values', () => {
    const lisHeight = utils.getLisHeight([{ clientHeight: 1 }, { clientHeight: 2 }, { clientHeight: 3 }]);
    expect(lisHeight).toBe(6);
  });

});