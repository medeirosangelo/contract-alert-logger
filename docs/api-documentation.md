# Documentação da API

## Endpoints

### Contratos

#### GET /api/contracts
Lista todos os contratos cadastrados no sistema.

**Parâmetros de Query:**
- `status` (opcional): Filtra por status do contrato (ativo, finalizado)
- `page` (opcional): Número da página para paginação
- `limit` (opcional): Quantidade de itens por página

**Resposta de Sucesso:**
```json
{
  "data": [
    {
      "id": "string",
      "contractNumber": "string",
      "object": "string",
      "contractorName": "string",
      "contractedName": "string",
      "value": "number",
      "status": "string",
      "startDate": "date",
      "endDate": "date"
    }
  ],
  "pagination": {
    "total": "number",
    "page": "number",
    "limit": "number"
  }
}
```

#### POST /api/contracts
Cria um novo contrato.

**Body:**
```json
{
  "contractNumber": "string",
  "object": "string",
  "contractorCompanyName": "string",
  "contractorAddress": "string",
  "contractorCnpj": "string",
  "contractedCompanyName": "string",
  "contractedAddress": "string",
  "contractedCnpj": "string",
  "legalRepName": "string",
  "legalRepCpf": "string",
  "totalValue": "number",
  "duration": "number",
  "signatureDate": "date"
}
```

**Resposta de Sucesso:**
```json
{
  "id": "string",
  "message": "Contrato criado com sucesso"
}
```

### Empresas

#### GET /api/companies/cnpj/{cnpj}
Busca dados de uma empresa pelo CNPJ.

**Parâmetros de Path:**
- `cnpj`: CNPJ da empresa (somente números)

**Resposta de Sucesso:**
```json
{
  "companyName": "string",
  "tradeName": "string",
  "cnpj": "string",
  "address": "string",
  "legalRepName": "string",
  "legalRepCpf": "string",
  "email": "string"
}
```

### Autenticação

#### POST /api/auth/login
Realiza login no sistema.

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Resposta de Sucesso:**
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  }
}
```

## Códigos de Erro

- `400`: Requisição inválida
- `401`: Não autorizado
- `403`: Acesso proibido
- `404`: Recurso não encontrado
- `500`: Erro interno do servidor

## Autenticação

A API utiliza autenticação via token JWT. O token deve ser enviado no header Authorization:

```
Authorization: Bearer {token}
```

## Rate Limiting

- Limite de 100 requisições por minuto por IP
- Após exceder o limite, aguardar 60 segundos

## Versionamento

A API está atualmente na versão 1.0. O versionamento é feito via URL:
```
https://api.exemplo.com/v1/
```

## Ambiente de Desenvolvimento

Para testar a API em ambiente de desenvolvimento:
```
https://api-dev.exemplo.com/v1/
```

## Suporte

Em caso de dúvidas ou problemas:
- Email: suporte@exemplo.com
- Documentação completa: https://docs.exemplo.com