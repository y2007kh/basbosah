    const lastLine = document.querySelector(".poem span:last-child");
    const audioArea = document.getElementById("audioArea");

    lastLine.addEventListener("animationend", () => {
        audioArea.classList.add("show");
    });
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");

playBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
};

audio.ontimeupdate = () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
};

progress.oninput = () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
};
﻿function playAndGo(soundId, btn) {
    const sound = document.getElementById(soundId);

    // تأثير الفراشات
    butterflies(
        btn.getBoundingClientRect().left + btn.offsetWidth / 2,
        btn.getBoundingClientRect().top + btn.offsetHeight / 2
    );

    // إعادة الصوت من الأول
    sound.currentTime = 0;
    sound.play();

    // اهتزاز موبايل (اختياري)
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }

    // لما الصوت يخلص → انتقال
    sound.onended = () => {
        location.href = "page3.html";
    };
}
