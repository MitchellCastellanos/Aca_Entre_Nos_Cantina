const eventsData = [
  {
    id: 1,
    title: "Entre Compas",
    dateLabel: "Domingo · 12:00 PM",
    dateValue: "2026-03-22",
    timeValue: "12:00",
    type: "Promo especial",
    image: "images/events/event-1.jpg",
    badge: "Destacado",
    description: "Promo especial de cerveza y botana para compartir entre compas desde el mediodía."
  },
  {
    id: 2,
    title: "Charros Negros Night",
    dateLabel: "Viernes · 9:00 PM",
    dateValue: "2026-03-20",
    timeValue: "21:00",
    type: "Noche temática",
    image: "images/events/event-2.jpg",
    badge: "Viernes",
    description: "Sombreros, música y una noche con carácter para arrancar el fin de semana como se debe."
  },
  {
    id: 3,
    title: "Bailazo Regional",
    dateLabel: "Sábado · 10:00 PM",
    dateValue: "2026-03-21",
    timeValue: "22:00",
    type: "Música en vivo",
    image: "images/events/event-3.jpg",
    badge: "Live",
    description: "Grupo en vivo, ambiente prendido y una pista lista para que la noche se alargue."
  },
  {
    id: 4,
    title: "Noche de Cantina",
    dateLabel: "Jueves · 8:00 PM",
    dateValue: "2026-03-19",
    timeValue: "20:00",
    type: "Noche especial",
    image: "images/events/event-4.jpg",
    badge: "Jueves",
    description: "Tragos, amigos y el pretexto perfecto para empezar el fin desde temprano."
  }
];

function createEventCard(event) {
  return `
    <div class="col-md-6 col-xl-3">
      <article class="event-card reveal h-100">
        <div class="event-image-wrap">
          <span class="event-badge">
            <i class="bi bi-stars"></i>${event.badge}
          </span>
          <img src="${event.image}" alt="${event.title} en Acá Entre Nos" loading="lazy">
        </div>

        <div class="event-body d-flex flex-column h-100">
          <h3 class="event-title">${event.title}</h3>

          <div class="event-meta">
            <span><i class="bi bi-calendar-event"></i>${event.dateLabel}</span>
            <span><i class="bi bi-bookmark-heart"></i>${event.type}</span>
          </div>

          <p class="event-text">${event.description}</p>

          <div class="mt-auto">
            <button
              type="button"
              class="btn btn-brand reserve-event-btn"
              data-event="${event.title}"
              data-date="${event.dateValue}"
              data-time="${event.timeValue}"
              data-type="${event.type}">
              Reservar para este evento
            </button>
          </div>
        </div>
      </article>
    </div>
  `;
}

function renderEvents() {
  const eventsContainer = document.getElementById("events-container");
  if (!eventsContainer) return;

  eventsContainer.innerHTML = eventsData.map(createEventCard).join("");
}

renderEvents();
