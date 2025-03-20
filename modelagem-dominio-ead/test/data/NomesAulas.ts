export default class NomesAulas {
  static aleatorio(): string {
    const indice = Math.floor(Math.random() * NomesAulas.nomes.length);
    return NomesAulas.nomes[indice];
  }

  static readonly nomes = [
    'Abstração',
    'Algoritmos',
    'Análise de Complexidade',
    'Análise de Dados',
    'Análise de Requisitos',
    'Bootstrap',
    'classes',
    'Código Limpo',
    'Comunicação',
    'Conceitos de Orientação a Objetos',
    'Conceitos de Programação',
    'Conceitos de Redes',
    'Conceitos de Segurança',
    'Conceitos de Sistemas Operacionais',
    'Conceitos de Web',
    'Conceitos de Web Design',
    'Conceitos de Web Development',
    'Conceitos de Web Services',
    'Conceitos de Web Standards',
    'Conceitos de Web Usability',
    'Conceitos de Webdesign',
    'Conceitos de Webdevelopment',
  ];
}
