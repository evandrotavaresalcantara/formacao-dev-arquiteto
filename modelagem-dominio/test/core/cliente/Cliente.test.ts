import Cliente from '@/core/cliente/Cliente';
import Erros from '@/core/constants/Erros';
import Id from '@/core/shared/Id';

test('Deve lançar erro ao tentar criar uma Cliente com nome vazio', () => {
  expect(() => new Cliente({ nome: '', cpf: '' })).toThrow(Erros.NOME_VAZIO);
});

test('Deve criar um Cliente válida', () => {
  const cliente = new Cliente({
    nome: 'Evandro Tavares',
    cpf: '280.012.389-38',
  });
  expect(cliente.nome.primeiroNome).toBe('Evandro');
  expect(cliente.id.novo).toBeTruthy();
});

test('Deve clonar objeto cliente com nome alterado', () => {
  const cliente = new Cliente({
    nome: 'Evandro Tavares',
    cpf: '280.012.389-38',
  });
  const novaCliente = cliente.clone({ nome: 'Evandro Tavares Alcantara' });

  expect(novaCliente.cpf.valor).toBe(cliente.cpf.valor);
  expect(novaCliente.id.valor).toBe(cliente.id.valor);
});

test('Deve clonar objeto cliente com um novo id', () => {
  const cliente = new Cliente({
    nome: 'Evandro Tavares',
    cpf: '280.012.389-38',
  });
  const novaCliente = cliente.clone({ id: Id.novo.valor });

  expect(novaCliente.id.valor !== cliente.id.valor).toBe(true);
  expect(novaCliente.cpf.valor).toBe(cliente.cpf.valor);
  expect(novaCliente.nome.completo).toBe(cliente.nome.completo);
});
