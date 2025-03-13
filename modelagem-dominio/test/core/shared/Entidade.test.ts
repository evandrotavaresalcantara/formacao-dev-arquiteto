import Entidade, { EntidadeProps } from '@/core/shared/Entidade';
import Id from '@/core/shared/Id';

interface TesteProps extends EntidadeProps {
  nome?: string;
  idade?: number;
}

class Teste extends Entidade<Teste, TesteProps> {
  readonly nome: string;
  readonly idade: number;

  constructor(props: TesteProps) {
    super(props);
    this.nome = props.nome ?? '';
    this.idade = props.idade ?? 0;
  }
}

test('Deve comparar duas entidade diferentes', () => {
  const e1 = new Teste({ nome: 'João', idade: 2 });
  const e2 = new Teste({ nome: 'João', idade: 2 });

  expect(e1.igual(e2)).toBe(false);
  expect(e1.diferente(e2)).toBe(true);
});

test('Deve comparar duas entidade com mesmo id e atributos diferentes ', () => {
  const id = Id.novo.valor;
  const e1 = new Teste({ id, nome: 'João', idade: 2 });
  const e2 = new Teste({ id, nome: 'Maria', idade: 5 });

  expect(e1.igual(e2)).toBe(true);
  expect(e1.diferente(e2)).toBe(false);
});

test('Deve comparar entidade com undefined ou null', () => {
  const id = Id.novo.valor;
  const e1 = new Teste({ id, nome: 'João', idade: 2 });

  expect(e1.igual(undefined as any)).toBe(false);
  expect(e1.igual(null as any)).toBe(false);
  expect(e1.diferente(undefined as any)).toBe(true);
  expect(e1.diferente(null as any)).toBe(true);
});

test('Deve clonar um entidade como o nome diferente', () => {
  const e1 = new Teste({ nome: 'Clara', idade: 36 });
  const e2 = e1.clone({ nome: 'Clara Silva' });

  expect(e2.id.valor).toBe(e1.id.valor);
  expect(e2.nome).toBe('Clara Silva');
  expect(e2.idade).toBe(e1.idade);
});

test('Deve clonar um entidade como o id diferente', () => {
  const e1 = new Teste({ nome: 'Clara', idade: 36 });
  const e2 = e1.clone({ id: Id.novo.valor });

  expect(e2.id.diferente(e1.id)).toBe(true);
  expect(e2.nome).toBe(e1.nome);
  expect(e2.idade).toBe(e1.idade);
});
