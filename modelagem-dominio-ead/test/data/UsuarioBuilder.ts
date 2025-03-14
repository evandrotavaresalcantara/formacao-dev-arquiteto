import Id from '@/shared/Id';
import Usuario, { UsuarioProps } from '@/usuario/Usuario';
import { faker, th } from '@faker-js/faker';

export default class UsuarioBuilder {
  private constructor(public props: UsuarioProps) {}

  static Criar(): UsuarioBuilder {
    return new UsuarioBuilder({
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      senha: faker.internet.password({
        length: 60,
        pattern: /[A-Za-z0-9\.\/]/,
        prefix: '$2a$12$',
      }),
      id: Id.novo.valor,
    });
  }

  comId(id: string): UsuarioBuilder {
    this.props.id = id;
    return this;
  }

  semId(): UsuarioBuilder {
    this.props.id = undefined;
    return this;
  }

  comNome(nome: string): UsuarioBuilder {
    this.props.nome = nome;
    return this;
  }

  semNome(): UsuarioBuilder {
    this.props.nome = undefined;
    return this;
  }

  comEmail(email: string): UsuarioBuilder {
    this.props.email = email;
    return this;
  }

  semEmail(): UsuarioBuilder {
    this.props.email = undefined;
    return this;
  }

  comSenha(senha: string): UsuarioBuilder {
    this.props.senha = senha;
    return this;
  }

  semSenha(): UsuarioBuilder {
    this.props.senha = undefined;
    return this;
  }

  build(): Usuario {
    return new Usuario(this.props);
  }
}
