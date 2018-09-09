// Initialize Firebase
var config = {
apiKey: "AIzaSyCoZYLKMfBv8NWc5J4eprfuzWeoRHrCYcA",
authDomain: "payqrdash.firebaseapp.com",
databaseURL: "https://payqrdash.firebaseio.com",
projectId: "payqrdash",
storageBucket: "payqrdash.appspot.com",
messagingSenderId: "103281908726"
};

firebase.initializeApp(config);

const crear = document.getElementById("crear");
const selector = document.getElementById("selector");

const imprime = document.getElementById("total");

const boton = document.getElementById("crear");
boton.addEventListener("click", e => {
    const selectElement = document.getElementById("selector");
    const selectedProduct = selectElement.options[selectElement.selectedIndex];
     let producto = selectedProduct.value; 
     console.log(producto);  
    let precio = selectedProduct.dataset.price;
    console.log(precio);
    let cantidad = document.getElementById("cantidad").value;
    let suma = precio*cantidad;
    console.log(suma); 
imprime.innerHTML += `<h4>${suma}</h4>`;

const db = firebase.firestore();

db.collection("ventas").add({
    product: producto,
     preci: precio,
     canti: cantidad
 })
 .then(function(docRef) {
     console.log("Document written with ID: ", docRef.id);
     
     document.getElementById("product").value = " ";
     document.getElementById("preci").value = " ";
     document.getElementById("canti").value = " ";
 })
 .catch(function(error) {
     console.error("Error adding document: ", error);
 });
 });

//Leer documentos
let ventas = document.getElementById('tableBody');
db.collection('ventas').onSnapshot((querySnapshot) => {
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
