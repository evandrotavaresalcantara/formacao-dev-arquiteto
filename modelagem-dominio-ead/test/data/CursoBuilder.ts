import Curso, { CursoProps } from '@/curso/Curso';
import NomesCurso from './NomesCurso';
import { faker } from '@faker-js/faker/.';
import CapituloBuilder from './CapituloBuilder';
import Capitulo from '@/curso/Capitulo';

export default class CursoBuilder {
  private constructor(private props: CursoProps) {}

  static criar(qtdeCapitulos: number = 10, qtdeAulas: number = 10) {
    return new CursoBuilder({
      nome: NomesCurso.aleatorio(),
      data: faker.date.recent(),
      capitulos: CapituloBuilder.CriarListaCom(qtdeCapitulos, qtdeAulas).map(
        (c) => c.props,
      ),
    });
  }

  comId(id: string): CursoBuilder {
    this.props.id = id;
    return this;
  }

  semId(): CursoBuilder {
    this.props.id = undefined;
    return this;
  }

  comNome(nome: string): CursoBuilder {
    this.props.nome = nome;
    return this;
  }

  semNome(): CursoBuilder {
    this.props.nome = undefined;
    return this;
  }

  comDuracao(duracao: number): CursoBuilder {
    this.props.duracao = duracao;
    return this;
  }

  semDuracao(): CursoBuilder {
    this.props.duracao = undefined;
    return this;
  }

  comQuantidadeDeAulas(quantidadeDeAulas: number): CursoBuilder {
    this.props.quantidadeDeAulas = quantidadeDeAulas;
    return this;
  }

  semQuantidadeDeAulas(): CursoBuilder {
    this.props.quantidadeDeAulas = undefined;
    return this;
  }

  comCapitulos(capitulos: Capitulo[]): CursoBuilder {
    this.props.capitulos = capitulos.map((a) => a.props);
    return this;
  }

  semCapitulos(): CursoBuilder {
    this.props.capitulos = undefined;
    return this;
  }

  build(): Curso {
    return new Curso(this.props);
  }
}
