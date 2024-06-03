const start = document.getElementById('start');
const lap = document.getElementById('lap');
const reset = document.getElementById('reset');
const sec = document.getElementById('sec');
const min = document.getElementById('min');
const hr = document.getElementById('hr');
const msec = document.getElementById('msec');
const ul = document.getElementById('lap-ul');
const bg = document.getElementsByClassName('outer-layer')[0];

const toggleButton = () => {
    lap.classList.remove("hidden");
    reset.classList.remove("hidden");
}

let isStart = false;

let msecCount = 0;
let secCount = 0;
let minCount = 0;
let hrCount = 0;
let m;
let h;
let s;
let ms;
let isReset = false;

const startFunction = () => {
    if(!isStart && !isReset) {
        start.innerHTML = 'Stop';
        bg.classList.add('animation-bg');
        h = setInterval(() => {
            hr.innerHTML = `${++hrCount}`;
        }, 60 * 60 * 1000);
        m = setInterval(() => {
            if(minCount === 60) {
                minCount = 0;
            }
            min.innerHTML = `${++minCount}`;
            }, 60 * 1000);
        s = setInterval(() => {
            if(secCount === 60) {
                secCount = 0;
            }
            sec.innerHTML = `${++secCount}`;
        }, 1000);
        ms = setInterval(() => {
            if(msecCount === 100) {
                msecCount = 0;
            }
            msec.innerHTML = `${++msecCount}`;
        }, 10);
        isStart = true;
        isReset = true;
    } else {
        start.innerHTML = 'Start';
        clearInterval(h);
        clearInterval(m);
        clearInterval(s);
        clearInterval(ms);
        isStart = false;
        isReset = false;
        bg.classList.remove('animation-bg');
        lap.classList.add("hidden");
    }
    toggleButton();
}



let lapItem = 0;

const lapFunction = () => {
    const li = document.createElement('li');
    const number = document.createElement('span');
    const timeStamp = document.createElement('span');
    
    li.setAttribute('class', 'lap-item');
    number.setAttribute('class', 'number');
    timeStamp.setAttribute('class', 'time-stamp');

    number.innerHTML = `#${++lapItem}`;

    timeStamp.innerHTML = `${hrCount}:${minCount}:${secCount}:${msecCount}`;
    li.append(number, timeStamp);
    ul.append(li);
}

const resestFunction = () => {
    isReset = true;
    startFunction();
    lap.classList.add("hidden");
    hr.innerText = '00';
    min.innerText = '00';
    sec.innerText = '00';
    msec.innerText = '00';
    ul.innerHTML = '';
}

lap.addEventListener('click', lapFunction);
reset.addEventListener('click', resestFunction);
start.addEventListener('click', startFunction);
