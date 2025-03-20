import Erros from '@/constants/Erros';
import Capitulo, { CapituloProps } from '@/curso/Capitulo';
import ErroValidacao from '@/error/ErroValidacao';
import Duracao from '@/shared/Duracao';
import Entidade, { EntidadeProps } from '@/shared/Entidade';
import NomeSimples from '@/shared/NomeSimples';
import Ordem from '@/shared/Ordem';
import { th } from '@faker-js/faker/.';
import { CursorPos } from 'readline';
import Aula from './Aula';

export interface CursoProps extends EntidadeProps {
  nome?: string;
  data?: Date;
  capitulos?: CapituloProps[];
  duracao?: number;
  quantidadeDeAulas?: number;
}

export default class Curso extends Entidade<Curso, CursoProps> {
  readonly nome: NomeSimples;
  readonly data: Date;
  readonly capitulos: Capitulo[];
  readonly duracao: Duracao;
  readonly quantidadeDeAulas: number;

  constructor(props: CursoProps) {
    super({
      ...props,
      ...Curso.calcularNumerosDocurso(props),
      data: props.data ?? new Date(),
      capitulos: Curso.ordenarCapitulos(props.capitulos ?? []),
    });

    this.nome = new NomeSimples(this.props.nome ?? '', 3, 50);
    this.data = this.props.data!;
    this.capitulos = this.props.capitulos!.map((c) => new Capitulo(c));
    this.quantidadeDeAulas = this.props.quantidadeDeAulas!;
    this.duracao = new Duracao(this.props.duracao);

    const { duracao, quantidadeDeAulas } = this.props;

    if (duracao! <= 0) ErroValidacao.lancar(Erros.CURSO_SEM_DURACAO, duracao);

    if (quantidadeDeAulas! <= 0) {
      ErroValidacao.lancar(Erros.CURSO_SEM_AULAS, quantidadeDeAulas);
    }
  }

  get primeiroCapitulo() {
    return this.capitulos[0];
  }

  get ultimoCapitulo() {
    return this.capitulos[this.capitulos.length - 1];
  }

  get aulas(): Aula[] {
    return this.capitulos.flatMap((c) => c.aulas);
  }

  atualizarAula(selecionada: Aula): Curso {
    const capitulos = this.capitulos.map((c) => {
      const aulas = c.aulas.map((a) =>
        a.igual(selecionada) ? selecionada : a,
      );
      return { ...c.props, aulas: aulas.map((a) => a.props) } as CapituloProps;
    });
    return this.clone({ capitulos });
  }

  private static calcularNumerosDocurso(props: CursoProps) {
    if (!props.capitulos) {
      return {
        duracao: props.duracao ?? 0,
        quantidadeDeAulas: props.quantidadeDeAulas ?? 0,
      };
    }

    const capitulos = props.capitulos.map((props) => new Capitulo(props));
    const duracao = capitulos.reduce((t, cap) => t + cap.duracao.segundos, 0);
    const quantidadeDeAulas = capitulos.reduce(
      (t, cap) => t + cap.quantidadeDeAulas,
      0,
    );

    return { duracao, quantidadeDeAulas };
  }

  adicionarCapitulo(capitulo: Capitulo, posicao?: number): Curso {
    const capitulosAtuais = this.capitulos;
    const novosCapitulos =
      posicao !== undefined
        ? [
            ...capitulosAtuais.slice(0, posicao),
            capitulo,
            ...capitulosAtuais.slice(posicao),
          ]
        : [...capitulosAtuais, capitulo];
    const capitulos = Curso.reatribuirOrdens(novosCapitulos).map(
      (a) => a.props,
    );
    return this.clone({ capitulos });
  }

  removerCapitulo(selecionado: Capitulo): Curso {
    const outrosCapitulos = this.capitulos.filter((c) =>
      c.diferente(selecionado),
    );
    const capitulos = Curso.reatribuirOrdens(outrosCapitulos).map(
      (c) => c.props,
    );
    return this.clone({ capitulos });
  }

  moverCapitulo(selecionado: Capitulo, posicao: number): Curso {
    return this.removerCapitulo(selecionado).adicionarCapitulo(
      selecionado,
      posicao,
    );
  }

  moverCapituloParaCima(selecionado: Capitulo): Curso {
    const posicao = this.capitulos.findIndex((c) => c.igual(selecionado));
    const primeiro = posicao === 0;
    return primeiro ? this : this.moverCapitulo(selecionado, posicao - 1);
  }

  moverCapituloParaBaixo(selecionado: Capitulo): Curso {
    const posicao = this.capitulos.findIndex((a) => a.igual(selecionado));
    const ultimo = posicao === this.capitulos.length - 1;
    return ultimo ? this : this.moverCapitulo(selecionado, posicao + 1);
  }

  private static ordenarCapitulos(
    capituloProps: CapituloProps[],
  ): CapituloProps[] {
    const capitulos = capituloProps.map((props) => new Capitulo(props));
    const capitulosOrdenados = capitulos.sort(Ordem.ordenar);
    return Curso.reatribuirOrdens(capitulosOrdenados).map((c) => c.props);
  }

  private static reatribuirOrdens(capitulos: Capitulo[]): Capitulo[] {
    return capitulos.map((capitulo, i) => capitulo.clone({ ordem: i + 1 }));
  }
}
