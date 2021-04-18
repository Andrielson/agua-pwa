import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ModalController, ToastController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { SegundaViaProvider, SegundaViaParams, TipoFatura, SegundaViaResposta } from './../../providers/segunda-via/segunda-via';
import { SegundaViaModalComponent } from './../../components/segunda-via-modal/segunda-via-modal';

@IonicPage()
@Component({
  selector: 'page-segunda-via',
  templateUrl: 'segunda-via.html',
})
export class SegundaViaPage {

  public resposta: any;
  public form: FormGroup;
  public urlCaptcha: string;
  public mensagemErro: string;
  private subCaptcha: Subscription;

  /**
   * Configuração do formulário a ser criado pelo FormBuilder.
   * Contém os models a serem preenchidos com os respectivos validadores.
   */
  private readonly formConfig = {
    nroCadastro: [ //controller do campo Número do cadastro
      '', //valor padrão do input
      Validators.compose( //função de validação síncrona. Neste caso, uso uma composição de validadores padrões do Angular
        [
          Validators.maxLength(7), // tamanho máximo
          Validators.pattern('\\d+'), // regex somente números
          Validators.required //campo obrigatório
        ]
      )
    ],
    referencia: ['2018-04', Validators.required],
    tipoFatura: ['1', Validators.required],
    captcha: ['',
      Validators.compose( //função de validação síncrona. Neste caso, uso uma composição de validadores padrões do Angular
        [
          Validators.minLength(5), // tamanho mínimo
          Validators.maxLength(5), // tamanho máximo
          Validators.pattern('[A-Za-z0-9]+'), // regex somente letras e números
          Validators.required //campo obrigatório
        ]
      )]
  };

  public constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private modalCtrl: ModalController, private formBuilder: FormBuilder, private segundaViaWS: SegundaViaProvider) {
    this.form = this.formBuilder.group(this.formConfig);
    this.atualizaImagemCaptcha();
  }

  /**
   * atualizaImagemCaptcha
   */
  public atualizaImagemCaptcha() {
    if (this.subCaptcha && !this.subCaptcha.closed)
      this.subCaptcha.unsubscribe;

    // Cria e exibe um loading para bloquear a tela enquanto a imagem é carregada.
    const loading: Loading = this.loadingCtrl.create({
      content: "Aguarde...",
      enableBackdropDismiss: true,
      duration: 30000
    });
    loading.present();

    loading.onDidDismiss(() => {
      if (!this.urlCaptcha) {
        const toast = this.toastCtrl.create({
          message: 'Falha na obtenção da imagem do captcha!',
          duration: 3000
        });
        toast.present();
      }
    });

    this.subCaptcha = this.segundaViaWS.montaCaptcha().subscribe((url) => {
      if (url) {
        this.urlCaptcha = url;
        loading.dismiss();
      }
    });
  }

  /**
   * Método para verificar se o texto informado no número do cadastro é valido.
   * @returns true se for válido e false caso contrário.
   */
  public ehCadastroValido(): boolean {
    const cadastroControl: AbstractControl = this.form.controls.nroCadastro;
    return cadastroControl.dirty ? cadastroControl.valid : true;
  }

  /**
   * Método para verificar se o texto informado no campo do captcha é valido.
   * @returns true se for válido e false caso contrário.
   */
  public ehCaptchaValido(): boolean {
    const captchaControl: AbstractControl = this.form.controls.captcha;
    return captchaControl.dirty ? (captchaControl.value as string).length === 5 : true;
  }

  /**
   * Método para verificar se o formulário é valido.
   */
  public ehFormValido(): boolean {
    return this.form.valid;
  }

  /**
   * Método para validar o input de cadastro.
   * Permite apenas números.
   */
  public validaInputCadastro(): void {
    this.validaInputControl(this.form.controls.nroCadastro, /\D+/);
  }

  public validaInputCaptcha(): void {
    this.validaInputControl(this.form.controls.captcha, /[^A-Za-z0-9]+/);
  }

  /**
   * Método para validar input com AbstractControl.
   * Elimina os caracteres da RegExp e reseta o control quando não há informação digitada.
   * @param control o AbstractControl do input
   * @param pattern o padrão de expressão regular que NÃO pode existir no input
   */
  private validaInputControl(control: AbstractControl, pattern: RegExp): void {
    // Se o valor não é nulo, realiza as validações.
    if (control.value) {
      // Se há caracteres não numéricos, retira com o replace.
      if (pattern.test(control.value)) {
        const valor: string = control.value;
        control.setValue(valor.replace(pattern, ''));
      }
      // Se o replace deixou o valor vazio, reseta o Control para não ficar inválido.
      if ((control.value as string).length == 0)
        control.reset();
    } else
      // Se o valor é nulo e o Control está marcado como inválido, reseta para não deixar inválido.
      if (!control.valid)
        control.reset();
  }

  /**
   * Executado na submissão do formulário, executa a consulta de falta d'água e chama o método pra exibir o Modal.
   */
  public onSubmit(): void {
    // Só prossegue se o formulário for válido.
    if (!this.ehFormValido()) return;

    // Cria e exibe um loading para bloquear a tela enquanto a consulta é realizada.
    const loading: Loading = this.loadingCtrl.create({
      content: "Aguarde...",
      enableBackdropDismiss: true,
      duration: 30000
    });
    loading.present();

    const params: SegundaViaParams = {
      cadastro: this.form.value.nroCadastro,
      referencia: (this.form.value.referencia as string).replace(/(\d{4})-(\d{2})/, '$2/$1'),
      tipo: this.form.value.tipoFatura,
      captcha: this.form.value.captcha,
    };

    // Executa a consulta de falta d'água e subscreve a função do modal no resultado observável.
    let requisicoes: Array<Subscription> = [];
    // const url = 'http://www.riopreto.sp.gov.br/via2agua/pdfagua/boleto2Agua77024050520181316868.pdf';
    // const pdf = 'boleto2Agua77024050520181316868.pdf';
    requisicoes[0] = this.segundaViaWS.buscaSegundaVia(params).subscribe((url: string) => {
      if (url && /^https?:\/\//i.test(url)) {
        const pdf = /\w+\.pdf/i.exec(url)[0];
        requisicoes[1] = this.segundaViaWS.extraiSegundaVia(pdf).subscribe((resposta: SegundaViaResposta) => {
          if (resposta) {
            resposta.cadastro = this.form.value.nroCadastro;
            resposta.url = url;
            const hoje: Date = new Date();
            const vencimento: Date = new Date(resposta.vencimento.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
            resposta.atrasada = resposta.pagamento ? false : vencimento < hoje;
            this.resposta = resposta;
            this.exibeResposta();
          }
          loading.dismiss();
        });
      } else if (url) {
        this.mensagemErro = url;
        loading.dismiss();
      }
    });

    loading.onDidDismiss(() => {
      // Encerra as requisições
      requisicoes.forEach(requisicao => {
        if (!requisicao.closed)
          requisicao.unsubscribe();
      });
    });
  }

  /**
   * Exibe o modal com as informações retornadas pela consulta de falta d'água.
   */
  public exibeResposta(): void {
    const modal = this.modalCtrl.create(SegundaViaModalComponent, { 'resposta': this.resposta });
    modal.present();
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad SegundaViaPage');
  }

}