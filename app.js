const { createApp } = Vue;

createApp({
    data() {
        return {
            currentSlide: 0,
            totalSlides: 12, // Updated: Now 12 slides instead of 13
            selectedColor: null,
            selectedIDE: null,
            selectedLanguage: null,
            selectedAI: null,
            audio: null,
            iceBreakerSlides: [6, 11] // Slides with ice breakers
        }
    },
    methods: {
        nextSlide() {
            if (this.currentSlide < this.totalSlides - 1) {
                this.currentSlide++;
                this.handleAudio();
            }
        },
        prevSlide() {
            if (this.currentSlide > 0) {
                this.currentSlide--;
                this.handleAudio();
            }
        },
        goToNextPart() {
            this.stopAudio();
            window.location.href = 'index2.html';
        },
        handleAudio() {
            // Check if current slide is an ice breaker
            if (this.iceBreakerSlides.includes(this.currentSlide)) {
                this.playAudio();
            } else {
                this.stopAudio();
            }
        },
        playAudio() {
            if (!this.audio) {
                this.audio = new Audio('song.mp3');
                this.audio.loop = true; // Loop the music while on ice breaker slide
                this.audio.volume = 0.3; // Set volume to 30% (not too loud)
            }
            this.audio.play().catch(error => {
                console.log('Audio play failed:', error);
            });
        },
        stopAudio() {
            if (this.audio) {
                this.audio.pause();
                this.audio.currentTime = 0; // Reset to beginning
            }
        },
        selectColor(color) {
            this.selectedColor = color;
        },
        selectIDE(ide) {
            this.selectedIDE = ide;
        },
        selectLanguage(language) {
            this.selectedLanguage = language;
        },
        selectAI(ai) {
            this.selectedAI = ai;
        },
        handleKeydown(e) {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                if (this.currentSlide === this.totalSlides - 1) {
                    this.goToNextPart();
                } else {
                    this.nextSlide();
                }
            }
        },
        checkURLForSlide() {
            // Check if there's a slide parameter in the URL
            const urlParams = new URLSearchParams(window.location.search);
            const slideParam = urlParams.get('slide');
            if (slideParam !== null) {
                const slideNum = parseInt(slideParam);
                if (slideNum >= 0 && slideNum < this.totalSlides) {
                    this.currentSlide = slideNum;
                    this.handleAudio(); // Check audio on initial load
                }
            }
        }
    },
    mounted() {
        // Check URL for slide parameter on load
        this.checkURLForSlide();
        // Add keyboard navigation
        window.addEventListener('keydown', this.handleKeydown);
    },
    beforeUnmount() {
        // Clean up
        this.stopAudio();
        window.removeEventListener('keydown', this.handleKeydown);
    }
}).mount('#app');