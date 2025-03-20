import Erros from '@/constants/Erros';
import AulaBuilder from '../data/AulaBuilder';

test('Deve lançar erro com duração zerada', () => {
  expect(() => AulaBuilder.criar().comDuracao(0).build()).toThrow(
    Erros.AULA_DURACAO_ZERADA,
  );
});

test('Deve possuir ordem padrão como 1', () => {
  const aula = AulaBuilder.criar().semOrdem().build();
  expect(aula.ordem.valor).toBe(1);
});

test('Deve lançar erro ao tentar cirar aula com ordem negativa ou zero', () => {
  expect(() => AulaBuilder.criar().comOrdem(0).build()).toThrow(
    Erros.ORDEM_INVALIDA,
  );
  expect(() => AulaBuilder.criar().comOrdem(-1).build()).toThrow(
    Erros.ORDEM_INVALIDA,
  );
});
