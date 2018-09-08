let signLogin = document.getElementById('btnInicio');
// Ingresa el usuario
signLogin.addEventListener('click', event => {
  let user = document.getElementById('usuario').value;
  let passwordUser = document.getElementById('password').value;
  console.log(user);
  console.log(passwordUser);
  firebase.auth().signInWithEmailAndPassword(user, passwordUser)
    .then(function() {
      setTimeout((event) => {
        window.location.reload();
      }, 2000);
      window.location.assign('../src/html/Inicio.html');
    })
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = 'Escribe un usuario o contraseña validos';
      console.log(errorCode);
      alert(errorMessage);
    });
});