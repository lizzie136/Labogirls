import QRCode from 'qrcode';

const generateQR = (text, element) => {
  QRCode.toDataURL(element, 'I am a pony!')
  .then(url => {
    console.log(url);
  })
  .catch(err => {
    console.error(err);
  });
} ;

export default generateQR;