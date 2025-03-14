import Erros from '@/constants/Erros';
import UsuarioBuilder from '../data/UsuarioBuilder';

test('Deve criar um usuário', () => {
  const nomeCompleto = 'Evandro Tavares Alcantara';
  const email = 'evandro@email.com';
  const usuario = UsuarioBuilder.Criar()
    .comNome(nomeCompleto)
    .comEmail(email)
    .build();
  expect(usuario.nome.completo).toBe(nomeCompleto);
  expect(usuario.email.valor).toBe(email);
  expect(usuario.senha).toBeDefined();
});

test('Deve criar um usuário sem senha', () => {
  const usuario = UsuarioBuilder.Criar().semSenha().build();
  expect(usuario.senha).toBeUndefined();
});

test('Deve lançar um erro quando no nome não for informado', () => {
  expect(() => UsuarioBuilder.Criar().semNome().build()).toThrow(
    Erros.NOME_VAZIO,
  );
});

test('Deve lançar um erro quando no nome não tiver sobrenome', () => {
  expect(() => UsuarioBuilder.Criar().comNome('Evandro').build()).toThrow(
    Erros.NOME_SEM_SOBRENOME,
  );
});

test('Deve lançar um erro ao tentar criar usuário sem e-mail', () => {
  expect(() => UsuarioBuilder.Criar().semEmail().build()).toThrow(
    Erros.EMAIL_INVALIDO,
  );
});
