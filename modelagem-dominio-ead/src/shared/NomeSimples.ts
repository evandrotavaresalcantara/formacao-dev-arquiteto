import Erros from '@/constants/Erros';
import Validador from '@/utils/Validador';

export default class NomeSimples {
  readonly valor: string;

  constructor(valor: string, minimo: number, maximo: number) {
    this.valor = valor?.trim() ?? '';

    const erros = Validador.combinar(
      Validador.naoVazio(this.valor, Erros.NOME_VAZIO),
      Validador.tamanhoMaiorQueOuIgual(this.valor, minimo, Erros.NOME_PEQUENO),
      Validador.tamanhoMenorQueOuIgual(this.valor, maximo, Erros.NOME_GRANDE),
    );

    if (erros) throw erros;
  }

  get completo(): string {
    return this.valor;
  }

  get pascalCase() {
    const primeiraMaiuscula = (s: string) =>
      s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
    return this.valor.split(' ').map(primeiraMaiuscula).join(' ');
  }
}
