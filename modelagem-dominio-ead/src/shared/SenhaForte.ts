import Erros from '@/constants/Erros';
import ErroValidacao from '@/error/ErroValidacao';

export default class SenhaForte {
  static readonly REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,256})/;

  constructor(readonly valor?: string) {
    if (!SenhaForte.isValida(this.valor ?? '')) {
      return ErroValidacao.lancar(Erros.SENHA_FRACA);
    }
  }

  static isValida(senhaForte: string): boolean {
    return this.REGEX.test(senhaForte);
  }
}
