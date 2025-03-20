export default class NomesCapitulo {
  static aleatorio(): string {
    const indice = Math.floor(Math.random() * NomesCapitulo.nomes.length);
    return NomesCapitulo.nomes[indice];
  }

  static readonly nomes = [
    'Capitulo1',
    'Capitulo2',
    'Capitulo3',
    'Capitulo4',
    'Capitulo5',
    'Capitulo6',
    'Capitulo7',
    'Capitulo8',
    'Capitulo9',
    'Capitulo10',
  ];
}
