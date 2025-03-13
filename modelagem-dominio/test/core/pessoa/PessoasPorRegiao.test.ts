import PessoasPorRegiao from '@/core/pessoa/PessoasPorRegiao';
import RegiaoCpf from '@/core/shared/RegiaoCpf';
import PessoaBuilder from '@/test/data/PessoaBuilder';

test('Deve agrupar as pessoas da região de SP', () => {
  const pessoas = PessoaBuilder.criarLista(10000);
  const agrupadas = new PessoasPorRegiao(pessoas).agrupar();
  const pessoasSP = agrupadas.get(RegiaoCpf.SP) ?? [];

  const mesmaRegiao = pessoasSP.every((p) => p.cpf.regiao.igual(RegiaoCpf.SP));
  expect(mesmaRegiao).toBe(true);

  const pessoasRJ = agrupadas.get(RegiaoCpf.ES_RJ) ?? [];
  const regiaoDif = pessoasRJ.every((P) =>
    P.cpf.regiao.diferente(RegiaoCpf.SP),
  );
  expect(regiaoDif).toBe(true);
});
