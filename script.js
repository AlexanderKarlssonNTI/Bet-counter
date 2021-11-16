// Displays
const bet = document.getElementById("bet");
const bankroll = document.getElementById("bankroll");
const toBet = document.getElementById("bet-amount");

// Actions
const winBtn = document.getElementById("win-btn");
const loseBtn = document.getElementById("lose-btn");
const returnBtn = document.getElementById("return-btn");

// Bet Inputs
const bet1 = document.getElementById("bet-1");
const bet5 = document.getElementById("bet-5");
const bet10 = document.getElementById("bet-10");
const bet25 = document.getElementById("bet-25");
const bet100 = document.getElementById("bet-100");
const bet500 = document.getElementById("bet-500");
const bet1k = document.getElementById("bet-1k");
const bet5k = document.getElementById("bet-5k");
const bet10k = document.getElementById("bet-10k");
const betCustom = document.getElementById("bet-custom");
const betAddCustom = document.getElementById("bet-confirm");
const betAdd = document.getElementById("bet-add");
const betAll = document.getElementById("bet-all");
const betClear = document.getElementById("bet-clear");

// Win Options
const win2x = document.getElementById("win-2x");
const win3x = document.getElementById("win-3x");
const winCustom = document.getElementById("win-custom");
const winMultiplier = document.getElementById("win-multi");
const winConfirm = document.getElementById("win-confirm");

const startValue = document.getElementById("start-value");
const startBtn = document.getElementById("start-btn");
let start = false;
let whoCheck1;
let whoCheck2;

// Betting table event listeners
bet1.addEventListener("click", function(){addBet(bet1.id)})
bet5.addEventListener("click", function(){addBet(bet5.id)})
bet10.addEventListener("click", function(){addBet(bet10.id)})
bet25.addEventListener("click", function(){addBet(bet25.id)})
bet100.addEventListener("click", function(){addBet(bet100.id)})
bet500.addEventListener("click", function(){addBet(bet500.id)})
bet1k.addEventListener("click", function(){addBet(bet1k.id)})
bet5k.addEventListener("click", function(){addBet(bet5k.id)})
bet10k.addEventListener("click", function(){addBet(bet10k.id)})
betAddCustom.addEventListener("click", customBet)
betAdd.addEventListener("click", Bet)
betClear.addEventListener("click", clear)
betAll.addEventListener("click", BetAll)

// Actions even listners
winBtn.addEventListener("click", Win)
win2x.addEventListener("click", function(){multiplier(win2x)})
win3x.addEventListener("click", function(){multiplier(win3x)})
returnBtn.addEventListener("click", returnBet)
loseBtn.addEventListener("click", Lose)
winConfirm.addEventListener("click", customWin)
startBtn.addEventListener("click", Start)
document.getElementById("win-close").addEventListener("click", close)

function addBet(id) {
    id = id.replace('bet','');
    id = id.replace('-','');
    id = id.replace('k','000');
    toBet.innerHTML = parseInt(toBet.innerHTML) + parseInt(id);
}

function clear() {
    toBet.innerHTML = 0;
}

function Lose() {
    bet.innerHTML = 0;
    if (bankroll.innerHTML == '0' && start == true) {
        alert("No points left. You lose");
        document.querySelector('.start-input').style.display = "flex";
        start = false;
    }
}

function returnBet() {
    bankroll.innerHTML = parseInt(bankroll.innerHTML) + parseInt(bet.innerHTML);
    bet.innerHTML = 0;
}

function Bet() {
    if (toBet.innerHTML != '' && isNaN(toBet.innerHTML) != true && Number.isInteger(parseInt(toBet.innerHTML)) == true) {
        if ((parseInt(bankroll.innerHTML) - parseInt(toBet.innerHTML)) < 0) {
            alert("Error: not enough to bet");
        }
        else {
            bet.innerHTML = parseInt(bet.innerHTML) + parseInt(toBet.innerHTML);
            bankroll.innerHTML = parseInt(bankroll.innerHTML) - parseInt(toBet.innerHTML);
            toBet.innerHTML = 0;
        }
    }
    else {
        alert("Error: Non integer detected or empty input");
    }
}

function BetAll() {
    bet.innerHTML = bankroll.innerHTML;
    bankroll.innerHTML = 0;
}

function customBet() {
    if (betCustom.value != '' && isNaN(betCustom.value) != true && Number.isInteger(parseInt(betCustom.value)) == true) {
        toBet.innerHTML = parseInt(toBet.innerHTML) + parseInt(betCustom.value);
        betCustom.value = '';
    }
    else {
        alert("Error: Non integer detected or empty input");
    }
}

function Win() {
    document.querySelector(".win-options").style.display = "flex";
    document.querySelector("#win-btn").style.display = "none";
}

function close() {
    document.querySelector(".win-options").style.display = "none";
    document.querySelector("#win-btn").style.display = "inline";
    win2x.checked = false;
    win3x.checked = false;
    document.querySelector("#win-multi").disabled = false;
}

function winAmount (id) {
    id = id.replace("win", "");
    id = id.replace("x", "");
    id = id.replace("-", "");
    temp = parseInt(bet.innerHTML) * parseInt(id);;
    bankroll.innerHTML = parseInt(bankroll.innerHTML) + temp;
    bet.innerHTML = 0;
    document.querySelector(".win-options").style.display = "none";
    document.querySelector("#win-btn").style.display = "inline";
}

function customWin() {
    let temp1 = null;
    let temp2 = null;
    if (win2x.checked == true || win3x.checked == true) {
        if (whoCheck1 == win2x) {
            temp1 = 2;
        }
        if (whoCheck1 == win3x) {
            temp1 = 3;
        }
    } else if (winMultiplier.value != '' && isNaN(winMultiplier.value) != true && Number.isInteger(parseInt(winMultiplier.value)) == true) {
        temp1 = winMultiplier.value;
    }
    if (winCustom.value != '' && isNaN(winCustom.value) != true && Number.isInteger(parseInt(winCustom.value)) == true) {
        temp2 = winCustom.value;
        console.log(temp2);
    }
    if (temp1 == null && temp2 == null) {
        alert("Error: Invalid input");
    }
    if (temp1 == null || temp2 == null || temp1 != null || temp2 != null) {
        if (temp2 == null) {
            bankroll.innerHTML = parseInt(bankroll.innerHTML) + (parseInt(bet.innerHTML) * temp1);
        }
        else if (temp1 == null) {
            bankroll.innerHTML = parseInt(bankroll.innerHTML) + parseInt(bet.innerHTML) + parseInt(temp2);
        }
        else {
            bankroll.innerHTML = parseInt(bankroll.innerHTML) + parseInt(temp2) + (parseInt(bet.innerHTML)*  temp1);
        }
        bet.innerHTML = 0;
        document.querySelector(".win-options").style.display = "none";
        document.querySelector("#win-btn").style.display = "inline";
        win2x.checked = false;
        win3x.checked = false;
        document.querySelector("#win-multi").disabled = false;
    }
}

function multiplier(temp) {
    whoCheck1 = temp;
    if (whoCheck1 != whoCheck2) {
        if (whoCheck1 == win2x) {
            win3x.checked = false;
        }
        if (whoCheck1 == win3x) {
            win2x.checked = false;
        }
    }
    whoCheck2 = whoCheck1;
    if (win2x.checked || win3x.checked) {
        document.querySelector("#win-multi").disabled = true;
    }
    else {
        document.querySelector("#win-multi").disabled = false;
    }

}

function Start() {
    if (startValue.value != '' && isNaN(startValue.value) != true && Number.isInteger(parseInt(startValue.value)) == true) {
        bankroll.innerHTML = startValue.value;
        startValue.value = '';
        document.querySelector('.start-input').style.display = "none";
        start = true;
    }
    else {
        alert("Error: Non integer detected or empty input");
    }
}
