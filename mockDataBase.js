module.exports = {
  clientes: [
    {
      id: 1,
      nomeCompleto: 'agenor alceu',
      email: 'teste@teste.coom',
      CPF: '09398710654',
      dataNascimento: '12/07/1002',
      enderecoId: 1,
    },
    {
      id: 2,
      nomeCompleto: 'alcemir alceu',
      email: 'teste@teste.coom',
      CPF: '09398710654',
      dataNascimento: '12/07/1002',
      enderecoId: 2,
    },
  ],
  produtos: [
    {
      id: 1,
      nome: 'bola quadrada',
      imagem: 'teste',
      descricao: 'bola quadrada',
      peso: 12.8,
      preco: 9.99,
      quantidadeEmEstoque: 100,
    },
    {
      id: 2,
      nome: 'bola redonda',
      imagem: 'teste',
      descricao: 'bola redonda',
      peso: 12.8,
      preco: 10.99,
      quantidadeEmEstoque: 200,
    }
  ],
  enderecos: [
    {
      id: 1,
      rua: 'santo garbuio',
      bairro: 'xaxim',
      cidade: 'Curitiba',
      estado: 'PR',
      pais: 'Brasil',
      cep: '81710-320',
      numero: 127,
    },
    {
      id: 2,
      rua: 'herminia zaneti',
      bairro: 'xaxim',
      cidade: 'Curitiba',
      estado: 'PR',
      pais: 'Brasil',
      cep: '81710-320',
      numero: 127,
    }
  ],
  pedidos: [
    {
      id: 1,
      dataCriacao: '21/10/2018',
      parcelas: 12,
      buyerId: 1,
    }
  ],
  produtosPorPedido: [
    {
      productId: 1,
      quantity: 2,
      orderId: 1,
    }
  ],
} 