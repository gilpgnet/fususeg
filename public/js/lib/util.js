export function muestraError(e) {
  console.error(e);
  alert(e.message);
}
export function hayUsuario(user) {
  return user && user.email;
}
export function protege(roles) {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(
      user => {
        if (!roles && roles.length === 0) {
          resolve();
        } else if (hayUsuario(user)) {
          firebase.database().ref("USUARIO")
            .orderByChild("USU_UPPER_CUE").equalTo(user.email.toUpperCase()).once("value",
              dataSnapshot => {
                if (dataSnapshot.forEach(ds => roles.filter(r => ds.val().ROL_IDS[r]).length > 0)) {
                  resolve();
                } else {
                  usuarioNoAutorizado();
                }
              },
              errorDeVerificacion);
        } else {
          usuarioNoAutorizado();
        }
      },
      errorDeVerificacion);
  });
}
function errorDeVerificacion(e) {
  console.error(e);
  alert(e.message);
  document.location = "index.html";
}
function usuarioNoAutorizado() {
  alert("Usuario no autorizado.");
  document.location = "index.html";
}