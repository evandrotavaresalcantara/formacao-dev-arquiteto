import Email from '@/shared/Email';
import { EventoDominio } from '@/shared/EventoDominio';
import Id from '@/shared/Id';

export default class CursoConcluido implements EventoDominio {
  constructor(
    readonly emailUsuario: Email,
    readonly idCurso: Id,
    readonly data: Date,
  ) {}
}
