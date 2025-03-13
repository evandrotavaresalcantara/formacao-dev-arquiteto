import RegiaoCpf from '@/core/shared/RegiaoCpf';

test('Deve cria uma RegiaoCpf por código', () => {
  const regiao = RegiaoCpf.porCodigo(0);

  expect(regiao.codigo).toBe(0);
  expect(regiao.estados[0]).toBe('RS');
});

test('Deve cria uma RegiaoCpf por cpf', () => {
  const regiao = RegiaoCpf.porCpf('025.995.490-00');

  expect(regiao.codigo).toBe(0);
  expect(regiao.estados[0]).toBe('RS');
});

test('Deve verificar se duas regiões são iguais', () => {
  const regiao1 = RegiaoCpf.porCpf('302.331.024-69');
  const regiao2 = RegiaoCpf.porCpf('961.124.194-16');

  expect(regiao1.igual(regiao2)).toBe(true);
  expect(regiao1.diferente(regiao2)).toBe(false);
  expect(regiao1 === regiao2).toBe(true);
});

test('Deve comparar regiões como diferentes', () => {
  const regiao1 = RegiaoCpf.porCpf('302.331.024-69');
  const regiao2 = RegiaoCpf.porCpf('963.206.202-77');

  expect(regiao1.igual(regiao2)).toBe(false);
  expect(regiao1.diferente(regiao2)).toBe(true);
});

test('Deve comparar uma região com undefined', () => {
  const regiao = RegiaoCpf.porCpf('302.331.024-69');

  expect(regiao.igual(undefined as any)).toBe(false);
  expect(regiao.diferente(undefined as any)).toBe(true);
});

test('Deve criar uma RegiaoCpf de SP', () => {
  const regiao = RegiaoCpf.SP;
  expect(regiao.codigo).toBe(8);
  expect(regiao.estados[0]).toBe('SP');
});

test('Deve criar uma RegiaoCpf de AL_PB_PE_RN', () => {
  const regiao = RegiaoCpf.AL_PB_PE_RN;
  expect(regiao.codigo).toBe(4);
  expect(regiao.estados[0]).toBe('AL');
  expect(regiao.estados[1]).toBe('PB');
  expect(regiao.estados[2]).toBe('PE');
  expect(regiao.estados[3]).toBe('RN');
});
