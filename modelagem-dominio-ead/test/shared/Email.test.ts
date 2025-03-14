import Erros from '@/constants/Erros';
import Email from '@/shared/Email';

test('Deve criar um e-mail válido', () => {
  const email = 'evandro@email.com';
  const novoEmail = new Email(email);
  expect(novoEmail.valor).toBe(email);
});

test('Deve retornar o usuário do e-mail', () => {
  const email = 'evandro@email.com';
  const usuario = 'evandro';
  const novoEmail = new Email(email);
  expect(novoEmail.usuario).toBe(usuario);
});

test('Deve retornar o domínio do e-mail', () => {
  const email = 'evandro@email.com';
  const dominio = 'email.com';
  const novoEmail = new Email(email);
  expect(novoEmail.dominio).toBe(dominio);
});

test('Deve lançar um erro ao tentar criar um e-mail inválido', () => {
  const email = 'email.com';
  expect(() => new Email('email')).toThrow(Erros.EMAIL_INVALIDO);
  expect(() => new Email('email.com')).toThrow(Erros.EMAIL_INVALIDO);
  expect(() => new Email()).toThrow(Erros.EMAIL_INVALIDO);
  expect(() => new Email('')).toThrow(Erros.EMAIL_INVALIDO);
});
