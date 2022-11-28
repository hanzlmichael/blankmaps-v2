export function initTag() {
  document.querySelector(".tags").addEventListener('keypress', insertTag)
  document.querySelector(".tags-outer").addEventListener("click", closeTag)
  document.querySelector("#add").addEventListener("click", createClosableTag)
  document.querySelector('.add-terms-wrap').addEventListener('keypress', createTermElem)
  document.querySelector('.add-terms-wrap').addEventListener('click', deleteTermElem)
  observe() 

  /* if (isMobile()) {
    document.querySelector("#add").style.display = "inline"
  } */
}

function insertTag(e) {
  if (e.keyCode === 13) {
    e.preventDefault()
    createClosableTag()
  }
}

function createClosableTag() {
  let textContent = document.querySelector(".tags")
  let position = document.querySelector(".tags")
  position.insertAdjacentHTML("beforebegin", 
    `<div class="tag tag-category"><span>${textContent.innerText}</span><span class="close-tag">×</span></div>`)
  textContent.innerText = ""
}

function closeTag(e) {
  if (e.target.matches(".close-tag")) {
    let parent = e.target.closest(".tag")
    parent.remove()
  }
}

function isMobile() {
  var hasTouchScreen = false

  if ("maxTouchPoints" in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0
  } else if ("msMaxTouchPoints" in navigator) {
    hasTouchScreen = navigator.msMaxTouchPoints > 0
  } else {
    var mQ = window.matchMedia && matchMedia("(pointer:coarse)")
    if (mQ && mQ.media === "(pointer:coarse)") {
      hasTouchScreen = !!mQ.matches
    } else if ("orientation" in window) {
      hasTouchScreen = true // deprecated, but good fallback
    } else {
      // Only as a last resort, fall back to user agent sniffing
      var UA = navigator.userAgent
      hasTouchScreen =
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
    }
  }
  return hasTouchScreen
}

/* Observer*/
const config = {
  childList: true
}

const targetNode = document.querySelector('.tags-outer')
let selectCategory = document.querySelector('#select-category')

function observe() {
  console.log('observe')
  const callback = mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        if (mutation.addedNodes[0]) {
         let addedNode = extractCategoryFromAddedHTMLNode(mutation.addedNodes[0].innerText)
         console.log(addedNode)

         // Přidat název kategorie do Selectu
          selectCategory.add(new Option(`${addedNode}`, `${addedNode}`))

         createTermBlock(addedNode)
        }
        if (mutation.removedNodes[0]) {
          let deletedNode = extractCategoryFromDeletedHTMLNode(mutation.removedNodes[0].innerText)
          deleteTermBlock(deletedNode)
          /* console.log('removed node= ', removedNodes[0]) */
          let index = [...selectCategory.options].find(o=> o.value==deletedNode).index
          console.log(index)
          selectCategory.remove(index)
          selectCategory.item(0).selected = true
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

function extractCategoryFromAddedHTMLNode(html) {
  console.log('added')
  return html.slice(0,-2)
}

function extractCategoryFromDeletedHTMLNode(html) {
  return html.slice(0,-1)
}

function createTermBlock(term) {
  let parent = document.querySelector('.add-terms-wrap')
  /* let string = String(term).toLowerCase() */
  let html = `<div class="tags-outer tags-outer-term"><div class="tag-nonclosable">${term} :</div><div class="wrap-tags"><div contenteditable="true" class="tags-term" placeholder="Přidat pojem ..."></div></div><button class="add-term">+</button></div>`
  parent.insertAdjacentHTML('beforeend', html)
  console.log(html)
}

function deleteTermBlock(term) {
  let nodes = document.querySelectorAll('.tags-outer-term .tag-nonclosable')
  let extractedCategories = []
  nodes.forEach(el => extractedCategories.push((el.innerText).slice(0,-2)))
  let foundAtIndex = extractedCategories.indexOf(term)
  let nodeToDelete = document.querySelector(`.add-terms-wrap .tags-outer:nth-of-type(${foundAtIndex+3})`)
  nodeToDelete.remove()
}

function createTermElem(e) {
  if (e.keyCode === 13) {
    e.preventDefault()
    let active = document.activeElement
   
    /* let term = active.textContent
    console.log(term)
    let html = `<div class="tag tag-term"><span>${term}</span><span class="close-tag">×</span></div>`
    active.insertAdjacentHTML('beforebegin', html)  
    console.log('here')   
    active.innerText = ""
 */

    let textContent = document.activeElement.textContent
    let newNode = document.createElement("div")
    newNode.classList.add("tag", "tag-term")
    let tagsText = document.createElement("span")
    tagsText.innerText = textContent
    
    let tagsClose = document.createElement("span")
    tagsClose.innerText = "×"
    tagsClose.classList.add("close-tag")
    newNode.appendChild(tagsText)
    newNode.appendChild(tagsClose)
    let parent = active.closest('.wrap-tags')
    active.innerText =''
    parent.insertBefore(newNode,active)
  }
}

function removeAllChildNodes(parent) {
  console.log(1)
  console.log(parent.childNodes[0])
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
      console.log('777')
  }
}

function deleteTermElem(e) {
  if (e.target.matches('.close-tag')) {
    let parent = e.target.closest(".tag")
    parent.remove()
  }
}