const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const imageElement = document.getElementById('image')
let state = {}

function startGame() {
  console.log("wassup")
  state = {bmxs: 0, pete: 0, star: 0}
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
  
  // Add points to existing totals instead of replacing
  if (option.setState) {
    if (option.setState.bmxs) {
      state.bmxs += option.setState.bmxs
    }
    if (option.setState.pete) {
      state.pete += option.setState.pete
    }
    if (option.setState.star) {
      state.star+= option.setState.star
    }
  }
  
  console.log("Current points:", state); // Debug to see points
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    //INTRO
    id: 0,
    image: 'images/quiz.PNG',
    text: lines[0],
    options: [
      {
        text: 'Yes',
        nextText: 1
      },
      {
        text: 'No',
        nextText: 2
      }
    ]
  },
  {
    //QUIZ Q1
    id: 1,
    image: 'images/quiz.PNG',
    text: lines[1],
    options: [
      {
        text: 'Yes',
        setState:{bmxs: 1, pete: 1},
        nextText: 9
      },
      {
        text: 'No',
        setState:{star: 1},
        nextText: 9
      }
    ]
  },
  {
    //DONT TAKE QUIZ AND LEAVE STEWART. Star
    id: 2,
    image: 'images/star bump.PNG',
    text: lines[2],
    options: [
      {
        text: 'Ignore it and keep walking.',
        nextText: 1000
      },
      {
        text: 'Kick it.',
        nextText: 1001
      }
    ]
  },
  {
    //DONT TAKE QUIZ AND LEAVE STEWART. Star
    id: 1000,
    image: 'images/ignore star.PNG',
    text: '',
    options: [
      {
        text: 'Next',
        nextText: 3
      },
     
    ]
  },
  {
    //ignore star
    id: 3,
    image: 'images/pete approaches.PNG',
    text: lines[3],
    options: [
      {
        text: 'High-Five Purdue Pete',
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
    id: 1001,
    image: 'images/kick star.PNG',
    text: '',
    options: [
      {
        text: 'Next',
        nextText: 4
      },
      
    ]
  },
  {
    //KICK STAR
    id: 4,
    image: 'images/pete approaches.PNG',
    text: lines[4],
    options: [
      {
        text: 'High-Five Purdue Pete',
        nextText: 1002
      },
      {
        text: 'Kick him.',
        nextText: 1003
      }
    ]
  },
  {
    //KICK pete
    id: 1002,
    image: 'images/high five.PNG',
    text: '',
    options: [
      {
        text: 'Next',
        nextText: 5
      },
      
    ]
  },
  {
    //KICK pete
    id: 1003,
    image: 'images/kPete.PNG',
    text: '',
    options: [
      {
        text: 'Next',
        nextText: 6
      },
      
    ]
  },
  {
    //HIGH FIVE PETE -> BMXS
    id: 5,
    image: 'images/see bmxs.PNG',
    text: lines[5],
    options: [
      {
        text: 'Admire and keep walking.',
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
    image: 'images/see bmxs.PNG',
    text: lines[6],
    options: [
      {
        text: 'Admire and keep walking.',
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
    image: 'images/admire.PNG',
    text: lines[7],
    
  },
  {
    //kick bmxs
    id: 8,
    text: lines[8],
    
  },
  {
    //QUIZ Q2
    id: 9,
    image: 'images/train.jpg',
    text: lines[9],
    options: [
      {
        text: 'Yes',
        setState:{star: 1},
        nextText: 10
      },
      {
        text: 'No',
        setState:{bmxs: 1, pete: 1},
        nextText: 10
      }
    ]
  },
  {
    //QUIZ Q3
    id: 10,
    image: 'images/train.jpg',
    text: lines[10],
    options: [
      {
        text: 'Tall',
        setState:{pete: 1},
        nextText: 11
      },
      {
        text: 'Short',
        setState:{star: 1},
        nextText: 11
      },
      {
        text: 'Train',
        setState:{bmxs: 1},
        nextText: 11
      }
    ]
  },
  {
    //end of quiz
    id: 11,
    text: lines[11],
    options: [{text: 'Next', nextText: 12}],
    nextText: 12
  },
  {
    //go to funeral
    id: 12,
    text: lines[12],
    options: [{text: 'Next', nextText: 13}],
    nextText: 13
  },
  {
    //eulogy
    id: 13,
    text: lines[13],
    options: [
      {
        text: 'Talk to Boilermaker Xtra Special', 
        setState:{bmxs:1},
        nextText: 14
      },
      {
        text: 'Head back to your dorm', 
        nextText: 16
      },

    ],
    
  },
  {
    //bmxsCry
    id: 14,
    text: lines[14],
    options: [
      {
        text: 'Next', 
        nextText: 15
      },

    ],
  },
  {
    //bigHead
    id: 15,
    text: lines[15],
    options: [
      {
        text: 'Next', 
        //sleepPPPPPPPPP
        nextText: 30
      },

    ],
  },
  {
    //leave funeral
    id: 16,
    text: lines[16],
    options: [
      {
        text: 'Help Purdue Pete', 
        setState:{pete:1, star: 1},
        nextText: 17
      },
      {
        text: 'Help Starship', 
        setState:{pete:-1, star: 1},
        nextText: 18
      },
      {
        text: 'Help Neither', 
        setState:{pete:-1},
        nextText: 19
      },

    ],
  },
  {
    //help pete
    id: 16,
    text: lines[16],
    options: [
      {
        text: 'Help Purdue Pete', 
        setState:{pete:1, star: 1},
        nextText: 17
      },
      {
        text: 'Help Starship', 
        setState:{pete:-1, star: 1},
        nextText: 18
      },
      {
        text: 'Help Neither', 
        setState:{pete:-1},
        nextText: 19
      },

    ],
  },



  
]
startGame()

