const { createApp } = Vue;

createApp({
    data() {
        return {
            currentSlide: 0,
            totalSlides: 12,
            selectedColor: null,
            selectedIDE: null,
            selectedLanguage: null,
            selectedAI: null,
            audio: null,
            iceBreakerSlides: [3, 8] // Slides with ice breakers in Part 2
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
        goToPreviousPart() {
            this.stopAudio();
            // Go to last slide of Part 1 (slide 11, which is index 11)
            window.location.href = 'index.html?slide=11';
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
                if (this.currentSlide === 0) {
                    this.goToPreviousPart();
                } else {
                    this.prevSlide();
                }
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        }
    },
    mounted() {
        // Add keyboard navigation
        window.addEventListener('keydown', this.handleKeydown);
        // Check if we should play audio on load
        this.handleAudio();
    },
    beforeUnmount() {
        // Clean up
        this.stopAudio();
        window.removeEventListener('keydown', this.handleKeydown);
    }
}).mount('#app');