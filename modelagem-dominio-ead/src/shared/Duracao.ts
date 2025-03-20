import Erros from '@/constants/Erros';
import ErroValidacao from '@/error/ErroValidacao';
import { th } from '@faker-js/faker/.';

export default class Duracao {
  static readonly UM_MINUTO: number = 60;
  static readonly UMA_HORA: number = 3600;

  readonly segundos: number;

  constructor(segundos?: number) {
    if (segundos && segundos < 0) {
      throw ErroValidacao.lancar(Erros.DURACAO_NEGATIVA);
    }

    this.segundos = segundos ?? 0;
  }

  somar(duracao: Duracao): Duracao {
    return new Duracao(this.segundos + duracao.segundos);
  }

  igual(duracao: Duracao): boolean {
    return this.segundos === duracao.segundos;
  }

  diferente(duracao: Duracao): boolean {
    return this.segundos !== duracao.segundos;
  }

  get zerada(): boolean {
    return this.segundos === 0;
  }

  get hm() {
    const { horas, minutos } = this.partes;
    const h = horas.toString().padStart(2, '0');
    const m = minutos.toString().padStart(2, '0');
    return `${h}h ${m}m`;
  }

  get hms() {
    const { horas, minutos, segundos } = this.partes;
    const h = horas.toString().padStart(2, '0');
    const m = minutos.toString().padStart(2, '0');
    const s = segundos.toString().padStart(2, '0');
    return `${h}h ${m}m ${s}s`;
  }

  get partes() {
    return {
      horas: Math.floor(this.segundos / Duracao.UMA_HORA),
      minutos: Math.floor(
        (this.segundos % Duracao.UMA_HORA) / Duracao.UM_MINUTO,
      ),
      segundos: this.segundos % Duracao.UM_MINUTO,
    };
  }
}
