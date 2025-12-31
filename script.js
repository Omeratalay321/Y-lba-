// Hedef zaman: 2026 yılbaşı
const targetTime = new Date("January 1, 2026 00:00:00").getTime();

// 1. Arkaplana Soru İşaretleri Ekleme
const container = document.getElementById('question-marks-container');
function createQuestionMark() {
    const q = document.createElement('div');
    q.className = 'question-mark';
    q.innerText = '?';
    q.style.left = Math.random() * 100 + 'vw';
    q.style.animationDuration = (Math.random() * 3 + 2) + 's';
    container.appendChild(q);
    
    setTimeout(() => { q.remove(); }, 5000);
}

let qInterval = setInterval(createQuestionMark, 200);

// 2. Geri Sayım Sayacı
const countdownElement = document.getElementById('countdown');
const giftBox = document.getElementById('gift-box');
const message = document.getElementById('surprise-message');

const timer = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetTime - now;

    // Zaman hesaplama
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    countdownElement.innerText = 
        (h < 10 ? "0"+h : h) + ":" + 
        (m < 10 ? "0"+m : m) + ":" + 
        (s < 10 ? "0"+s : s);

    // VAKİT GELDİĞİNDE (00:00:00)
    if (diff <= 0) {
        clearInterval(timer);
        clearInterval(qInterval); // Soru işareti üretimini durdur
        
        countdownElement.style.display = 'none';
        
        // Soru işaretlerini yavaşça temizle
        const allQuestions = document.querySelectorAll('.question-mark');
        allQuestions.forEach(el => el.style.opacity = '0');

        // Kutuyu aç ve mesajı göster
        setTimeout(() => {
            giftBox.innerHTML = '🎊'; 
            giftBox.classList.add('open');
            message.classList.add('show');
        }, 1000);
    }
}, 1000);
