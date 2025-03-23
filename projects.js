document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach((card) => {
    // Add click-to-open functionality
    card.addEventListener('click', () => {
      const url = card.getAttribute('data-url');
      if (url) {
        window.open(url, '_blank');
      }
    });

    // Parallax-like effect on hover
    card.addEventListener('mousemove', (e) => {
      const { offsetX, offsetY, target } = e;
      const width = target.offsetWidth;
      const height = target.offsetHeight;
      const xMove = (offsetX / width - 0.5) * 15;
      const yMove = (offsetY / height - 0.5) * 15;

      card.style.transform = `translate(${xMove}px, ${yMove}px) scale(1.05)`;
    });

    // Reset animation on mouse leave
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translate(0, 0) scale(1)';
    });
  });
});
