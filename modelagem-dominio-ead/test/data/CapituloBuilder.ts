import Capitulo, { CapituloProps } from '@/curso/Capitulo';
import NomesCapitulo from './NomesCapitulo';
import { faker } from '@faker-js/faker/.';
import AulaBuilder from './AulaBuilder';
import Aula, { AulaProps } from '@/curso/Aula';

export default class CapituloBuilder {
  private constructor(private props: CapituloProps) {}

  static criar(qtdeAulas: number = 10): CapituloBuilder {
    return new CapituloBuilder({
      nome: NomesCapitulo.aleatorio(),
      ordem: faker.number.int({ min: 1, max: 100 }),
      aulas: AulaBuilder.CriarListaCom(qtdeAulas).map((a) => a.props),
    });
  }

  static CriarListaCom(qtdeCapitulos: number, qtdeAulas: number): Capitulo[] {
    return Array.from({ length: qtdeCapitulos }).map((_, i) =>
      CapituloBuilder.criar(qtdeAulas)
        .comOrdem(i + 1)
        .build(),
    );
  }

  comId(id: string): CapituloBuilder {
    this.props.id = id;
    return this;
  }

  semId(): CapituloBuilder {
    this.props.id = undefined;
    return this;
  }

  comNome(nome: string): CapituloBuilder {
    this.props.nome = nome;
    return this;
  }

  semNome(): CapituloBuilder {
    this.props.nome = undefined;
    return this;
  }

  comOrdem(ordem: number): CapituloBuilder {
    this.props.ordem = ordem;
    return this;
  }

  semOrdem(): CapituloBuilder {
    this.props.ordem = undefined;
    return this;
  }

  comAulas(aulas: (Aula | AulaProps)[]): CapituloBuilder {
    this.props.aulas = aulas.map((a) => (a instanceof Aula ? a.props : a));
    return this;
  }

  semAulas(): CapituloBuilder {
    this.props.aulas = undefined;
    return this;
  }

  build(): Capitulo {
    return new Capitulo(this.props);
  }
}
