import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SiteRioPretoWS } from '../site-rio-preto-ws';

export interface FaltaDAguaResposta {
  cod_consumidor: string;
  nom_pfj: string;
  des_endereco: string;
  nom_bairro: string;
  des_reservatorio: string;
  des_titulo?: string;
  des_mensagem: string;
  des_periodo?: string;
  cod_mensagem_mural?: string;
}

@Injectable()
export class FaltaDAguaProvider extends SiteRioPretoWS {
  // private readonly urlFaltaDAgua: string = 'http://cidadao.riopreto.sp.gov.br/empro_cidadao/sjriopreto/semae/empro_informacoes_falta_dagua.php/api/BuscaDadosCadastro';
  private readonly urlFaltaDAgua: string = 'https://andrielson.gq/cidadaoriopreto/empro_cidadao/sjriopreto/semae/empro_informacoes_falta_dagua.php/api/BuscaDadosCadastro';

  public constructor(protected http: HttpClient) {
    super(http);
  }

  public consultaFaltadAgua(cadastro: string): Observable<FaltaDAguaResposta> {
    const body = this.getNroCadastro(cadastro);

    //Declarar a interface assim foi a única forma do TypeScript parar de reclamar do parâmetro.
    const options: {
      headers?: {
        [header: string]: string | string[];
      };
      observe?: 'body';
      params?: {
        [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType: 'json';
      withCredentials?: boolean;
    } = { headers: this.headersJson, observe: 'body', responseType: 'json' };
    return this.http.post(this.urlFaltaDAgua, body, options)
      .map((value: Object): FaltaDAguaResposta => value as FaltaDAguaResposta);
  }

}
