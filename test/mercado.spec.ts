import pactum from 'pactum';
import { SimpleReporter } from '../simple-reporter';
import { StatusCodes } from 'http-status-codes';

const p = pactum;
const baseUrl = 'https://api-desafio-qa.onrender.com';

p.request.setDefaultTimeout(90000);

beforeAll(() => pactum.reporter.add(SimpleReporter));
afterAll(() => pactum.reporter.end());

describe('Listar todos os mercados', () => {
  it('Deve retornar a lista de todos os mercados', async () => {
    await p.spec().get(`${baseUrl}/mercado`).expectStatus(StatusCodes.OK)
      .inspect;
  });
});

describe('Retornar um produto e seus detalhes', () => {
  it('Deve retornar os detalhes de um produto específico', async () => {
    const produtoId = 1;
    await p
      .spec()
      .get(`${baseUrl}/mercado/produtos/${produtoId}`)
      .expectStatus(200)
      .expectJsonLike({ id: produtoId });
  });
});

describe('Adicionar um novo produto', () => {
  it('Deve adicionar um novo produto', async () => {
    const novoProduto = {
      nome: 'Molho de Tomate Teste',
      preco: 6.59
    };
    await pactum
      .spec()
      .post(`${baseUrl}/mercado/produtos`)
      .withJson(novoProduto)
      .expectStatus(201)
      .expectJsonLike({ nome: 'Molho de Tomate Teste' });
  });
});

describe('Adicionar um novo produto', () => {
  it('Deve atualizar as informações de um produto', async () => {
    const produtoId = 1;
    const dadosAtualizados = {
      nome: 'Molho de Tomate Teste',
      preco: 8.59
    };
    await pactum
      .spec()
      .patch(`${baseUrl}/mercado/produtos/${produtoId}`)
      .withJson(dadosAtualizados)
      .expectStatus(200)
      .expectJsonLike({ nome: 'Produto Atualizado' });
  });
});

describe('Adicionar um novo produto contendo dados inválidos', () => {
  it('Deve retornar erro ao tentar adicionar produto com dados inválidos', async () => {
    const produtoInvalido = {
      nome: '',
      preco: -10.34
    };
    await p
      .spec()
      .post(`${baseUrl}/mercado/produtos`)
      .withJson(produtoInvalido)
      .expectStatus(400);
  });
});

describe('Atualizar os dados de um prouto inexistente', () => {
  it('Deve retornar 404 ao tentar atualizar produto inexistente', async () => {
    const produtoId = 874599;
    const dadosAtualizados = {
      nome: 'Doce de Cenoura',
      preco: 15.36
    };
    await p
      .spec()
      .patch(`${baseUrl}/mercado/produtos/${produtoId}`)
      .withJson(dadosAtualizados)
      .expectStatus(404);
  });
});

describe('Remover um produto', () => {
  it('Deve remover um produto pelo ID', async () => {
    const produtoId = 2;
    await p
      .spec()
      .delete(`${baseUrl}/mercado/produtos/${produtoId}`)
      .expectStatus(200);
  });
});

describe('Retornar código de erro 404', () => {
  it('Deve retornar 404 para produto não encontrado', async () => {
    const produtoId = 675674;
    await p
      .spec()
      .get(`${baseUrl}/mercado/produtos/${produtoId}`)
      .expectStatus(404);
  });
});

describe('Código de erro ao atualizar produto inexistente', () => {
  it('Deve retornar 404 ao tentar atualizar produto inexistente', async () => {
    const produtoId = 67567512;
    const dadosAtualizados = {
      nome: 'Produto Inexistente',
      preco: 12.99
    };
    await p
      .spec()
      .patch(`${baseUrl}/mercado/produtos/${produtoId}`)
      .withJson(dadosAtualizados)
      .expectStatus(404);
  });
});

describe('Listar todas as categorias de mercado', () => {
  it('Deve listar todas as categorias', async () => {
    await p
      .spec()
      .get(`${baseUrl}/mercado/categorias`)
      .expectStatus(200)
      .expectJsonLike([]);
  });
});

describe('Listar detalhes de uma categoria', () => {
  it('Deve retornar detalhes de uma categoria específica', async () => {
    const categoriaId = 1;
    await p
      .spec()
      .get(`${baseUrl}/mercado/categorias/${categoriaId}`)
      .expectStatus(200)
      .expectJsonLike({ id: categoriaId });
  });
});

describe('Adicionar uma nova categoria', () => {
  it('Deve adicionar uma nova categoria', async () => {
    const novaCategoria = { nome: 'Frios' };
    await p
      .spec()
      .post(`${baseUrl}/mercado/categorias`)
      .withJson(novaCategoria)
      .expectStatus(201)
      .expectJsonLike({ nome: 'Frios' });
  });
});

describe('Atualizar os dados de uma categoria', () => {
  it('Deve atualizar os dados de uma categoria', async () => {
    const categoriaId = 1;
    const dadosAtualizados = { nome: 'Frios' };
    await pactum
      .spec()
      .patch(`${baseUrl}/mercado/categorias/${categoriaId}`)
      .withJson(dadosAtualizados)
      .expectStatus(200)
      .expectJsonLike({ nome: 'Frios' });
  });
});

describe('Remover uma categoria por ID', () => {
  it('Deve remover uma categoria pelo ID', async () => {
    const categoriaId = 2;
    await pactum
      .spec()
      .delete(`${baseUrl}/mercado/categorias/${categoriaId}`)
      .expectStatus(200);
  });
});

describe('Remover uma categoria inexistente', () => {
it('Deve retornar 404 ao tentar remover categoria inexistente', async () => {
    const categoriaId = 999;
    await pactum
      .spec()
      .delete(`${baseUrl}/mercado/categorias/${categoriaId}`)
      .expectStatus(404);
  });
});
