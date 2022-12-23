import { canvas } from './script.js'

export function initMapUploadingFunctionality() {
  localStorage.setItem('maps', JSON.stringify(maps))
  observe()
  document.querySelector('.maps-wrap').addEventListener('input', handleMapChangeName)
}

// select element
let selectMap = document.querySelector('#select-map')
let mapCount = 0
let maps = []

// sledovane zmeny
const config = {
  childList: true
}
// sledovany node
const targetNode = document.querySelector('.maps-wrap')

function observe() {
 
  const callback = mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        debugger;
        if (mutation.addedNodes[0]) {
          
          console.log(mutation.addedNodes[0].querySelector('input').value)
          mutation.addedNodes[0].id = `map${mapCount++}`

          let mapId = mutation.addedNodes[0].id
          console.log(mapId)
          let element = mutation.addedNodes[0].querySelector('img')
          maps.push({
            mapId: mutation.addedNodes[0].id,
            src: mutation.addedNodes[0].querySelector('img').getAttribute('src')
          })
          console.log('maps', maps)
          localStorage.setItem('maps', JSON.stringify(maps))


          console.log('added', mutation.addedNodes[0])
          let mapName = mutation.addedNodes[0].querySelector('input').value
          selectMap.add(new Option(`${mapName}`,`${mutation.addedNodes[0].id}`))
        }
        if (mutation.removedNodes[0]) {
          console.log('removed', mutation.removedNodes[0])
          let mapIdToDelete = mutation.removedNodes[0].id
          selectMap.removeChild(selectMap.querySelector(`option[value="${mapIdToDelete}"]`))
          let maps = JSON.parse(localStorage.getItem('maps'))
          let filteredMaps = maps.filter(map => mapIdToDelete !== map.mapId)
          localStorage.setItem('maps', JSON.stringify(filteredMaps))
          /* let previous = mutation.previousSibling
          let index = 0

          if (previous.previousElementSibling) {
            while (previous.previousElementSibling) {
              previous = previous.previousElementSibling
              index++
            }
            index++ 
          } else {
            index = 0
          }       
          selectMap.remove(index+1) */
        }
      }
    })
  }

  const observer = new MutationObserver(callback)
  observer.observe(targetNode, config)
}

function handleMapChangeName(e) {
  if (e.target.matches('.maps-wrap .map-wrap input')) {
    let elem = e.target.closest('.map-wrap')
    let index = findIndex(elem)
    selectMap.item(index+1).textContent = e.target.value
  }
}

// Najde index potomka u rodiče
function findIndex(el) {
  let index = 0
  while (el.previousElementSibling) {
    el = el.previousElementSibling
    index++
  }
  return index
}

function indexOfElement(e) {
  if (e.target.matches('.item')) {
    let index = 0
    let previous = e.target.previousElementSibling
    if (previous) {
      while (previous) {
        index++
        previous = previous.previousElementSibling
      }
      return index
    } 
    return index
  }
}

export function resetZoom() {
  canvas.setViewportTransform([1,0,0,1,0,0])
}

export function activateZooming() {
  canvas.on('mouse:wheel', function(opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });
}
