import jsdom from 'jsdom';
import {generatePaymentString, generateQR } from './qrgenerator';

const { JSDOM } = jsdom;


describe('generateQR', () => {
  test('generateQR is a function?', ()=>{
    expect(typeof generateQR).toBe('function');
  });

  test('generateQR, generates accordingly', ()=>{
    const expectedBase64 = 'data:image/png;base64,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';
    const dom = new JSDOM(`<!DOCTYPE html><canvas></canvas>`);
    const canvas = dom.window.document.querySelector('canvas');
    return expect(generateQR(canvas, "It's a pony", url=>url))
    .resolves.toEqual(expectedBase64);
  });
});


describe('generatePaymentString', ()=> {
  test('generatePaymentString', ()=> {
    expect(typeof generatePaymentString).toBe('function');
  });

  test('generate string over object', ()=>{
    const obj = { 
      motive: 'ejemplo', 
      amount: 125.99,
      date: new Date('5/5/2018'),
      userAccount: '5555555',
      description: 'este es un ejemplo'}
    const expectectString = '{"motivo":"ejemplo","importe":125.99,"fecha":"2018-05-05T05:00:00.000Z","userAccount":"5555555","description":"este es un ejemplo"}';
    expect(generatePaymentString(obj)).toBe(expectectString); 
  });

  test('generate string with missing parts',  ()=>{
    const obj = {}; 
    const fn = () => generatePaymentString(obj);
    expect(fn).toThrowError('generatePaymentString: Object Payment is empty'); 
  });
});