const winCombinations = [
    [1,2,3], [4,5,6], [7,8,9],
    [1,4,7], [2,5,8], [3,6,9],
    [1,5,9], [3,5,7]
];

let stepCount = 0;

const playerOne = {
    name: 'Player One',
    bgClass: 'circle',
    steps: [],
};

const playerTwo = {
    name: 'Player Two',
    bgClass: 'cross',
    steps: [],
};
const cellsElements = document.getElementsByClassName('cell');
const cells = [...cellsElements];
cells.forEach(i => {
    i.addEventListener('click', () => {
        if(checkClicked(i)) return true;
        setClicked(i);
        stepCount += 1;
        const player = playerTurn(i);
        const win = winPlayer(player.steps);
        if(win) openModal(`${player.name} win!`);
        if(stepCount > 8) openModal('Nobody win!');
    });
})


const setClicked = (i) => {
    i.classList.add('clicked');
}

const checkClicked = (i) => i.classList.contains('clicked');

const playerTurn = (i) => {
    const cellId = i.id;
    const playerCheck = stepCount % 2 === 0;
    if(playerCheck) {
        playerOne.steps.push(Number(cellId));
        i.classList.add(playerOne.bgClass);
        return playerOne;
    } else {
        playerTwo.steps.push(Number(cellId));
        i.classList.add(playerTwo.bgClass);
        return playerTwo;
    }
}

const winPlayer = (steps) => {
    let win = false;
    if(steps.length > 2) {
        winCombinations.forEach((combination) => {
            const intersection = steps.filter(x => combination.includes(x));
            console.log(combination, 'combination');
            console.log(intersection, 'intersection');
            if(intersection.length > 2) {
                win = true;
            }
        })
    }
    return win;
}

let close_modal = document.getElementById('close_modal');
let modal = document.getElementById('modal');
let modalTxt = document.getElementById('modal_txt');
let body = document.getElementsByTagName('body')[0];

const openModal = (text) => {
    modalTxt.innerText = text;
    modal.classList.add('modal_vis'); // добавляем видимость окна
    modal.classList.remove('bounceOutDown'); // удаляем эффект закрытия
    body.classList.add('body_block'); // убираем прокрутку
}

close_modal.onclick = function() { // клик на закрытие
    modal.classList.add('bounceOutDown'); // добавляем эффект закрытия
    window.setTimeout(function() { // удаляем окно через полсекунды (чтобы увидеть эффект закрытия).
        modal.classList.remove('modal_vis');
        body.classList.remove('body_block'); // возвращаем прокрутку
    }, 500);
};



