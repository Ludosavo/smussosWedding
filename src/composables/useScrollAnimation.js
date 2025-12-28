import { onMounted, onUnmounted } from 'vue'

/**
 * Composable for scroll-triggered animations using Intersection Observer
 * Adds 'is-visible' class to elements when they enter the viewport
 * 
 * @param {string} selector - CSS selector for elements to animate (default: '.animate-on-scroll')
 * @param {object} options - Intersection Observer options
 * @returns {void}
 * 
 * Usage in component:
 * import { useScrollAnimation } from '@/composables/useScrollAnimation'
 * useScrollAnimation('.my-animated-element')
 * 
 * CSS:
 * .animate-on-scroll {
 *   opacity: 0;
 *   transform: translateY(30px);
 *   transition: opacity 0.6s ease, transform 0.6s ease;
 * }
 * .animate-on-scroll.is-visible {
 *   opacity: 1;
 *   transform: translateY(0);
 * }
 */
export function useScrollAnimation(selector = '.animate-on-scroll', options = {}) {
  let observer = null
  
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  }
  
  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          // Optionally unobserve after animation to improve performance
          // observer.unobserve(entry.target)
        }
      })
    }, defaultOptions)
    
    // Wait for next tick to ensure DOM is ready
    setTimeout(() => {
      const elements = document.querySelectorAll(selector)
      elements.forEach(el => {
        observer.observe(el)
      })
    }, 100)
  })
  
  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}
