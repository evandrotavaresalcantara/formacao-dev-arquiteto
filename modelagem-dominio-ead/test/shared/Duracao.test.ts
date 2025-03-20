import Erros from '@/constants/Erros';
import Duracao from '@/shared/Duracao';

test('Deve criar uma duração vazia', () => {
  expect(new Duracao().segundos).toBe(0);
  expect(new Duracao().hms).toBe('00h 00m 00s');
  expect(new Duracao().hm).toBe('00h 00m');
});

test('Deve formatar a duração em horas e minutos', () => {
  expect(new Duracao(3600).hm).toBe('01h 00m');
  expect(new Duracao(3660).hm).toBe('01h 01m');
  expect(new Duracao(180).hm).toBe('00h 03m');
});

test('Deve formatar a duração em horas, minutos e segundos', () => {
  expect(new Duracao(3600).hms).toBe('01h 00m 00s');
  expect(new Duracao(3661).hms).toBe('01h 01m 01s');
  expect(new Duracao(181).hms).toBe('00h 03m 01s');
});

test('Deve somar durações', () => {
  const d1 = new Duracao(3600);
  const d2 = new Duracao(180);
  expect(d1.somar(d2).segundos).toBe(3780);
  expect(d1.somar(d2).hm).toBe('01h 03m');
});

test('Deve comparar duas durações iguais', () => {
  const d1 = new Duracao(3600);
  const d2 = new Duracao(3600);
  expect(d1.igual(d2)).toBe(true);
  expect(d1.diferente(d2)).toBe(false);
});

test('Deve comparar duas durações diferentes', () => {
  const d1 = new Duracao(3600);
  const d2 = new Duracao(180);
  expect(d1.diferente(d2)).toBe(true);
  expect(d1.igual(d2)).toBe(false);
});

test('Deve criar uma duração zerada', () => {
  const d1 = new Duracao(0);
  expect(d1.zerada).toBe(true);
});

test('Deve lançar um erro ao criar uma duração negativa', () => {
  expect(() => new Duracao(-1)).toThrow(Erros.DURACAO_NEGATIVA);
});
