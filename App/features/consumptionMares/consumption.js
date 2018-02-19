let java = require("java");
let path = require("path")

let root = path.resolve(__dirname)

java.classpath.push(root + "/libs_java/log4j-1.2.9.jar");
java.classpath.push(root + "/libs_java/commons.collections-3.2.1.jar");
java.classpath.push(root + "/libs_java/commons-beanutils-1.7.0.jar");
java.classpath.push(root + "/libs_java/commons-lang-2.4.jar");
java.classpath.push(root + "/libs_java/commons-logging-1.1.1.jar");
java.classpath.push(root + "/libs_java/ezmorph-1.0.6.jar");
java.classpath.push(root + "/libs_java/jersey-client-1.2.jar");
java.classpath.push(root + "/libs_java/jersey-core-1.2.jar");
java.classpath.push(root + "/libs_java/json-lib-2.3-jdk13.jar");
java.classpath.push(root + "/libs_java/jsr311-api-1.1.1.jar");
java.classpath.push(root + "/libs_java/OrgSistemasSecurity.jar");

/*module.exports = {
  index: function(req, res) {
    
  }
};*/


let OrgSistemasWebServiceClient = java.import("co.edu.udea.wsClient.OrgSistemasWebServiceClient");
let clientWS = new OrgSistemasWebServiceClient(true);


function consultarP(number) {
  let listaFacu = null;
  clientWS.addParamSync("cedula", number);
  listaFacu = clientWS.obtenerStringSync("consultapersonamares", "6aaa5e631067cdda423396987f54f9df96625150");
  return listaFacu;
}

let user = consultarP("1037655392");
console.log(user)
