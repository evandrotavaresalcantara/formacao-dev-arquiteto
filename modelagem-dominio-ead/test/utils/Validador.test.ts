import Validador from '@/utils/Validador';

test('Deve retornar null com texto não nulo', () => {
  const erro = Validador.naoNulo('Mensagem', 'Texto inválido');
  expect(erro).toBeNull();
});

test('Deve retornar erro com texto nulo', () => {
  const msgErro = 'Texto inválido';
  const erro = Validador.naoNulo(null, msgErro);
  expect(erro?.codigo).toBe(msgErro);
});

test('Deve retornar null com texto não vazio', () => {
  const erro = Validador.naoVazio('mensagem', 'Texto vazio');
  expect(erro).toBeNull();
});

test('Deve retornar erro com texto vazio', () => {
  const msgErro = 'Texto inválido';
  const e1 = Validador.naoVazio('    ', msgErro);
  expect(e1?.codigo).toBe(msgErro);
});

test('Deve retornar erro com texto null', () => {
  const msgErro = 'Texto inválido';
  const e1 = Validador.naoVazio(null, msgErro);
  expect(e1?.codigo).toBe(msgErro);
});

test('Deve retornar erro com texto undefined', () => {
  const msgErro = 'Texto inválido';
  const e1 = Validador.naoVazio(undefined, msgErro);
  expect(e1?.codigo).toBe(msgErro);
});

test('Deve retornar null com texto menor que o tamanho máximo', () => {
  const erro = Validador.tamanhoMenorQue('teste', 6, 'erro');
  expect(erro).toBeNull();
});

test('Deve retornar erro com texto maior que o tamanho máximo', () => {
  const erro = Validador.tamanhoMenorQue('Mensagem de texto', 6, 'erro');
  expect(erro?.codigo).toBe('erro');
});

test('Deve retornar null com texto maior que o tamanho mínimo', () => {
  const erro = Validador.tamanhoMaiorQue('teste', 4, 'erro');
  expect(erro).toBeNull();
});

test('Deve retornar erro com texto menor que o tamanho mínimo', () => {
  const erro = Validador.tamanhoMaiorQue('texto', 6, 'erro');
  expect(erro?.codigo).toBe('erro');
});

test('Deve validar via regex que só tem números', () => {
  const erro = Validador.regex('0132456789', /\d{10}/, 'erro');
  expect(erro).toBeNull();
});

test('Deve retornar erro via validação de números', () => {
  const erro = Validador.regex('a132456789', /\d{10}/, 'erro');
  expect(erro?.codigo).toBe('erro');
});

test('Deve combinar os erros', () => {
  const erros = Validador.combinar(
    Validador.naoVazio('', 'erro1'),
    Validador.naoVazio('', 'erro2'),
    Validador.naoVazio('', 'erro3'),
    Validador.naoVazio('', 'erro4'),
    Validador.naoVazio('', 'erro5'),
    Validador.naoVazio('msg', 'erro6'),
  );

  expect(erros?.map((e) => e.codigo)?.join(', ')).toBe(
    'erro1, erro2, erro3, erro4, erro5',
  );
});

test('Deve combinar sem erros', () => {
  const erros = Validador.combinar(
    Validador.naoVazio('msg1', 'erro1'),
    Validador.naoVazio('msg2', 'erro2'),
  );

  expect(erros).toBeNull();
});
