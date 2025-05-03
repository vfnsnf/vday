document.addEventListener('DOMContentLoaded', function() {
    // Songs array
    const songs = [
        { title: "Smack That", src: "music/ST.mp3" },
        { title: "Perfect", src: "music/Perfect.mp3" },
        { title: "Tera Ban Jaunga", src: "music/TBJ.mp3" },
        { title: "Tera Hone Laga Hoon", src: "music/THLH.mp3" },
        { title: "Tum Se Hi", src: "music/TSH.mp3"},
        
    ];
    
    let currentSongIndex = 0;
    let isPlaying = false;
    
    // Music Player Elements
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    const prevSongBtn = document.getElementById('prev-song');
    const nextSongBtn = document.getElementById('next-song');
    const songTitle = document.getElementById('song-title');
    const audioSource = document.getElementById('audio-source');
    
    // Music Player Functions
    function loadSong(index) {
        const song = songs[index];
        songTitle.textContent = song.title;
        audioSource.src = song.src;
        backgroundMusic.load();
        
        if (isPlaying) {
            backgroundMusic.play();
        }
    }
    
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            backgroundMusic.play();
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });
    
    prevSongBtn.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
    });
    
    nextSongBtn.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
    });
    
    // Initialize first song
    loadSong(currentSongIndex);
    
    // 3D Carousel
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let theta = 2 * Math.PI / items.length;
    let radius = 250; // Adjust based on your design
    let currentIndex = 0;
    
    // Position items in a circle
    function arrangeItems() {
        items.forEach((item, index) => {
            const angle = theta * index;
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius;
            
            item.style.transform = `translateX(${x}px) translateZ(${z}px)`;
        });
    }
    
    // Update brightness and z-index based on position
    function updateItemsAppearance() {
        items.forEach((item, index) => {
            // Calculate relative position from current index
            const relativeIndex = (index - currentIndex + items.length) % items.length;
            const angle = theta * relativeIndex;
            const z = Math.cos(angle) * radius;
            
            // Set brightness based on z position (front items brighter)
            const brightness = (z + radius) / (2 * radius);
            item.style.filter = `brightness(${0.4 + brightness * 0.6}) contrast(${0.8 + brightness * 0.2})`;
            
            // Set z-index based on z position
            item.style.zIndex = Math.floor(brightness * 100);
        });
    }
    
    // Rotate carousel
    function rotateCarousel(direction) {
        currentIndex = (currentIndex + direction + items.length) % items.length;
        carousel.style.transform = `rotateY(${currentIndex * -theta}rad)`;
        
        // Update brightness for each item after rotation
        updateItemsAppearance();
    }
    
    // Initialize carousel
    arrangeItems();
    updateItemsAppearance();
    
    // Event listeners for controls
    prevBtn.addEventListener('click', () => rotateCarousel(-1));
    nextBtn.addEventListener('click', () => rotateCarousel(1));
    
    // Auto-rotate carousel
    let autoRotate = setInterval(() => rotateCarousel(1), 5000);
    
    // Pause auto-rotation when hovering over carousel
    carousel.addEventListener('mouseenter', () => clearInterval(autoRotate));
    carousel.addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => rotateCarousel(1), 5000);
    });
    
    // Add click event to each item
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Calculate shortest path to clicked item
            const diff = (index - currentIndex + items.length) % items.length;
            const shortestPath = diff <= items.length / 2 ? diff : diff - items.length;
            
            // Rotate to clicked item
            currentIndex = index;
            carousel.style.transform = `rotateY(${currentIndex * -theta}rad)`;
            
            // Update brightness after rotation
            updateItemsAppearance();
        });
    });
    
    // Card links
    const cards = document.querySelectorAll('.container .card');
    
    // URLs for the new pages for each card
    const cardPages = [
        'first-date.html',
        'our-adventure.html',
        'forever-yours.html'
    ];
    
    cards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            window.open(cardPages[index], '_blank');
        });
    });
    
    // Add floating animation to love notes
    const notes = document.querySelectorAll('.note');
    notes.forEach((note, index) => {
        note.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite alternate`;
    });
    
    // Add floating animation keyframes
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float {
            0% { transform: translateY(0) rotate(-1deg); }
            100% { transform: translateY(-10px) rotate(1deg); }
        }
        
        @keyframes floatEven {
            0% { transform: translateY(0) rotate(1deg); }
            100% { transform: translateY(-10px) rotate(-1deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Add heart particles
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        
        heart.innerText = '❤️';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
    
    setInterval(createHeart, 300);
    
    // Add heart styles
    const heartStyle = document.createElement('style');
    heartStyle.innerHTML = `
        .heart {
            position: fixed;
            top: -10vh;
            font-size: 1.5rem;
            transform: translateY(0);
            animation: fall linear forwards;
            z-index: -1;
        }
        
        @keyframes fall {
            to {
                transform: translateY(110vh);
            }
        }
    `;
    document.head.appendChild(heartStyle);
    
    // Theme toggle functionality
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Default to moon icon for dark theme
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        
        // Save theme preference
        const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        
        // Update button icon
        if (currentTheme === 'light') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
});
