import Email from '@/shared/Email';
import Entidade, { EntidadeProps } from '@/shared/Entidade';
import NomeSimples from '@/shared/NomeSimples';
import ProgressoAula, { ProgressoAulaProps } from './ProgressoAula';
import ErroValidacao from '@/error/ErroValidacao';
import Erros from '@/constants/Erros';
import Duracao from '@/shared/Duracao';
import ObservadorEventoDominio from '@/shared/ObservadorEventoDominio';
import CursoConcluido from './CursoConcluido';

export interface ProgressoCursoProps extends EntidadeProps {
  emailUsuario?: string;
  nomeCurso?: string;
  data?: Date;
  dataConclusao?: Date;
  aulas?: ProgressoAulaProps[];
  aulaSelecionadaId?: string;
}

export default class ProgressoCurso extends Entidade<
  ProgressoCurso,
  ProgressoCursoProps
> {
  readonly emailUsuario: Email;
  readonly nomeCurso: NomeSimples;
  readonly data: Date;
  readonly dataConclusao?: Date;
  readonly aulaSelecionada: ProgressoAula;
  readonly aulas: ProgressoAula[];

  constructor(
    props: ProgressoCursoProps,
    private observadores: ObservadorEventoDominio<CursoConcluido>[] = [],
  ) {
    super({
      ...props,
      dataConclusao: ProgressoCurso.calcularDataConclusao(props),
    });

    if (!props.aulas?.length)
      ErroValidacao.lancar(Erros.PROGRESSO_CURSO_SEM_AULAS);

    this.emailUsuario = new Email(props.emailUsuario);
    this.nomeCurso = new NomeSimples(props.nomeCurso!, 3, 50);
    this.data = props.data ?? new Date();
    this.dataConclusao = this.props.dataConclusao;
    this.aulas = props.aulas.map((props) => new ProgressoAula(props));
    this.aulaSelecionada =
      this.aulas.find((aula) => aula.id.valor === props.aulaSelecionadaId) ??
      this.aulas[0];

    const acabouDeConcluir = !props.dataConclusao && this.dataConclusao;
    if (acabouDeConcluir) this.notificarConclusao();
  }

  riscoDeFraude(): number {
    if (this.aulas.length < 2) return 0;
    const total = this.aulas.reduce((total, aulaAtual, i) => {
      const dataAtual = aulaAtual.dataIncio;
      const dataDoProximo = this.aulas[i + 1]?.dataIncio;
      if (!dataAtual || !dataDoProximo) return total;

      const intervaloSuspeito = aulaAtual.duracao.segundos * 0.2 * 1000;
      const intervaloReal = Math.abs(
        dataAtual.getTime() - dataDoProximo.getTime(),
      );
      return total + (intervaloReal < intervaloSuspeito ? 1 : 0);
    }, 0);
    return Math.floor((total / (this.aulas.length - 1)) * 100);
  }

  concluirCurso(): ProgressoCurso {
    if (this.concluido) return this;
    const aulas = this.aulas.map((a) => a.concluir().props);
    return this.clone({ aulas, data: new Date() }, this.observadores);
  }

  iniciarAula(aulaId: string): ProgressoCurso {
    const aulas = this.aulas.map((aula) =>
      aula.id.valor === aulaId ? aula.inciar().props : aula.props,
    );
    return this.clone({ aulas, data: new Date() }, this.observadores);
  }

  concluirAula(aulaId: string): ProgressoCurso {
    if (this.concluido) return this;
    const aulas = this.aulas.map((aula) =>
      aula.id.valor === aulaId ? aula.concluir().props : aula.props,
    );
    return this.clone({ aulas, data: new Date() }, this.observadores);
  }

  zerarAula(aulaId: string): ProgressoCurso {
    const aulas = this.aulas.map((aula) =>
      aula.id.valor === aulaId ? aula.zerar().props : aula.props,
    );
    return this.clone({ aulas, data: new Date() }, this.observadores);
  }

  alternarAula(aulaId: string): ProgressoCurso {
    const aula = this.progressoAula(aulaId);
    if (!aula) return this;
    return aula.concluido
      ? this.zerarAula(aula.id.valor)
      : this.concluirAula(aula.id.valor);
  }

  iniciarAulaAtual(): ProgressoCurso {
    return this.iniciarAula(this.aulaSelecionada.id.valor);
  }

  concluirAulaAtual(): ProgressoCurso {
    return this.concluirAula(this.aulaSelecionada.id.valor);
  }

  selecionarAula(aulaId: string): ProgressoCurso {
    return this.clone(
      {
        aulaSelecionadaId: aulaId,
        data: new Date(),
      },
      this.observadores,
    );
  }

  selecionarProximaAula(): ProgressoCurso {
    const aulaAtual = this.aulas.indexOf(this.aulaSelecionada);
    const proximaAula = this.aulas[aulaAtual + 1];
    return proximaAula ? this.selecionarAula(proximaAula.id.valor) : this;
  }

  concluirESelecionarProximaAula(): ProgressoCurso {
    return this.concluirAulaAtual().selecionarProximaAula();
  }
  get concluido() {
    return this.aulas.every((a) => a.concluido);
  }

  progressoAula(aulaId: string): ProgressoAula | undefined {
    return this.aulas.find((a) => a.id.valor === aulaId);
  }

  get duracaoTotal(): Duracao {
    return this.aulas.reduce(
      (total, aula) => total.somar(aula.duracao),
      new Duracao(),
    );
  }

  registrar(
    observador: ObservadorEventoDominio<CursoConcluido>,
  ): ProgressoCurso {
    return this.clone(this.props, [...this.observadores, observador]);
  }

  get duracaoAssistida(): Duracao {
    return this.aulas
      .filter((a) => a.concluido)
      .reduce((total, aula) => total.somar(aula.duracao), new Duracao());
  }

  get percentualAssistido(): number {
    const fator = this.duracaoAssistida.segundos / this.duracaoTotal.segundos;
    return Math.floor(fator * 100);
  }

  private static calcularDataConclusao(
    props: ProgressoCursoProps,
  ): Date | undefined {
    const cursoConcluido = props.aulas?.every((a) => a.dataConclusao) ?? false;
    return cursoConcluido && !props.dataConclusao
      ? new Date()
      : props.dataConclusao;
  }

  private notificarConclusao() {
    const evento = new CursoConcluido(this.emailUsuario, this.id, new Date());
    this.observadores.forEach((observador) =>
      observador.enventoOcorreu(evento),
    );
  }
}
