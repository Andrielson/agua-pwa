import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Loading } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { FaltaDAguaProvider, FaltaDAguaResposta } from './../../providers/falta-d-agua/falta-d-agua';
import { FaltaDAguaModalComponent } from './../../components/falta-d-agua-modal/falta-d-agua-modal';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-faltad-agua',
  templateUrl: 'faltad-agua.html',
})
export class FaltadAguaPage {

  public resposta: FaltaDAguaResposta;
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
    ]
  };

  /**
   * Construtor público da classe que recebe as dependências injetadas.
   * @param navCtrl o NavController para controlar o fluxo de navegação das páginas.
   * @param navParams o NavParams para receber os parâmetros passados pela página anterior.
   * @param loadingCtrl o LoadingController para exibir uma mensagem enquanto é feita a consulta.
   * @param modalCtrl o ModalController para exibir os dados da falta d'água.
   * @param formBuilder o FormBuilder para criar o formulário.
   * @param faltaDAguaWS o FaltaDAguaProvider para executar a busca pelas informações de falta d'água.
   */
  public constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private modalCtrl: ModalController, private formBuilder: FormBuilder, private faltaDAguaWS: FaltaDAguaProvider) {
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
   * Método para verificar se o formulário é valido.
   */
  public ehFormValido(): boolean {
    return this.form.valid;
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
    const requisicao: Subscription = this.faltaDAguaWS.consultaFaltadAgua(this.form.value.nroCadastro).subscribe(resposta => {
      if (resposta) {
        loading.dismiss();
        this.resposta = resposta;
        this.exibeModal();
      }
    });

    loading.onDidDismiss(() => {
      // Encerra a requisição
      if (!requisicao.closed)
        requisicao.unsubscribe();
    });
  }

  /**
   * Método para validar o input de cadastro.
   * Permite apenas números e reseta o control quando não há informação digitada.
   */
  public validaInputCadastro(): void {
    // Pattern de expressão regular para identificar todos os caracteres não numéricos.
    const pattern: RegExp = /\D+/;

    // Control do input de cadastro.
    const cadastroControl: AbstractControl = this.form.controls.nroCadastro;

    // Se o valor não é nulo, realiza as validações.
    if (cadastroControl.value) {
      // Se há caracteres não numéricos, retira com o replace.
      if (pattern.test(cadastroControl.value)) {
        const valor: string = cadastroControl.value;
        cadastroControl.setValue(valor.replace(pattern, ''));
      }
      // Se o replace deixou o valor vazio, reseta o Control para não ficar inválido.
      if ((cadastroControl.value as string).length == 0)
        cadastroControl.reset();
    } else
      // Se o valor é nulo e o Control está marcado como inválido, reseta para não deixar inválido.
      if (!cadastroControl.valid)
        cadastroControl.reset();
  }

  /**
   * Exibe o modal com as informações retornadas pela consulta de falta d'água.
   */
  public exibeModal(): void {
    const modal = this.modalCtrl.create(FaltaDAguaModalComponent, { 'resposta': this.resposta });
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaltadAguaPage');
  }

}
