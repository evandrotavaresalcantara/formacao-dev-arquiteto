import Erros from '@/core/constants/Erros';
import NomePessoa from '@/core/shared/NomePessoa';

test('Deve lançar erro ao tentar criar nome vazio', () => {
  expect(() => new NomePessoa('')).toThrow(Erros.NOME_VAZIO);
  expect(() => new NomePessoa()).toThrow(Erros.NOME_VAZIO);
});

test('Dever lançar erro ao tentar criar nome menor que 4 caracteres', () => {
  expect(() => new NomePessoa('Lui')).toThrow(Erros.NOME_PEQUENO);
});

test('Dever lançar erro ao tentar criar nome maior que 120 caracteres', () => {
  const nomeGrande =
    'Maria Antônia da Silva Costa de Souza Albuquerque Pereira dos Santos Filho de Oliveira Rodrigues da Rocha Silva Madalena Geisa';
  expect(() => new NomePessoa(nomeGrande)).toThrow(Erros.NOME_GRANDE);
});

test('Dever lançar erro ao tentar criar nome sem sobrenome', () => {
  expect(() => new NomePessoa('Evandro')).toThrow(Erros.NOME_SEM_SOBRENOME);
});

test('Dever lançar erro ao tentar criar nome com caracteres especiais', () => {
  expect(() => new NomePessoa('Lui@#')).toThrow(
    Erros.NOME_CARACTERES_INVALIDOS,
  );
});

test('Deve criar nome com primeiro nome e os sobrenomes', () => {
  const nomeCompleto = 'Evandro Tavares Alcantara';
  const nome = new NomePessoa(nomeCompleto);
  expect(nome.completo).toBe(nomeCompleto);
  expect(nome.primeiroNome).toBe('Evandro');
  expect(nome.sobrenomes).toEqual(['Tavares', 'Alcantara']);
  expect(nome.ultimoSobreNome).toBe('Alcantara');
});
