<!--template es la estructura de archivos de .vue -->
<template>
  <div>
    <!--prop de preguntas-->
    <h1>{{title}}</h1> 

    <!--playsinline:quitar los controles de reproduccion del video ,muted:silenciar el sonido del video que se esta grabando-->
    <video id="player" width="600" playsinline muted></video>
    <!--es un metodo-->
    <br>
    <b-button id="startRecord" type="is-danger" @click="startRecord">Grabar</b-button>
    <b-button id="stopRecord" type="stopRecord" @click="stopRecord">Pausar</b-button>
  <!--<b-button type="is-warning" @click="clickMe">Reset</b-button>-->  
  </div>
</template>
<script>
let mediaRecorder;
// exporto componente para usarlo en otros componentes
export default {
  name: 'record',
  
  props: {
    title: String,

  },

  data: () => {
    return {
      nombre: 'nombre',
      
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
        // stream obtiene un objeto MediaStream
        const stream = await navigator.mediaDevices.getUserMedia({ //MediaStream
          audio: true, 
          video: true 
        });
        console.log(stream);
        //comienza el proceso de grabacion
        this.handleSuccess(stream);
      } catch (e) {
        console.log(e);
      }
    },

    //Metodo para detener grabacion
    stopRecord() {
      console.log('El video se detiene');
      //el metodo MediaRecorder.stop, detiene la grabación, en cuyo momento dataavailable activa un evento que contiene el final Blob de los datos guardados. No se produce más grabación.
      mediaRecorder.stop();
      //MediaStream.getTracks, devuelve una lista de todos los objetos almacenados en MediaStream objeto 
      stream.getTracks()[0].stop();
      stream.getTracks()[1].stop();

      this.$emit('onstop', 'end');
    },

    // Grabacion
    handleSuccess(stream) {
      // con window hacemos una variable global
      window.stream = stream;
      mediaRecorder = new MediaRecorder(stream);

      //El evento loadedmetadata ocurre cuando se han cargado metadatos para el audio / video especificado. Los metadatos para audio / video consisten en: duración, dimensiones (solo video) y pistas de texto.

      player.onloadedmetadata = (ev) => {
        player.play();
      };
      
      player.srcObject = stream;

      //Comienza a grabar medios
      mediaRecorder.start();
      
      let recordedChunks = [];

      //ondataavailable: Se llama para manejar el evento disponible de datos, que se activa periódicamente cada vez que se han registrado milisegundos de medios (o cuando se ha registrado todo el medio, si no se especificó el tiempo). El evento, de tipo BlobEvent, contiene los medios grabados en su propiedad de datos. Luego puede recopilar y actuar sobre los datos multimedia grabados utilizando este controlador de eventos.
      mediaRecorder.ondataavailable = (ev) => {
        console.log('Capturar', ev.data);
        recordedChunks.push(ev.data);
      };      
      
      mediaRecorder.onstop = (ev) => {
        //blob donde almaceno el video
        console.log('on stop1');
        //MediaRecorder(stream, options)
        let blob = new Blob(recordedChunks, { 'type' : 'video/webm;' });
        recordedChunks = [];
        //El método estático URL.createObjectURL () crea un DOMString que contiene una URL que representa el objeto dado en el parámetro. La vida útil de la URL está vinculada al documento en la ventana en la que se creó. La nueva URL del objeto representa el objeto de archivo u objeto Blob especificado.
        let videoURL = window.URL.createObjectURL(blob);
        player.src = videoURL;
        
        //Implementacion para enviar al servidor
        const fd = new FormData();
        console.log('onstop2');
        fd.append('video', blob, 'blobby.webm');
        console.log('Haciendo peticion');
        fetch('http://localhost:8080/uploads',
        {
            method: 'post',
            body: fd
        }); 

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = videoURL;
        a.download = 'test.webm';
        document.body.appendChild(a);

        
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

