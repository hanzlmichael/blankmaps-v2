
export function initProgressBar() {
  $('.n').addEventListener('click', nextPage)
  $('.p').addEventListener('click', prevPage)
}
let actualPage = 1

function prevPage() {
  let tempPage = actualPage
  if (--tempPage == 0) return
  $(`.text-position${actualPage}`).classList.remove("text-active")
  $(`.circle:nth-of-type(${actualPage})`).classList.remove("active-circle")
  $(".line").classList.remove(`line-active${actualPage}`)
  $(`.page${actualPage}`).classList.remove("page-active")
  actualPage--
  $(`.page${actualPage}`).classList.add("page-active")
  $(".line").classList.add(`line-active${actualPage}`)
  $(`.text-position${actualPage}`).classList.add("text-active")
}
function nextPage() { 
  let tempPage = actualPage
  if (++tempPage == 5) return
  $(`.text-position${actualPage}`).classList.remove("text-active")
  $(`.page${actualPage}`).classList.remove("page-active")
  actualPage++
  $(`.page${actualPage}`).classList.add("page-active")
  $(`.circle:nth-of-type(${actualPage})`).classList.add("active-circle")
  $(".line").classList.add(`line-active${actualPage}`)
  $(`.text-position${actualPage}`).classList.add("text-active")
}

