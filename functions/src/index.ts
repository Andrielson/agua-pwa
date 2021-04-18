import * as functions from 'firebase-functions';
import * as http from 'http';

const options = {
    hostname: 'cidadao.riopreto.sp.gov.br',
    port: '80',
    method: 'POST',
    path: '/empro_cidadao/sjriopreto/semae/empro_informacoes_falta_dagua.php/api/BuscaDadosCadastro',
};

export const testempro = functions.https.onRequest((request, response) => {
    const req = http.request(options,(res) => {
        res.on('data', (chunk) => {
            response.send(`BODY: ${chunk}`);
          });
    });
    // response.send("Hello from Firebase!");
    const postData = '{"nro_cadastro":"77024"}';
    req.write(postData);
    req.end();
});
