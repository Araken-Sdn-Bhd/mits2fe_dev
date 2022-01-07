<template>
  <div id="app" class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      // Temporary config for 2.1.
      contextConfig: {
        gradient: true,
        shadow: 'lg', // 3 states: 'sm', 'lg', undefined (no shadow).
        invertedColor: false,
      },
    }
  },
  provide () {
    return {
      contextConfig: this.contextConfig,
    }
  },
  watch: {
    // Temporary colors fix for 2.1.
    'contextConfig.invertedColor' (val) {
      const invertedColorClass = 'va-inverted-color'
      if (val) {
        document.body.classList.add(invertedColorClass)
      } else {
        document.body.classList.remove(invertedColorClass)
      }
    },
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
@import '../sass/main.scss';

body {
  height: 100%;

  #app {
    height: 100%;
  }
}

.btn-blue {
  color: #ffffff !important;
  background-color: #1ba1a1 !important;
  border-color: #1ba1a1 !important;
}

.btn-blue:hover {
  color: #ffffff !important;
  background-color: #178a8a !important;
  border-color: #178a8a !important;
}

.btn-yellow {
  color: #000000 !important;
  background-color: #f59f26 !important;
  border-color: #f59f26 !important;
}

.btn-yellow:hover {
  color: #000000 !important;
  background-color: #d98c21 !important;
  border-color: #d98c21 !important;
}

.btn-circle {
  border-radius: 50% !important;
}

.btn-green {
  color: #000000 !important;
  background-color: #61ce70 !important;
  border-color: #61ce70 !important;
}

.btn-green:hover {
  color: #000000 !important;
  background-color: #51ad5e !important;
  border-color: #51ad5e !important;
}

.icon-rotate-90 {
  -ms-transform: rotate(90deg); /* IE 9 */
  transform: rotate(90deg);
}

.btn-red {
  color: #ffffff !important;
  background-color: #dc3545 !important;
  border-color: #dc3545 !important;
}

.btn-red:hover {
  color: #ffffff !important;
  background-color: #bd2d3b !important;
  border-color: #bd2d3b !important;
}
</style>
