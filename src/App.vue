<template>
  <div id="app" >
    <!--NAvegador-->
    <div>
      <b-navbar>
        <template slot="brand">
            <b-navbar-item >
                <img src="../img/logo.png">
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="#">
                Home
            </b-navbar-item>
            <b-navbar-item href="#">
                Documentation
            </b-navbar-item>
        </template>
        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light" href="./controler/sesion.vue">
                        Session
                    </a>
                </div>
            </b-navbar-item>
        </template>
      </b-navbar>
    </div>
    
     <!--Layout hero-->
    <div id="box">
      <section class="hero is-dark is-bold">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Krowdy
            </h1>
            <h2 class="subtitle">
            Bienvenido a tu video cuestionario
            </h2>
          </div>
        </div>
      </section>
    </div>
    
     <!--Pantallas-->

    <div id="questions">
      <section>
      <record :title="preguntas[preguntaActual - 1].titulo" @onstop="stopCam"/>  
      </section>
    </div>

<!--
    <div id="views">
      <iniciarGrabacion: @next="btnNext"/>
    </div>
    -->
    <!--Footer-->
    <div>
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
            is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
          </p>
        </div>
      </footer>
    </div>

  </div>
</template>

<script>
import record from './controler/record.vue';
import preguntas from './view/preguntas.vue';
import grid from './view/grid.vue';

export default {
  name: 'app',
  components: {
    record,
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
    },
    clickMe() {
      this.$buefy.notification.open('Clicked!!');
      console.log(this.$buefy.notification);
    }
  }
};
</script>

<style lang="scss">
#app {
  display: inline;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  
}

</style>
