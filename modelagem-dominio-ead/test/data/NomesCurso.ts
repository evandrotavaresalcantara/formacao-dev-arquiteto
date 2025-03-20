export default class NomesCurso {
  static aleatorio(): string {
    const indice = Math.floor(Math.random() * NomesCurso.nomes.length);
    return NomesCurso.nomes[indice];
  }

  static readonly nomes = [
    'Curso1',
    'Curso2',
    'Curso3',
    'Curso4',
    'Curso5',
    'Curso6',
  ];
}
