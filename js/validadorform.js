// === VALIDACIÓN DEL FORMULARIO ===

document.addEventListener("DOMContentLoaded", () => {

  const formulario = document.querySelector("form");

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    // Limpiar mensajes anteriores
    const mensajesPrevios = document.querySelectorAll(".mensaje-error");
    mensajesPrevios.forEach((msg) => msg.remove());

    // Capturar campos
    const campos = [
      { id: "#nombre", nombre: "Nombre" },
      { id: "#apellido", nombre: "Apellido" },
      { id: "#email", nombre: "Correo electrónico" },
      { id: "#opinion", nombre: "Opinión" }
    ];

    let formularioValido = true;

    // Validar cada campo
    campos.forEach((campo) => {
      const input = document.querySelector(campo.id);
      const valor = input.value.trim();
      let mensaje = "";

      if (valor === "") {
        mensaje = `⚠️ El campo '${campo.nombre}' no puede estar vacío.`;
      } else if (campo.id === "#email" && (!valor.includes("@") || !valor.includes("."))) {
        mensaje = "⚠️ El correo electrónico no tiene un formato válido.";
      } else if (campo.id === "#opinion" && valor.length < 10) {
        mensaje = "⚠️ La opinión debe tener al menos 10 caracteres.";
      }

      if (mensaje !== "") {
        formularioValido = false;
        mostrarError(input, mensaje);
      }
    });

    // Si todo está bien
    if (formularioValido) {
      const nombre = document.querySelector("#nombre").value.trim();
      const apellido = document.querySelector("#apellido").value.trim();
      const email = document.querySelector("#email").value.trim();
      const pais = document.querySelector("#pais").value;
      const opinion = document.querySelector("#opinion").value.trim();

      mostrarConfirmacion(formulario, nombre, apellido, email, pais, opinion);
      formulario.reset();
    }
  });

  // === Función para mostrar mensaje de error ===
  function mostrarError(elemento, mensaje) {
    const span = document.createElement("span");
    span.textContent = mensaje;
    span.className = "mensaje-error text-red-400 text-sm block mt-1";
    elemento.insertAdjacentElement("afterend", span);
  }

  // === Función para mostrar confirmación (debajo del formulario) ===
  function mostrarConfirmacion(formulario, nombre, apellido, email, pais, opinion) {
    const existente = document.querySelector("#mensaje-exito");
    if (existente) existente.remove();

    const mensaje = document.createElement("div");
    mensaje.id = "mensaje-exito";
    mensaje.className = "text-green-400 text-center mt-6 p-3 border border-green-400 rounded-md";
    mensaje.innerHTML = `
      ✅ <strong>Formulario enviado correctamente</strong><br>
      <span class="text-sm text-green-300">
        ${nombre} ${apellido} (${pais}) — ${email}<br>
        "${opinion}"
      </span>
    `;
    formulario.appendChild(mensaje);
  }
});