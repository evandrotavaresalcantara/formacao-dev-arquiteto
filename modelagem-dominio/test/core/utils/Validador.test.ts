import Validador from '@/core/utils/Validador';

test('Deve retornar null com texto não nulo', () => {
  const erro = Validador.naoNulo('Olá', 'Texto inválido');
  expect(erro).toBeNull();
});
test('Deve retornar erro com texto nulo', () => {
  const msgErro = 'Texto inválido';
  const erro = Validador.naoNulo(null, msgErro);
  expect(erro).toBe(msgErro);
});
test('Deve retornar erro com texto vazio', () => {
  const msgErro = 'Texto vazio';
  const erro = Validador.naoVazio('   ', msgErro);
  expect(erro).toBe(msgErro);
});
test('Deve retornar erro com texto null', () => {
  const msgErro = 'Texto null';
  const erro = Validador.naoVazio(null, msgErro);
  expect(erro).toBe(msgErro);
});

test('Deve retornar erro com texto undefined', () => {
  const msgErro = 'Texto undefined';
  const erro = Validador.naoVazio(undefined, msgErro);
  expect(erro).toBe(msgErro);
});

test('Deve retornar null com texto menor que o tamanho máximo', () => {
  const erro = Validador.tamanhoMenorQue('teste', 6, 'erro');
  expect(erro).toBeNull();
});

test('Deve retornar erro com texto maior que o tamanho máximo', () => {
  const erro = Validador.tamanhoMenorQue('texto maior que 6', 6, 'erro');
  expect(erro).toBe('erro');
});

test('Deve combinar os erros', () => {
  const erros = Validador.combinar(
    Validador.naoVazio('', 'erro1'),
    Validador.naoVazio('Texto', 'erro2'),
    Validador.naoVazio('', 'erro3'),
  );
  expect(erros?.join(', ')).toBe('erro1, erro3');
});

test('Deve combinar sem erros', () => {
  const erros = Validador.combinar(
    Validador.naoVazio('Texto1', 'erro1'),
    Validador.naoVazio('Texto2', 'erro2'),
    Validador.naoVazio('Texto3', 'erro3'),
  );
  expect(erros).toBeNull();
});
