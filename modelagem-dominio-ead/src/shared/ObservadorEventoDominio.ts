import { EventoDominio } from './EventoDominio';

export default interface ObservadorEventoDominio<E extends EventoDominio> {
  enventoOcorreu(evento: E): void;
}
