const { celebrate, Segments, Joi } = require('celebrate');
const express = require('express');
const routes = express.Router();
// const UsuariosController = require('../src/Controllers/UsuariosController');
const PessoasController = require('../src/Controllers/Pessoas/PessoasController');
const ClientesController = require('../src/Controllers/Clientes/ClientesController');
const TecnicosController = require('../src/Controllers/Tecnicos/TecnicosController');
const QualificacaoController = require('./Controllers/Qualificacao/QualificacaoController');
const Qualificacoes_TecnicosController = require('./Controllers/Qualificacoes_Tecnicos/Qualificacoes_TecnicosController');
const EnderecosController = require('./Controllers/Enderecos/EnderecosController');
const Situacao_PedidoController = require('./Controllers/Pedidos/Situacao/Situacao_PedidoController');
const CategoriasController = require('./Controllers/Pedidos/Categorias/CategoriasController');
const PedidosController = require('./Controllers/Pedidos/PedidosNovos/PedidosController');
const UpPedController = require('./Controllers/Pedidos/PedidosAtendidos/UpPedController');
const LoginClientesController = require('./Controllers/Clientes/LoginClientesController');
const LoginTecnicosController = require('./Controllers/Tecnicos/LoginTecnicosController');
const { verify } = require('jsonwebtoken');
const verifyJWT = require('./utils/verifyJWT');


// //USUÁRIOS
// routes.get('/user', UsuariosController.list);
// routes.post('/user', UsuariosController.create);
// routes.delete('/user/:id', UsuariosController.deletar);
// routes.get('/user/:id', UsuariosController.selecionar);
// routes.put('/user/:id', UsuariosController.update);



//PESSOAS
routes.get('/pessoas', PessoasController.list);
routes.post('/pessoas', celebrate({
    [Segments.BODY]:Joi.object().keys({
        nome_pessoa: Joi.string().required().min(3),
        cpf: Joi.string().required().length(11),
        email: Joi.string().required().email(),
        telefone: Joi.string().required().min(8),
        senha: Joi.string().required(),
        dt_nascimento: Joi.string().required(),
    })
    }), PessoasController.create);
routes.delete('/pessoas/:id', PessoasController.deletar);
routes.get('/pessoas/:id', PessoasController.selecionar);
routes.put('/pessoas/:id', celebrate({
    [Segments.BODY]:Joi.object().keys({
        nome_pessoa: Joi.string().required().min(3),
        cpf: Joi.string().required().length(11),
        email: Joi.string().required().email(),
        telefone: Joi.string().required().min(8),
        senha: Joi.string().required(),
        dt_nascimento: Joi.string().required(),
    })
}), PessoasController.update);



// SESSION CLIENTES

routes.post('/clientes/login', LoginClientesController.login);
routes.post('/clientes/logout', LoginClientesController.logout);

// SESSION TÉCNICOS 

routes.post('/tecnicos/login', LoginTecnicosController.login);
routes.post('/tecnicos/logout', LoginTecnicosController.logout);


//CLIENTES

routes.get('/clientes', ClientesController.list)
// routes.post('/clientes', verifyJWT, ClientesController.list)
routes.post('/clientes', celebrate({
    [Segments.BODY]:Joi.object().keys({
        nome_pessoa: Joi.string().required().min(3),
        cpf: Joi.string().required().length(11),
        email: Joi.string().required().email(),
        telefone: Joi.string().required().min(8),
        senha: Joi.string().required(),
        dt_nascimento: Joi.string().required(),
    })
}), ClientesController.create);
routes.delete('/clientes/:id', ClientesController.deletar);
routes.get('/clientes/:id', ClientesController.selecionar);
routes.put('/clientes/:id', 
celebrate({
    [Segments.BODY]:Joi.object().keys({
        nome_pessoa: Joi.string().required().min(3),
        cpf: Joi.string().required().length(11),
        email: Joi.string().required().email(),
        telefone: Joi.string().required().min(8),
        senha: Joi.string().required(),
        dt_nascimento: Joi.string().required(),
    })
}), ClientesController.update);

//TÉCNICOS
routes.get('/tecnicos', TecnicosController.list);
routes.post('/tecnicos', celebrate({
    [Segments.BODY]:Joi.object().keys({
        nome_pessoa: Joi.string().required().min(3),
        cpf: Joi.string().required().length(11),
        email: Joi.string().required().email(),
        telefone: Joi.string().required().min(8),
        senha: Joi.string().required(),
        dt_nascimento: Joi.string().required(),
    })
}), TecnicosController.create);
routes.delete('/tecnicos/:id', TecnicosController.deletar);
routes.get('/tecnicos/:id', TecnicosController.selecionar);
routes.put('/tecnicos/:id', 
celebrate({
    [Segments.BODY]:Joi.object().keys({
        nome_pessoa: Joi.string().required().min(3),
        cpf: Joi.string().required().length(11),
        email: Joi.string().required().email(),
        telefone: Joi.string().required().min(8),
        senha: Joi.string().required(),
        dt_nascimento: Joi.string().required(),
    })
}), TecnicosController.update);

//QUALIFICACOES
routes.get('/qualificacao', QualificacaoController.list);
routes.post('/qualificacao', QualificacaoController.create);
routes.delete('/qualificacao/:id', QualificacaoController.deletar);
routes.get('/qualificacao/:id', QualificacaoController.selecionar);
routes.put('/qualificacao/:id', QualificacaoController.update);

//QUALIFICACOES DOS TÉCNICOS
routes.get('/qualificacoes', Qualificacoes_TecnicosController.list);
routes.post('/qualificacoes', Qualificacoes_TecnicosController.create);
routes.delete('/qualificacoes/:id', Qualificacoes_TecnicosController.deletar);
routes.get('/qualificacoes/:id', Qualificacoes_TecnicosController.selecionar);
routes.put('/qualificacoes/:id', Qualificacoes_TecnicosController.update);

//ENDERECOS
routes.get('/enderecos', EnderecosController.list);
routes.post('/enderecos', celebrate({
    [Segments.BODY]:Joi.object().keys({
        cep: Joi.string().required().length(8),
        logradouro: Joi.string().required().min(3).max(40),
        bairro: Joi.string().required().max(80),
        numero: Joi.string().required().max(10),
        complemento: Joi.string().allow(''),
        tipo_endereco: Joi.string().allow(''),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        id_pessoa: Joi.string().required().length(36),
        codigo_ibge: Joi.string().required(),
    })
}), EnderecosController.create);
routes.delete('/enderecos/:id', EnderecosController.deletar);
routes.get('/enderecos/:id', EnderecosController.selecionar);
routes.put('/enderecos/:id', celebrate({
    [Segments.BODY]:Joi.object().keys({
        cep: Joi.string().required().length(8),
        logradouro: Joi.string().required().min(3).max(40),
        bairro: Joi.string().required().max(80),
        numero: Joi.string().required().max(10),
        complemento: Joi.string(),
        tipo_endereco: Joi.string(),
        latitude: Joi.number(),
        longitude: Joi.number(),
        id_pessoa: Joi.string().required().length(36),
        codigo_ibge: Joi.string().required(),
    })
}), EnderecosController.update);


//SITUAÇÃO DO PEDIDOS
routes.get('/situacao_pedido', Situacao_PedidoController.list);
routes.post('/situacao_pedido', Situacao_PedidoController.create);
// routes.delete('/enderecos/:id', Situacao_PedidoController.deletar);
// routes.get('/enderecos/:id', Situacao_PedidoController.selecionar);
// routes.put('/enderecos/:id', Situacao_PedidoController.update);


//CATEGORIAS dos PEDIDOS
routes.get('/categorias', CategoriasController.list);
routes.post('/categorias', CategoriasController.create);
// routes.delete('/enderecos/:id', Situacao_PedidoController.deletar);
// routes.get('/enderecos/:id', Situacao_PedidoController.selecionar);
// routes.put('/enderecos/:id', Situacao_PedidoController.update);


//PEDIDOS CREATE
routes.get('/pedidos', PedidosController.list);
routes.post('/pedidos', celebrate({
    [Segments.BODY]:Joi.object().keys({
        observacoes: Joi.string().required().max(500),
        id_cliente: Joi.string().required(),
        id_sit_pedido: Joi.string().required(),
        id_categoria: Joi.string().required(),
        id_endereco: Joi.string().required(),
    })
}), PedidosController.create);
 routes.delete('/pedidos/:id', PedidosController.deletar);
 routes.get('/pedidos/:id', PedidosController.selecionar);
//  routes.put('/pedidos/:id', PedidosController.update);


//PEDIDOS UPDATE
 routes.put('/pedidos/:id_pedido', UpPedController.update);


module.exports = routes;