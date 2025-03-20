import Erros from '@/constants/Erros';
import ProgressoAulaBuilder from '../data/ProgressoAulaBuilder';
import { fa } from '@faker-js/faker/.';

test('Deve retorna concluído como true mesmo quando não inciado', () => {
  const progresso = ProgressoAulaBuilder.criar()
    .naoInciado()
    .concluido()
    .build();
  expect(progresso.concluido).toBeTruthy();
});

test('Deve concluir progresso sem iniciar progresso', () => {
  const progresso = ProgressoAulaBuilder.criar()
    .naoInciado()
    .naoConcluido()
    .build();
  const progressoConcluido = progresso.concluir();
  const dataConclusao = progressoConcluido.dataConclusao!.getTime();
  const dataAtual = new Date().getTime();
  expect(progressoConcluido.iniciado).toBeFalsy();
  expect(progressoConcluido.concluido).toBeTruthy();
  expect(dataAtual - dataConclusao).toBeLessThan(3000);
});

test('Deve concluir progresso com progresso iniciado', () => {
  const progresso = ProgressoAulaBuilder.criar()
    .iniciado()
    .naoConcluido()
    .build();
  const progressoConcluido = progresso.concluir();
  expect(progressoConcluido.iniciado).toBeTruthy();
  expect(progressoConcluido.concluido).toBeTruthy();
});

test('Deve lançar erro quando nome da aula for indefinido', () => {
  expect(() => ProgressoAulaBuilder.criar().semNomeAula().build()).toThrow(
    Erros.NOME_VAZIO,
  );
});

test('Deve lançar erro quando duração for zerada', () => {
  expect(() => ProgressoAulaBuilder.criar().comDuracao(0).build()).toThrow(
    Erros.DURACAO_ZERADA,
  );
});

test('Deve lançar erro quando id for undefined', () => {
  expect(() => ProgressoAulaBuilder.criar().semId().build()).toThrow(
    Erros.ID_INVALIDO,
  );
});

test('Deve lançar erro quando duração for negativa', () => {
  expect(() => ProgressoAulaBuilder.criar().comDuracao(-10).build()).toThrow(
    Erros.DURACAO_NEGATIVA,
  );
});

test('Deve iniciar o progresso da aula', () => {
  const progresso = ProgressoAulaBuilder.criar()
    .naoInciado()
    .naoConcluido()
    .build();
  const novo = progresso.inciar();
  expect(novo.dataIncio).toBeDefined();
  expect(novo.iniciado).toBe(true);
  expect(novo.dataConclusao).toBeUndefined();
  expect(novo.concluido).toBe(false);
});

test('Deve zerar o progresso da aula', () => {
  const progresso = ProgressoAulaBuilder.criar().iniciado().concluido().build();
  expect(progresso.dataConclusao).toBeDefined();
  expect(progresso.concluido).toBe(true);

  const novo = progresso.zerar();
  expect(novo.dataIncio).toBeDefined();
  expect(novo.iniciado).toBe(true);
});
