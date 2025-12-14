/*================  ======================*/
/*       ALGORITMO DEL JUEGO         */
/*================  ======================*/

/* SE ATRAPAN LOS ELEMENTOS QUE ESTAN DENTRO DEL HTML */
const btnPlay = document.querySelector("#btnPlay");
const pantallaJuego = document.querySelector("#pantallaJuego");
const preguntaHTML = document.querySelector("#pregunta");
const opcionesHTML = document.querySelector("#opciones");
const contadorTiempoHTML = document.querySelector("#contadorTiempo");
const resultadoHTML = document.querySelector("#resultado");
const btnReiniciar = document.querySelector("#btnReiniciar");


/* SE DECLARAN LAS VARIABLES */
let indicePregunta = 0;
let puntaje = 0;
let tiempo = 30;
let intervalo = null;


/* SE DECLARA UNA LISTA DE OBJETOS DONDE ESTAN LAS PREGUNTAS */
const preguntas = [
    {
        pregunta: "¿Antonio García Villarán es conocido principalmente como…?",
        opciones: ["Pintor clásico", "Crítico de arte", "Escultor barroco"],
        correcta: 1
    },
    {
        pregunta: "¿En qué plataforma se hizo popular Villarán?",
        opciones: ["Instagram", "YouTube", "TikTok"],
        correcta: 1
    },
    {
        pregunta: "¿Qué término utiliza Villarán para criticar cierto arte?",
        opciones: ["Arte basura", "Hamparte", "Anti-arte"],
        correcta: 1
    },
    {
        pregunta: "¿Villarán defiende el arte conceptual sin límites?",
        opciones: ["Sí", "No", "A veces"],
        correcta: 1
    },
    {
        pregunta: "¿Qué analiza Villarán en sus videos?",
        opciones: ["Obras clásicas", "Mercado del arte", "Arte contemporáneo"],
        correcta: 2
    },
    {
        pregunta: "¿Suele Villarán usar ironía en sus críticas?",
        opciones: ["Nunca", "Siempre", "A veces"],
        correcta: 1
    },
    {
        pregunta: "¿Villarán se presenta como artista o crítico?",
        opciones: ["Solo artista", "Solo crítico", "Ambas cosas"],
        correcta: 2
    },
    {
        pregunta: "¿Qué busca generar Villarán con sus videos?",
        opciones: ["Polémica", "Reflexión", "Entretenimiento"],
        correcta: 1
    },
    {
        pregunta: "¿Villarán apoya el arte sin técnica?",
        opciones: ["Sí", "No", "Depende del caso"],
        correcta: 1
    },
    {
        pregunta: "¿El contenido de Villarán es educativo?",
        opciones: ["Sí", "No", "No tiene opinión"],
        correcta: 0
    }
];

/* AL DAR CLICK SE INICIA EL JUEGO */
btnPlay.addEventListener("click", iniciarJuego);
btnReiniciar.addEventListener("click", reiniciarJuego);

/* SE EJECUTA PRIMERO ESTA FUNCION, DENTRO */

// ============================
// FUNCIÓN: iniciarJuego
// Se ejecuta cuando el usuario toca el botón "Play"
// ============================

// PASO 1:
function iniciarJuego() {

    // Oculta el botón Play para que no se pueda volver a apretar
    btnPlay.classList.add("hidden");

    // Oculta el resultado de una partida anterior (si existía)
    resultadoHTML.classList.add("hidden");

    // Muestra la pantalla del juego (preguntas + tiempo)
    pantallaJuego.classList.remove("hidden");

    // Reinicia el índice de preguntas (arranca desde la primera)
    indicePregunta = 0;

    // Reinicia el puntaje
    puntaje = 0;

    // Llama a la función que muestra la primera pregunta
    mostrarPregunta();
}


// ============================
// FUNCIÓN: mostrarPregunta
// Muestra la pregunta actual y sus opciones
// ============================

// PASO 2:
function mostrarPregunta() {

    // Reinicia el tiempo para esta pregunta
    tiempo = 30;

    // Actualiza el contador visual del tiempo
    actualizarTiempo();

    // Guarda la pregunta actual según el índice
    let actual = preguntas[indicePregunta];

    // Muestra el texto de la pregunta en el HTML
    preguntaHTML.innerHTML = actual.pregunta; // Entra dentro del array de objetos Ej: posición [0]

    // Limpia las opciones anteriores
    opcionesHTML.innerHTML = "";

    // Recorre las opciones de la pregunta
    for (let i = 0; i < actual.opciones.length; i++) {

        // Crea un botón por cada opción
        // data-index guarda el número de la opción
        opcionesHTML.innerHTML += `
            <button class="opcion" data-index="${i}">
                ${actual.opciones[i]}
            </button>
        `;
    }

    // Selecciona todos los botones de opciones creados
    const botones = document.querySelectorAll(".opcion");

    // A cada botón le agrega el evento click
    botones.forEach(boton => {
        boton.addEventListener("click", responder);
    });

    // Inicia el contador regresivo (cada 1 segundo)
    intervalo = setInterval(contarTiempo, 1000);
}


// ============================
// FUNCIÓN: contarTiempo
// Reduce el tiempo y controla cuando llega a 0
// ============================

// PASO 5:

function contarTiempo() {

    // Resta un segundo
    tiempo--;

    // Actualiza el tiempo en pantalla
    actualizarTiempo();

    // Si el tiempo llega a 0
    if (tiempo === 0) {

        // Detiene el contador
        clearInterval(intervalo);

        // Pasa automáticamente a la siguiente pregunta
        siguientePregunta();
    }
}




// ============================
// FUNCIÓN: actualizarTiempo
// Muestra el tiempo restante en pantalla
// ============================

// PASO 4:

function actualizarTiempo() {

    // Inserta el tiempo en el HTML
    contadorTiempoHTML.innerHTML = `Tiempo: ${tiempo}s`;
}


// ============================
// FUNCIÓN: responder
// Se ejecuta cuando el usuario elige una opción
// ============================
function responder(e) {

    // Detiene el contador de tiempo
    clearInterval(intervalo);

    // Obtiene la opción elegida por el usuario
    // dataset.index viene del data-index del botón
    const respuesta = Number(e.target.dataset.index);

    // Obtiene la respuesta correcta de la pregunta actual
    const correcta = preguntas[indicePregunta].correcta;

    // Si la respuesta es correcta
    if (respuesta === correcta) {

        // Suma un punto al puntaje
        puntaje++;
    }

    // Pasa a la siguiente pregunta
    siguientePregunta();
}


function siguientePregunta() {
    indicePregunta++;

    if (indicePregunta < preguntas.length) {
        mostrarPregunta();
    } else {
        terminarJuego();
    }
}

function terminarJuego() {
    pantallaJuego.classList.add("hidden");
    resultadoHTML.classList.remove("hidden");

    resultadoHTML.innerHTML = `
        <h2>Juego terminado</h2>
        <p>Tu puntaje fue: ${puntaje} / ${preguntas.length}</p>
    `;

    btnPlay.classList.remove("hidden");
}


function reiniciarJuego() {

    // Detiene el contador si estaba activo
    clearInterval(intervalo);

    // Reinicia variables principales
    indicePregunta = 0;
    puntaje = 0;
    tiempo = 30;

    // Oculta pantalla de juego y resultado
    pantallaJuego.classList.add("hidden");
    resultadoHTML.classList.add("hidden");

    // Limpia textos
    preguntaHTML.innerHTML = "";
    opcionesHTML.innerHTML = "";
    contadorTiempoHTML.innerHTML = "";

    // Vuelve a mostrar el botón Play
    btnPlay.classList.remove("hidden");
}
