function LevelCompleteView(brush, renderRegion, textColor, level, score) {
  this.brush = brush;
  this.renderRegion = renderRegion;
  this.textColor = textColor;
  this.level = level;
  this.score = score;
}

LevelCompleteView.prototype.drawResult = function () {
  var puzzle = this.level.puzzle;
  var result = 'done';
  var state = puzzle.state();
  if (state === 'ace') {
      result = 'ACE!';
  } else if (state === 'done') {
      result = puzzle.number < 10 ? 'LOW!' : 'HIGH';
  } else {
      throw 'Puzzle is still ongoing. Level is not complete.';
  }
  var fontSizeFactor = 0.35;
  if (result === 'LOW!') {
      fontSizeFactor = 0.3;
  } else if (result === '') {
      fontSizeFactor = 0.25;
  }
  this.brush.font = 'bolder ' + Math.min(this.renderRegion.height, this.renderRegion.width) * fontSizeFactor + 'px "Trebuchet MS", sans-serif';
  this.brush.fillText(result, this.renderRegion.width / 2, this.renderRegion.height * 0.175);
};

LevelCompleteView.prototype.drawScore = function () {
  this.brush.font = 'bold ' + Math.min(this.renderRegion.height, this.renderRegion.width) * 0.25 + 'px "Trebuchet MS", sans-serif';
  this.brush.fillText('Level: ' + this.level.getNumber(), this.renderRegion.width / 2, this.renderRegion.height * 0.3);
  this.brush.fillText('End Number: ' + this.level.puzzle.number, this.renderRegion.width / 2, this.renderRegion.height * 0.4);
  this.brush.fillText('Avg: ' + this.score.average().toFixed(4), this.renderRegion.width / 2, this.renderRegion.height * 0.5);
};

LevelCompleteView.prototype.drawControlLabels = function () {
  this.brush.font = 'bold ' + Math.min(this.renderRegion.width, this.renderRegion.height) * 0.1 + 'px "Trebuchet MS", sans-serif';
  this.brush.fillText('< RETRY', this.renderRegion.width / 4, this.renderRegion.height * 0.875);
  this.brush.fillText('NEXT >', 3 * (this.renderRegion.width / 4), this.renderRegion.height * 0.875);
};

LevelCompleteView.prototype.draw = function () {
  this.brush.textAlign = 'center';
  this.brush.textBaseline = 'middle';
  this.brush.fillStyle = this.textColor;
  this.drawResult();
  this.drawControlLabels();
};

