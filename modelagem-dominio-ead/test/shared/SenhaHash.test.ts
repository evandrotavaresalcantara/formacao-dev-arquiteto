import Erros from '@/constants/Erros';
import SenhaHash from '@/shared/SenhaHash';

test('Deve lançar erro hash inválido', () => {
  expect(() => new SenhaHash('jfksruiejdsfksjdfkldsfd')).toThrow(
    Erros.SENHA_HASH_INVALIDA,
  );
});

test('Deve criar um hash válido', () => {
  const hash = '$2a$12$vetcRxooNtSYpYwKFpD8WOrMjrCSVLxIWJ2panm.g/2LZBDKDl1fy';
  expect(new SenhaHash(hash)).toBeDefined();
});
