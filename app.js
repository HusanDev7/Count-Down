const loading = document.querySelector(".loading");
const enterBox = document.querySelector(".enter-box");

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

const rollCounter = (element, targetValue, callback) => {
    let currentValue = 0;
    const interval = setInterval(() => {
        currentValue++;
        element.textContent = formatTime(currentValue);
        if (currentValue >= targetValue) {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 50);
};

const startCountdown = () => {
    const randomYears = Math.floor(Math.random() * 100);
    const randomDays = Math.floor(Math.random() * 101);
    const randomHours = Math.floor(Math.random() * 24);
    const randomMinutes = Math.floor(Math.random() * 60);
    const randomSeconds = Math.floor(Math.random() * 60);

    const countYears = document.querySelector(".count-yers");
    const countDays = document.querySelector(".count-days");
    const countHours = document.querySelector(".count-hours");
    const countMinutes = document.querySelector(".count-minuts");
    const countSeconds = document.querySelector(".count-second");

    rollCounter(countYears, randomYears, () => {
        rollCounter(countDays, randomDays, () => {
            rollCounter(countHours, randomHours, () => {
                rollCounter(countMinutes, randomMinutes, () => {
                    rollCounter(countSeconds, randomSeconds, startActualCountdown);
                });
            });
        });
    });
};

const startActualCountdown = () => {
    const countYears = parseInt(document.querySelector(".count-yers").textContent);
    const countDays = parseInt(document.querySelector(".count-days").textContent);
    const countHours = parseInt(document.querySelector(".count-hours").textContent);
    const countMinutes = parseInt(document.querySelector(".count-minuts").textContent);
    const countSeconds = parseInt(document.querySelector(".count-second").textContent);

    const targetDate = new Date();
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

        if (timeLeft <= 0) {
            clearInterval(timer);
        }
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
