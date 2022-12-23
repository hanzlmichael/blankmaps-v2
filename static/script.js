import { initProgressBar } from './progressBar.js'
import { initTag } from './tag.js'
import { initQuestionsBar } from './questions.js'
import { initMapUploadingFunctionality } from './map.js'
import { initPoints } from './points.js'
import { initAnswer } from './answer.js'
import { initMapIcons } from './initIcons.js'
import { activateZooming } from './map.js'
import { startDrawPolygon } from './addPolygon.js'
import { startDrawLine } from './addLine.js'
import { startDrawPoint } from './addPoint.js'
import { initObjectDeleteIcon } from './globalPrototypeSetting.js'
import { turnOfControls } from "./globalPrototypeSetting.js"

export var canvas = new fabric.Canvas('canvas')
/* canvas.setDimensions({width:750}) */

initProgressBar()
initTag()
initQuestionsBar()
initMapUploadingFunctionality()
initPoints()
initAnswer()
initMapIcons()
activateZooming()
initObjectDeleteIcon()
turnOfControls()
activateSettings() 

function activateSettings() {
  fabric.Object.prototype.padding = 10;
  fabric.Object.prototype.borderColor = "rgb(211,33,45)"
  fabric.Object.prototype.borderDashArray = [5]
}


document.querySelector('#map-upload').addEventListener('change', handleMap)
document.querySelector('.shape-options-wrap').addEventListener('click', startDraw)

function startDraw(e) {
  let typeShape = e.target.dataset.shape
  if (typeShape == 'point') {
    startDrawPoint()
  }
  if (typeShape == 'line') {
    startDrawLine()
  }
  if (typeShape == 'polygon') {
    startDrawPolygon()
  }
}

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

function handleDisplayMap(e) {
  debugger;
  if (selectMap.selectedIndex == 0) {
    canvas.clear()
    return
  }
  let indexCorrection = selectMap.selectedIndex - 1 // Kvůli první disabled options
  let mapElem = mapWrap.children[indexCorrection] // Vyberu správnou mapu k vybranému option
  let mapImage = mapElem.querySelector('img')
  let imageData = mapImage.getAttribute('src')


  resizeMapToCanvas(imageData)
}

export function resizeMapToCanvas(data) {
debugger;
  let wrap = document.querySelector('.canvas-wrap')
  let wrapWidth = wrap.clientWidth
  canvas.clear()
  fabric.Image.fromURL(data, function(img) {
    debugger;
    console.log(img.getScaledWidth)
    console.log(img)
    img.scaleToWidth(750,true)
    img.selectable = false
    img.hoverCursor = "default"  
    /* img.set({top:0, left:0})   */

    /* canvas.setHeight(im.getScaledHeight()) */
/* 
    canvas.setWidth(750)
    let newCanvasHeight = img.getScaledHeight()
    canvas.setHeight(newCanvasHeight)  */
    canvas.add(img)
    canvas.sendToBack(img)
    canvas.setDimensions({width:750, height:img.getScaledHeight()})
  })
}

function onlyOne(checkbox) {
  debugger;
  var checkboxes = document.getElementsByName('check')
  let wrap = checkbox.closest('.answer-wrap')
  console.log(wrap)
  checkboxes.forEach((item) => {
      if (item !== checkbox) {
        item.checked = false
      }
  })
}

document.querySelector('#testbtn').addEventListener('click', testbtn)
function testbtn() {
  debugger;
  let objs = canvas.getObjects()
  objs.forEach(obj => {
    if (obj.type == 'image') {
      console.log(obj.width)
      console.log(obj.top)
      console.log(obj.left)
      console.log(obj.getBoundingRect())
      console.log(canvas.getWidth())
      obj.left = 0
    }
  })
}