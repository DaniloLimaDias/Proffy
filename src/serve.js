//servidor
const express = require('express')
const serve = express()

const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages')

//configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: serve,
  noCache: true,
})

//Inicio e configuração do servidor
serve
// receber os dados do servidor
.use(express.urlencoded({ extended: true }))
//Configurar arquivos estáticos (css, scrips, imagens)
  .use(express.static("public"))
  .get("/", pageLanding)
  .get("/study", pageStudy)
  .get("/give-classes", pageGiveClasses)
  .post("/save-classes", saveClasses)
  //Start do servidor
  .listen(5500)