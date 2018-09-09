/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/login */ "./src/js/login.js");

Object(_js_login__WEBPACK_IMPORTED_MODULE_0__["default"])();
window.addEventListener('load', function () {
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
  var db = firebase.firestore();
  var crear = document.getElementById("crear");
  var selector = document.getElementById("selector");
  var imprime = document.getElementById("total");
  var boton = document.getElementById("crear");
  boton.addEventListener("click", function (e) {
    var selectElement = document.getElementById("products");
    var selectedProduct = selectElement.options[selectElement.selectedIndex];
    var producto = selectedProduct.value;
    console.log(producto);
    var precio = selectedProduct.dataset.price;
    console.log(precio);
    var cantidad = document.getElementById("quantity").value;
    var suma = precio * cantidad;
    console.log(suma);
    imprime.innerHTML = "".concat(suma);
    var db = firebase.firestore();
    db.collection("ventas").add({
      product: producto,
      preci: precio,
      canti: cantidad
    }).then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById("product").selectedIndex = 0;
      document.getElementById("quantity").value = "";
      document.getElementById("total").value = "";
    }).catch(function (error) {
      console.error("Error adding document: ", error);
    });
  }); //Leer documentos

  var ventas = document.getElementById('tableBody');
  ventas && db.collection('ventas').onSnapshot(function (querySnapshot) {
    ventas.innerHTML = '';
    querySnapshot.forEach(function (doc) {
      console.log("".concat(doc.id, " => ").concat(doc.data().id));
      ventas.innerHTML += "\n            <tr>\n              <td>".concat(doc.data().id, "</td>\n              <td>").concat(doc.data().canti, "</td>\n              <td>").concat(doc.data().product, "</td>\n              <td>").concat(doc.data().preci, "</td>\n              <td>").concat(doc.data().cliente, "</td>\n              <td>").concat(doc.data().date, " ").concat(doc.data().time, "</td>\n            </tr>");
    });
  });
});

/***/ }),

/***/ "./src/js/login.js":
/*!*************************!*\
  !*** ./src/js/login.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var superLogin = function superLogin() {
  var signLogin = document.getElementById('btnInicio'); // Ingresa el usuario

  signLogin && signLogin.addEventListener('click', function (event) {
    var user = document.getElementById('usuario').value;
    var passwordUser = document.getElementById('password').value;
    console.log(user);
    console.log(passwordUser);
    firebase.auth().signInWithEmailAndPassword(user, passwordUser).then(function () {
      setTimeout(function (event) {
        window.location.reload();
      }, 2000);
      window.location.assign('../Inicio.html');
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = 'Escribe un usuario o contraseña validos';
      console.log(errorCode);
      alert(errorMessage);
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (superLogin);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9sb2dpbi5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiY29uZmlnIiwiYXBpS2V5IiwiYXV0aERvbWFpbiIsImRhdGFiYXNlVVJMIiwicHJvamVjdElkIiwic3RvcmFnZUJ1Y2tldCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiZmlyZWJhc2UiLCJpbml0aWFsaXplQXBwIiwiZGIiLCJmaXJlc3RvcmUiLCJjcmVhciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzZWxlY3RvciIsImltcHJpbWUiLCJib3RvbiIsImUiLCJzZWxlY3RFbGVtZW50Iiwic2VsZWN0ZWRQcm9kdWN0Iiwib3B0aW9ucyIsInNlbGVjdGVkSW5kZXgiLCJwcm9kdWN0byIsInZhbHVlIiwiY29uc29sZSIsImxvZyIsInByZWNpbyIsImRhdGFzZXQiLCJwcmljZSIsImNhbnRpZGFkIiwic3VtYSIsImlubmVySFRNTCIsImNvbGxlY3Rpb24iLCJhZGQiLCJwcm9kdWN0IiwicHJlY2kiLCJjYW50aSIsInRoZW4iLCJkb2NSZWYiLCJpZCIsImNhdGNoIiwiZXJyb3IiLCJ2ZW50YXMiLCJvblNuYXBzaG90IiwicXVlcnlTbmFwc2hvdCIsImZvckVhY2giLCJkb2MiLCJkYXRhIiwiY2xpZW50ZSIsImRhdGUiLCJ0aW1lIiwic3VwZXJMb2dpbiIsInNpZ25Mb2dpbiIsImV2ZW50IiwidXNlciIsInBhc3N3b3JkVXNlciIsImF1dGgiLCJzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCIsInNldFRpbWVvdXQiLCJsb2NhdGlvbiIsInJlbG9hZCIsImFzc2lnbiIsImVycm9yQ29kZSIsImNvZGUiLCJlcnJvck1lc3NhZ2UiLCJhbGVydCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FB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IGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIlxuaW1wb3J0IHN1cGVyTG9naW4gZnJvbSAnLi9qcy9sb2dpbic7XG5cblxuc3VwZXJMb2dpbigpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpPT4ge1xuICAvLy8gRklSRUJBU0UgXG4gIHZhciBjb25maWcgPSB7XG4gICAgICBhcGlLZXk6IFwiQUl6YVN5Q29aWUxLTWZCdjhOV2M1SjRlcHJmdXpXZW9SSHJDWWNBXCIsXG4gICAgICBhdXRoRG9tYWluOiBcInBheXFyZGFzaC5maXJlYmFzZWFwcC5jb21cIixcbiAgICAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vcGF5cXJkYXNoLmZpcmViYXNlaW8uY29tXCIsXG4gICAgICBwcm9qZWN0SWQ6IFwicGF5cXJkYXNoXCIsXG4gICAgICBzdG9yYWdlQnVja2V0OiBcInBheXFyZGFzaC5hcHBzcG90LmNvbVwiLFxuICAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiMTAzMjgxOTA4NzI2XCJcbiAgfTtcbiAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChjb25maWcpO1xuICBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuXG5cbiAgY29uc3QgY3JlYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNyZWFyXCIpO1xuICBjb25zdCBzZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0b3JcIik7XG5cbiAgY29uc3QgaW1wcmltZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG90YWxcIik7XG5cbiAgY29uc3QgYm90b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNyZWFyXCIpO1xuICBib3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBjb25zdCBzZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9kdWN0c1wiKTtcbiAgICAgIGNvbnN0IHNlbGVjdGVkUHJvZHVjdCA9IHNlbGVjdEVsZW1lbnQub3B0aW9uc1tzZWxlY3RFbGVtZW50LnNlbGVjdGVkSW5kZXhdO1xuICAgICAgbGV0IHByb2R1Y3RvID0gc2VsZWN0ZWRQcm9kdWN0LnZhbHVlO1xuICAgICAgY29uc29sZS5sb2cocHJvZHVjdG8pOyAgXG4gICAgICBsZXQgcHJlY2lvID0gc2VsZWN0ZWRQcm9kdWN0LmRhdGFzZXQucHJpY2U7XG4gICAgICBjb25zb2xlLmxvZyhwcmVjaW8pO1xuICAgICAgbGV0IGNhbnRpZGFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJxdWFudGl0eVwiKS52YWx1ZTtcbiAgICAgIGxldCBzdW1hID0gcHJlY2lvKmNhbnRpZGFkO1xuICAgICAgY29uc29sZS5sb2coc3VtYSk7XG4gIGltcHJpbWUuaW5uZXJIVE1MID0gYCR7c3VtYX1gO1xuXG4gIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG5cbiAgZGIuY29sbGVjdGlvbihcInZlbnRhc1wiKS5hZGQoe1xuICAgICAgcHJvZHVjdDogcHJvZHVjdG8sXG4gICAgICBwcmVjaTogcHJlY2lvLFxuICAgICAgY2FudGk6IGNhbnRpZGFkXG4gIH0pXG4gIC50aGVuKGZ1bmN0aW9uKGRvY1JlZikge1xuICAgICAgY29uc29sZS5sb2coXCJEb2N1bWVudCB3cml0dGVuIHdpdGggSUQ6IFwiLCBkb2NSZWYuaWQpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9kdWN0XCIpLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJxdWFudGl0eVwiKS52YWx1ZSA9IFwiXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvdGFsXCIpLnZhbHVlID0gXCJcIjtcbiAgfSlcbiAgLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWRkaW5nIGRvY3VtZW50OiBcIiwgZXJyb3IpO1xuICB9KTtcbiAgfSk7XG5cbiAgLy9MZWVyIGRvY3VtZW50b3NcbiAgbGV0IHZlbnRhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWJsZUJvZHknKTtcblxuICB2ZW50YXMgJiYgZGIuY29sbGVjdGlvbigndmVudGFzJykub25TbmFwc2hvdCgocXVlcnlTbmFwc2hvdCkgPT4ge1xuICAgIHZlbnRhcy5pbm5lckhUTUwgPSAnJztcbiAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goKGRvYykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtkb2MuaWR9ID0+ICR7ZG9jLmRhdGEoKS5pZH1gKTtcbiAgICAgICAgdmVudGFzLmlubmVySFRNTCArPSBgXG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0ZD4ke2RvYy5kYXRhKCkuaWR9PC90ZD5cbiAgICAgICAgICAgICAgPHRkPiR7ZG9jLmRhdGEoKS5jYW50aX08L3RkPlxuICAgICAgICAgICAgICA8dGQ+JHtkb2MuZGF0YSgpLnByb2R1Y3R9PC90ZD5cbiAgICAgICAgICAgICAgPHRkPiR7ZG9jLmRhdGEoKS5wcmVjaX08L3RkPlxuICAgICAgICAgICAgICA8dGQ+JHtkb2MuZGF0YSgpLmNsaWVudGV9PC90ZD5cbiAgICAgICAgICAgICAgPHRkPiR7ZG9jLmRhdGEoKS5kYXRlfSAke2RvYy5kYXRhKCkudGltZX08L3RkPlxuICAgICAgICAgICAgPC90cj5gO1xuICAgIH0pO1xuICB9KTtcbn0pOyIsImNvbnN0IHN1cGVyTG9naW4gPSAoKSA9PiB7XG4gIGxldCBzaWduTG9naW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuSW5pY2lvJyk7XG4gIC8vIEluZ3Jlc2EgZWwgdXN1YXJpb1xuICBzaWduTG9naW4gJiYgc2lnbkxvZ2luLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgIGxldCB1c2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzdWFyaW8nKS52YWx1ZTtcbiAgICBsZXQgcGFzc3dvcmRVc2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bhc3N3b3JkJykudmFsdWU7XG4gICAgY29uc29sZS5sb2codXNlcik7XG4gICAgY29uc29sZS5sb2cocGFzc3dvcmRVc2VyKTtcbiAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQodXNlciwgcGFzc3dvcmRVc2VyKVxuICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmFzc2lnbignLi4vSW5pY2lvLmh0bWwnKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgbGV0IGVycm9yQ29kZSA9IGVycm9yLmNvZGU7XG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSAnRXNjcmliZSB1biB1c3VhcmlvIG8gY29udHJhc2XDsWEgdmFsaWRvcyc7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yQ29kZSk7XG4gICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XG4gICAgICB9KTtcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHN1cGVyTG9naW47Il0sInNvdXJjZVJvb3QiOiIifQ==