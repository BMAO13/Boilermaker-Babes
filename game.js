const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const imageElement = document.getElementById('image')
let state = {}

function startGame() {
  console.log("wassup")
  state = {}
  showTextNode(0)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text


  // Handle image display
  if (textNode.image) {
    imageElement.src = textNode.image
    imageElement.style.display = 'block'
  } else {
    imageElement.style.display = 'none'
  }

  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })

}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    //INTRO
    id: 0,
    image: 'images/train.jpg',
    text: lines[0],
    options: [
      {
        text: 'Yes',
        setState: { takeQuiz: true },
        nextText: 1
      },
      {
        text: 'No',
        nextText: 2
      }
    ]
  },
  {
    id: 1,
    text: lines[1],
    options: []
  },
  {
    //DONT TAKE QUIZ AND LEAVE STEWART. Star
    id: 2,
    text: lines[2],
    options: [
      {
        text: 'Ignore it and keep walking.',
        setState: { takeQuiz: true },
        nextText: 3
      },
      {
        text: 'Kick it.',
        nextText: 4
      }
    ]
  },
  {
    //ignore star
    id: 3,
    text: lines[3],
    options: [
      {
        text: 'High-Five Purdue Pete',
        setState: { takeQuiz: true },
        nextText: 5
      },
      {
        text: 'Kick him.',
        nextText: 6
      }
    ]
  },
  {
    //KICK STAR
    id: 4,
    text: lines[4],
    options: [
      {
        text: 'High-Five Purdue Pete',
        setState: { takeQuiz: true },
        nextText: 5
      },
      {
        text: 'Kick him.',
        nextText: 6
      }
    ]
  },
  {
    //HIGH FIVE PETE -> BMXS
    id: 5,
    text: lines[5],
    options: [
      {
        text: 'Admire and keep walking.',
        setState: { takeQuiz: true },
        nextText: 7
      },
      {
        text: 'Kick it.',
        nextText: 8
      }
    ]
  },
  {
    //Kick Pete -> BMXS
    id: 6,
    text: lines[6],
    options: [
      {
        text: 'Admire and keep walking.',
        setState: { takeQuiz: true },
        nextText: 7
      },
      {
        text: 'Kick it.',
        nextText: 8
      }
    ]
  },
  {
    //admire bmxs
    id: 7,
    text: lines[7],
    
  },
  {
    //kick bmxs
    id: 8,
    text: lines[8],
    
  },


  
]
startGame()

