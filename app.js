const loading = document.querySelector(".loading");

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        loading.style.opacity = "0";
        loading.style.pointerEvents = "none";
    }, 3000);

    const savedTargetDate = localStorage.getItem('targetDate');
    if (savedTargetDate) {
        startTimer(new Date(savedTargetDate));
    } else {
        startCountdown();
    }
});

const formatTime = (time) => {
    return time < 10 ? `0${time}` : time.toString();
};

const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max);
};

const startCountdown = () => {
    const randomYears = getRandomNumber(100);
    const randomDays = getRandomNumber(100);
    const randomHours = getRandomNumber(24);
    const randomMinutes = getRandomNumber(60);
    const randomSeconds = getRandomNumber(60);

    const counters = [
        { element: document.querySelector(".count-yers"), target: randomYears },
        { element: document.querySelector(".count-days"), target: randomDays },
        { element: document.querySelector(".count-hours"), target: randomHours },
        { element: document.querySelector(".count-minuts"), target: randomMinutes },
        { element: document.querySelector(".count-second"), target: randomSeconds }
    ];

    rollCounters(counters);
};

const rollCounters = (counters) => {
    let index = 0;
    const rollNextCounter = () => {
        if (index >= counters.length) {
            startActualCountdown();
            return;
        }

        const { element, target } = counters[index];
        let currentValue = 0;
        const interval = setInterval(() => {
            currentValue++;
            element.textContent = formatTime(currentValue);
            if (currentValue >= target) {
                clearInterval(interval);
                index++;
                rollNextCounter();
            }
        }, 50);
    };

    rollNextCounter();
};

const startActualCountdown = () => {
    const countYears = parseInt(document.querySelector(".count-yers").textContent);
    const countDays = parseInt(document.querySelector(".count-days").textContent);
    const countHours = parseInt(document.querySelector(".count-hours").textContent);
    const countMinutes = parseInt(document.querySelector(".count-minuts").textContent);
    const countSeconds = parseInt(document.querySelector(".count-second").textContent);

    let targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() + countYears);
    targetDate.setDate(targetDate.getDate() + countDays);
    targetDate.setHours(targetDate.getHours() + countHours);
    targetDate.setMinutes(targetDate.getMinutes() + countMinutes);
    targetDate.setSeconds(targetDate.getSeconds() + countSeconds);

    localStorage.setItem('targetDate', targetDate);

    startTimer(targetDate);
};

const startTimer = (targetDate) => {
    const timer = setInterval(() => {
        const now = new Date();
        const timeLeft = new Date(targetDate) - now;

        if (timeLeft <= 0) {
            clearInterval(timer);
            return;
        }

        let secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
        let minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let yearsLeft = Math.floor(daysLeft / 365);
        daysLeft = daysLeft % 365;

        document.querySelector(".count-yers").textContent = formatTime(yearsLeft);
        document.querySelector(".count-days").textContent = formatTime(daysLeft);
        document.querySelector(".count-hours").textContent = formatTime(hoursLeft);
        document.querySelector(".count-minuts").textContent = formatTime(minutesLeft);
        document.querySelector(".count-second").textContent = formatTime(secondsLeft);
    }, 1000);
};

document.addEventListener("DOMContentLoaded", () => {
    const savedTargetDate = localStorage.getItem('targetDate');
    if (savedTargetDate) {
        startTimer(new Date(savedTargetDate));
    } else {
        startCountdown();
    }
});
