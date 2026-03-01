/* ============================================
   ARTISAN GALLERY — Animations & Visual Effects
   Particles, Scroll Effects, Micro-Interactions
   ============================================ */

// ==================== FLOATING PARTICLES ====================
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'particleCanvas';
    canvas.style.cssText = 'position:absolute;inset:0;z-index:1;pointer-events:none;';
    hero.style.position = 'relative';
    hero.insertBefore(canvas, hero.firstChild);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    function resize() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.opacityDir = Math.random() > 0.5 ? 1 : -1;
            this.golden = Math.random() > 0.6;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity += this.opacityDir * 0.003;
            if (this.opacity > 0.6 || this.opacity < 0.05) this.opacityDir *= -1;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            if (this.golden) {
                ctx.fillStyle = `rgba(201, 169, 110, ${this.opacity})`;
                ctx.shadowColor = 'rgba(201, 169, 110, 0.3)';
                ctx.shadowBlur = 8;
            } else {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
            }
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    // Create particles
    const count = Math.min(60, Math.floor(canvas.width / 25));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    // Connect nearby golden particles with lines
    function drawConnections() {
        const goldenParticles = particles.filter(p => p.golden);
        for (let i = 0; i < goldenParticles.length; i++) {
            for (let j = i + 1; j < goldenParticles.length; j++) {
                const dx = goldenParticles[i].x - goldenParticles[j].x;
                const dy = goldenParticles[i].y - goldenParticles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const opacity = (1 - dist / 150) * 0.12;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(201, 169, 110, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(goldenParticles[i].x, goldenParticles[i].y);
                    ctx.lineTo(goldenParticles[j].x, goldenParticles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        animFrame = requestAnimationFrame(animate);
    }
    animate();
}

// ==================== ADVANCED SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // For counter animation on stats
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    document.querySelectorAll('.product-card').forEach(el => observer.observe(el));
    document.querySelectorAll('.category-card').forEach(el => observer.observe(el));
    document.querySelectorAll('.testimonial-card').forEach(el => observer.observe(el));
    document.querySelectorAll('.stat-item').forEach(el => observer.observe(el));

    // Section headers get special animation
    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ==================== COUNTER ANIMATION ====================
function animateCounter(el) {
    const numEl = el.querySelector('.number');
    if (!numEl || numEl.dataset.animated) return;
    numEl.dataset.animated = 'true';

    const target = parseInt(numEl.textContent.replace(/\D/g, ''));
    const suffix = numEl.textContent.replace(/\d/g, '').replace(',', '');
    let current = 0;
    const increment = Math.ceil(target / 60);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        numEl.textContent = current.toLocaleString() + suffix;
    }, 30);
}

// ==================== MAGNETIC BUTTON EFFECT ====================
function initMagneticButtons() {
    document.querySelectorAll('.btn-primary, .btn-outline, .btn-icon').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// ==================== TILT EFFECT ON PRODUCT CARDS ====================
function initTiltEffect() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const tiltX = (y - 0.5) * 6;
            const tiltY = (x - 0.5) * -6;

            card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ==================== CURSOR GLOW TRAIL ====================
function initCursorGlow() {
    const glow = document.createElement('div');
    glow.id = 'cursorGlow';
    glow.style.cssText = `
        position: fixed; width: 300px; height: 300px; border-radius: 50%;
        background: radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%);
        pointer-events: none; z-index: 9999; transform: translate(-50%,-50%);
        transition: opacity 0.3s ease; opacity: 0;
    `;
    document.body.appendChild(glow);

    let visible = false;
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        if (!visible) {
            glow.style.opacity = '1';
            visible = true;
        }
    });
    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
        visible = false;
    });
}

// ==================== PARALLAX ON HERO ====================
function initParallax() {
    const heroContent = document.querySelector('.hero-content');
    const heroBg = document.querySelector('.hero-bg');
    if (!heroContent || !heroBg) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
            heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    });
}

// ==================== RIPPLE EFFECT ON BUTTONS ====================
function initRippleEffect() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.cssText = `
                position:absolute; border-radius:50%; transform:scale(0);
                animation: rippleAnim 0.6s ease-out forwards;
                background: rgba(255,255,255,0.3);
                width:${size}px; height:${size}px;
                left:${e.clientX - rect.left - size / 2}px;
                top:${e.clientY - rect.top - size / 2}px;
                pointer-events:none;
            `;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add the ripple keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleAnim {
            to { transform: scale(2.5); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ==================== SMOOTH REVEAL FOR IMAGES ====================
function initImageReveal() {
    document.querySelectorAll('.product-image img, .category-card img').forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        img.style.transform = 'scale(1.05)';

        if (img.complete) {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            });
        }
    });
}

// ==================== GLOWING NAVBAR ON SCROLL ====================
function initNavGlow() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4), 0 1px 0 rgba(201,169,110,0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });
}

// ==================== TEXT TYPING EFFECT FOR HERO ====================
function initTypingEffect() {
    const heroLabel = document.querySelector('.hero-label');
    if (!heroLabel) return;

    const text = heroLabel.textContent;
    heroLabel.textContent = '';
    heroLabel.style.opacity = '1';
    heroLabel.style.borderRight = '2px solid var(--gold)';

    let i = 0;
    const type = () => {
        if (i < text.length) {
            heroLabel.textContent += text[i];
            i++;
            setTimeout(type, 60);
        } else {
            // Blink cursor then remove
            setTimeout(() => {
                heroLabel.style.borderRight = 'none';
            }, 1500);
        }
    };
    setTimeout(type, 800);
}

// ==================== SPARKLE ON GOLD ELEMENTS ====================
function addSparkle(element) {
    const sparkle = document.createElement('div');
    const x = Math.random() * element.offsetWidth;
    const y = Math.random() * element.offsetHeight;
    sparkle.style.cssText = `
        position:absolute; width:4px; height:4px; border-radius:50%;
        background:var(--gold-light); pointer-events:none;
        left:${x}px; top:${y}px;
        animation: sparkleFade 0.8s ease-out forwards;
        box-shadow: 0 0 6px rgba(201,169,110,0.8);
    `;
    element.style.position = 'relative';
    element.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
}

function initSparkleEffects() {
    // Add sparkle keyframe
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleFade {
            0% { transform: scale(0) rotate(0deg); opacity: 1; }
            50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
            100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Add sparkles to gold-line elements on hover
    document.querySelectorAll('.btn-primary').forEach(el => {
        el.addEventListener('mouseenter', () => {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => addSparkle(el), i * 80);
            }
        });
    });
}

// ==================== SMOOTH PAGE TRANSITIONS ====================
function initPageTransitions() {
    // Add transition overlay
    const overlay = document.createElement('div');
    overlay.id = 'pageTransition';
    overlay.style.cssText = `
        position:fixed; inset:0; background:var(--bg-primary); z-index:9998;
        opacity:0; pointer-events:none; transition: opacity 0.3s ease;
    `;
    document.body.appendChild(overlay);
}

// ==================== FLOATING CTA BADGE ====================
function initFloatingElements() {
    const scrollBtn = document.querySelector('.hero-scroll');
    if (scrollBtn) {
        scrollBtn.style.animation = 'bounce 2s ease-in-out infinite, textGlow 3s ease-in-out infinite alternate';
    }
}

// ==================== INITIALIZE ALL ANIMATIONS ====================
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure DOM is fully rendered
    setTimeout(() => {
        createParticles();
        initScrollAnimations();
        initMagneticButtons();
        initTiltEffect();
        initCursorGlow();
        initParallax();
        initRippleEffect();
        initImageReveal();
        initNavGlow();
        initTypingEffect();
        initSparkleEffects();
        initPageTransitions();
        initFloatingElements();
    }, 300);
});

// Re-initialize for dynamically added content
const originalCreateProductCard = window.createProductCard;
if (typeof originalCreateProductCard === 'function') {
    window.createProductCard = function (...args) {
        const card = originalCreateProductCard.apply(this, args);
        // Re-init tilt after card is in DOM
        requestAnimationFrame(() => {
            initTiltEffect();
            initImageReveal();
        });
        return card;
    };
}
