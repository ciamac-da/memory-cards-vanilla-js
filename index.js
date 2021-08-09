const cardsContainer = document.getElementById("cards-container")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")
const currentEl = document.getElementById("current")
const showBtn = document.getElementById("show")
const hideBtn = document.getElementById("hide")
const questionEl = document.getElementById("question")
const answerEl = document.getElementById("answer")
const addCardBtn = document.getElementById("add-card")
const clearBtn = document.getElementById("clear")
const addContainer = document.getElementById("add-container")


// Show add container
showBtn.addEventListener("click", () =>  addContainer.classList.add("show"))
// Hide add container
hideBtn.addEventListener("click", () =>  addContainer.classList.remove("show"))


// Keep track of current card
let currentActiveCard = 0

// Store DOM cards
const cardsEl = []


/**const cardsData = [
  {
    question: "What must a variable begin?",
    answer: "A letter, $ or _"
  },
  {
    question: "What is a variable?",
    answer: "Container for a piece of data"
  },
  {
    question: "Example of case Sensitive Variable!",
    answer: "thisIsAVariable"
  },
]
**/

// Create a single card in DOM
const createCard = (data, index) => {
  const card = document.createElement("div")
  card.classList.add("card")

  if(index === 0) {
    card.classList.add("active")
  }

  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
      <p>${data.question}</p>
    </div>
    <div class="inner-card-back">
      <p>${data.answer}</p>
    </div>
   </div>
  `
  // Flip the card
  card.addEventListener("click", () => card.classList.toggle("show-answer"))

  // Add to DOM cards
  cardsEl.push(card)
  cardsContainer.appendChild(card)

  updateCurrentText()
}

const updateCurrentText = () => {
  currentEl.innerText = `${ currentActiveCard +1 }/${cardsEl.length}`
}



// Get Cards from local storage
const getCardsData = () => {
  const cards = JSON.parse(localStorage.getItem("cards"))
  return cards === null ? [] : cards
}
// Store card data
const cardsData = getCardsData()
// Create all cards
const createCards = () => {
  cardsData.forEach((data, index) => createCard(data, index) )
}
createCards()

// Add card to local storage
const setCardsData = (cards) => {
localStorage.setItem("cards", JSON.stringify(cards))
window.location.reload()
}

// Event Listeners
// Next
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left"
  currentActiveCard = currentActiveCard + 1
  if(currentActiveCard > cardsEl.length -1) {
    currentActiveCard = cardsEl.length -1
  }

cardsEl[currentActiveCard].className = "card active"
updateCurrentText()
})
// Prev
prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right"
  currentActiveCard = currentActiveCard - 1
  if(currentActiveCard < 0) {
    currentActiveCard = 0
  }
cardsEl[currentActiveCard].className = "card active"
updateCurrentText()
})
// Add new Card
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value
  const answer = answerEl.value
  if(question.trim() && answer.trim()) {
    const newCard = {question: question, answer: answer}
    createCard(newCard)

    questionEl.value = ""
    answerEl.value = ""

    addContainer.classList.remove("show")

    cardsData.push(newCard)
    setCardsData(cardsData)
  }
})
// Clear all cards button
clearBtn.addEventListener("click", ()=> {
  localStorage.clear()
  cardsContainer.innerHTML = ""
  window.location.reload()
})
