import Erros from '@/constants/Erros';
import Id from '@/shared/Id';

test('Deve criar um novo Id válido', () => {
  const id = Id.novo;
  expect(id.valor).toHaveLength(36);
  expect(id.novo).toBeTruthy();
});

test('Deve lançar um erro ao tentar criar um id inválido', () => {
  expect(() => new Id('123')).toThrow(Erros.ID_INVALIDO);
});

test('Deve criar um novo id válido a partir de um id existente', () => {
  const valor = Id.novo.valor;
  const id = new Id(valor);
  expect(id.valor).toHaveLength(36);
  expect(id.novo).toBeFalsy();
});

test('Deve comparar dois ids iguais', () => {
  const id1 = new Id();
  const id2 = new Id(id1.valor);

  expect(id1.igual(id2)).toBeTruthy();
  expect(id1.diferente(id2)).toBe(false);
});

test('Deve comparar dois ids diferentes', () => {
  const id1 = new Id();
  const id2 = new Id();

  expect(id1.igual(id2)).toBeFalsy();
  expect(id1.diferente(id2)).toBe(true);
});

test('Deve comparar um id com undefined', () => {
  const id1 = new Id();

  expect(id1.igual(undefined as any)).toBeFalsy();
  expect(id1.diferente(undefined as any)).toBe(true);
});
