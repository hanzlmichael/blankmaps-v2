import { createAnswerWrap } from './answer.js' 
import { canvas } from './script.js'
import { resizeMapToCanvas } from './script.js'

export function initQuestionsBar() {
  /* document.querySelector('#add-new-question').addEventListener('click', addNewQuestion) */
  /* document.querySelector('#delete-question').addEventListener('click', deleteActiveQuestion) */
  /* document.querySelector('#question1').checked = true */
  document.querySelector('.create-questions-panel').style.display = 'none'  
  document.querySelector('#delete-question').addEventListener('click', deleteActiveQuestion)

  document.querySelector('.wrap-questions').addEventListener('input', changeQuestion)
  document.querySelector('#add-new-question').addEventListener('click', handleChangeQuestion)

 /*  document.querySelector('#testing').addEventListener('click', testing) */
  localStorage.clear()
}
let questionState = {
  previous: -1
}
let pointElement = document.querySelector('#point-value')
let categoryElement = document.querySelector('#select-category')
let mapElement = document.querySelector('#select-map')
let answersWrap = document.querySelector('.answers-wrap')

function handleChangeQuestion() {
  // Uložt data otázky do LS pokud je vytvorena alespon 1 otázka
  if (questionState.previous > -1) {

    // uložit staré hodnoty otázky do LS
    let questions = JSON.parse(localStorage.getItem('questions'))
    let points = getPoints()
    let category = getCategory()
    let answers = getAnswers()
    let map = getMap()
    questions[questionState.previous].points = points
    questions[questionState.previous].category = category
    questions[questionState.previous].answers = answers
    questions[questionState.previous].map = map
    removeMapFromCanvas()
    questions[questionState.previous].shapes = JSON.stringify(canvas) 
    localStorage.setItem('questions', JSON.stringify(questions))
    resetQuestion()
  }
  createQuestionsArrayInLocalStorage()
  togglePanel() 
  createQuestionInLocalStorage()
  let nextQuestionNum = createQuestionIcon()
  questionState.previous = nextQuestionNum - 1
  setLastQuestionAsActive(nextQuestionNum)
}

function removeMapFromCanvas() {
  let objs = canvas.getObjects();
  objs.forEach(obj => {
 	if (obj.type == 'image') {
   	canvas.remove(obj)
  }
 })
}

function changeQuestion(e) {
  console.log('previousQuestionIndex: ', questionState.previous, ' previousQuestionNumber: ', Number(questionState.previous) + 1)
  
  console.log('doing change...')
  // uložit staré hodnoty otázky do LS
  let questions = JSON.parse(localStorage.getItem('questions'))
  let points = getPoints()
  questions[questionState.previous].points = points
  let category = getCategory()
  questions[questionState.previous].category = category
  let answers = getAnswers()
  questions[questionState.previous].answers = answers
  let map = getMap()
  questions[questionState.previous].map = map
  removeMapFromCanvas()
  questions[questionState.previous].shapes = JSON.stringify(canvas) 

  localStorage.setItem('questions', JSON.stringify(questions))

  // vykresleni nove otazky z LS do view
  questions = JSON.parse(localStorage.getItem('questions'))
  let actualQuestion = e.target.id.slice(8) - 1
  let newPoints = questions[actualQuestion].points
  setPoints(newPoints)
  let newCategory = questions[actualQuestion].category
  setCategory(newCategory)
  let newAnswers = questions[actualQuestion].answers
  setAnswers(newAnswers)
  let newMapId = questions[actualQuestion].map
  setMap(newMapId)
  
  // vykresleni shapes
  canvas.loadFromJSON(questions[actualQuestion].shapes)

  // -1 protože nastavuju index 
  questionState.previous = Number(e.target.id.slice(8)) - 1
}

// Vytvoří html element s číslem otázky a přidá na stránku před tlačítko '+'
function createQuestionIcon() {
  
  let addQuestion = document.querySelector('#add-new-question')
  let children = document.querySelector('.wrap-questions').children
  let nextQuestionNum = ((children.length - 1) / 2) + 1
  let newQuestionElem = `<input type="radio" id="question${nextQuestionNum}" name="question">
  <label for="question${nextQuestionNum}">${nextQuestionNum}</label>`
  addQuestion.insertAdjacentHTML('beforebegin', newQuestionElem)
  return nextQuestionNum
}

function setLastQuestionAsActive(num) {
  /* let questionInput = document.querySelector(`#question${num}`)
  questionInput.click() */
  document.querySelector(`#question${num}`).checked = true

}

function deleteActiveQuestion() {
  debugger;
  let checkedInput = document.querySelector('.wrap-questions')
  if (checkedInput.children.length === 1) return
  let len = checkedInput.children.length
  checkedInput.children[len - 2].remove()
  checkedInput.children[len - 3].remove()
  switchToLast()
  togglePanel() 

  // smazat otazku z LS
  let questions = JSON.parse(localStorage.getItem('questions'))
  questions.splice(questionState.previous, 1)
  localStorage.setItem('questions', JSON.stringify(questions))
  // vykreslit spravnou otazku
  // TODO pokud smazano posledni otazka tak musim odecist -1 od questionState.previous  
  questions = JSON.parse(localStorage.getItem('questions'))
  
  // pokud smazana posledni otazka musim odcitat index u previous
  if (questions.length == questionState.previous) {
    questionState.previous = questionState.previous - 1
    if (questions.length == 0) {
      resetQuestion()
      return
    }
  }
  // vykresleni nove otazky z LS do view
  let newPoints = questions[questionState.previous].points
  setPoints(newPoints)
  let newCategory = questions[questionState.previous].category
  setCategory(newCategory)
  let newAnswers = questions[questionState.previous].answers
  setAnswers(newAnswers)
  let newMapId = questions[questionState.previous].map
  setMap(newMapId)

 }

 // Extrahuje číslo z id "question{číslo}"
 function extractQuestionNumber() {
  let checked = document.querySelector('.wrap-questions input:checked')
  let indexOfQuestionToDelete = checked.id
  indexOfQuestionToDelete = indexOfQuestionToDelete.slice(8)
  return indexOfQuestionToDelete
 }

function switchToLast() {
  debugger;
  let isChecked = document.querySelector('.wrap-questions input:checked')
  if (!isChecked) {
    if (document.querySelector('.wrap-questions').children.length === 1) return
    document.querySelector('.wrap-questions input:last-of-type').checked = true
  }
}

function createQuestionInLocalStorage() {
  let questionsObjects = JSON.parse(localStorage.getItem('questions'))
  questionsObjects.push(questionObject)
  localStorage.setItem('questions', JSON.stringify(questionsObjects))
}

function updateQuestionState() {
  if (questionState.previous === questionState.actual) {
    questionState.actual = extractQuestionNumber()
  } else {
    questionState.previous = questionState.actual
    questionState.actual = extractQuestionNumber()
  }
  console.log('Previous: ' + questionState.previous + ' Actual: ' + questionState.actual)
}


function createQuestionsArrayInLocalStorage() {
  if (!localStorage.getItem('questions')) {
    let questionsArray = []
    localStorage.setItem('questions', JSON.stringify(questionsArray))
  }
}

// Schovat panel otázky pokud není vytvořená žádná otázka
function togglePanel() {
  if (document.querySelector('.wrap-questions').children.length == 1) {      
    let panel =  document.querySelector('.create-questions-panel')
    panel.style.display = panel.style.display == 'none' ? 'grid' : 'none'
  }
}

let questionObject = {
  map: "",
  category:"",
  answers:[],
  points: 1,
  shapes: "",
  color: "",
  thickness: "",
  borderColor: ""
}

function saveQuestionDataDoLocalStorage() {
  // získat body

}

// nastaveni bodů
function getPoints() {
  return pointElement.textContent
}
function setPoints(value) {
  console.log(pointElement)
  pointElement.textContent = value
}
function setDefaultPoints() {
  pointElement.textContent = 1
}

// nastavení kategorie
function getCategory() {
  let selectedValue = categoryElement.item(categoryElement.selectedIndex)
  return selectedValue.value
}

function setCategory(category) {
  categoryElement.value = category
} 
function setDefaultCategory() {
  categoryElement.item(0).selected = true
}

// nastavení odpovědí
function getAnswers() {
  debugger;
  let answerWraps = document.querySelectorAll('.answer-wrap')
  let allAnswers = []
  answerWraps.forEach(item => {
    let answerTerm = item.querySelector('input').value
    let isCorrect = item.querySelector('.answer-checkbox input').checked
    let obj = {
      term: answerTerm,
      isCorrect: isCorrect 
    }
    allAnswers.push(obj)
  })
  return allAnswers
}
function setAnswers(allAnswers) {
  debugger;
  answersWrap.innerHTML = ''
  allAnswers.forEach(question => {
    createAnswerWrap()
    let answer = answersWrap.querySelector('.answer-wrap:last-of-type')
    answer.querySelector('input').value = question.term
    answer.querySelector('.answer-checkbox input').checked = question.isCorrect
  })
}
function setDefaultAnswers() {
  answersWrap.innerHTML = ''
}

function getMap() {
  return mapElement.item(mapElement.selectedIndex).value
}
function setMap(mapId) {
  debugger;
  if (mapId == '') {
    mapElement.selectedIndex = 0
    return
  }
  mapElement.value = mapId
  let maps = JSON.parse(localStorage.getItem('maps'))
  let map = maps.find(map => map.mapId == mapId)
  resizeMapToCanvas(map.src)
 /*  mapElement.dispatchEvent(new Event('change')); */
}
function setDefaultMap() {
  mapElement.selectedIndex = 0
  canvas.clear()
}

function getCanvasObjects() {

}

function resetQuestion() {
  setDefaultPoints()
  setDefaultCategory()
  setDefaultAnswers()
  setDefaultMap()
}
function testing() {
  getAnswers()
}