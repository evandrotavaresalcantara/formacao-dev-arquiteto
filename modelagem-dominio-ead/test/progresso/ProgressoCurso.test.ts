import ProgressoCurso from '@/progresso/ProgressoCurso';
import ProgressoCursoBuilder from '../data/ProgressoCursoBuild';
import Erros from '@/constants/Erros';
import ProgressoAulaBuilder from '../data/ProgressoAulaBuilder';
import Id from '@/shared/Id';
import { faker } from '@faker-js/faker/.';
import CursoConcluido from '@/progresso/CursoConcluido';

const builder = () => ProgressoAulaBuilder.criar().naoInciado().naoConcluido();
const aulas = [
  builder().comDuracao(100).build().props,
  builder().comDuracao(200).build().props,
  builder().comDuracao(300).build().props,
  builder().comDuracao(400).build().props,
  builder().comDuracao(500).build().props,
];

test('Deve lançar erro ao criar progresso com aulas indefinidas', () => {
  expect(() => {
    ProgressoCursoBuilder.criar().semAulas().build();
  }).toThrow(Erros.PROGRESSO_CURSO_SEM_AULAS);
});

test('Deve lançar erro ao criar progresso com aulas vazias', () => {
  expect(() => {
    ProgressoCursoBuilder.criar().comAulas([]).build();
  }).toThrow(Erros.PROGRESSO_CURSO_SEM_AULAS);
});

test('Deve calcular a duração assistida', () => {
  let progresso = ProgressoCursoBuilder.criar().comAulas(aulas).build();
  expect(progresso.duracaoAssistida.segundos).toBe(0);

  progresso = progresso.concluirESelecionarProximaAula();
  expect(progresso.duracaoAssistida.segundos).toBe(100);

  progresso = progresso.concluirESelecionarProximaAula();
  expect(progresso.duracaoAssistida.segundos).toBe(300);

  progresso = progresso.concluirESelecionarProximaAula();
  expect(progresso.duracaoAssistida.segundos).toBe(600);
});

test('Deve calcular a duração total', () => {
  const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).build();
  expect(progresso.duracaoTotal.segundos).toBe(1500);
});

test('Deve calcular o percentual zero de progresso', () => {
  const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).build();
  expect(progresso.percentualAssistido).toBe(0);
});

test('Deve calcular o percentual de progresso', () => {
  const progresso = ProgressoCursoBuilder.criar()
    .comAulas(aulas)
    .build()
    .concluirESelecionarProximaAula()
    .concluirESelecionarProximaAula()
    .concluirESelecionarProximaAula();
  expect(progresso.percentualAssistido).toBe(40);
});

test('Deve concluir a aula atual', () => {
  const progresso = ProgressoCursoBuilder.criar()
    .comAulas(aulas)
    .build()
    .concluirAulaAtual()
    .concluirAulaAtual();
  expect(progresso.aulas[0].concluido).toBe(true);
  expect(progresso.aulas[1].concluido).toBe(false);
});

test('Deve concluir curso aula por aula', () => {
  const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).build();
  expect(progresso.percentualAssistido).toBe(0);
  expect(progresso.concluido).toBe(false);

  const progressoConcluido = progresso
    .concluirESelecionarProximaAula()
    .concluirESelecionarProximaAula()
    .concluirESelecionarProximaAula()
    .concluirESelecionarProximaAula()
    .concluirESelecionarProximaAula();
  expect(progressoConcluido.percentualAssistido).toBe(100);
  expect(progressoConcluido.concluido).toBe(true);
});

test('Deve concluir curso ', () => {
  const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).build();
  expect(progresso.percentualAssistido).toBe(0);
  expect(progresso.concluido).toBe(false);

  const progressoConcluido = progresso.concluirCurso();

  expect(progressoConcluido.percentualAssistido).toBe(100);
  expect(progressoConcluido.concluido).toBe(true);
});

test('Deve selecionar progresso por id', () => {
  const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).build();
  const selecionada = progresso.progressoAula(aulas[2].id!);

  expect(selecionada!.id.valor).toBe(aulas[2].id!);
  expect(progresso.progressoAula('123')).toBeUndefined();
});

test('Deve criar progresso com data indefinida', () => {
  const progresso = ProgressoCursoBuilder.criar()
    .comAulas(aulas)
    .semData()
    .build();
  expect(progresso.data).toBeDefined();
});

test('Deve criar progresso com aula selecionada', () => {
  const progresso = ProgressoCursoBuilder.criar()
    .comAulas(aulas)
    .comAulaSelecionadaId(aulas[4].id!)
    .build()
    .concluirAulaAtual();
  expect(progresso.duracaoAssistida.segundos).toBe(500);
});

test('Deve criar progresso sem aula selecionada', () => {
  const progresso = ProgressoCursoBuilder.criar()
    .comAulas(aulas)
    .semAulaSelecionadaId()
    .build()
    .concluirAulaAtual();
  expect(progresso.duracaoAssistida.segundos).toBe(100);
});

test('Deve retornar o mesmo curso ao tentar concluir mais de uma vez', () => {
  const progresso = ProgressoCursoBuilder.criar()
    .comAulas(aulas)
    .build()
    .concluirCurso();
  expect(progresso.concluirAulaAtual()).toBe(progresso);
  expect(progresso.concluirCurso()).toBe(progresso);
});

const aulaRiscoDeFraude = (minutos: number, duracaoEMinuitos: number) => {
  return ProgressoAulaBuilder.criar()
    .comDataInicio(new Date(2020, 0, 1, 9, minutos))
    .comDuracao(60 * duracaoEMinuitos)
    .build().props;
};

test('Deve calcular como risco de fraude com 0%', () => {
  const aulas = [
    aulaRiscoDeFraude(7, 3),
    aulaRiscoDeFraude(8, 5),
    aulaRiscoDeFraude(12, 2),
    aulaRiscoDeFraude(13, 1),
  ];
  const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).build();
  expect(progresso.riscoDeFraude()).toBe(0);
});

test('Deve calcular como risco de fraude com 25%', () => {
  const aulas = [
    aulaRiscoDeFraude(7, 3),
    aulaRiscoDeFraude(8, 5),
    aulaRiscoDeFraude(10, 7),
    aulaRiscoDeFraude(11, 2),
    aulaRiscoDeFraude(13, 1),
  ];
  const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).build();
  expect(progresso.riscoDeFraude()).toBe(25);
});

test('Deve calcular como risco de fraude com 100%', () => {
  const aulas = [
    aulaRiscoDeFraude(7, 8),
    aulaRiscoDeFraude(8, 12),
    aulaRiscoDeFraude(9, 17),
    aulaRiscoDeFraude(10, 23),
    aulaRiscoDeFraude(11, 9),
  ];
  const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).build();
  expect(progresso.riscoDeFraude()).toBe(100);
});

test('Deve calcular como risco de fraude como 0% se curso tive uma aula', () => {
  const progresso = ProgressoCursoBuilder.criar(1).build().concluirCurso();
  expect(progresso.riscoDeFraude()).toBe(0);
});

test('Deve iniciar aula atual', () => {
  const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).build();
  const novo = progresso.iniciarAulaAtual();
  expect(novo.aulas[0].iniciado).toBeTruthy();
});

test('Deve zerar conclusão de uma aula', () => {
  const progresso = ProgressoCursoBuilder.criar().build().concluirCurso();
  expect(progresso.concluido).toBeTruthy();

  const novoProgresso = progresso.zerarAula(progresso.aulas[0].id.valor);
  expect(novoProgresso.concluido).toBeFalsy();
  expect(novoProgresso.aulas[0].concluido).toBeFalsy();
});

test('Deve alteranar conclusão de uma aula', () => {
  const progresso = ProgressoCursoBuilder.criar().build().concluirCurso();
  const novoProgresso = progresso.alternarAula(progresso.aulas[0].id.valor);
  expect(novoProgresso.concluido).toBeFalsy();
  expect(novoProgresso.aulas[0].concluido).toBeFalsy();

  const maisNovoProgresso = novoProgresso.alternarAula(
    progresso.aulas[0].id.valor,
  );
  expect(maisNovoProgresso.concluido).toBeTruthy();
  expect(maisNovoProgresso.aulas[0].concluido).toBeTruthy();
});

test('Deve ignorar alternar conclusão de uma aula com id inexistente', () => {
  const progresso = ProgressoCursoBuilder.criar().build();
  const novoProgresso = progresso.alternarAula('bla');
  expect(novoProgresso).toBe(progresso);
});

test('Deve notificar conclusão do curs0', () => {
  const id = Id.novo.valor;
  const email = faker.internet.email();
  const progresso = ProgressoCursoBuilder.criar()
    .comId(id)
    .comEmailUsuario(email)
    .build()
    .registrar({
      enventoOcorreu(evento: CursoConcluido) {
        expect(evento.idCurso.valor).toBe(id);
        expect(evento.emailUsuario.valor).toBe(email);
        expect(evento.data).toBeDefined();
      },
    });
  progresso.concluirCurso();
});

test('Deve ignorar notificação de conclusão do curso', () => {
  const progressoConcluido = ProgressoCursoBuilder.criar()
    .build()
    .concluirCurso();
  const progresso = progressoConcluido.registrar({
    enventoOcorreu(_: CursoConcluido) {
      throw new Error('Deve falhar se o método for chamado');
    },
  });
  const aulaId = progresso.aulas[0].id.valor;
  progresso.zerarAula(aulaId).concluirCurso();
});
