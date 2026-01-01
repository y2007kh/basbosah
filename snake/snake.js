const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ================== الإعدادات ==================
const grid = 20;
let speed = 120;
let gameInterval = null;
let gameRunning = false;
let wrapMode = false; // false = يموت عند الحواف | true = يتنقل
let isPaused = false; // حالة اللعبة (موقفة أو شغالة)


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

// ================== الرسالة جنب السكور ==================
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
    if (score === 0) return " 🤔 اي الاسكور دا التعبان مات وهو جعان";
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
    if (score < 35) return "💪 أداء تحفة ";
    if (score < 40) return "ايوا بقي العزيمه والاصرار";
    if (score < 45) return "فيه مفاجاه مستنياكي";
    if (score < 50) return "💪 قربتي ";
    if (score === 50) return "😩بــموت فـيكـي ";
    if (score === 51) return "عندكـ عيون احلي من عيون الموناليزااا";
    if (score < 60) return "بحـبك يا بـسبوستـي";
    if (score === 66) return "شكرا انكـ وصلتي لحد هنا وفعلا تستحقي انكـ تاخدي قلبي , اه صح نسيت ان هوا معاكي خلي بالكـ منو بقـي"
    return "مستوى رهيب 👑 واضح إنك مميزة فعلا";
}

// ================== توليد أكل ذكي ==================
function generateFood() {
    let valid = false;
    while(!valid){
        food.x = Math.floor(Math.random() * (canvas.width / grid)) * grid;
        food.y = Math.floor(Math.random() * (canvas.height / grid)) * grid;

        valid = true;
        for(let part of snake){
            if(part.x === food.x && part.y === food.y){
                valid = false;
                break;
            }
        }
    }
}

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


// ================== شاشة البداية ==================
function startGame() {
    startSound.play();
    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("speedScreen").classList.remove("hidden");
}

// ================== اختيار السرعة وبدء اللعب ==================
function setSpeedAndStart(level){
    if (level === "slow") {
        speed = 150;
        wrapMode = false;
    }

    if (level === "normal") {
        speed = 120;
        wrapMode = false;
    }

    if (level === "fast") {
        speed = 100;       // سرعة مناسبة
        wrapMode = true;  // تفعيل الانتقال
    }

    document.getElementById("speedScreen").classList.add("hidden");
    document.getElementById("gameContainer").classList.remove("hidden");
    document.getElementById("controls").classList.remove("hidden");

    resetGame();
    gameRunning = true;
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, speed);
}

// ================== اللوب الرئيسي ==================
function gameLoop() {
    if(!gameRunning) return;

    ctx.fillStyle = "#9acd32";
    ctx.fillRect(0,0,canvas.width, canvas.height);

let head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
};

if (wrapMode) {
    // ====== Teleport Mode (FAST) ======
    if (head.x >= canvas.width)  head.x = 0;
    if (head.x < 0)              head.x = canvas.width - grid;
    if (head.y >= canvas.height) head.y = 0;
    if (head.y < 0)              head.y = canvas.height - grid;
} else {
    // ====== Normal / Slow ======
    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= canvas.width ||
        head.y >= canvas.height
    ) {
        endGame();
        return;
    }
}

snake.unshift(head);


    if (isEating(head, food)) {

        score++;
        eatSound.currentTime = 0;
        eatSound.play();
        document.getElementById("score").innerText = "النقاط: " + score;

        generateFood();
        showScoreMessage();
    } else {
        snake.pop();
    }
    
// 5) افحص الاصطدام بالنفس (بعد الأكل)
for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
        endGame();
        return;
    }
}
        // أكل
    function isEating(head, food) {
    return head.x === food.x && head.y === food.y;
}
    // رسم الأكل
  ctx.fillStyle = "#ff4757";
ctx.shadowColor = "#ff6b81";
ctx.shadowBlur = 8;
ctx.fillRect(food.x, food.y, grid, grid);
ctx.shadowBlur = 0;
    // رسم التعبان (نوكيا)
    snake.forEach((part, i) => {
        ctx.fillStyle = i===0 ? "#0b6623" : "#1e8f3e";
        ctx.fillRect(part.x, part.y, grid, grid);
        ctx.strokeStyle = "#0a3d1c";
        ctx.strokeRect(part.x, part.y, grid, grid);
    });

//function enterFullscreen() {
  //  const el = document.documentElement;

    //if (el.requestFullscreen) {
    //    el.requestFullscreen();
    //} else if (el.webkitRequestFullscreen) { // Safari
      //  el.webkitRequestFullscreen();
    //} else if (el.msRequestFullscreen) { // قديم
      //  el.msRequestFullscreen();
   // }
//}

// ================== عرض الفراشات ==================
    function showButterflies() {
    const count = Math.min(6 + Math.floor(score / 4), 30); // زيادة مع السكور
    const gameOverBox = document.querySelector("#gameOverScreen");
    const boxRect = gameOverBox.getBoundingClientRect(); // تحديد موقع البوكس

    for (let i = 0; i < count; i++) {
        const b = document.createElement("div");
        b.className = "butterfly";

        // تحديد بداية ظهور الفراشة من أسفل البوكس
        b.style.left = Math.random() * (boxRect.width) + boxRect.left + "px";  // تحديد مكان عرض الفراشة
        b.style.top = boxRect.bottom + "px";  // وضع الفراشة أسفل البوكس

        b.style.animationDelay = (Math.random() * 2) + "s";  // تأخير حركة الفراشة بشكل عشوائي

        document.body.appendChild(b);

        // إزالة الفراشة بعد اكتمال الحركة
        setTimeout(() => b.remove(), 5000);
    }
}


// ================== نهاية اللعبة ==================
function endGame(){
    gameRunning = false;
    clearInterval(gameInterval);
    gameOverSound.play();
    
    // عرض رسالة Game Over
    const message = getSupportMessage(score);
    document.getElementById("finalScore").innerText = `النقاط: ${score}`;
    document.querySelector("#gameOverScreen p").innerText = message;

    // إخفاء الشاشة الأصلية وعرض شاشة Game Over
    document.getElementById("gameOverScreen").style.display = "block";
    document.getElementById("controls").classList.add("hidden");
    document.getElementById("gameOverScreen").classList.remove("hidden");
    showButterflies();
}

// ================== إعادة التشغيل ==================
function restartGame(){
    document.getElementById("gameOverScreen").classList.add("hidden");
    document.getElementById("gameContainer").classList.add("hidden");
    document.getElementById("controls").classList.add("hidden");
    document.getElementById("speedScreen").classList.remove("hidden");
}

// ================== إعادة ضبط ==================
function resetGame(){
    snake = [{ x: 8*grid, y: 8*grid }];
    dx = grid;
    dy = 0;
    score = 0;
    document.getElementById("score").innerText = "النقاط: 0";
    showScoreMessage();
    generateFood();
}

function closeGameIframe() {
    location.href = "../game.html";
}

['up-btn','down-btn','left-btn','right-btn'].forEach(id => {
    document.getElementById(id).addEventListener('touchstart', e => {
        e.preventDefault();
        if (id === 'up-btn') moveUp();
        if (id === 'down-btn') moveDown();
        if (id === 'left-btn') moveLeft();
        if (id === 'right-btn') moveRight();
    }, { passive: false });
    
});
document.getElementById('center-btn').addEventListener('click', () => {
    if (isPaused) {
        // إذا كانت اللعبة موقفة، نكملها
        isPaused = false;
        gameInterval = setInterval(gameLoop, speed); // استئناف اللوب
    } else {
        // إذا كانت اللعبة شغالة، نوقفها
        isPaused = true;
        clearInterval(gameInterval); // إيقاف اللوب
    }
});

// ================== التحكم ==================
window.addEventListener("keydown", e=>{
    if(e.key === "ArrowLeft" && dx ===0){ dx=-grid; dy=0; }
    if(e.key === "ArrowUp" && dy===0){ dx=0; dy=-grid; }
    if(e.key === "ArrowRight" && dx===0){ dx=grid; dy=0; }
    if(e.key === "ArrowDown" && dy===0){ dx=0; dy=grid; }
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

document.addEventListener("touchend", function (e) {
    const touch = e.changedTouches[0];
    const dxSwipe = touch.clientX - touchStartX;
    const dySwipe = touch.clientY - touchStartY;

    // تجاهل السحب القصير
    if (Math.abs(dxSwipe) < swipeThreshold && Math.abs(dySwipe) < swipeThreshold) {
        return;
    }

    // تحديد الاتجاه
    if (Math.abs(dxSwipe) > Math.abs(dySwipe)) {
        // أفقي
        if (dxSwipe > 0 && dx === 0) {
            moveRight();
        } else if (dxSwipe < 0 && dx === 0) {
            moveLeft();
        }
    } else {
        // رأسي
        if (dySwipe > 0 && dy === 0) {
            moveDown();
        } else if (dySwipe < 0 && dy === 0) {
            moveUp();
        }
    }
}, { passive: true });








