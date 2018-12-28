import { hayUsuario, muestraError } from "../lib/util.js";
customElements.define("form-navegacion", class extends HTMLElement {
  constructor() {
    super();
    this.iniciaSesion = this.iniciaSesion.bind(this);
  }
  connectedCallback() {
    this.textContent = "Cargando información de sesión…";
    firebase.auth().onAuthStateChanged(
      user => {
        if (hayUsuario(user)) {
          firebase.database().ref("USUARIO")
            .orderByChild("USU_UPPER_CUE").equalTo(user.email.toUpperCase()).once("value",
              dataSnapshot => {
                try {
                  let contenido = '<a href="index.html">Inicio</a>';
                  dataSnapshot.forEach(ds => {
                    const usuario = ds.val();
                    const cue = usuario.USU_CUE;
                    const roles = usuario.ROL_IDS;
                    if (roles["Cliente"]) {
                      contenido += ' <a href="clientes.html">Clientes</a>';
                    }
                    if (roles["Invitado"]) {
                      contenido += ' <a href="invitados.html">Invitados</a>';
                    }
                    return true;
                  });
                  contenido += ' <a href="sesion.html">Sesión</a>';
                  this.innerHTML = contenido;
                } catch (e) {
                  muestraError(e);
                }
              },
              muestraError);
        } else {
          this.innerHTML =
            `<a href="index.html">Inicio</a>
            <input type="button" value="Iniciar Sesión"
                  onclick="this.parentNode.iniciaSesion();">`;
        }
      },
      muestraError);
  }
  async iniciaSesion() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await firebase.auth().signInWithRedirect(provider)
      document.location = "index.html";
    } catch (e) {
      muestraError(e);
    }
  }
});