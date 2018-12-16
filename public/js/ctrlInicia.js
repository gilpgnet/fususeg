import { hayUsuario, muestraError } from "./lib/util.js";
const vista = document.vista;
firebase.auth().onAuthStateChanged(
  user => {
    if (hayUsuario(user)) {
      alert("Ya iniciaste sesión.");
      document.location = "index.html";
    } else {
      vista.addEventListener("submit", iniciaSesion);
    }
  },
  muestraError);
async function iniciaSesion(evt) {
  try {
    evt.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({prompt: "select_account"});
    await firebase.auth().signInWithRedirect(provider)
    document.location = "index.html";
  } catch (e) {
    muestraError(e);
  }
}