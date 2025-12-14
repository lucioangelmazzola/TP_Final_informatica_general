// === VALIDACIÓN DEL FORMULARIO ===

document.addEventListener("DOMContentLoaded", function () {

  const formulario = document.querySelector("form");

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // Limpiar mensajes anteriores
    const mensajesPrevios = document.querySelectorAll(".mensaje-error");
    for (let i = 0; i < mensajesPrevios.length; i++) {
      mensajesPrevios[i].remove();
    }

    let formularioValido = true;

    // Campos reales del HTML
    const campos = [
      { id: "#nombre", nombre: "Nombre" },
      { id: "#apellido", nombre: "Apellido" },
      { id: "#email", nombre: "Correo electrónico" }
    ];

    for (let i = 0; i < campos.length; i++) {
      const input = document.querySelector(campos[i].id);
      const valor = input.value.trim();

      if (valor === "") {
        formularioValido = false;
        mostrarError(input, "⚠️ El campo " + campos[i].nombre + " no puede estar vacío.");
      }

      if (campos[i].id === "#email") {
        if (valor.indexOf("@") === -1 || valor.indexOf(".") === -1) {
          formularioValido = false;
          mostrarError(input, "⚠️ El correo electrónico no es válido.");
        }
      }
    }

    // Si todo está OK, se envía
    if (formularioValido) {
      formulario.submit();
    }
  });

  function mostrarError(elemento, mensaje) {
    const span = document.createElement("span");
    span.textContent = mensaje;
    span.className = "mensaje-error text-red-400 text-sm block mt-1";
    elemento.insertAdjacentElement("afterend", span);
  }

});
