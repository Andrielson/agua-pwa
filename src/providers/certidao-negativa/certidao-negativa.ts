import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SiteRioPretoWS } from '../site-rio-preto-ws';

@Injectable()
export class CertidaoNegativaProvider extends SiteRioPretoWS {

  private readonly urlCertidaoNegativa: string = 'https://andrielson.gq/wwwriopreto/servicos/certidao_negativa/php/certidao_negativa.php';//'http://www.riopreto.sp.gov.br/servicos/certidao_negativa/php/certidao_negativa.php';
  // private readonly urlImprimirCertidao: string = 'https://andrielson.gq/wwwriopreto/servicos/certidao_negativa/php/imprimir_certidao_semae.php';//'http://www.riopreto.sp.gov.br/servicos/certidao_negativa/php/imprimir_certidao_semae.php';
  private readonly codGrupoImposto: string = '6';
  private readonly acao: string = 'Validar';

  public constructor(public http: HttpClient) {
    super(http);
  }

  public validaCertidao(cadastro: string, hidrometro: string): Observable<HttpResponse<ArrayBuffer>> {
    const parametros = {
      cod_grupo_imposto: this.codGrupoImposto,
      nro_cadastro: cadastro,
      nro_hidro: hidrometro,
      acao: this.acao
    };

    const httpParams: HttpParams = new HttpParams({ fromObject: parametros });
    //Declarar a interface assim foi a única forma do TypeScript parar de reclamar do parâmetro.
    const options: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe: 'response';
      params?: HttpParams | {
        [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType: 'arraybuffer';
      withCredentials?: boolean;
    } = { headers: this.headersForm, observe: 'response', responseType: 'arraybuffer', withCredentials: true };
    return this.http.post(this.urlCertidaoNegativa, httpParams.toString(), options);
  }

}
