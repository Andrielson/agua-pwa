import { Subscription } from 'rxjs/Subscription';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import FileSaver from 'file-saver';

import { CertidaoNegativaProvider } from './../../providers/certidao-negativa/certidao-negativa';

@IonicPage()
@Component({
  selector: 'page-certidao-negativa',
  templateUrl: 'certidao-negativa.html',
})
export class CertidaoNegativaPage {

  public resposta: ArrayBuffer;
  public form: FormGroup;

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
    nroHidrometro: [ //controller do campo Número do hidrômetro
      '', //valor padrão do input
      Validators.compose( //função de validação síncrona. Neste caso, uso uma composição de validadores padrões do Angular
        [
          Validators.maxLength(20), // tamanho máximo
          Validators.pattern('[A-Za-z0-9]+'), // regex somente letras e números
          Validators.required //campo obrigatório
        ]
      )
    ]
  };

  /**
   * 
   * @param navCtrl o NavController para controlar o fluxo de navegação das páginas.
   * @param navParams o NavParams para receber os parâmetros passados pela página anterior.
   * @param loadingCtrl o LoadingController para exibir uma mensagem enquanto é feita a consulta.
   * @param formBuilder o FormBuilder para criar o formulário.
   * @param certidaoNegativaWS o CertidaoNegativaProvider para realizar a consulta.
   */
  public constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private formBuilder: FormBuilder, private certidaoNegativaWS: CertidaoNegativaProvider) {
  this.form = this.formBuilder.group(this.formConfig);
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
   * Método para verificar se o texto informado no número do hidrômetro é valido.
   * @returns true se for válido e false caso contrário.
   */
  public ehHidrometroValido(): boolean {
    const hidrometroControl: AbstractControl = this.form.controls.nroHidrometro;
    return hidrometroControl.dirty ? hidrometroControl.valid : true;
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

  /**
   * Método para validar o input de hidrômetro.
   * Permite apenas caracteres alfanuméricos.
   */
  public validaInputHidrometro(): void {
    this.validaInputControl(this.form.controls.nroHidrometro, /[^A-Za-z0-9]+/);
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
    if (!this.ehFormValido) return;

    // Cria e exibe um loading para bloquear a tela enquanto a consulta é realizada.
    const loading: Loading = this.loadingCtrl.create({
      content: "Aguarde...",
      enableBackdropDismiss: true
    });
    loading.present();

    // Executa a consulta de falta d'água e subscreve a função do modal no resultado observável.
    const requisicao: Subscription = this.certidaoNegativaWS.validaCertidao(this.form.value.nroCadastro, this.form.value.nroHidrometro).subscribe(resposta => {
      if (resposta) {
        loading.dismiss();
        this.resposta = resposta.body;
        this.exibeResposta();
      }
    });

    loading.onDidDismiss(() => {
      // Encerra a requisição
      if (!requisicao.closed)
        requisicao.unsubscribe();
    });
  }

  public exibeResposta(): void {
    const arquivo = new File([this.resposta], 'CertidaoNegativa.pdf', { type: 'application/pdf' });
    FileSaver.saveAs(arquivo);
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad CertidaoNegativaPage');
  }

}
