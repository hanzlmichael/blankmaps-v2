import { initProgressBar } from './progressBar.js'
import { initTag } from './tag.js'
import { initQuestionsBar } from './questions.js'
import { initMapUploadingFunctionality } from './map.js'
import { initPoints } from './points.js'
import { initAnswer } from './answer.js'


initProgressBar()
initTag()
initQuestionsBar()
initMapUploadingFunctionality()
initPoints()
initAnswer()
var canvas = new fabric.Canvas('canvas')

document.querySelector('#map-upload').addEventListener('change', handleMap)
console.log('here')
document.querySelector('.maps-wrap').addEventListener('click', deleteMap)
let resultImage = document.querySelector(".maps-wrap")

function handleMap(e) {
  
	let input = e.target
  let len = input.files.length
  for (let i = 0; i < len; i++) {
    let reader = new FileReader()
    reader.onload = function() {
      let imageFile = reader.result
      let name = input.files[i].name
      console.log(name)
      let html = `<div class="map-wrap">
      <div class="map-image">
        <img src="${imageFile}" alt="">
        <span class="close-map">&#x2716;</span>
      </div> 
      <div class="map-info">
        <div class="placeholder">Název mapy</div>
        <input type="text">
      </div>
    </div>`
      resultImage.insertAdjacentHTML('beforeend', html)
      let setName = document.querySelector('.map-wrap:last-child input')
      setName.value = `${name.split('.')[0]}`
    }
    reader.readAsDataURL(input.files[i])
    
  }
}

function deleteMap(e) {
  if (e.target.matches('.close-map')) {
    document.querySelector('#map-upload').value = null
    let clickedMap = e.target.closest('.map-wrap')
    clickedMap.remove()
  }
  if (document.querySelector('.maps-wrap').children.length === 0) {
    selectMap.item(0).selected = true
  }
}

let selectMap = document.querySelector('#select-map')
let mapWrap = document.querySelector('.maps-wrap')
mapWrap.addEventListener('input', handleChangeSelectMapText)
selectMap.addEventListener('change', handleDisplayMap)

function handleChangeSelectMapText() {
  console.log('change')
}

function handleDisplayMap() {
  let indexCorrection = selectMap.selectedIndex - 1 // Kvůli první disabled options
  let mapElem = mapWrap.children[indexCorrection] // Vyberu správnou mapu k vybranému option
  let mapImage = mapElem.querySelector('img')
  let imageData = mapImage.getAttribute('src')
  resizeMapToCanvas(imageData)
}

function resizeMapToCanvas(data) {
  let wrap = document.querySelector('.canvas-wrap')
  let wrapWidth = wrap.clientWidth
  canvas.clear()
  fabric.Image.fromURL(data, function(img) {
    let im = img.set({
      left:0,
      top:0
    })
    im.scaleToWidth(wrapWidth)
    canvas.add(im)
    console.log(im.getScaledHeight())
    canvas.setHeight(im.getScaledHeight())
    canvas.setWidth(750)
  })  
}

function onlyOne(checkbox) {
  var checkboxes = document.getElementsByName('check')
  checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false
  })
}