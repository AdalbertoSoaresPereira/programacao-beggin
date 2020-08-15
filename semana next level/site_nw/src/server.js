const proffys =[{
name:"", avatar:"",whatsapp:"",bio:"",subject:[],cost:"",
weekday:[0],time_from:[], time_to:[]


}]

const subjects=[
 "Artes",
 "Biologia",
 "Ciências",
 "Educação Física",
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
"Quinta-Feira",
"Sexta-feira",
"Sábado",
]

//funcionalidades
function getSubject(subjectNumber){
    const position = +subjectNumber -1
    return subjects[position]
}

function pageLanding(req,res){
    return res.render("index.html")
}
function pageStudy(req,res){
    const filters= req.query
    return res.render("study.html",{proffys,filters,subjects,weekdays})
}
function pageGiveClasses(req,res){
    const data =req.query

    const isNotEmpty = Object.keys(data).length > 0
    //adicionar dados a lista de proffys
    //se tiver dados, adicionar
    proffys.push(data)
    //se não, não adicionar
    if(isNotEmpty){
        proffys.push(data)

        data.subject=getSubject(data.subject)

        return res.redirect("/study")
    }
    return res.render("give-classes.html",{subjects,weekdays})
}

const express = require('express')
const server = express()


//configurar nunjucks\
const nunjucks =require('nunjucks')
nunjucks.configure('src/views',{
    
    express:server,
    noCache: true,
})

server
// configurar arquivos estáticos(css,scripts,imagens)
.use(express.static("public"))
.get("/",pageLanding)
.get("/study",pageStudy)
.get("/give-classes",pageGiveClasses)

.listen(5500)