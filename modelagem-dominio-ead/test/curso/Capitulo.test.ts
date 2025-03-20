import CapituloBuilder from '../data/CapituloBuilder';
import ErroValidacao from '@/error/ErroValidacao';
import Erros from '@/constants/Erros';
import AulaBuilder from '../data/AulaBuilder';
import { NOTFOUND } from 'dns';

test('Deve lançar erro ao tentar criar capítulo sem nome', () => {
  expect(() => CapituloBuilder.criar().semNome().build()).toThrow(
    Erros.NOME_VAZIO,
  );
});

test('Deve lançar erro ao tentar criar capítulo sem aulas', () => {
  expect(() => CapituloBuilder.criar().semAulas().build()).toThrow(
    Erros.CAPITULO_SEM_AULAS,
  );
});

test('Deve possuir ordem padrão como 1', () => {
  const capitulo = CapituloBuilder.criar().semOrdem().build();
  expect(capitulo.ordem.valor).toBe(1);
});

test('Deve lançar erro ao tentar criar capítulo com ordem negativa', () => {
  expect(() => CapituloBuilder.criar().comOrdem(-1).build()).toThrow(
    Erros.ORDEM_INVALIDA,
  );
});

test('Deve calclar a duração do capítulo', () => {
  const aulas = [
    AulaBuilder.criar('Aula #1').comDuracao(63).comOrdem(1).build(),
    AulaBuilder.criar('Aula #2').comDuracao(1007).comOrdem(2).build(),
    AulaBuilder.criar('Aula #3').comDuracao(3784).comOrdem(3).build(),
  ];

  const cap = CapituloBuilder.criar().comAulas(aulas).build();
  expect(cap.duracao.segundos).toBe(4854);
  expect(cap.duracao.hm).toBe('01h 20m');
});

test('Deve calcular ordem corretamente', () => {
  const aulas = [
    AulaBuilder.criar('Aula #1').comDuracao(63).semOrdem().build(),
    AulaBuilder.criar('Aula #2').comDuracao(1007).semOrdem().build(),
    AulaBuilder.criar('Aula #3').comDuracao(3784).semOrdem().build(),
  ];

  const cap = CapituloBuilder.criar().comAulas(aulas).build();
  expect(cap.aulas[0].ordem.valor).toBe(1);
  expect(cap.aulas[1].ordem.valor).toBe(2);
  expect(cap.aulas[2].ordem.valor).toBe(3);
});

test('Deve calcular ordem corretamente nas props', () => {
  const aulas = [
    AulaBuilder.criar('Aula #1').comDuracao(63).semOrdem().build(),
    AulaBuilder.criar('Aula #2').comDuracao(1007).semOrdem().build(),
    AulaBuilder.criar('Aula #3').comDuracao(3784).semOrdem().build(),
  ];

  const cap = CapituloBuilder.criar().comAulas(aulas).build();
  expect(cap.props.aulas![0].ordem).toBe(1);
  expect(cap.props.aulas![1].ordem).toBe(2);
  expect(cap.props.aulas![2].ordem).toBe(3);
});

test('Deve retornar a quantidade de aulas', () => {
  const capitulo = CapituloBuilder.criar(15).build();
  expect(capitulo.quantidadeDeAulas).toBe(15);
});

test('Deve retornar primeira e última aula', () => {
  const aulas = [
    AulaBuilder.criar('Aula #2').comDuracao(63).comOrdem(2).build(),
    AulaBuilder.criar('Aula #3').comDuracao(1007).comOrdem(3).build(),
    AulaBuilder.criar('Aula #1').comDuracao(3784).comOrdem(1).build(),
  ];

  const capitulo = CapituloBuilder.criar().comAulas(aulas).build();
  expect(capitulo.primeiraAula.nome.completo).toBe('Aula #1');
  expect(capitulo.ultimaAula.ordem.valor).toBe(3);
});

test('Deve adicionar aula', () => {
  const capitulo = CapituloBuilder.criar(3).build();
  const novaAula = AulaBuilder.criar('Aula #4').build();
  const novoCapitulo = capitulo.adicionarAula(novaAula);
  expect(novoCapitulo.ultimaAula.nome.completo).toBe(novaAula.nome.completo);
  expect(novoCapitulo.quantidadeDeAulas).toBe(4);
});

test('Deve adicionar início do capítulo ', () => {
  const capitulo = CapituloBuilder.criar(3).build();
  const novaAula = AulaBuilder.criar('Bem vindos').build();
  const novoCapitulo = capitulo.adicionarAula(novaAula, 0);
  expect(novoCapitulo.primeiraAula.nome.completo).toBe(novaAula.nome.completo);
  expect(novoCapitulo.quantidadeDeAulas).toBe(4);
});

test('Deve remover aula', () => {
  const capitulo = CapituloBuilder.criar(5).build();
  const segundaAula = capitulo.aulas[1];
  const novoCapitulo = capitulo.removerAula(segundaAula);
  expect(novoCapitulo.quantidadeDeAulas).toBe(4);
});

test('Deve mover aula uma posição para baixo', () => {
  const capitulo = CapituloBuilder.criar().build();
  const segundaAula = capitulo.aulas[1];
  const novoCapitulo = capitulo.moverAulaParaBaixo(segundaAula);
  expect(novoCapitulo.aulas[2].nome.completo).toBe(segundaAula.nome.completo);
});

test('Deve mover aula uma posição para cima', () => {
  const capitulo = CapituloBuilder.criar().build();
  const segundaAula = capitulo.aulas[1];
  const novoCapitulo = capitulo.moverAulaParaCima(segundaAula);
  expect(novoCapitulo.aulas[0].nome.completo).toBe(segundaAula.nome.completo);
});

test('Deve ignorar quando mover primeira aula para cima', () => {
  const capitulo = CapituloBuilder.criar().build();
  const novoCapitulo = capitulo.moverAulaParaCima(capitulo.primeiraAula);
  expect(novoCapitulo).toBe(capitulo);
});

test('Deve ignorar quando mover última aula para baixo', () => {
  const capitulo = CapituloBuilder.criar().build();
  const novoCapitulo = capitulo.moverAulaParaBaixo(capitulo.ultimaAula);
  expect(novoCapitulo).toBe(capitulo);
});
