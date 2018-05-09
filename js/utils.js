function Utils() {

}

//https://stackoverflow.com/questions/1484506/random-color-generator?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
Utils.prototype.getRandomColor = function() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
