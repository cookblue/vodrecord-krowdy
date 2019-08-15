<template>
  <div id="app">
    <WebCam :title="preguntas[preguntaActual - 1].titulo" @onstop="stopCam"/>
  </div>
</template>

<script>
import WebCam from './components/WebCam.vue';

export default {
  name: 'app',
  components: {
    WebCam,
  },
  data: () => {
    return {
      preguntaActual: 1,
      preguntas: [
        {
          titulo: 'Pregunta 1',
          id: 1,
        },
        {
          titulo: 'Pregunta 2',
          id: 2,
        },
        {
          titulo: 'Pregunta 3',
          id: 3,
        },
      ],
    }
  },
  methods: {
    stopCam(info) {
      if (info === 'end') {
        if (this.preguntas.length > this.preguntaActual) {
          this.preguntaActual = this.preguntaActual + 1  
        } else {
          console.log('Terminaste todas las preguntas :)');
        }
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
