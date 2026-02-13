document.addEventListener('DOMContentLoaded', () => {
    const heartsContainer = document.getElementById('heartsContainer');
    const introOverlay = document.getElementById('intro-overlay');
    const mainContent = document.getElementById('mainContent');
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabs = document.querySelectorAll('.tab-content');
    
    // Typewriter Elements
    const typewriterTitle = document.getElementById('typewriterTitle');
    
    // ... reasons vars ...
    const reasonBtn = document.getElementById('reasonBtn');
    const reasonText = document.getElementById('reasonText');
    const reasonGif = document.getElementById('reasonGif');
    
    // ... valentine vars ...
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');

    // 1. Floating Hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 3 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }
    setInterval(createHeart, 300);

    // 2. Cursor Trail
    document.addEventListener('mousemove', (e) => {
        const heart = document.createElement('div');
        heart.classList.add('cursor-heart');
        heart.innerHTML = Math.random() > 0.5 ? '✨' : '💖';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    });

    // Background Slideshow Logic (Removed for static background)
    // const bgSlides = document.querySelectorAll('.bg-slide');
    // ...

    // Audio Logic
    const audios = {
        home: document.getElementById('bgm-home'),
        story: document.getElementById('bgm-story'),
        reasons: document.getElementById('bgm-reasons'),
        valentine: document.getElementById('bgm-question')
    };

    function stopAllAudio() {
        Object.values(audios).forEach(audio => {
            if (!audio.paused) {
                audio.pause();
            }
        });
    }

    // Force Loop Manually (Backup for 'loop' attribute)
    Object.values(audios).forEach(audio => {
        if(audio) {
            audio.addEventListener('ended', () => {
                audio.currentTime = 0;
                audio.play();
            });
        }
    });

    function playAudio(tabId) {
        stopAllAudio();
        if (audios[tabId]) {
            audios[tabId].play().catch(e => console.log("Audio play failed:", e));
        }
    }

    // Intro Overlay Click (Only on Heart)
    const heartBtn = document.querySelector('.pulsing-heart');
    heartBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent bubbling if needed
        introOverlay.style.opacity = '0';
        setTimeout(() => {
            introOverlay.style.display = 'none';
            mainContent.classList.remove('hidden');
            startTypewriter();
            playAudio('home'); // Start Home music
        }, 800);
    });

    // 4. Tab Switching
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            tabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.id === target) tab.classList.add('active');
            });
            
            playAudio(target); // Switch music
            
            // Trigger "Our Story" Heart Effect
            if (target === 'story') {
                const hugeHeart = document.getElementById('story-heart-effect');
                hugeHeart.classList.remove('hidden');
                hugeHeart.classList.remove('animate-flicker'); // Reset
                void hugeHeart.offsetWidth; // Trigger reflow
                hugeHeart.classList.add('animate-flicker');
                
                // Hide it again after animation plays to ensure it resets for next time
                setTimeout(() => {
                    hugeHeart.classList.add('hidden');
                }, 3000);
            }
        });
    });

    // 5. Typewriter Effect
    const introMessage = "This little space is just for you. Every tab holds a piece of my heart. Please explore and see how much you mean to me.";
    
    function typeWriter(text, element, speed) {
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    function startTypewriter() {
        typeWriter(introMessage, typewriterTitle, 40);
    }

    // 6. Reasons Logic
    const reasons = [
        "You walked into my life quietly, but somehow you became the most beautiful part of it.",
        "The way you care about people shows how pure your heart truly is.",
        "When you smile, it feels like the whole world slows down just so I can admire it.",
        "You make me want to become a better man, not because you ask me to — but because you inspire me to.",
        "Even on my worst days, your presence feels like peace.",
        "I love how passionate you are about the things that matter to you. It’s one of the many reasons I respect you.",
        "You listen to me in a way that makes me feel understood, not judged.",
        "With you, even silence feels full — not empty.",
        "You’ve shown me a version of love that feels safe, steady, and real.",
        "The way you believe in me makes me believe in myself more.",
        "Being with you doesn’t feel like effort — it feels like home.",
        "Every future plan I imagine somehow has you in it."
    ];

    const reasonGifs = [
        'assets/mikir.gif',
        'assets/mmm.gif',
        'assets/pandakuning.gif',
        'assets/weee.gif',
        'assets/wortel.gif',
        'assets/gigitin.gif',
        'assets/cilukba.gif',
        'assets/emawh.gif',
        'assets/g5.gif',
        'assets/hearthappy.gif',
        'assets/pandacoklat.gif',
        'assets/tarikin.gif'
    ];

    let availableIndices = [];

    reasonBtn.addEventListener('click', () => {
        // Shuffle/Reset if empty
        if (availableIndices.length === 0) {
            availableIndices = Array.from({length: reasons.length}, (_, i) => i);
            // Fisher-Yates shuffle
            for (let i = availableIndices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
            }
        }

        const index = availableIndices.pop();
        const selectedReason = reasons[index];
        // Use corresponding GIF to ensure variety matches the reason
        const selectedGif = reasonGifs[index % reasonGifs.length]; 
        
        reasonText.style.opacity = 0;
        reasonGif.style.opacity = 0;
        
        setTimeout(() => {
            reasonText.textContent = selectedReason;
            reasonGif.src = selectedGif;
            reasonText.style.opacity = 1;
            reasonGif.style.opacity = 1;
        }, 300);
    });

    // 7. Valentine Question Logic
    
    // ... existing noBtn/yesBtn logic ...
    
    // Slideshow Logic (Automatic)
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let i;
        const slides = document.getElementsByClassName("slide");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
            // Trigger Heart Effect on Loop (End of slideshow)
             const hugeHeart = document.getElementById('story-heart-effect');
             if(hugeHeart && !document.getElementById('story').classList.contains('hidden')) { // Only if tab is active
                hugeHeart.classList.remove('hidden');
                hugeHeart.classList.remove('animate-flicker');
                void hugeHeart.offsetWidth; 
                hugeHeart.classList.add('animate-flicker');
                setTimeout(() => hugeHeart.classList.add('hidden'), 3000);
             }
        }
        slides[slideIndex-1].style.display = "block";
        setTimeout(showSlides, 3000); // Change image every 3 seconds
    }

    noBtn.addEventListener('mouseover', (e) => {
        const btnRect = noBtn.getBoundingClientRect();
        const btnWidth = btnRect.width;
        const btnHeight = btnRect.height;
        
        // Balanced Center Movement
        // Move anywhere within the middle 60% of the screen
        // ensuring equal chance to go Left or Right
        
        const viewportW = window.innerWidth;
        const viewportH = window.innerHeight;
        
        // Super-Strict Central Zone (30% to 70% of screen)
        // It will NEVER go beyond this inner box
        const minX = viewportW * 0.3;
        const maxX = viewportW * 0.7 - btnWidth; 
        
        const minY = viewportH * 0.3;
        const maxY = viewportH * 0.7 - btnHeight;

        // Visual debug (optional, but helps logic)
        // It means the button basically stays in the center 40% of the screen

        let newX, newY;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        let attempts = 0;
        do {
            newX = Math.random() * (maxX - minX) + minX;
            newY = Math.random() * (maxY - minY) + minY;
            attempts++;
        } while (
            // Ensure it moves a decent distance but stays in box
            Math.abs(newX - mouseX) < 80 && 
            Math.abs(newY - mouseY) < 80 && 
            attempts < 10
        );
        
        // Final fail-safe clamp
        newX = Math.max(minX, Math.min(newX, maxX));
        newY = Math.max(minY, Math.min(newY, maxY));
        
        // Final Clamp to ensure it never exceeds boundaries (just in case)
        newX = Math.max(0, Math.min(newX, viewportW - btnWidth));
        newY = Math.max(0, Math.min(newY, viewportH - btnHeight));

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
        noBtn.style.zIndex = '10000';
    });

    

    yesBtn.addEventListener('click', () => {
        stopAllAudio(); // Stop other background music
        successModal.classList.remove('hidden');
        document.getElementById('sfx-yes').play(); // Play Boom sound
        for(let i=0; i<60; i++) setTimeout(createHeart, i * 20);
    });

    closeModal.addEventListener('click', () => {
        successModal.classList.add('hidden');
    });
});
