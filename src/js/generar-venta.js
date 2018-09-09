

/*const add = document.getElementById("add");
const add1 = document.getElementById("add1");

add.addEventListener("click", e =>{ 
  add1.innerHTML=`
  <div>
    <select id="selector" placeholder="producto">
               <option value="12">Refresco</option>
               <option value="8">Papitas</option>
               <option value="34">Huevo</option>
               <option value="20">Atùn</option>
    </select>
     <input type="number" placeholder="Ingrese la cantidad">
  </div>
       `
});*/

const crear = document.getElementById("crear");
const selector = document.getElementById("selector");

const imprime = document.getElementById("total");

/*/const fecha = getdate();
selector.addEventListener("change", e =>{
    if(onvrdisplaydisconnect.){

    }
});*/

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

db.collection("ventas").add({
    product: producto,
     preci: precio,
     canti: cantidad
 })
 .then(function(docRef) {
     console.log("Document written with ID: ", docRef.id);
     
     document.getElementById("producto").value = " ";
     document.getElementById("precio").value = " ";
     document.getElementById("cantidad").value = " ";
 })
 .catch(function(error) {
     console.error("Error adding document: ", error);
 });
 });

/*
crear.addEventListener("click", e => {
    //crear variable para cada elemento
    //crear variables para cada elemento 
    let producto= document.getElementsById("selector").value;
    let cantidad = document.getElementById("cantidad-Productos").value;
    let costo = 
    //agregar documentos
    let boton1 = document.getElementById("boton1");
    
        //agregar documento y id
       
*/


