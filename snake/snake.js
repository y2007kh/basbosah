const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ================== الإعدادات ==================
const grid = 20;
let speed = 120;
let gameInterval = null;
let gameRunning = false;

// ================== التعبان ==================
let snake = [];
let dx = grid;
let dy = 0;

// ================== الأكل ==================
let food = { x: 0, y: 0 };

// ================== النقاط ==================
let score = 0;

// ================== الأصوات ==================
const eatSound = new Audio("beep.mp3");
const gameOverSound = new Audio("gameover.mp3");
const startSound = new Audio("start.mp3");



// الرسالة جنب السكور
function showScoreMessage() {
    const msg = document.getElementById("scoreMessage");
    if(score >= 50) {
        msg.innerText = "بحبك !";
        msg.style.display = "inline";
    } else {
        msg.style.display = "none";
    }
}
// ================== رسائل الدعم ==================
function getSupportMessage(score) {
    if (score === 0) {
        return "🐍 منك لله يشيخه موتي التعبان ";
    }
    if (score === 1) return "😉🫶🏻 بوسي واحده بس ";
    if (score === 5) return "😍 د اليوم اللي اتولدت فيه بسبوسه ";
    if (score < 5) return "🤍 خطوات صغيرة، بس في الاتجاه الصح ";
    if (score === 8) return " 🤔 ده الشهر اللي انا اتولدت فيه";
    if (score < 10) return " 👏واضح إنك بتتعلمي وبتحاولي";
    if (score === 10) return "😍 ده الشهر اللي اتولدت فيه بسبوسة";
    if (score === 16) return "ده اليوم اللي انا اتولدت فيه .";
    if (score < 20) return "✨ تركيزك عالي… كمّلي كده ";
    if (score === 25) return "5×5=كام؟";
    if (score < 25) return "بيقولو ان اللي بيوصل لل 66 بيلاقي كنز ";
    if (score < 35) return "💪عاش اوي عقبال ما توصليى  ";
    if (score < 40) return "ايوا بقي العزيمه والاصرار";
    if (score < 45) return "فيه مفاجاه مستنياكي";
    if (score < 50) return "💪 قربتي ";
    if (score === 50) return "😩بــموت فـيكـي ";
    if (score === 51) return "عندكـ عيون احلي من عيون الموناليزااا";
    if (score < 60) return "بحـبك يا بـسبوستـي";
    if (score === 66) return "شكرا انكـ وصلتي لحد هنا وفعلا تستحقي انكـ تاخدي قلبي , اه صح نسيت ان هوا معاكي خلي بالكـ منو بقـي";
    return "مستوى رهيب 👑 واضح إنك مميزة فعلا";
}
// ================== توليد أكل ذكي ==================
function generateFood() {
    let valid = false;

    while (!valid) {
        food.x = Math.floor(Math.random() * (canvas.width / grid)) * grid;
        food.y = Math.floor(Math.random() * (canvas.height / grid)) * grid;

        valid = true;
        for (let part of snake) {
            if (part.x === food.x && part.y === food.y) {
                valid = false;
                break;
            }
        }
    }
}

// ================== شاشة البداية ==================
function startGame() {
    startSound.play();
    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("speedScreen").classList.remove("hidden");
}

// ================== اختيار السرعة وبدء اللعب ==================
function setSpeedAndStart(level) {
    if (level === "slow") speed = 150;
    if (level === "normal") speed = 120;
    if (level === "fast") speed = 80;

    document.getElementById("speedScreen").classList.add("hidden");
    document.getElementById("gameContainer").classList.remove("hidden");

    resetGame();
    gameRunning = true;

    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, speed);
}

// ================== اللوب الرئيسي ==================
function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };
    snake.unshift(head);

    // أكل
    if (head.x === food.x && head.y === food.y) {
        score++;
        eatSound.currentTime = 0;
        eatSound.play();
        document.getElementById("score").innerText = "النقاط: " + score;
        generateFood();
    } else {
        snake.pop();
    }

    // رسم الأكل
    ctx.fillStyle = "#000";
    ctx.fillRect(food.x, food.y, grid, grid);

    // رسم التعبان (نوكيا)
    snake.forEach((part, i) => {
        ctx.fillStyle = i === 0 ? "#0b6623" : "#1e8f3e";
        ctx.fillRect(part.x, part.y, grid, grid);
        ctx.strokeStyle = "#0a3d1c";
        ctx.strokeRect(part.x, part.y, grid, grid);
    });

    // اصطدام بالحواف
    if (
        head.x < 0 || head.y < 0 ||
        head.x >= canvas.width || head.y >= canvas.height
    ) {
        endGame();
    }

    // اصطدام بالنفس
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}
function showButterflies() {
    // كل 5 نقاط = فراشة زيادة (حد أقصى 20)
    const count = Math.min(6 + Math.floor(score / 4), 30);

    for (let i = 0; i < count; i++) {
        const b = document.createElement("div");
        b.className = "butterfly";

        // متغير عشوائي للحركة يمين/شمال
        b.style.setProperty("--x", Math.random());

        b.style.left = Math.random() * window.innerWidth + "px";
        b.style.top = window.innerHeight - 80 + "px";
        b.style.animationDelay = (Math.random() * 2) + "s";

        document.body.appendChild(b);

        setTimeout(() => {
            b.remove();
        }, 5000);
    }
}

// ================== نهاية اللعبة ==================
function endGame() {
    gameRunning = false;
    clearInterval(gameInterval);
    gameOverSound.play();

    const message = getSupportMessage(score);

    document.getElementById("finalScore").innerText = score;
    document.querySelector("#gameOverScreen p").innerText = message;

    document.getElementById("gameOverScreen").classList.remove("hidden");
    showButterflies();
}

// ================== إعادة التشغيل ==================
function restartGame() {
    document.getElementById("gameOverScreen").classList.add("hidden");
    document.getElementById("gameContainer").classList.add("hidden");
    document.getElementById("speedScreen").classList.remove("hidden");
}

// ================== إعادة ضبط ==================
function resetGame() {
    snake = [{ x: 8 * grid, y: 8 * grid }];
    dx = grid;
    dy = 0;
    score = 0;
    document.getElementById("score").innerText = "النقاط: 0";
    generateFood();
}
function closeGameIframe() {
    location.href = "../game.html";
}
// ================== التحكم ==================
window.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" && dx === 0) { dx = -grid; dy = 0; }
    if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -grid; }
    if (e.key === "ArrowRight" && dx === 0) { dx = grid; dy = 0; }
    if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = grid; }
});
/* ================== Swipe Controls (Mobile) ================== */
let touchStartX = 0;
let touchStartY = 0;
const swipeThreshold = 30; // أقل مسافة للسحب

document.addEventListener("touchstart", function (e) {
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
}, { passive: true });


function moveUp() {
    if (dy === 0) { dx = 0; dy = -grid; }
}
function moveDown() {
    if (dy === 0) { dx = 0; dy = grid; }
}
function moveLeft() {
    if (dx === 0) { dx = -grid; dy = 0; }
}
function moveRight() {
    if (dx === 0) { dx = grid; dy = 0; }
}
document.addEventListener("touchend", function (e) {
    const touch = e.changedTouches[0];
    const dxSwipe = touch.clientX - touchStartX;
    const dySwipe = touch.clientY - touchStartY;

    if (Math.abs(dxSwipe) < swipeThreshold && Math.abs(dySwipe) < swipeThreshold) {
        return;
    }

    if (Math.abs(dxSwipe) > Math.abs(dySwipe)) {
        if (dxSwipe > 0 && dx === 0) moveRight();
        else if (dxSwipe < 0 && dx === 0) moveLeft();
    } else {
        if (dySwipe > 0 && dy === 0) moveDown();
        else if (dySwipe < 0 && dy === 0) moveUp();
    }
}, { passive: true });
