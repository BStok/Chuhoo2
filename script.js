let highestZ = 1;

class Paper {
  constructor() {
    this.holdingPaper = false;
    this.startX = 0;
    this.startY = 0;
    this.prevX = 0;
    this.prevY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.currentX = 0;
    this.currentY = 0;
    this.rotating = false;
  }

  init(paper) {
    // Mouse Events
    paper.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.prevX = this.startX;
      this.prevY = this.startY;
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.holdingPaper) return;

      this.velX = e.clientX - this.prevX;
      this.velY = e.clientY - this.prevY;
      this.currentX += this.velX;
      this.currentY += this.velY;

      this.prevX = e.clientX;
      this.prevY = e.clientY;

      paper.style.transform = `translateX(${this.currentX}px) translateY(${this.currentY}px) rotateZ(${this.rotation}deg)`;
    });

    document.addEventListener('mouseup', () => {
      this.holdingPaper = false;
    });

    // Touch Events
    paper.addEventListener('touchstart', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ++;

      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      this.prevX = this.startX;
      this.prevY = this.startY;
    });

    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];

      this.velX = touch.clientX - this.prevX;
      this.velY = touch.clientY - this.prevY;
      this.currentX += this.velX;
      this.currentY += this.velY;

      this.prevX = touch.clientX;
      this.prevY = touch.clientY;

      paper.style.transform = `translateX(${this.currentX}px) translateY(${this.currentY}px) rotateZ(${this.rotation}deg)`;
    });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
