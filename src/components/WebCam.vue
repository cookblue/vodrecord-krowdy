<!--template es la estructura de archivos de .vue -->
<template>
  <div>
    <!--prop de preguntas-->
    <h1>{{title}}</h1> 

    <!--playsinline:quitar los controles de reproduccion del video ,muted:silenciar el sonido del video que se esta grabando-->
    <video id="player" playsinline muted></video>
    <!--es un metodo-->
    <button id="startRecord" @click="startRecord">Empieza a Grabar</button>
    <button id="stopRecord" @click="stopRecord">Detener Grabacion</button>
  </div>
</template>

<script>

let mediaRecorder;
// exporto componente para usarlo en otros componentes
export default {
  name: 'WebCam',
  
  props: {
    title: String,
  },

  data: () => {
    return {
      nombre: 'nombre'
    }
  },
  
  methods: {
    // Comenzar a grabar
    // async: await solo funciona cuando el metodo es asincrono
    // async signficia que tu metodo va a tener una f.asincrona(no se sabe cuando va a terminar)
    async startRecord() {
      console.log('Se empezo a grabar!!');
      try {
        // stream: Flujo de datos
        // await va a esperar que acepte o rechace los permisos
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true, // { echoCancellation: { exact: false } }, 
          video: true 
        });
        console.log(stream);
        this.handleSuccess(stream);
      } catch (e) {
        console.log(e);
      }
    },

    //Metodo para detener grabacion
    stopRecord() {
      console.log('El video se detiene');
      mediaRecorder.stop();
      stream.getTracks()[0].stop();
      stream.getTracks()[1].stop();

      this.$emit('onstop', 'end');
    },

    // Grabacion
    handleSuccess(stream) {
      // con window hacemos una variable global
      window.stream = stream;
      mediaRecorder = new MediaRecorder(stream);

      player.onloadedmetadata = (ev) => {
        player.play();
      };
      
      player.srcObject = stream;

      mediaRecorder.start();
    
      let recordedChunks = [];
      
      mediaRecorder.ondataavailable = (ev) => {
        console.log('Capturar', ev.data);
        recordedChunks.push(ev.data);
      };      
      
      mediaRecorder.onstop = (ev) => {
        let blob = new Blob(recordedChunks, { 'type' : 'video/webm;' });
        recordedChunks = [];
        let videoURL = window.URL.createObjectURL(blob);
        player.src = videoURL;
        
        //Implementacion

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = videoURL;
        a.download = 'test.webm';
        document.body.appendChild(a);
        // a.click();
        
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(videoURL);
        }, 5000);
      }
    }
  },
  mounted() {
    const downloadLink = document.getElementById('download');
  }
};
</script>

