import Pessoa, { PessoaProps } from '@/core/pessoa/Pessoa';
import Id from '@/core/shared/Id';
import { faker } from '@faker-js/faker';
import { generate as gerarCpf } from 'gerador-validador-cpf';

export default class PessoaBuilder {
  private constructor(private props: PessoaProps) {}

  static criar() {
    return new PessoaBuilder({
      id: Id.novo.valor,
      nome: faker.person.fullName(),
      cpf: gerarCpf(),
    });
  }

  static criarLista(qtde: number = 10) {
    return Array(qtde)
      .fill(0)
      .map(() => {
        return PessoaBuilder.criar().build();
      });
  }

  comNome(nome: string): PessoaBuilder {
    this.props.nome = nome;
    return this;
  }

  semNome(): PessoaBuilder {
    this.props.nome = undefined;
    return this;
  }

  comCpf(cpf: string): PessoaBuilder {
    this.props.cpf = gerarCpf();
    return this;
  }

  semCpf(): PessoaBuilder {
    this.props.cpf = undefined;
    return this;
  }

  semId(): PessoaBuilder {
    this.props.id = undefined;
    return this;
  }

  build() {
    return new Pessoa(this.props);
  }
}
