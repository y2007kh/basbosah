let flowerMode = "single"; // single | all
let flowerIndex = 0;


function flowers() {
    const flowerShapes = ["🌸", "🌹", "🌼", "🌷", "🌺", "💐"];
    const colors = [
        "#ff6b81",
        "#ff9f43",
        "#1dd1a1",
        "#54a0ff",
        "#f368e0",
        "#feca57"
    ];

    let shapesToShow = [];

    if (flowerMode === "single") {
        // نوع واحد جديد كل مرة
        shapesToShow = [flowerShapes[flowerIndex]];
        flowerIndex = (flowerIndex + 1) % flowerShapes.length;
        flowerMode = "all";
    } else {
        // كل الأنواع مع بعض
        shapesToShow = flowerShapes;
        flowerMode = "single";
    }

    const count = shapesToShow.length === 1 ? 15 : 35;

    for (let i = 0; i < count; i++) {
        const flower = document.createElement("div");
        flower.className = "flower";

        flower.innerText =
            shapesToShow[Math.floor(Math.random() * shapesToShow.length)];

        flower.style.color =
            colors[Math.floor(Math.random() * colors.length)];

        flower.style.left = Math.random() * window.innerWidth + "px";
        flower.style.top = -40 + Math.random() * 80 + "px";
        flower.style.fontSize = 20 + Math.random() * 25 + "px";
        flower.style.animationDuration = 2 + Math.random() * 2 + "s";

        document.body.appendChild(flower);

        setTimeout(() => flower.remove(), 4000);
    }
}

function openGame(){
    const iframe = document.getElementById("gameIframe");
    iframe.style.display = "block";
}

window.addEventListener("message", function (e) {
    if (e.data === "closeGame") {
        const iframe = document.getElementById("gameIframe");
        iframe.style.display = "none";
    }
});


function butterflies(x, y) {
    for (let i = 0; i < 8; i++) {
        let b = document.createElement("img");
        b.src = "butterfly.png"; // الفراشة بشفافية
        b.className = "butterfly";

        // البداية عند النقطة اللي ضغطت عليها
        b.style.left = x + "px";
        b.style.top = y + "px";

        document.body.appendChild(b);

        // إحداثيات الحركة العشوائية
        let moveX = Math.random() * 400 - 200; // يمين/يسار
        let moveY = Math.random() * 400 - 200; // فوق/تحت

        // حركة تدريجية
        b.animate([
            { transform: 'translate(0px, 0px)', opacity: 1 },
            { transform: `translate(${moveX}px, ${moveY}px)`, opacity: 0 }
        ], {
            duration: 2500,
            easing: 'ease-out',
            fill: 'forwards'
        });

        // إزالة الفراشة بعد الحركة
        setTimeout(() => b.remove(), 2500);
    }
}


const lastLine = document.querySelector(".poem .last-line");
const audioArea = document.getElementById("audioArea");

function showAudio() {
    audioArea?.classList.add("show");
}

// الحل الأساسي
setTimeout(showAudio, 2500);

// لو الأنيميشن اشتغلت
lastLine?.addEventListener("animationend", showAudio);
lastLine?.addEventListener("transitionend", showAudio);




function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("open");
}

const underImages = document.querySelectorAll(".under-img");

window.addEventListener("scroll", () => {
    underImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        if(rect.top < window.innerHeight * 0.85) {
            img.classList.add("show");
        }
    });
});










