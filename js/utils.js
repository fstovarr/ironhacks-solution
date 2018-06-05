function Utils() {}

var seems = [
  [210, 93, 90],
  [255, 193, 6],
  [62, 167, 68],
  [255, 255, 255],
  [222, 72, 80]
];

Utils.prototype.downloadCSV = function(filename, json) {
  var data, link;

  var csv = this.JSONtoCSV({
    data: json
  });

  if (csv == null) return;

  filename = filename || 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);
  
  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}

Utils.prototype.JSONtoCSV = function(args) {
  var result, ctr, keys, columnDelimiter, lineDelimiter, data;

  data = args.data || null;
  if (data == null || !data.length) {
    return null;
  }

  columnDelimiter = args.columnDelimiter || ',';
  lineDelimiter = args.lineDelimiter || '\n';

  keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(function(item) {
    ctr = 0;
    keys.forEach(function(key) {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

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
