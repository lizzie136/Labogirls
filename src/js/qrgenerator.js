import QRCode from 'qrcode';
import moment from 'moment';

const generatePaymentString = ({ motive, amount, date, userAccount, description}) => {
  // motivo
  // importe
  // fecha
  const obj = {
    motivo : motive,
    importe : amount,
    fecha: date,
    userAccount: userAccount,
    description: description,
  };
  const str = JSON.stringify(obj);
  if(str == '{}') {
    throw new Error('generatePaymentString: Object Payment is empty');
  }

  const baseUrl = `${BBVABANCOMER_SIMULATOR}/venta?`;
  const params = [];
  for(let key in obj){
    params.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
  }
  return `${baseUrl}${params.join('&')}`;
};

const generateQR = (text, element) => {
  return new Promise((resolve, reject) =>{
    QRCode.toDataURL(element, text)
    .then(url => {
      resolve && resolve(url);
    })
    .catch(err => {
      reject && reject(err);
    });
  });
} ;

export { generateQR, generatePaymentString };