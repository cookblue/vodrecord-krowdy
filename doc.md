Documentation:
1. 	Frontend(vodrecord-krowdy): 
	**Run**
	- Open you folder in terminal
	- npm install
	- npm run serve

	**../public/index.html**
		id app

	**../src/components/WebCam.vue**

	
	**App.vue**
	Diseño de la pagina web con bulma y buffy
	- Navegador
	- Layout hero
	- Preguntas
	- Footer
	- Script: data- preguntas, method: stop camera

	**main.js**
	- import vue: Framework para construir interfaces de usuario 
	- import buefy: Es una biblioteca liviana de componentes de interfaz de usuario receptivos para Vue.js basada en el marco y el diseño de Bulma.
	Bulma: Bulma es un marco CSS gratuito de código abierto basado en Flexbox y utilizado por más de 200,000 desarrolladores. npm install bulma copy Descargar v0.7.5 Ver documentos.
	- import App de buefy

	**babel.config.js**
		module.exports 	
		@vue/app

	DOC:
	MediaRecorder:
	La MediaRecorderinterfaz de la API de grabación de MediaStream proporciona funcionalidad para grabar medios fácilmente. Se crea usando el MediaRecorder()constructor.
	https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

	MediaSream
	La interfaz representa una secuencia de contenido multimedia. Una secuencia consta de varias pistas , como pistas de video o audio. Cada pista se especifica como una instancia de . MediaStream MediaStreamTrackPuede obtener un objeto MediaStream ya sea utilizando el constructor o llamando MediaDevices.getUserMedia().
	https://developer.mozilla.org/en-US/docs/Web/API/MediaStream

	html
	video, es una etiqueta de html
	https://www.w3schools.com/tags/tag_video.asp

	video, evento, loadedmetadata
	https://www.w3schools.com/tags/av_event_loadedmetadata.asp

	URL.create object url
	https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL

2. 	Backend(backendvodrecord-krowdy):