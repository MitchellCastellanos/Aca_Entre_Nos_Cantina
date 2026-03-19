const SCRIPT_URL = "PEGAR_AQUI_TU_URL_DE_GOOGLE_APPS_SCRIPT";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservationForm");
  const statusBox = document.getElementById("formStatus");

  if (!form || !statusBox) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      statusBox.textContent = "Por favor completa los campos obligatorios.";
      statusBox.style.color = "#ff4d4f";
      return;
    }

    statusBox.textContent = "Enviando reservación...";
    statusBox.style.color = "#C6A75E";

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";
    }

    const formData = new FormData(form);

    const data = {
      nombre: formData.get("nombre"),
      correo: formData.get("correo"),
      fecha: formData.get("fecha"),
      hora: formData.get("hora"),
      personas: formData.get("personas"),
      evento: formData.get("evento"),
      comentarios: formData.get("comentarios")
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      statusBox.textContent = "Reservación enviada correctamente 🍻";
      statusBox.style.color = "#4BB543";

      form.reset();
      form.classList.remove("was-validated");
    } catch (error) {
      statusBox.textContent = "Hubo un error al enviar. Intenta de nuevo.";
      statusBox.style.color = "#ff4d4f";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Confirmar reservación";
      }
    }
  });
});


