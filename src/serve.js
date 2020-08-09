//Dados
const proffys = [{
    name: "Diego Fernandes",
    avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
    whatsaap: "12345678",
    bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e pormudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    subject: "Química",
    cost: "20",
    weekday: [0],
    time_from: [720],
    time_to: [1220]
  },
  {
    name: "Danilo Lima",
    avatar: "https://avatars2.githubusercontent.com/u/62615069?s=460&u=9771b44c5a716a402116008a2cbda7e8c9df870d&v=4",
    whatsaap: "9999999",
    bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e pormudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    subject: "Química",
    cost: "20",
    weekday: [1],
    time_from: [720],
    time_to: [1220]
  }
]

const subjects = [
"Artes",
"Biologia",
"Ciências",
"Educação física",
"Física",
"Geografia",
"História",
"Matemática",
"Português",
"Química",
]

const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  ]

// Funcionalidades

function getSubject(subjectNumber) {
  const position = +subjectNumber - 1
  return subjects[position]
}
function pageLanding(req, res){
  return res.render("index.html")
}

function pageStudy(req, res) {
  const filters = req.query
  return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res){
  const data = req.query

  const isNotEmpty = Object.keys(data).length > 0
  if (isNotEmpty) {

    data.subject = getSubject(data.subject)

      //adicionar dados ao a lista de proffys
      proffys.push(data)

      return res.redirect("/study")
  }

  return res.render("give-classes.html", {subjects, weekdays})
}
//servidor
const express = require('express')
const serve = express()

//configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: serve,
  noCache: true,
})

//Inicio e configuração do servidor
serve
//Configurar arquivos estáticos (css, scrips, imagens)
  .use(express.static("public"))
  .get("/", pageLanding)
  .get("/study", pageStudy)
  .get("/give-classes", pageGiveClasses)
  //Start do servidor
  .listen(5500)