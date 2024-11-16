/**definindo as states do jogo*/
const state = {
    score:{
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites:{
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards:{
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    actions:{
        button:document.getElementById("next-duel"),
    },
};

const playerSides = {
    player: "player-field-card",
    computer: "computer-field-card"
};

const pathImage = "../assets/icons/";

const cardData = [
    {
        id:0,
        name:"Blue Eyes White Dragon",
        type:"Paper",
        img:pathImage + "dragon.png",
        WinOf:[1],
        LoseOf:[2],
    },
    {
        id:1,
        name:"Dark Magician",
        type:"Rock",
        img:pathImage + "magician.png",
        WinOf:[2],
        LoseOf:[1],
    },
    {
        id:2,
        name:"Exodia",
        type:"Scissors",
        img:pathImage + "exodia.png",
        WinOf:[0],
        LoseOf:[1],
    }
];

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomIdCard();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}
function init() {
    drawCards(5, playerSides.player);
    drawCards(5, playerSides.computer);
}

init();