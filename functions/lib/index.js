"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const http = require("http");
const options = {
    hostname: 'cidadao.riopreto.sp.gov.br',
    port: '80',
    method: 'POST',
    path: '/empro_cidadao/sjriopreto/semae/empro_informacoes_falta_dagua.php/api/BuscaDadosCadastro',
};
exports.testempro = functions.https.onRequest((request, response) => {
    const req = http.request(options, (res) => {
        res.on('data', (chunk) => {
            response.send(`BODY: ${chunk}`);
        });
    });
    // response.send("Hello from Firebase!");
    const postData = '{"nro_cadastro":"77024"}';
    req.write(postData);
    req.end();
});
//# sourceMappingURL=index.js.map