import Erros from '@/core/constants/Erros';
import Usuario from '@/core/usuario/UsuarioAnemicoV3';

const usuarioValido = () =>
  new Usuario(123, 'João', 'joao@email.com', '123456');
test('Deve permitir usuário com nome undefined', () => {
  const usuario: Usuario = usuarioValido();
  usuario.setNome(undefined as any);
  expect(usuario.getNome()).toBeUndefined();
});

test('Deve permitir usuário sem nome', () => {
  const usuario: Usuario = usuarioValido();
  usuario.setNome('');
  expect(usuario.getNome()).toBe('');
});

test('Deve permitir usuário com id negativo', () => {
  const usuario: Usuario = usuarioValido();
  usuario.setId(-1);
  expect(usuario.getId()).toBe(-1);
});

test('Deve permitir usuário com e-mail inválido', () => {
  const usuario: Usuario = usuarioValido();
  usuario.setEmail('@');
  expect(usuario.getEmail()).toBe(usuario.getEmail());
});
test('Deve alterar senha com senha marior ou igual a 6 caracteres', () => {
  const senhaValida = '12345678';
  const usuario: Usuario = usuarioValido();
  usuario.setSenha(senhaValida);
  expect(usuario.getSenha()).toBe(senhaValida);
});

test('Deve lançar erro ao tentar alterar senha com tamanho menor quer 6 caracteres', () => {
  const usuario: Usuario = usuarioValido();
  expect(() => usuario.setSenha('a')).toThrow(Erros.SENHA_INVALIDA);
});
