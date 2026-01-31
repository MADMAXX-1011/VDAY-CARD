// Create floating hearts
const heartsContainer = document.getElementById('heartsContainer');
const heartSymbols = ['💕', '💖', '🩷 ', '💝', '💓'];

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 13000);
}

// Create hearts at intervals
setInterval(createHeart, 500);

// Create initial hearts
for (let i = 0; i < 15; i++) {
    setTimeout(createHeart, i * 200);
}

// Interactive button logic
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const buttonContainer = document.getElementById('buttonContainer');
const responseMessage = document.getElementById('responseMessage');

// Yes button - heart explosion
yesButton.addEventListener('click', function() {
    buttonContainer.style.display = 'none';
    responseMessage.style.display = 'block';
    responseMessage.innerHTML = '🩷 I LOVE YOU!🩷 ';
    
    // Create massive heart explosion
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createExplosionHeart();
        }, i * 30);
    }

    // Add confetti effect
    createConfetti();
});

function createExplosionHeart() {
    const heart = document.createElement('div');
    heart.className = 'explosion-heart';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 300 + 200;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    
    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
    heart.style.setProperty('--tx', tx + 'px');
    heart.style.setProperty('--ty', ty + 'px');
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

function createConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ff69b4', '#db7093'];
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 20);
    }
}

// No button - runs away
let noClickCount = 0;
noButton.addEventListener('mouseenter', function() {
    const container = document.querySelector('.letter-container');
    const containerRect = container.getBoundingClientRect();
    const buttonRect = noButton.getBoundingClientRect();
    
    const maxX = containerRect.width - buttonRect.width - 10;
    const maxY = containerRect.height - buttonRect.height - 10;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    noButton.style.position = 'fixed';
    noButton.style.left = newX + 'px';
    noButton.style.top = newY + 'px';
    
    noClickCount++;
    
    // Make yes button bigger each time
    const currentSize = 16 + (noClickCount * 2);
    yesButton.style.fontSize = currentSize + 'px';
    yesButton.style.padding = (12 + noClickCount * 2) + 'px ' + (30 + noClickCount * 4) + 'px';
    
    // Change no button text
    const noTexts = ['No', 'SURE KABA!?', 'WEH?', 'SERYOSO BA?!', 'PLEASE? UWU', 'CLICK YES PLEAAASEE', '🥺'];
    if (noClickCount < noTexts.length) {
        noButton.textContent = noTexts[noClickCount];
    }
});

// Just in case they click the No button
noButton.addEventListener('click', function() {
    alert('Oops! The button ran away! Maybe try the YES button? 😊');
});
