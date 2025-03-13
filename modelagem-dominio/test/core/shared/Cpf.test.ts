import Erros from '@/core/constants/Erros';
import Cpf from '@/core/shared/Cpf';
import RegiaoCpf from '@/core/shared/RegiaoCpf';

test('Deve retornar cpf inválido (false) para string vazia', () => {
  expect(Cpf.isValido('')).toBeFalsy();
});

test('Deve retonar cpf inválido (false) para string incompleta', () => {
  expect(Cpf.isValido('123')).toBeFalsy();
  expect(Cpf.isValido('1234')).toBeFalsy();
  expect(Cpf.isValido('1234567')).toBeFalsy();
  expect(Cpf.isValido('123.456.789-0')).toBeFalsy();
});

test('Deve retonar cpf inválido (false) para dv inválido', () => {
  expect(Cpf.isValido('123.456.789-00')).toBeFalsy();
});

test('Deve retonar cpf válido (true) para dv válido', () => {
  expect(Cpf.isValido('280.012.389-38')).toBeTruthy();
});

test('Deve retorna o dv do cpf', () => {
  expect(new Cpf('280.012.389-38').digitoVerificador).toBe('38');
});

test('Deve lançar um erro para cpf com string vazia', () => {
  expect(() => new Cpf('')).toThrow(Erros.CPF_INVALIDO);
});

test('Deve lançar um erro para string incompleta', () => {
  expect(() => new Cpf('123')).toThrow(Erros.CPF_INVALIDO);
  expect(() => new Cpf('1234')).toThrow(Erros.CPF_INVALIDO);
  expect(() => new Cpf('1234567')).toThrow(Erros.CPF_INVALIDO);
  expect(() => new Cpf('123.456.789-0')).toThrow(Erros.CPF_INVALIDO);
});

test('Deve retornar cpf inválido para dv inválido', () => {
  expect(() => new Cpf('280.012.389-00').digitoVerificador).toThrow(
    Erros.CPF_INVALIDO,
  );
});

test('Deve retornar cpf formatado', () => {
  const cpfFormatado = '280.012.389-38';
  expect(new Cpf(cpfFormatado).formatado).toEqual(cpfFormatado);
});

test('Deve retornar cpf sem formatacao', () => {
  const cpfSemFormatacao = '28001238938';
  expect(new Cpf(cpfSemFormatacao).valor).toEqual(cpfSemFormatacao);
});

test('Deve lançar um erro para cpf com valor undefined', () => {
  expect(() => new Cpf(undefined)).toThrow(Erros.CPF_INVALIDO);
});

test('Deve retornar o valor do cpf', () => {
  expect(new Cpf('280.012.389-38').valor).toBe('28001238938');
});

test('Deve retornar a região do cpf', () => {
  expect(new Cpf('280.012.389-38').regiao.codigo).toBe(RegiaoCpf.PR_SC.codigo);
  expect(new Cpf('280.012.389-38').regiao).toBe(RegiaoCpf.PR_SC);
});
