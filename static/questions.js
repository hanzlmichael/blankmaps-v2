export function initQuestionsBar() {
  document.querySelector('#add-new-question').addEventListener('click', addNewQuestion)
  /* document.querySelector('#delete-question').addEventListener('click', deleteActiveQuestion) */
  /* document.querySelector('#question1').checked = true */
  document.querySelector('.create-questions-panel').style.display = 'none'  
  document.querySelector('#delete-question').addEventListener('click', deleteActiveQuestion)
  document.querySelector('.wrap-questions').addEventListener('click', handleChangeQuestion)
  localStorage.clear()
}
let previousQuestion = null

function addNewQuestion() {
  
  togglePanel() 

  let addQuestion = document.querySelector('#add-new-question')
  let children = document.querySelector('.wrap-questions').children
  let nextQuestionNum = ((children.length - 1) / 2) + 1
  let newQuestionElem = `<input type="radio" id="question${nextQuestionNum}" name="question">
  <label for="question${nextQuestionNum}">${nextQuestionNum}</label>`
  addQuestion.insertAdjacentHTML('beforebegin', newQuestionElem)
  
  setLastQuestionAsActive(nextQuestionNum)

  createQuestionInLocalStorage()
}

function setLastQuestionAsActive(num) {
  let questionInput = document.querySelector(`#question${num}`)
  questionInput.click()
}

function deleteActiveQuestion() {
  let checkedInput = document.querySelector('.wrap-questions')
  if (checkedInput.children.length === 1) return
  let len = checkedInput.children.length
  checkedInput.children[len - 2].remove()
  checkedInput.children[len - 3].remove()
  switchToLast()
  togglePanel() 

  let indexOfQuestionToDelete = extractQuestionNumber() - 1 // Protoze pole v localStorage indexovano od 0
  console.log('index: ' + indexOfQuestionToDelete )
  let questions = JSON.parse(localStorage.getItem('questions'))
  questions.splice(indexOfQuestionToDelete, 1)
  
  localStorage.setItem('questions', JSON.stringify(questions))
 }

 // Extrahuje číslo z id "question{číslo}"
 function extractQuestionNumber() {
  let checked = document.querySelector('.wrap-questions input:checked')
  let indexOfQuestionToDelete = checked.id
  indexOfQuestionToDelete = indexOfQuestionToDelete.slice(8)
  return indexOfQuestionToDelete
 }

function switchToLast() {
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

function handleChangeQuestion(e) {
  createQuestionsArrayInLocalStorage()

  if (e.target.matches('input')) {    
    if (previousQuestion === null) {
      previousQuestion = 1
    } else {
      previousQuestion 
    }
    console.log(e.target)
  }
  let checkedAsnwer = document.querySelector('.wrap-questions input:checked')
}


function createQuestionsArrayInLocalStorage() {
  if (!localStorage.getItem('questions')) {
    let questionsArray = []
    localStorage.setItem('questions', JSON.stringify(questionsArray))
  }
}

// Schovat panel otázky pokud není vytvořená žádná otázka
function togglePanel() {
  console.log('1')
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
  points: "",
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
  pointElement.textContent = value
}

let pointElement = document.querySelector('#point-value')