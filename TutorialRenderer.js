function TutorialRenderer(brush, renderRegion, textColor, blockColor, borderColor, level) {
  this.brush = brush;
  this.renderRegion = renderRegion;
  this.textColor = textColor;
  this.blockColor = blockColor;
  this.borderColor = borderColor || textColor;
  this.level = level;

  this.initial = true;
  this.up = false;
  this.done = false;

  this.lines = [
    'Swipe or type left or right.',
    'Swipe or type down to make a move.',
    'Swipe or type up to start over.',
    'Factors divide. Others add. Go for 1.'
  ];
  this.currentLine = '';
}

TutorialRenderer.prototype.resetFont = function () {
  this.brush.font = 'bold ' + this.renderRegion.width * 0.045 + 'px "Trebuchet MS", sans-serif';
  this.brush.textAlign = 'center';
  this.brush.textBaseline = 'middle';
  this.brush.fillStyle = this.textColor;
};

TutorialRenderer.prototype.draw = function () {
  this.resetFont();
  let line;
  if (this.initial) {
    line = this.lines[0];
    this.initial = false; 
  } else if (!this.up && (this.level.puzzle.history.length === 0)) {
    line = this.lines[1];
  } else if (!this.done && this.level.puzzle.history.length > 0 && !this.up) {
    line = this.lines[2];
    this.up = true; 
  } else if (!this.done) {
    line = this.lines[3];
    this.done = true; 
  }
  
  if (line === this.currentLine || typeof line === 'undefined') {
    return;
  }

  this.currentLine = line; 
  this.drawLine(line);
};

TutorialRenderer.prototype.drawLine = function (text) {
  this.brush.fillStyle = this.blockColor;
  this.brush.strokeStyle = this.textColor;
  this.brush.lineWidth = this.renderRegion.width * 0.005;
  const x = this.renderRegion.x;
  const y = this.renderRegion.y;
  const width = this.renderRegion.width;
  const height = this.renderRegion.height;
  this.brush.fillRect(x, y, width, height);
  this.brush.strokeRect(x, y, width, height);
  this.brush.fillStyle = this.textColor;
  this.brush.fillText(text, x + (width / 2), y + (height / 2));
};
