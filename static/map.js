export function initMapUploadingFunctionality() {
  observe()
  document.querySelector('.maps-wrap').addEventListener('input', handleMapChangeName)
}

let selectMap = document.querySelector('#select-map')

/* Observer*/
const config = {
  childList: true
}

const targetNode = document.querySelector('.maps-wrap')

function observe() {
  const callback = mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        if (mutation.addedNodes[0]) {
          console.log(mutation.addedNodes[0].querySelector('input').value)
          let mapName = mutation.addedNodes[0].querySelector('input').value
          selectMap.add(new Option(`${mapName}`,`${mapName}`))
         /* let addedNode = extractCategoryFromAddedHTMLNode(mutation.addedNodes[0].innerText)
         console.log(addedNode)
         createTermBlock(addedNode) */
        }
        if (mutation.removedNodes[0]) {
          let previous = mutation.previousSibling
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
          selectMap.remove(index+1)
          /* console.log(removed.previousElementSibling) */
          /* console.log(mutation.removedNodes[0]) */
          /* let deletedNode = extractCategoryFromDeletedHTMLNode(mutation.removedNodes[0].innerText)
          deleteTermBlock(deletedNode) */
        }

        /* const listValues = Array.from(targetNode.children)
          .map(node => node.innerHTML)
          .filter(html => html !== '<br>') */
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

// Najde index potomka
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

