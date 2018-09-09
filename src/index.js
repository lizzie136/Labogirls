import moment from 'moment';
import superLogin from './js/login';
import {
  generatePaymentString,
  generateQR
} from './js/qrgenerator';


superLogin();

window.addEventListener('load', () => {
  /// FIREBASE 
  var config = {
    apiKey: "AIzaSyCoZYLKMfBv8NWc5J4eprfuzWeoRHrCYcA",
    authDomain: "payqrdash.firebaseapp.com",
    databaseURL: "https://payqrdash.firebaseio.com",
    projectId: "payqrdash",
    storageBucket: "payqrdash.appspot.com",
    messagingSenderId: "103281908726"
  };

  if(typeof firebase !== 'undefined'){
    firebase.initializeApp(config);
    const db = firebase.firestore();

    const imprime = document.getElementById("total");

    const boton = document.getElementById("crear");
    boton.addEventListener("click", e => {
      const selectElement = document.getElementById("products");
      const selectedProduct = selectElement.options[selectElement.selectedIndex];
      let producto = selectedProduct.value;
      console.log(producto);
      let precio = selectedProduct.dataset.price;
      console.log(precio);
      let cantidad = document.getElementById("quantity").value;
      let suma = precio * cantidad;
      console.log(suma);
      imprime.innerHTML = `${suma}`;

      const db = firebase.firestore();

      db.collection("ventas").add({
          product: producto,
          preci: precio,
          canti: cantidad
        })
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
          document.getElementById("products").selectedIndex = 0;
          document.getElementById("quantity").value = "";
          document.getElementById("total").value = "";

          const str = generatePaymentString({
            motive: producto,
            amount: cantidad,
            date: moment().format('DD/MM/YYYY'),
            userAccount: `${BBVABANCOMER_USER_ACCOUNT}`,
            description: 'Abarrotes Meche'
          });
          window.localStorage.setItem('qrdata', str);
          window.location = '/qrgenerator.html';
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    });
}
//Leer documentos
let ventas = document.getElementById('tableBody');

ventas && db.collection('ventas').onSnapshot((querySnapshot) => {
  ventas.innerHTML = '';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().id}`);
    ventas.innerHTML += `
            <tr>
              <td>${doc.data().id}</td>
              <td>${doc.data().canti}</td>
              <td>${doc.data().product}</td>
              <td>${doc.data().preci}</td>
              <td>${doc.data().cliente}</td>
              <td>${doc.data().date} ${doc.data().time}</td>
            </tr>`;
  });
});
});

const baseCanvas = document.getElementById('generated-qr');
if (baseCanvas) {
  const str = window.localStorage.getItem('qrdata');
  generateQR(str, baseCanvas, (err) => console.log(err));

}