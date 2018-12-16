import { protege } from "./lib/util.js";
carga();
async function carga() {
  await protege(["Invitado"]);
}