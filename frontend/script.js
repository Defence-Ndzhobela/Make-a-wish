// Images Configuration
const images = [
    '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', 
    '7.jpeg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg'
];

// Bio Text Configuration with Keywords mapping
const bioText = `Pips is a determined young tech builder who is turning curiosity into skill. He’s someone who didn’t always love programming, but now finds real enjoyment in creating websites, solving errors, integrating systems, and understanding how things work behind the scenes. He thinks beyond just coding — he thinks about business, money, growth, and long-term career moves.

Pips is also reflective and self-aware; he questions himself, improves his communication, and wants to become better every day. He mixes ambition with learning, creativity with logic. In simple words, Pips is not just learning tech — he is slowly becoming a {professional} in it.`;

const bioKeywords = {
    "tech": "highlight-tech",
    "Forex": "highlight-forex",
    "Cybersecurity": "highlight-cyber",
    "Growth": "highlight-professional",
    "Professional": "highlight-professional",
    "professional": "highlight-professional"
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Attempt audio immediately (might be blocked by browser policy)
    startAIVoice();
    
    // Fallback: Add a one-time click listener to whole document to ensure audio starts if blocked
     document.body.addEventListener('click', () => {
        if(!window.voiceStarted) {
            window.voiceStarted = true;
            startAIVoice();
            // playSynthBirthday();
        }
    }, { once: true });

    initLoader();
    initClock();
    initParticles();
    createFloatingIcons();
});

// --- Loader System ---
function initLoader() {
    const progress = document.querySelector('.progress');
    const countdown = document.getElementById('countdown');
    const screen = document.getElementById('intro-screen');
    let width = 0;

    const interval = setInterval(() => {
        width += Math.random() * 5;
        if (width > 100) width = 100;
        progress.style.width = width + '%';
        
        if (width >= 100) {
            clearInterval(interval);
            countdown.innerText = "SYSTEM READY // CLICK TO INITIALIZE";
            countdown.style.cursor = "pointer";
            countdown.style.textShadow = "0 0 10px #0f0";
            
            // Wait for user interaction to bypass browser autoplay policies
            const startHandler = () => {
                document.removeEventListener('click', startHandler);
                screen.style.opacity = '0';
                setTimeout(() => {
                    screen.style.display = 'none';
                    startMainExperience();
                }, 1000);
            };
            
            document.addEventListener('click', startHandler);
        } else {
            countdown.innerText = `Loading System Modules... ${Math.floor(width)}%`;
        }
    }, 50);
}

function startMainExperience() {
    startAIVoice(); // "Jarvis" Voice
    triggerConfetti();
    initTyping();
    initStats();
    initMatrixRain();
    initCarousel();
    startAutoScrollSequence();
    // playSynthBirthday(); 

    // Recurring Celebration Balloons (Every 4 seconds)
    setInterval(() => {
        createFloatingStickers();
    }, 4000);
}

// --- AI Voice (Web Speech API) ---
function speakText(text) {
    if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance();
        msg.text = text;
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => voice.name.includes("Google US English") || voice.name.includes("David") || voice.name.includes("Samantha"));
        if (preferredVoice) msg.voice = preferredVoice;
        msg.rate = 1.0;
        msg.pitch = 0.9;
        msg.volume = 1.0;
        window.speechSynthesis.speak(msg);
    }
}

function startAIVoice() {
    window.speechSynthesis.cancel(); // Clear any existing speech
    if ('speechSynthesis' in window) {
        // Ensure voice load (Chrome sometimes needs explicit getVoices)
        let voices = window.speechSynthesis.getVoices();
        
        const speakIntro = () => {
            const msg = new SpeechSynthesisUtterance();
            msg.text = "Welcome, Agent Pips. System initialized. Initiating Birthday Celebration Protocol. All systems nominal. Accessing future trajectory. Stand by.";
            
            // Re-fetch voices inside execution to be sure
            const currentVoices = window.speechSynthesis.getVoices();
            const preferredVoice = currentVoices.find(voice => voice.name.includes("Google US English") || voice.name.includes("David") || voice.name.includes("Samantha"));
            
            if (preferredVoice) msg.voice = preferredVoice;
            msg.rate = 1.0;
            msg.pitch = 0.9;
            msg.volume = 1.0;
            window.speechSynthesis.speak(msg);
        };

        if (voices.length === 0) {
            // Wait for voices to load
            window.speechSynthesis.onvoiceschanged = () => {
                 window.speechSynthesis.onvoiceschanged = null; // Remove listener to prevent loops
                 speakIntro();
            };
        } else {
            speakIntro();
        }
    }
}

// --- Achievements ---
function triggerAchievement(title, desc, icon="🏆") {
    const container = document.getElementById('achievement-container');
    const el = document.createElement('div');
    el.className = 'achievement-popup';
    el.innerHTML = `
        <div class="achievement-icon">${icon}</div>
        <div class="achievement-text">
            <span class="ach-title">${title}</span>
            <span class="ach-desc">${desc}</span>
        </div>
    `;
    
    // Sound effect for achievement (Xbox style bleep)
    // Reusing oscillator logic briefly
    playAchievementSound();

    container.appendChild(el);
    
    // Remove after 4 seconds
    setTimeout(() => {
        el.style.animation = "fadeOutRight 0.5s ease-in forwards";
        setTimeout(() => el.remove(), 600);
    }, 4000);
}

function playAchievementSound() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    }
}


// --- Auto Scroll / Presentation Mode ---
function startAutoScrollSequence() {
    // Total duration approx 30 seconds to cover all sections
    const totalDuration = 30000; 
    
    // Timeline of events (in milliseconds from start of main experience)
    const timeline = [
        // Wait 5 seconds on the Hero/Title page before starting
        { time: 5000, target: '.bio-section', action: 'ach_welcome' }, 
        
        // Voice Narration
        { time: 6000, target: '.bio-section', action: 'voice_bio' }, // +1s

        { time: 7000, target: '.bio-section', action: null }, 
        
        { time: 13000, target: '.stats-section', action: 'ach_stats' }, // +6s from bio start
        { time: 14000, target: null, action: 'voice_stats' }, 

        { time: 18000, target: '.gallery-section', action: 'ach_gallery' }, // +4s from stats 
        { time: 19000, target: null, action: 'voice_gallery' }, 

        { time: 26000, target: '.cake-section', action: 'blowCandle' }, // +8s from gallery
        { time: 27000, target: null, action: 'voice_cake' }, 

        { time: 33000, target: '.future-section', action: 'revealFuture' }, // +7s from cake
        { time: 34000, target: null, action: 'voice_future' }, 
        
        // --- FAST RECAP / FINALE ---
        { time: 43000, target: 'header', action: 'recapStart' }, 
        { time: 45000, target: '.bio-section', action: null },
        { time: 46000, target: '.stats-section', action: null },
        { time: 47000, target: '.gallery-section', action: null },
        { time: 48000, target: '.cake-section', action: null },
        { time: 49000, target: '.future-section', action: 'grandFinale' }
    ];

    timeline.forEach(event => {
        setTimeout(() => {
            const element = event.target ? document.querySelector(event.target) : null;
            if (element) {
                // Ensure element exists before scrolling
                if(event.target !== 'header') { 
                    const offsetLeft = element.offsetLeft;
                    const scrollLeft = offsetLeft - (window.innerWidth / 2) + (element.clientWidth / 2);
                    window.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                } else {
                     window.scrollTo({ left: 0, behavior: 'smooth' });
                }
            } // Element check end (some events are just audio)
                
            // --- Action Handlers ---
            
            if (event.action === 'ach_welcome') {
                triggerAchievement("ACHIEVEMENT UNLOCKED", "Agent Pips Initialized", "🕵️‍♂️");
            }
            if (event.action === 'voice_bio') {
                speakText("Analysis complete. Pips is a determined tech builder turning curiosity into skill.");
            }

            if (event.action === 'ach_stats') {
                triggerAchievement("LEVEL UP", "Skill Analysis: EXPERT", "📶");
            }
            if (event.action === 'voice_stats') {
                speakText("Core metrics visualized. Coding, Market Strategy, and Ambition are at peak levels.");
            }

            if (event.action === 'ach_gallery') {
                    triggerAchievement("MEMORY LANE", "Legendary Moments Found", "📸");
            }
            if (event.action === 'voice_gallery') {
                speakText("Scanning memory archives. Loading legendary moments.");
            }
            
            if (event.action === 'blowCandle') {
                triggerAchievement("PARTY MODE", "Celebration Sequence Active", "🎂");
                setTimeout(() => {
                    const flame = document.getElementById('main-flame');
                    if (flame && !flame.classList.contains('blown-out')) {
                        flame.click(); 
                        if(element) {
                            const offsetLeft = element.offsetLeft;
                            const scrollLeft = offsetLeft - (window.innerWidth / 2) + (element.clientWidth / 2);
                            window.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                        }
                    }
                }, 1500); 
            }
            if (event.action === 'voice_cake') {
                speakText("Celebration sequence engaged. Make a wish, Pips.");
            }
            
            if (event.action === 'revealFuture') {
                    triggerAchievement("FUTURE SIGHT", "Millionaire Mindset Acquired", "🚀");
                setTimeout(() => {
                    const btn = document.getElementById('future-btn');
                    if (btn && btn.style.display !== 'none') {
                        btn.click(); 
                    }
                }, 1000);
            }
            if (event.action === 'voice_future') {
                speakText("Calculating future trajectory. Success probability: 100 percent. Millionaire mindset confirmed.");
            }

            if (event.action === 'recapStart') {
                    // Flash a message?
                    const msg = document.createElement('div');
                    msg.innerText = "SPEED RECAP INITIALIZED >>";
                    msg.style.position = 'fixed';
                    msg.style.top = '50%';
                    msg.style.left = '50%';
                    msg.style.transform = 'translate(-50%, -50%)';
                    msg.style.background = 'rgba(0,0,0,0.9)';
                    msg.style.color = '#00f3ff';
                    msg.style.padding = '20px';
                    msg.style.fontSize = '2rem';
                    msg.style.fontFamily = 'Orbitron, sans-serif';
                    msg.style.zIndex = '10000';
                    msg.style.border = '2px solid #00f3ff';
                    document.body.appendChild(msg);
                    setTimeout(() => msg.remove(), 1500);
                }

                if (event.action === 'grandFinale') {
                    speakText("System Overload. Party protocols running at maximum capacity. Happy Birthday. Enjoy your day. Keep hustling."); 
                    startMatrix(); // Trigger Matrix at finale
                    let bursts = 0;
                    const burstInterval = setInterval(() => {
                        triggerConfetti();
                        launchFireworks();
                        bursts++;
                        if(bursts > 5) clearInterval(burstInterval);
                    }, 500);
                }
        }, event.time);
    });
}


// --- Typing Effect ---
function initTyping() {
    const textElement = document.getElementById('typing-text');
    const bioSection = document.querySelector('.bio-section');
    
    // Intersection Observer to start typing when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bioSection.classList.add('visible');
                typeWriter(textElement, bioText);
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(bioSection);
}

function typeWriter(element, text) {
    let index = 0;
    element.innerHTML = "";
    
    function type() {
        if (index < text.length) {
            let char = text.charAt(index);
            // Simple check for keyword ending to apply formatting could be complex.
            // Instead, we type raw text then format at the end OR process word by word.
            // For smoother visual, let's process word by word approx or simple char type.
            
            element.innerHTML += char;
            index++;
            setTimeout(type, 20); // Typing Speed
        } else {
            // Post-processing to highlight keywords
            applyHighlights(element);
        }
    }
    type();
}

function applyHighlights(element) {
    let html = element.innerHTML;
    // Replace specific words with spanned versions
    // Note: Simple replace might break if words are substrings. 
    // Given the specific text, we can target specific phrases carefully.
    
    // Using a regex with word boundaries
    const targets = ["tech", "Forex", "Cybersecurity", "Growth", "Professional", "professional"];
    
    targets.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        // Map to class based on word (lowercase for mapping check)
        let className = "highlight-tech";
        
        if (word.toLowerCase().includes('cyber')) {
            className = "highlight-cyber";
            // Trigger Matrix effect immediately when this word is processed? 
            // Since this runs at end of typing, it's safer.
             setTimeout(startMatrix, 0);
             setTimeout(stopMatrix, 5000); // Stop after 5s for the keyword trigger
        }
        
        if (word.toLowerCase().includes('cyber')) className = "highlight-cyber";
        if (word.toLowerCase().includes('growth') || word.toLowerCase().includes('professional')) className = "highlight-professional";
        
        html = html.replace(regex, `<span class="${className}">$&</span>`);
    });
    
    element.innerHTML = html;
}

// --- Stats Animation ---
function initStats() {
    const statsSection = document.querySelector('.stats-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statsSection.classList.add('visible');
                document.querySelectorAll('.stat-fill').forEach(bar => {
                    const target = bar.getAttribute('data-width');
                    bar.style.width = target;
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
}

// --- Matrix Rain Effect ---
const matrixCanvas = document.getElementById('matrix-canvas');
const matrixCtx = matrixCanvas.getContext('2d');
let matrixInterval;
let matrixActive = false;

function initMatrixRain() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    startMatrix(); // Start immediately and keep running
}

function startMatrix() {
    if(matrixActive) return;
    matrixActive = true;
    matrixCanvas.style.opacity = '0.15'; // Very subtle background for readability
    
    const chars = "10ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*";
    const fontSize = 16;
    const columns = matrixCanvas.width / fontSize;
    const drops = [];
    
    for(let x=0; x<columns; x++) drops[x] = 1;
    
    function drawMatrix() {
        // Black with opacity for trail effect
        matrixCtx.fillStyle = "rgba(0, 0, 0, 0.05)";
        matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        matrixCtx.fillStyle = "#0F0"; // Green text
        matrixCtx.font = fontSize + "px monospace";
        
        for(let i=0; i<drops.length; i++) {
            const text = chars[Math.floor(Math.random()*chars.length)];
            matrixCtx.fillText(text, i*fontSize, drops[i]*fontSize);
            
            if(drops[i]*fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    matrixInterval = setInterval(drawMatrix, 30);
    
    // Stop after 8 seconds (optional, but good to not distract too long)
    // Or keep running if triggered at finale
}

function stopMatrix() {
    clearInterval(matrixInterval);
    matrixCanvas.style.opacity = '0';
    setTimeout(() => {
        matrixCtx.clearRect(0,0, matrixCanvas.width, matrixCanvas.height);
        matrixActive = false;
    }, 1000);
}


// --- Synthwave Happy Birthday Audio ---
function playSynthBirthday() {
    // Note frequencies
    const C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88, C5=523.25;
    
    // Melody: [Note, Duration(s), StartTime(s)]
    const melody = [
        [C4, 0.3, 0], [C4, 0.3, 0.4], [D4, 0.6, 0.8], [C4, 0.6, 1.6], [F4, 0.6, 2.4], [E4, 1.0, 3.2], // Happy Birthday to You
        [C4, 0.3, 4.5], [C4, 0.3, 4.9], [D4, 0.6, 5.3], [C4, 0.6, 6.1], [G4, 0.6, 6.9], [F4, 1.0, 7.7], // Happy Birthday to You
        [C4, 0.3, 9.0], [C4, 0.3, 9.4], [C5, 0.6, 9.8], [A4, 0.6, 10.6], [F4, 0.6, 11.4], [E4, 0.6, 12.2], [D4, 1.0, 13.0], // Happy Birthday Dear Pips
        [B4, 0.3, 14.5], [B4, 0.3, 14.9], [A4, 0.6, 15.3], [F4, 0.6, 16.1], [G4, 0.6, 16.9], [F4, 1.2, 17.7] // Happy Birthday to You
    ];
    
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    masterGain.gain.value = 0.15; // Low volume background
    
    melody.forEach(([freq, dur, start]) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'square'; // 8-bit sound
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        
        gain.connect(masterGain);
        osc.connect(gain);
        
        // Envelope for shorter blips
        gain.gain.setValueAtTime(0.1, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + start + dur - 0.05);
        
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + dur);
    });
}


// --- 3D Carousel ---
function initCarousel() {
    const container = document.getElementById('carousel');
    const radius = 350; // Distance from center
    const angleStep = 360 / images.length;
    let currentAngle = 0;

    // Create Image Elements
    images.forEach((src, i) => {
        const div = document.createElement('div');
        div.className = 'carousel-item';
        div.style.transform = `rotateY(${i * angleStep}deg) translateZ(${radius}px)`;
        
        const img = document.createElement('img');
        img.src = `assets/${src}`; // Assumed path
        img.alt = `Gallery Image ${i+1}`;
        // Add error handling for images
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/300x400/000000/00f3ff?text=PIPS'; 
        }

        div.appendChild(img);
        container.appendChild(div);
    });

    // Rotation Logic
    function rotateCarousel() {
        container.style.transform = `rotateY(${currentAngle}deg)`;
    }

    document.getElementById('nextBtn').addEventListener('click', () => {
        currentAngle -= angleStep;
        rotateCarousel();
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        currentAngle += angleStep;
        rotateCarousel();
    });

    // Auto rotate slowly
    setInterval(() => {
        if(!document.querySelector('.carousel-container:hover')){ // Pause on hover
            currentAngle -= 0.5; 
            rotateCarousel();
        }
    }, 50);
}


// --- Cake Interaction ---
const flame = document.getElementById('main-flame');
flame.addEventListener('click', () => {
    flame.classList.add('blown-out');
    launchFireworks();
    
    // Show stickers floating up
    createFloatingStickers();
});

function createFloatingStickers() {
    const stickers = ['🎉', '🎈', '🎈', '✨', '🎂'];
    const container = document.body;
    
    for(let i=0; i<8; i++) { // Bursts of 8 items
        const el = document.createElement('div');
        el.innerText = stickers[Math.floor(Math.random() * stickers.length)];
        el.style.position = 'fixed'; // Float over everything/everywhere
        el.style.left = Math.random() * 95 + '%'; // Using % for viewport width
        el.style.bottom = '-80px';
        el.style.fontSize = (Math.random() * 2 + 2) + 'rem';
        el.style.transition = 'all 4s ease-out';
        el.style.opacity = '1';
        el.style.zIndex = '9999';
        el.style.pointerEvents = 'none';
        
        container.appendChild(el);
        
        // Trigger animation
        setTimeout(() => {
            el.style.transform = `translate(${Math.random()*100 - 50}px, -120vh) rotate(${Math.random()*360}deg)`;
            el.style.opacity = '0';
        }, 50);

        setTimeout(() => el.remove(), 4000);
    }
}


// --- Future Reveal Button ---
const futureBtn = document.getElementById('future-btn');
const futureResult = document.getElementById('future-result');
const progressBar = document.querySelector('.future-progress-fill');
const percentage = document.querySelector('.percentage');
const finalMsg = document.querySelector('.final-msg');
const successMsg = document.querySelector('.success-msg');

futureBtn.addEventListener('click', () => {
    futureBtn.style.display = 'none';
    futureResult.style.display = 'block';
    
    // Play sound
    playSoundEffect();

    document.querySelector('.loading-bar-container').style.display = 'block';

    let width = 0;
    const interval = setInterval(() => {
        width += 1;
        progressBar.style.width = width + '%';
        percentage.innerText = width + '%';
        
        if(width >= 100) {
            clearInterval(interval);
            successMsg.style.display = 'block';
            finalMsg.classList.remove('hidden');
            triggerConfetti();
        }
    }, 30);
});

function playSoundEffect() {
    // Simple oscillator beep for "Tech" feel
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
        const audioCtx = new AudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.5);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.5);
    }
}


// --- Confetti & Fireworks (Separated Logic) ---
const fwCanvas = document.getElementById('fireworks-canvas');
const fwCtx = fwCanvas.getContext('2d');
fwCanvas.width = window.innerWidth;
fwCanvas.height = window.innerHeight;

const cfCanvas = document.getElementById('confetti-canvas');
const cfCtx = cfCanvas.getContext('2d');
cfCanvas.width = window.innerWidth;
cfCanvas.height = window.innerHeight;

let fwParticles = [];
let cfParticles = [];

function launchFireworks() {
    for (let i = 0; i < 100; i++) {
        fwParticles.push({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            alpha: 1,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }
    if (!isFwAnimating) animateFireworks();
}

let isFwAnimating = false;
function animateFireworks() {
    isFwAnimating = true;
    fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
    
    fwParticles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.alpha -= 0.02;
        
        fwCtx.globalAlpha = p.alpha;
        fwCtx.fillStyle = p.color;
        fwCtx.beginPath();
        fwCtx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        fwCtx.fill();
        
        if (p.alpha <= 0) fwParticles.splice(index, 1);
    });

    if (fwParticles.length > 0) {
        requestAnimationFrame(animateFireworks);
    } else {
        fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
        isFwAnimating = false;
    }
}

function triggerConfetti() {
    for (let i = 0; i < 150; i++) {
        cfParticles.push({
            x: window.innerWidth / 2,
            y: window.innerHeight,
            vx: (Math.random() - 0.5) * 15,
            vy: -(Math.random() * 15 + 10),
            alpha: 1,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            gravity: 0.2
        });
    }
    if (!isCfAnimating) animateConfetti();
}

let isCfAnimating = false;
function animateConfetti() {
    isCfAnimating = true;
    cfCtx.clearRect(0, 0, cfCanvas.width, cfCanvas.height);
    
    cfParticles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.99;
        
        cfCtx.fillStyle = p.color;
        cfCtx.fillRect(p.x, p.y, 8, 8);
        
        if (p.y > window.innerHeight) cfParticles.splice(index, 1);
    });
    
    if (cfParticles.length > 0) {
        requestAnimationFrame(animateConfetti);
    } else {
        cfCtx.clearRect(0, 0, cfCanvas.width, cfCanvas.height);
        isCfAnimating = false;
    }
}

// --- Utils ---
function initClock() {
    setInterval(() => {
        const now = new Date();
        document.getElementById('digital-clock').innerText = now.toLocaleTimeString();
    }, 1000);
}

function initParticles() {
    const bgCanvas = document.getElementById('particles-canvas');
    if(!bgCanvas) return;
    const bgCtx = bgCanvas.getContext('2d');
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    
    // Check if stars array exists or re-create
    // Let's keep it local to avoid global pollution unless needed
    const stars = [];
    for(let i=0; i<100; i++) {
        stars.push({
            x: Math.random() * bgCanvas.width,
            y: Math.random() * bgCanvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5
        });
    }
    
    function animateStars() {
        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        bgCtx.fillStyle = '#ffffff';
        
        // Parallax scroll factor
        const scrollY = window.scrollY;

        stars.forEach(star => {
            star.y -= star.speed;
            
            // Wrap stars vertically for continuous flow
            if(star.y < 0) star.y = bgCanvas.height;
            
            // Calculate position with parallax offset
            let renderY = star.y - (scrollY * 0.2);
            
            // Wrap the rendering position to keep screen filled during scroll
            // This ensures stars don't disappear when scrolling down
            if (renderY < 0) renderY += bgCanvas.height;
            if (renderY > bgCanvas.height) renderY -= bgCanvas.height;

            bgCtx.globalAlpha = Math.random() * 0.5 + 0.3;
            bgCtx.beginPath();
            bgCtx.arc(star.x, renderY, star.size, 0, Math.PI * 2);
            bgCtx.fill();
        });
        
        requestAnimationFrame(animateStars);
    }
    animateStars();
}

function createFloatingIcons() {
    // Icons are already in HTML, CSS handles animation.
}


// Handling Resize
window.addEventListener('resize', () => {
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
    cfCanvas.width = window.innerWidth;
    cfCanvas.height = window.innerHeight;
    
    // Resize Matrix Rain
    const mCanvas = document.getElementById('matrix-canvas');
    if(mCanvas) {
        mCanvas.width = window.innerWidth;
        mCanvas.height = window.innerHeight;
        // Re-initialize columns if needed, but simple resize is often okay for effect
    }
    
    const bgCanvas = document.getElementById('particles-canvas');
    if(bgCanvas) {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    }
});
