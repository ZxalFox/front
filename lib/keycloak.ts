import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8081",
  realm: "diario-de-emocoes-realm",
  clientId: "diario-front",
});

export default keycloak;
