export function initQuestionsBar() {
  document.querySelector('#add-new-question').addEventListener('click', addNewQuestion)
  /* document.querySelector('#delete-question').addEventListener('click', deleteActiveQuestion) */
  document.querySelector('#question1').checked = true
}

function addNewQuestion() {
  let addQuestion = document.querySelector('#add-new-question')
  let children = document.querySelector('.wrap-questions').children
  let nextQuestionNum = ((children.length - 1) / 2) + 1
  let newQuestionElem = `<input type="radio" id="question${nextQuestionNum}" name="question">
  <label for="question${nextQuestionNum}">${nextQuestionNum}</label>`
  addQuestion.insertAdjacentHTML('beforebegin', newQuestionElem)
  
  setLastQuestionAsActive(nextQuestionNum)
}

function setLastQuestionAsActive(num) {
  let questionInput = document.querySelector(`#question${num}`)
  questionInput.checked = true
}

function deleteActiveQuestion() {
  let checkedInput = document.querySelector('.wrap-questions')
  if (checkedInput.children.length === 1) return
  let len = checkedInput.children.length
  checkedInput.children[len - 2].remove()
  checkedInput.children[len - 3].remove()
  switchToLast()
}

function switchToLast() {
  let isChecked = document.querySelector('.wrap-questions input:checked')
  if (!isChecked) {
    if (document.querySelector('.wrap-questions').children.length === 1) return
    document.querySelector('.wrap-questions input:last-of-type').checked = true
  }
}