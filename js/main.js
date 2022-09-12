document.querySelector(".control-buttons span").onclick = function () {

    let yourName = prompt("Whats Your Name")

    if (yourName == "" || yourName == null) {

        document.querySelector(".name span").innerHTML = "Unknown"

    }else{

        document.querySelector(".name span").innerHTML = yourName

    } 

    document.querySelector(".control-buttons").remove();
}

let duration = 1000

let blocksContainer = document.querySelector(".game-memory-blocks");

let blocks = Array.from(blocksContainer.children)

let orderRange = [...Array(blocks.length).keys()]

shuffle(orderRange)
 
// Add order css property to game blocks
blocks.forEach((block , index) => {

    block.style.order = orderRange[index]

    //Add click event
    block.addEventListener('click' , function() {

        flipBlock(block)
    })

})

//flip block function
function flipBlock(slectedBlock) {

    slectedBlock.classList.add('is-flipped')

    //collect all flipped cards
    let allFlippedBlocks = blocks.filter(flipBlock => flipBlock.classList.contains('is-flipped'))

    // if theres two selected blocks
    if (allFlippedBlocks.length === 2) {

        // Stop clicking functio
        stopClicking()

        // check matched block function
        checkMatchedBlocks( allFlippedBlocks[0], allFlippedBlocks[1 ])
    }

    
}

//Shuffle Function
function shuffle(array) {
    
    //Settind vars
    let current = array.length,
        temp,
        random;      

    while (current > 0) {
        
        // Get random number
        random = Math.floor(Math.random() * current)

        //Decrease length by one
        current--;

        temp = array[current]

        array[current] = array[random]

        array[random] = temp
    }

    return array
}

// Stop clicking function

function stopClicking() {
    
    blocksContainer.classList.add("no-clicking")

    setTimeout( ()=>{

        // remove class no-clicking
        blocksContainer.classList.remove("no-clicking")

    }, duration)
}

// check matched block function
function checkMatchedBlocks(firstBlock , secondBlock) {
    
    let triesElement = document.querySelector(".tries span")

    if (firstBlock.dataset.technology === secondBlock.dataset.technology ) {
        
        firstBlock.classList.remove("is-flipped")
        secondBlock.classList.remove("is-flipped")

        firstBlock.classList.add("has-match")
        secondBlock.classList.add("has-match")

        document.getElementById("success").play();
    }else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1

        setTimeout(()=>{

            firstBlock.classList.remove("is-flipped")
            secondBlock.classList.remove("is-flipped")

        },duration)

      
    }
}