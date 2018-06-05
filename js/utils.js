function Utils() {}

var seems = [
  [210, 93, 90],
  [255, 193, 6],
  [62, 167, 68],
  [255, 255, 255],
  [222, 72, 80]
];

//https://stackoverflow.com/questions/1484506/random-color-generator?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
Utils.prototype.getRandomColors = function(quantity, label) {
  let n1 = seems[BOROUGHS.indexOf(label)][0],
    n2 = seems[BOROUGHS.indexOf(label)][1],
    n3 = seems[BOROUGHS.indexOf(label)][2],
    sel = Math.round(Math.random() * 2),
    step = Math.round(255 / quantity);

  let colors = [];

  for (let i = 0; i < quantity; i++) {
    colors.push(this.RGBtoHEX(n1, n2, n3));
  }

  return colors;
}

Utils.prototype.RGBtoHEX = function(a, b, c) {
  a = a.toString(16);
  if (a.length < 2) {
    a = "0" + a;
  }
  b = b.toString(16);
  if (b.length < 2) {
    b = "0" + b;
  }
  c = b.toString(16);
  if (c.length < 2) {
    c = "0" + c;
  }

  return "#" + a + b + c;
}
