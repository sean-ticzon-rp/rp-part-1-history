const { createApp } = Vue;

createApp({
    data() {
        return {
            currentSlide: 0,
            totalSlides: 12, // Updated: Now 12 slides instead of 13
            selectedColor: null,
            selectedIDE: null,
            selectedLanguage: null,
            selectedAI: null
        }
    },
    methods: {
        nextSlide() {
            if (this.currentSlide < this.totalSlides - 1) {
                this.currentSlide++;
            }
        },
        prevSlide() {
            if (this.currentSlide > 0) {
                this.currentSlide--;
            }
        },
        goToNextPart() {
            window.location.href = 'index2.html';
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
        }
    },
    mounted() {
        // Add keyboard navigation
        window.addEventListener('keydown', this.handleKeydown);
    },
    beforeUnmount() {
        // Clean up event listener
        window.removeEventListener('keydown', this.handleKeydown);
    }
}).mount('#app');