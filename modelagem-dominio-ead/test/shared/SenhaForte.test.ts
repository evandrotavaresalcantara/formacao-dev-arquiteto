import Erros from '@/constants/Erros';
import SenhaForte from '@/shared/SenhaForte';

test('Deve lançar erro com senha apenas com números', () => {
  expect(() => new SenhaForte('0123456789')).toThrow(Erros.SENHA_FRACA);
});

test('Deve lançar erro com senha apenas com letras', () => {
  expect(() => new SenhaForte('abcdefghijlMNO')).toThrow(Erros.SENHA_FRACA);
});

test('Deve lançar erro com senha apenas com caracteres especiais', () => {
  expect(() => new SenhaForte('!@#$%*()')).toThrow(Erros.SENHA_FRACA);
});

test('Deve lançar erro com senha menos de 8 caracteres', () => {
  expect(() => new SenhaForte('Senha@1')).toThrow(Erros.SENHA_FRACA);
});

test('Deve lançar erro com senha menos undefined', () => {
  expect(() => new SenhaForte()).toThrow(Erros.SENHA_FRACA);
});

test('Deve criar um senha forte', () => {
  const senhaForte = 'Senha@123';
  expect(new SenhaForte(senhaForte).valor).toBe(senhaForte);
});
