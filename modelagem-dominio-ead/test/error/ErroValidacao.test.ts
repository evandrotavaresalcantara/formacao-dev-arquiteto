import Erros from '@/constants/Erros';
import ErroValidacao from '@/error/ErroValidacao';

test('Deve lançar um erro', () => {
  expect(() => ErroValidacao.lancar('Erro', 'Valor')).toThrow('Erro');
});

test('Deve cria um erro com código e valor', () => {
  const erro = new ErroValidacao({
    codigo: Erros.DESCONHECIDO,
    valor: 'valor1',
  });

  expect(erro.codigo).toBe(Erros.DESCONHECIDO);
  expect(erro.valor).toBe('valor1');
});

test('Deve criar um erro com código, valor e extras', () => {
  const erro = new ErroValidacao({
    codigo: Erros.NOME_PEQUENO,
    valor: 'Maria',
    extras: { min: 6 },
  });
  expect(erro.codigo).toBe(Erros.NOME_PEQUENO);
  expect(erro.valor).toBe('Maria');
  expect(erro.extras.min).toEqual(6);
});

test('Deve criar um erro sem código', () => {
  const e1 = ErroValidacao.novo();
  const e2 = new ErroValidacao();

  expect(e1.codigo).toBe(Erros.DESCONHECIDO);
  expect(e2.codigo).toBe(Erros.DESCONHECIDO);
});
