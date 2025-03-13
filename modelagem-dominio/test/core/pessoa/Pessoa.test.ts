import Erros from '@/core/constants/Erros';
import Pessoa from '@/core/pessoa/Pessoa';
import Id from '@/core/shared/Id';
import PessoaBuilder from '@/test/data/PessoaBuilder';

test('Deve lançar erro ao tentar criar uma pessoa com nome vazio', () => {
  expect(() => PessoaBuilder.criar().semNome().build()).toThrow(
    Erros.NOME_VAZIO,
  );
});

test('Deve lançar erro ao tentar criar uma pessoa com cpf vazio', () => {
  expect(() => PessoaBuilder.criar().semCpf().build()).toThrow(
    Erros.CPF_INVALIDO,
  );
});

test('Deve criar um pessoa válida', () => {
  const nome = 'Evandro Tavares';
  const pessoa = PessoaBuilder.criar().comNome(nome).semId().build();
  expect(pessoa.nome.primeiroNome).toBe('Evandro');
  expect(pessoa.id.novo).toBeTruthy();
});

test('Deve clonar objeto com nome alterado', () => {
  const pessoa = PessoaBuilder.criar().build();
  const novaPessoa = pessoa.clone({ nome: 'Evandro Tavares Alcantara' });

  expect(novaPessoa.cpf.valor).toBe(pessoa.cpf.valor);
  expect(novaPessoa.id.valor).toBe(pessoa.id.valor);
});

test('Deve clonar objeto com um novo id', () => {
  const pessoa = PessoaBuilder.criar().build();
  const novaPessoa = pessoa.clone({ id: Id.novo.valor });

  expect(novaPessoa.id.valor !== pessoa.id.valor).toBe(true);
  expect(novaPessoa.cpf.valor).toBe(pessoa.cpf.valor);
  expect(novaPessoa.nome.completo).toBe(pessoa.nome.completo);
});
