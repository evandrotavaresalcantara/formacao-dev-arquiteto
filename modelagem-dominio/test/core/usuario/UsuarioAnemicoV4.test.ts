import Erros from '@/core/constants/Erros';
import Usuario from '@/core/usuario/UsuarioAnemicoV4';

const usuarioValido = () => new Usuario(123, 'João', '@', '123456');
test('Deve permitir usuário com nome undefined', () => {
  const usuario: Usuario = usuarioValido();
  usuario.nome = undefined as any;
  expect(usuario.nome).toBeUndefined();
});
test('Deve permitir usuário sem nome', () => {
  const usuario: Usuario = usuarioValido();
  usuario.nome = '';
  expect(usuario.nome).toBe('');
});
test('Deve permitir usuário com id negativo', () => {
  const usuario: Usuario = usuarioValido();
  usuario.id = -1;
  expect(usuario.id).toBe(-1);
});
test('Deve permitir alterar e-mail válido', () => {
  const emailValido = 'joao@email.com';
  const usuario: Usuario = usuarioValido();
  usuario.email = emailValido;
  expect(usuario.email).toBe(emailValido);
});
test('Deve permitir usuário com e-mail inválido', () => {
  const usuario: Usuario = usuarioValido();
  usuario.email = '@';
  expect(usuario.email).toBe(usuario.email);
});
test('Deve alterar senha com senha marior ou igual a 6 caracteres', () => {
  const senhaValida = '12345678';
  const usuario: Usuario = usuarioValido();
  usuario.senha = senhaValida;
  expect(usuario.senha).toBe(senhaValida);
});
test('Deve lançar erro ao tentar alterar senha com tamanho menor quer 6 caracteres', () => {
  const usuario: Usuario = usuarioValido();
  expect(() => (usuario.senha = 'a')).toThrow(Erros.SENHA_INVALIDA);
});
