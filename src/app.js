const express = require("express");
const cors = require("cors");
const { uuid , isUuid} = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

//Listar
app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

//Adicionar
app.post("/repositories", (request, response) => {
  const {title , url, techs } = request.body;
  const likes = 0;
  const dados = {id:uuid(),url,title,techs,likes};
  repositories.push(dados);
  return response.json(dados);
});

//Alterar
app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title , url, techs } = request.body;
  const repositoriIndex = repositories.findIndex(repositories => repositories.id === id );
  if(repositoriIndex < 0) {
    return response.status(400).json({error: 'put - title not found.'});
  } 
  const likes = repositories[repositoriIndex].likes;
  const repositori = {id , title , url, techs ,likes} ;
  repositories[repositoriIndex] = repositori;
  return response.json(repositori); 
});

//Delete
app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repositoriIndex = repositories.findIndex(repository => repository.id === id );
  if(repositoriIndex < 0) {
    return response.status(400).json({error: 'title not found.'});
  } 
  repositories.splice(repositoriIndex,1);
  return response.status(204).send();
});

//Likes
app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  var repository = repositories.find(repository => repository.id === id );
  if(!repository) {
    return response.status(400).send();
  } 
  repository.likes += parseInt("1") ;
  return response.json(repository); 
});

module.exports = app;
