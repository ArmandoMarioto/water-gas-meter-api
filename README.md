# Water-Gas-Meter

Descrição breve do projeto.

## Configuração

### 1. Gerar a chave da API

Para utilizar este projeto, você precisará de uma chave da API do Gemini. Siga os passos abaixo para gerar a sua chave:

1. Acesse a seguinte URL: [https://ai.google.dev/gemini-api/docs/api-key?hl=pt-br](https://ai.google.dev/gemini-api/docs/api-key?hl=pt-br)
2. Siga as instruções na página para gerar a sua chave da API.

### 2. Configurar o arquivo `.env`

Após gerar a chave da API, você precisará criar um arquivo `.env` na raiz do projeto e adicionar a variável `GEMINI_API_KEY` com a chave que você gerou.

1. Na raiz do projeto, crie um arquivo chamado `.env`.
2. Adicione a seguinte linha ao arquivo `.env`, substituindo `YOUR_API_KEY` pela chave que você gerou:

```properties
GEMINI_API_KEY=YOUR_API_KEY

```
### 3. Executar o projeto com Docker
Para iniciar o projeto usando Docker, siga os passos abaixo:

Certifique-se de que o Docker está instalado e em execução na sua máquina. Se você ainda não tem o Docker instalado, siga as instruções aqui.
Na raiz do projeto, execute o seguinte comando para iniciar os contêineres Docker:
O Docker irá baixar as imagens necessárias (se ainda não estiverem em cache) e iniciar os contêineres definidos no arquivo docker-compose.yml.

Após a inicialização, o projeto estará disponível no endereço especificado (http://localhost:80).


Uso
Endpoints

POST /upload
Endpoint para fazer upload de uma imagem.

URL: http://localhost:80/upload

Request Body:
{
"image": "base64",
"customer_code": "string",
"measure_datetime": "datetime",
"measure_type": "WATER" ou "GAS"
}




PATCH /confirm
Endpoint para confirmar o valor de uma medida.

URL: http://localhost:80/confirm

Request Body:
{
"measure_uuid": "d53d2e6d-17f1-4eac-a212-3544b3046ec5",
"confirmed_value": "12342414"
}




GET /<customer code>/list
Endpoint para listar as medidas realizadas por um determinado cliente.

URL: http://localhost:80/customer_code/list
Exemplo:http://localhost:80/customer_code/list?measure_type=WATER



Query Parameters:

measure_type (opcional): Deve ser "WATER" ou "GAS". A validação é case insensitive. Se o parâmetro for informado, filtrar apenas os valores do tipo especificado. Senão, retornar todos os tipos.
Exemplo:
