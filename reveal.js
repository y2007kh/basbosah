const truths = [
   "يمكن اكون اقتحمت حياتك فـ فتره صعبه",
   "والفتره دي لسا مكمله لحد دلوقتي وباين جدا انها لسا مأثره عليكي ",
   "ودلوقتي بحاول بكل ما املك اني اعملك حاجه ترسم بس الضحكه علـي وشك ",
   "مش عارف اوصفلك ازاي فرحتي لما بلاقي ابتسامتك علي وشكـ مبالك بقا لما بلاقيكي فرحانه",
   "بسأل نفسي ديما لي انا عارف دا كلو ومحاولتش اساعدكـ ",
  "عارف إن اللي حواليكي ضغطينكـ…<br>بس مش كل ضغط لازم يتشاف علشان يتحس",

  "وعارف إن في ناس مشيو من حياتك<br>سابوا أثر تقيل جواكي",

  "مش محتاج أعرف التفاصيل<br>علشان احس بيكي ",

  "وفي لحظات كنتي محتاجة حد يسمع<br>مش يحكم عليكي ويأنب ضميركـ",
  "ولما ملقيتيش حد يفهمك واتخذلتي اكتر من مره ",
  "دمعتكـ نزلت  ",
  "أنا عرفت الحاجات دي<br>مش علشان أقرّب منكـ بس",

  "عرفتها علشان كنت فاكر اني هكون <br>المكان الامن اللي تجري عليه",

  "ولو في يوم حبيتي تسألي: إزاي؟<br>ابقي اسألي وناا عمري مهتردد اني اقولكـ ",

  "بس دلوقتي المهم إنكـ تعرفي<br>إني بطلت افضل ادور وراكي <br>مبقتش عاوز اعرف حاجه عنكـ الا منكـ دلوقتي ",

"وياريت تسامحيني علي اي حاجه عرفتها عنكـ مكنتيش عاوزاني اعرفها  ",

  "أنا هنا علشان ما تحسيش إنك لوحدكـ<br>حتى وإنتي ساكتة",
". . ."
];

let index = 0;

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

window.onload = () => {
    setTimeout(() => {
        document.getElementById("truthBox").classList.add("show");
    }, 400);
};

function revealTruth() {
    const box = document.getElementById("truthBox");

    if (index >= truths.length) return;

    box.classList.remove("show");

    setTimeout(() => {
        box.innerHTML = truths[index];
        box.classList.add("show");
        index++;
        if (index === truths.length) {
            index = 0; // 🔁 يرجع لأول جملة
        }

    }, 300);
}

