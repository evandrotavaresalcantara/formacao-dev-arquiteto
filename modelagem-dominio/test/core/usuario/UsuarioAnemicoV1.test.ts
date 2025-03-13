import Usuario from '@/core/usuario/UsuarioAnemicoV1';

const usaurioValido: Usuario = {
  id: 123,
  nome: 'João',
  email: 'joao@email.com',
  senha: '123456',
};

test('Deve permitir usuário com nome undefined', () => {
  const usuario: Usuario = { ...usaurioValido, nome: undefined as any };
  expect(usuario.nome).toBeUndefined();
});
test('Deve permitir usuário sem nome', () => {
  const usuario: Usuario = { ...usaurioValido, nome: '' };
  expect(usuario.nome).toBe('');
});

test('Deve permitir usuário com id negativo', () => {
  const usuario: Usuario = { ...usaurioValido, id: -1 };
  expect(usuario.id).toBe(-1);
});

test('Deve permitir usuário com e-mail inválido', () => {
  const usuario: Usuario = { ...usaurioValido, email: '@' };
  expect(usuario.email).toBe('@');
});

test('Deve permitir usuário com senha inválido', () => {
  const usuario: Usuario = { ...usaurioValido, senha: 'a' };
  expect(usuario.senha).toBe('a');
});
