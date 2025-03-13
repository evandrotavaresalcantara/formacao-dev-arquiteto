import { cp } from 'fs';
import Erros from '../constants/Erros';
import RegiaoCpf from './RegiaoCpf';

export default class Cpf {
  readonly valor: string;

  constructor(valor?: string) {
    this.valor = valor?.replace(/\D/g, '') ?? '';
    if (!Cpf.isValido(this.valor)) throw new Error(Erros.CPF_INVALIDO);
  }

  get formatado() {
    return this.valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  get regiao(): RegiaoCpf {
    return RegiaoCpf.porCpf(this.valor);
  }

  get digitoVerificador() {
    return this.valor.slice(9);
  }

  static isValido(cpf: string): boolean {
    if (!cpf) return false;
    const numeros = cpf.replace(/\D/g, '').split('');
    if (numeros.length !== 11) return false;
    const dv1 = Cpf.validarDV(numeros.slice(0, 9), numeros[9]);
    const dv2 = Cpf.validarDV(numeros.slice(1, 10), numeros[10]);
    return dv1 && dv2;
  }

  private static validarDV(digitos: string[], dvInformado: string): boolean {
    const fatores = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    const total = digitos.reduce((total, digito, i) => {
      return total + +digito * fatores[i];
    }, 0);
    const resto = total % 11;
    const dvCalculado = resto < 2 ? 0 : 11 - resto;
    return dvCalculado === +dvInformado;
  }
}
