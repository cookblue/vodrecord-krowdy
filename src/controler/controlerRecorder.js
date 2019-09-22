class VodRecorderController {
  constructor(player) {
    this.stream = null;
    this.mediaRecorder = null;
    this.player = player;
  }
  // Aux Function
  PrintStream() {
    console.log(this.player);
    console.log(this.stream);
  }

  async StartVideo() {
    try {
      const stream =  await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      });

      this.stream = stream;
      this.mediaRecorder = new MediaRecorder(stream);

      // El evento loadedmetadata ocurre cuando se han cargado metadatos para el audio / video
      // especificado. Los metadatos para audio / video consisten en: duración, dimensiones (solo video) y pistas de texto.
      this.player.onloadedmetadata = (ev) => {
        this.player.play();
      };
      
      this.player.srcObject = stream;


    } catch (e) {
      console.log(e);
    }
  }
  PauseVideo() {
    console.log('El video se detiene');
    //el metodo MediaRecorder.stop, detiene la grabación, en cuyo momento dataavailable activa un evento que contiene el final Blob de los datos guardados. No se produce más grabación.
    mediaRecorder.stop();
    //MediaStream.getTracks, devuelve una lista de todos los objetos almacenados en MediaStream objeto 
    stream.getTracks()[0].stop();
    stream.getTracks()[1].stop();

    this.$emit('onstop', 'end');
  }
  ResumeVideo() {

  }
  DownloadVideo() {
    const downloadLink = document.getElementById('download');
  }
  StopVideo() {

  }
  ResetVideo() {

  }
}