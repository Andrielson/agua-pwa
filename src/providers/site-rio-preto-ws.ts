import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

export interface NroCadastroJSON {
    nro_cadastro: string;
}

export class SiteRioPretoWS {
    //readonly urlBuscaCadastro: string = "http://cidadao.riopreto.sp.gov.br/empro_cidadao/sjriopreto/semae/empro_informacoes_falta_dagua.php/api/BuscaCadastro";
    readonly urlBuscaCadastro: string = "https://andrielson.gq/cidadaoriopreto/empro_cidadao/sjriopreto/semae/empro_informacoes_falta_dagua.php/api/BuscaCadastro";
    protected contentLength: number = 0;
    protected headersJson = { 'Content-Type': 'application/json' };
    protected headersForm = { 'Content-Type': 'application/x-www-form-urlencoded' };

    constructor(protected http: HttpClient) {
        console.log('Hello FaltaDAguaProvider Provider');
    }

    protected getNroCadastro(cadastro: string): NroCadastroJSON {
        return { nro_cadastro: cadastro };
    }

    public getContentLength(): number {
        return this.contentLength;
    }

    public buscaCadastro(cadastro: string): Observable<string> {
        const body = this.getNroCadastro(cadastro);

        //Declarar a interface assim foi a única forma do TypeScript parar de reclamar do parâmetro.
        const options: {
            headers?: HttpHeaders | {
                [header: string]: string | string[];
            };
            observe?: 'body';
            params?: HttpParams | {
                [param: string]: string | string[];
            };
            reportProgress?: boolean;
            responseType: 'text';
            withCredentials?: boolean;
        } = { headers: this.headersJson, observe: 'body', responseType: 'text' };
        return this.http.post(this.urlBuscaCadastro, body, options);
    }

    public async buscaCadastroComPromise(cadastro: string): Promise<string> {
        const body = { nro_cadastro: cadastro };

        //Declarar a interface assim foi a única forma do TypeScript parar de reclamar do parâmetro.
        const options: {
            headers?: HttpHeaders | {
                [header: string]: string | string[];
            };
            observe?: 'body';
            params?: HttpParams | {
                [param: string]: string | string[];
            };
            reportProgress?: boolean;
            responseType: 'text';
            withCredentials?: boolean;
        } = { headers: this.headersJson, observe: 'body', responseType: 'text' };
        return this.http.post(this.urlBuscaCadastro, body, options).toPromise();
    }
}