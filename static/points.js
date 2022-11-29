export function initPoints() {
  document.querySelector('#inc-point').addEventListener('click', incPoint)
  document.querySelector('#dec-point').addEventListener('click', decPoint)
}
function incPoint() {
  let points = document.querySelector('#point-value')  
  if (points.innerText == 10) return
  if (points.innerText == 1) document.querySelector('#dec-class').classList.remove('disabled')
  points.innerText++
  if (points.innerText == 10) {
    document.querySelector('#inc-class').classList.add('disabled')
  }
}
function decPoint() {
  let points = document.querySelector('#point-value')
  if (points.innerText == 1) return
  if (points.innerText == 10) {
    document.querySelector('#inc-class').classList.remove('disabled')
    points.innerText--
    return
  }
  points.innerText--
 if (points.innerText == 1) {
    document.querySelector('#dec-class').classList.add('disabled')
    return
  }
}