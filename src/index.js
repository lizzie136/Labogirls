
import { generatePaymentString, generateQR }from './js/qrgenerator';
import superLogin from './js/login';


superLogin();

window.addEventListener('load', ()=> {
  /// FIREBASE 
  var config = {
      apiKey: "AIzaSyCoZYLKMfBv8NWc5J4eprfuzWeoRHrCYcA",
      authDomain: "payqrdash.firebaseapp.com",
      databaseURL: "https://payqrdash.firebaseio.com",
      projectId: "payqrdash",
      storageBucket: "payqrdash.appspot.com",
      messagingSenderId: "103281908726"
  };
  firebase.initializeApp(config);
  const db = firebase.firestore();


  const crear = document.getElementById("crear");
  const selector = document.getElementById("selector");

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
      let suma = precio*cantidad;
      console.log(suma);
  imprime.innerHTML = `${suma}`;

  const db = firebase.firestore();

  db.collection("ventas").add({
      product: producto,
      preci: precio,
      canti: cantidad
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById("product").selectedIndex = 0;
      document.getElementById("quantity").value = "";
      document.getElementById("total").value = "";
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
  });

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
const str = generatePaymentString({
  motive: 'ejemplo',
  amount: 125.99,
  date: new Date('5/5/2018'),
  userAccount: '5555555',
  description: 'este es un ejemplo'
});

baseCanvas && generateQR(str, baseCanvas, (err) => console.log(err));
