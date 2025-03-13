import Cpf from '../shared/Cpf';
import Id from '../shared/Id';
import NomePessoa from '../shared/NomePessoa';

export interface ClienteProps {
  id?: string;
  nome?: string;
  cpf?: string;
}

export default class Cliente {
  readonly props: ClienteProps;
  readonly id: Id;
  readonly nome: NomePessoa;
  readonly cpf: Cpf;

  constructor(props: ClienteProps) {
    this.id = new Id(props.id);
    this.nome = new NomePessoa(props.nome);
    this.cpf = new Cpf(props.cpf);
    this.props = { ...props, id: this.id.valor };
  }

  clone(novasProps: ClienteProps) {
    return new Cliente({ ...this.props, ...novasProps });
  }
}
