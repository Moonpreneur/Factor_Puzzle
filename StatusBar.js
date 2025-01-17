function StatusBar(brush, renderRegion, fontSize, score, level, offsetTop) {
  this.brush = brush;
  this.fontSize = fontSize;
  this.renderRegion = renderRegion;
  this.score = score;
  this.level = level;
  this.offsetTop = offsetTop || 0;
}

StatusBar.prototype.draw = function () {
  this.brush.font = this.fontSize + 'px "Trebuchet MS", sans-serif';
  this.brush.textAlign = 'left';
  this.brush.textBaseline = 'top';
  this.brush.fillStyle = this.level.palette.numberColor.toString();
  var levelStr = 'Level ' + this.level.getNumber();
  this.brush.fillText(levelStr, this.renderRegion.x, this.renderRegion.y + this.offsetTop);
  this.brush.textAlign = 'right';
  this.brush.fillText('[Select level]', this.renderRegion.x + this.renderRegion.width, this.renderRegion.y + this.offsetTop);
};

StatusBar.prototype.redraw = function () {
  this.brush.clearRect(this.renderRegion.x, this.renderRegion.y, this.renderRegion.width, this.renderRegion.height);
  this.draw();
};

