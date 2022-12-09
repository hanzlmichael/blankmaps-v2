export function initQuestionsBar() {
  /* document.querySelector('#add-new-question').addEventListener('click', addNewQuestion) */
  /* document.querySelector('#delete-question').addEventListener('click', deleteActiveQuestion) */
  /* document.querySelector('#question1').checked = true */
  document.querySelector('.create-questions-panel').style.display = 'none'  
  document.querySelector('#delete-question').addEventListener('click', deleteActiveQuestion)

  document.querySelector('.wrap-questions').addEventListener('input', changeQuestion)
  document.querySelector('#add-new-question').addEventListener('click', handleChangeQuestion)

  
  localStorage.clear()
}
let questionState = {
  previous: -1
}
let pointElement = document.querySelector('#point-value')

function handleChangeQuestion() {
  debugger;
  // Uložt data otázky do LS pokud je vytvorena alespon 1 otázka
  if (questionState.previous > -1) {

    // uložit staré hodnoty otázky do LS
    let questions = JSON.parse(localStorage.getItem('questions'))
    let points = getPoints()
    questions[questionState.previous].points = points
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

function changeQuestion(e) {
  debugger;
  console.log('previousQuestionIndex: ', questionState.previous, ' previousQuestionNumber: ', Number(questionState.previous) + 1)
  
  console.log('doing change...')
  // uložit staré hodnoty otázky do LS
  let questions = JSON.parse(localStorage.getItem('questions'))
  let points = getPoints()
  questions[questionState.previous].points = points
  localStorage.setItem('questions', JSON.stringify(questions))

  // nahrát novou otázku 
  let actualQuestion = e.target.id.slice(8) - 1
  let newPoints = questions[actualQuestion].points
  setPoints(newPoints)

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
  }
  let newPoints = questions[questionState.previous].points
  setPoints(newPoints)

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
  correctAnswer: "",
  incorrectAnswers: [],
  points: 1,
  shape: "",
  color: "",
  thickness: "",
  borderColor: ""
}

function saveQuestionDataDoLocalStorage() {
  // získat body

}

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


function resetQuestion() {
  setDefaultPoints()
}