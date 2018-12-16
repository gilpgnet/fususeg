import { query, execute, muestraError } from "./lib/util.js";
const vista = document.vista;
const icono = document.getElementById("icono");
firebase.auth().onAuthStateChanged(
  user => {
    if (hayUsuario(user)) {
      vista.cue.value = user.email;
      vista.nombre.value = user.displayName;
      icono.src = user.photoURL;
      vista.terminaSesion.addEventListener("click", terminaSesion);
    } else {
      alert("No has iniciado sesión.");
      document.location = "index.html";
    }
  },
  muestraError);
async function terminaSesion() {
  try {
    await firebase.auth().signOut();
    document.location = "index.html";
  } catch (e) {
    muestraError(e);
  }
}