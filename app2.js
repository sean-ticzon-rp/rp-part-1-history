const { createApp } = Vue;

createApp({
    data() {
        return {
            currentSlide: 0,
            totalSlides: 12,
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
        goToPreviousPart() {
            // Go to last slide of Part 1 (slide 11, which is index 11)
            window.location.href = 'index.html?slide=11';
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
    },
    beforeUnmount() {
        // Clean up event listener
        window.removeEventListener('keydown', this.handleKeydown);
    }
}).mount('#app');