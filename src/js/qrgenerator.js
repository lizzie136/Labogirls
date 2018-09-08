import QRCode from 'qrcode';

const generatePaymentString = ({ motive="servicio", amount="0.0", date, userAccount, description}) => {
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
  return str;
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