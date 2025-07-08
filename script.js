// =========================
// Animación de Rotación de Tarjeta
// =========================

document.addEventListener('DOMContentLoaded', function() {
  const membershipSection = document.getElementById('membership');
  const membershipCard = document.querySelector('.membership-card');
  let hasRotated = false;

  function checkScroll() {
    if (!membershipSection || !membershipCard || hasRotated) return;

    const rect = membershipSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.8; // 80% de la ventana

    if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
      membershipCard.classList.add('rotate');
      hasRotated = true;
    }
  }

  // Escuchar el evento de scroll
  window.addEventListener('scroll', checkScroll);
  
  // Verificar al cargar la página por si la sección ya está visible
  checkScroll();
});

// =========================
// Chatbot
// =========================

document.addEventListener('DOMContentLoaded', function() {
  const chatbotToggle = document.querySelector('.chatbot-toggle');
  const chatbotWindow = document.querySelector('.chatbot-window');
  const chatClose = document.querySelector('.chat-close');
  const chatMessages = document.querySelector('.chat-messages');
  const chatInput = document.querySelector('.chat-input');
  const chatSend = document.querySelector('.chat-send');
  
  let conversationStep = 0;
  let userInterests = [];
  let userDates = '';

  // Flujo de conversación
  const conversationFlow = [
    {
      message: "Bienvenido a The Condor Club. Soy su concierge personal. ¿En qué tipo de experiencias está interesado?",
      options: ["Náutica", "Polo", "Aventura", "Gastronomía", "Cultura"]
    },
    {
      message: "Excelente elección. ¿Tiene fechas tentativas en mente para su experiencia?",
      options: ["Próximos 3 meses", "6 meses", "1 año", "Flexible"]
    },
    {
      message: "Perfecto. Conectemos con uno de nuestros asesores exclusivos para personalizar su experiencia. ¿Le gustaría que nos contactemos por teléfono o email?",
      options: ["Teléfono", "Email", "WhatsApp"]
    },
    {
      message: "Gracias por su interés en The Condor Club. Uno de nuestros asesores se pondrá en contacto con usted en las próximas 24 horas. ¡Que tenga un día excepcional!",
      options: []
    }
  ];

  // Función para agregar mensaje
  function addMessage(text, sender = 'bot', options = []) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);

    // Agregar opciones si existen
    if (options.length > 0) {
      const optionsDiv = document.createElement('div');
      optionsDiv.className = 'message-options';
      
      options.forEach(option => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.textContent = option;
        optionBtn.addEventListener('click', () => handleOptionClick(option));
        optionsDiv.appendChild(optionBtn);
      });
      
      chatMessages.appendChild(optionsDiv);
    }

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Manejar clic en opciones
  function handleOptionClick(option) {
    addMessage(option, 'user');
    
    // Guardar respuesta según el paso
    if (conversationStep === 0) {
      userInterests.push(option);
    } else if (conversationStep === 1) {
      userDates = option;
    } else if (conversationStep === 2) {
      // Contacto seleccionado
    }

    conversationStep++;
    
    // Simular delay del bot
    setTimeout(() => {
      if (conversationStep < conversationFlow.length) {
        const nextStep = conversationFlow[conversationStep];
        addMessage(nextStep.message, 'bot', nextStep.options);
      }
    }, 1000);
  }

  // Manejar envío de mensaje
  function handleSendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      addMessage(message, 'user');
      chatInput.value = '';
      
      // Simular respuesta del bot
      setTimeout(() => {
        addMessage("Gracias por su mensaje. Nuestro equipo se pondrá en contacto con usted pronto.", 'bot');
      }, 1000);
    }
  }

  // Event listeners
  chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.add('active');
    chatbotToggle.setAttribute('aria-expanded', 'true');
    
    // Iniciar conversación si es la primera vez
    if (conversationStep === 0) {
      setTimeout(() => {
        const firstStep = conversationFlow[0];
        addMessage(firstStep.message, 'bot', firstStep.options);
      }, 500);
    }
  });

  chatClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
    chatbotToggle.setAttribute('aria-expanded', 'false');
  });

  chatSend.addEventListener('click', handleSendMessage);

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  });

  // Cerrar chat al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!chatbotWindow.contains(e.target) && !chatbotToggle.contains(e.target)) {
      chatbotWindow.classList.remove('active');
      chatbotToggle.setAttribute('aria-expanded', 'false');
    }
  });
});
