import { SiteRioPretoWS } from './../site-rio-preto-ws';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operator/switchMap';

export enum TipoFatura {
  AGUA_ESGOTO = 1,
  PARCELAMENTO = 3,
  JURIDICO = 4
}

export interface SegundaViaParams {
  cadastro: string;
  referencia: string;
  tipo: TipoFatura;
  captcha: string;
  num_conta?: string;
}

export interface SegundaViaResposta {
  referencia: string;
  valor: number;
  vencimento: string;
  pagamento?: string;
  codigo?: string;
  url?: string;
  cadastro?: string;
  atrasada?: boolean;
}

interface GridDividas {
  page: string,
  total: string,
  rows: Array<{
    idConta: string,
    cell: Array<string>
  }>,
}

@Injectable()
export class SegundaViaProvider extends SiteRioPretoWS {

  public constructor(public http: HttpClient) {
    super(http);
  }

  /**
   * montaCaptcha
   */
  public montaCaptcha(): Observable<string> {
    // const url: string = 'http://www.riopreto.sp.gov.br/via2agua/montaCaptcha.cfm';
    const url: string = 'https://andrielson.gq/wwwriopreto/via2agua/montaCaptcha.cfm';
    return this.http.get(url, { observe: 'response', responseType: 'text', withCredentials: true })
      .map((response: HttpResponse<string>): string => {
        const resposta: string = response.body.trim();
        const pattern: RegExp = /captcha_\d+.png/;
        let urlCaptcha: string;
        if (resposta.startsWith("<img src=") && resposta.endsWith("/>") && pattern.test(resposta)) {
          urlCaptcha = 'https://andrielson.gq/wwwriopreto/via2agua/captcha/' + pattern.exec(resposta)[0];
        }
        return urlCaptcha;
      });
  }

  public buscaSegundaVia(params: SegundaViaParams): Observable<string> {
    //const url = 'http://www.riopreto.sp.gov.br/via2agua/geraDocumento.cfm';
    const url: string = 'https://andrielson.gq/wwwriopreto/via2agua/geraDocumento.cfm';
    const body = {
      NRO_CADASTRO: params.cadastro,
      REFERENCIA: params.referencia,
      RADIO: params.tipo.toString(),
      acao: 'Validar',
      _cf_nodebug: 'true',
      _cf_nocache: 'true',
      num_conta: params.num_conta ? params.num_conta : '',
      CAPTCHA: params.captcha
    };
    const httpParams: HttpParams = new HttpParams({ fromObject: body });
    return this.http.post(url, httpParams.toString(), { headers: this.headersForm, observe: 'response', responseType: 'text', withCredentials: true })
      .map((response: HttpResponse<string>) => {
        if (!response) return null;
        const resposta: string = response.body.trim();
        if (resposta.startsWith('OK'))
          return resposta.replace('OK - ', '');
        if (resposta === '5') {
          return 'Parcelamento Jurídico';
        }

        if (resposta.includes('IMAGEM: Informe os caracteres da '))
          return 'Captcha incorreto!';
        return 'Não existe débito para o tipo de fatura na referência informada!';
      });
  }

  public extraiSegundaVia(arquivo: string): Observable<SegundaViaResposta> {
    const url: string = 'https://andrielson.gq/2Via/Parser?f=';
    return this.http.get(url + arquivo, { observe: 'body', responseType: 'json' })
      .map((response: Object) => response as SegundaViaResposta);
  }

  public buscaParcelamentoJuridico(params: { nro_cadastro: string; ref: string; tc: string; captcha: string }): Observable<string> {
    const url: string = 'https://andrielson.gq/riopreto/via2agua/carregarGridDividas.cfm';
    const httpParams: HttpParams = new HttpParams({ fromObject: params });
    return this.http.get(url, { params: httpParams, observe: 'body', responseType: 'json', withCredentials: true })
      .map((response: GridDividas) => { return (response.rows.length == 1) ? response.rows[0].idConta : '' });
  }

}
