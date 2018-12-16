import { hayUsuario, muestraError } from "../lib/util";
customElements.define("form-navegacion", class extends HTMLElement {
  connectedCallback() {
    this.textContent = "Cargando información de sesión…";
    firebase.auth().onAuthStateChanged(
      user => {
        if (hayUsuario(user)) {
          firebase.database().ref("USUARIO")
            .orderByChild("USU_UPPER_CUE").equalTo(USU_UPPER_CUE).once("value",
              dataSnapshot => {
                try {
                  const encontrado = dataSnapshot.forEach(ds => {
                    const usuario = ds.val();
                    const cue = usuario.USU_CUE;
                    const roles = usuario.ROL_IDS;
                    let contenido = '<a href="index.html">Inicio</a>';
                    if (roles.indexOf("Cliente") >= 0) {
                      contenido += ' <a href="clientes.html">Clientes</a>';
                    }
                    if (roles.indexOf("Invitado") >= 0) {
                      contenido += ' <a href="invitados.html">Invitados</a>';
                    }
                    if (cue) {
                      contenido += ' <a href="sesion.html">Sesión</a>';
                    } else {
                      contenido += ' <a href="inicia.html">Iniciar Sesión</a>';
                    }
                    this.innerHTML = contenido;
                    return true;
                  });
                  if (!encontrado) {
                    alert("Usuario no autorizado.");
                    document.location = "index.html";
                  }
                } catch (e) {
                  muestraError(e);
                }
              },
              muestraError);
        }
      },
      muestraError);
  }
});