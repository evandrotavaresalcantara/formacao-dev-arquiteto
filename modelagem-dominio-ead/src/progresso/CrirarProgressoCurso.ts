import Curso from '@/curso/Curso';
import ProgressoCurso from './ProgressoCurso';

export default class CrirarProgressoCurso {
  constructor(readonly curso: Curso) {}

  novo(email: string): ProgressoCurso {
    return this.criar(undefined, email);
  }

  sincronizadoCom(progressoAtual: ProgressoCurso): ProgressoCurso {
    return this.criar(progressoAtual);
  }

  private criar(progressoAtual?: ProgressoCurso, email?: string) {
    const aulasAlteradas: boolean[] = [];
    const progresso = new ProgressoCurso({
      id: this.curso.id.valor,
      emailUsuario: progressoAtual?.emailUsuario.valor ?? email,
      nomeCurso: this.curso.nome.completo,
      data: progressoAtual?.data ?? new Date(),
      dataConclusao: progressoAtual?.dataConclusao,
      aulaSelecionadaId: progressoAtual?.aulaSelecionada.id.valor,
      aulas: this.curso.aulas.map((aula) => {
        const progressoAula = progressoAtual?.progressoAula(aula.id.valor);
        const aulaAlterada =
          progressoAula?.duracao.diferente(aula.duracao) ?? true;
        aulasAlteradas.push(aulaAlterada);
        return {
          id: aula.id.valor,
          nomeAula: aula.nome.completo,
          dataInicio: aulaAlterada ? undefined : progressoAula?.dataIncio,
          dataConclusao: aulaAlterada
            ? undefined
            : progressoAula!.dataConclusao,
          duracao: aula.duracao.segundos,
        };
      }),
    });
    const cursoFoiModificado = aulasAlteradas.some((a) => a);

    if (cursoFoiModificado && progresso.dataConclusao) {
      return progresso.clone({ dataConclusao: undefined });
    } else {
      return progresso;
    }
  }
}
