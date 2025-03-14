import Id from './Id';

export interface EntidadeProps {
  id?: string;
}

export default abstract class Entidade<Tipo, Props extends EntidadeProps> {
  readonly id: Id;
  readonly props: Props;

  constructor(props: Props) {
    this.id = new Id(props.id);
    this.props = { ...props, id: this.id.valor };
  }

  igual(outroEntidade: Entidade<Tipo, Props>): boolean {
    return this.id.igual(outroEntidade?.id);
  }

  diferente(outroEntidade: Entidade<Tipo, Props>): boolean {
    return this.id.diferente(outroEntidade?.id);
  }

  clone(novasProps: Props, ...args: any): Tipo {
    return new (this.constructor as any)(
      { ...this.props, ...novasProps },
      ...args,
    );
  }
}
