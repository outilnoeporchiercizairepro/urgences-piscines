document.addEventListener('DOMContentLoaded', () => {
    /* -----------------------------------------------------
       1. SMOOTH SCROLLING 
    ----------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    /* -----------------------------------------------------
       2. MOBILE BURGER MENU
    ----------------------------------------------------- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                hamburger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            } else {
                hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });

        // Fermer le menu si on clique sur un lien (mobile)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
                }
            });
        });
    }

    /* -----------------------------------------------------
       3. ANIMATIONS AU DEFILEMENT (Intersection Observer)
    ----------------------------------------------------- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Déclenchement à 15% de visibilité de l'élément
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optionnel : ne jouer l'animation qu'une seule fois
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Cibler tous les éléments avec la classe .animate-on-scroll
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => {
        scrollObserver.observe(el);
    });

    /* -----------------------------------------------------
       4. EFFET NAVBAR AU SCROLL (Changera l'apparence au défilement)
    ----------------------------------------------------- */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

/* -----------------------------------------------------
   5. CHAT WIDGET LOGIC (n8n Integration)
----------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const chatButton = document.getElementById('chat-button');
    const chatPopup = document.getElementById('chat-popup');
    const closeChat = document.getElementById('close-chat');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');
    const chatPromo = document.querySelector('.chat-bubble-promo');

    if (!chatButton) return;

    // Toggle Chat
    chatButton.addEventListener('click', () => {
        chatPopup.classList.toggle('active');
        if (chatPopup.classList.contains('active')) {
            chatInput.focus();
            if (chatPromo) chatPromo.style.display = 'none';
        } else {
            if (chatPromo) chatPromo.style.display = 'block';
        }
    });

    closeChat.addEventListener('click', () => {
        chatPopup.classList.remove('active');
        if (chatPromo) chatPromo.style.display = 'block';
    });

    // Handle Send Message
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (!message) return;

        // User Message UI
        addMessage(message, 'user');
        chatInput.value = '';

        // Show Typing
        typingIndicator.style.display = 'flex';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            const response = await fetch('https://n8n.prcz.fr/webhook-test/urgences-piscines', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            
            // Assume the response from n8n is either a string or an object with an 'output' or 'message' field
            const botResponse = data.output || data.message || (typeof data === 'string' ? data : "Désolé, je ne peux pas répondre pour le moment.");
            
            addMessage(botResponse, 'bot');
        } catch (error) {
            console.error('Error:', error);
            addMessage("Oups ! Une erreur est survenue lors de la connexion au service d'assistance.", 'bot');
        } finally {
            typingIndicator.style.display = 'none';
        }
    });

    function addMessage(text, side) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', side);
        
        // Render Markdown for bot messages
        if (side === 'bot' && typeof marked !== 'undefined') {
            msgDiv.innerHTML = marked.parse(text);
        } else {
            msgDiv.textContent = text;
        }
        
        chatMessages.insertBefore(msgDiv, typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});

/* -----------------------------------------------------
   6. FAQ ACCORDION LOGIC
----------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
