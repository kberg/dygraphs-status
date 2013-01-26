function buildTable() {
  var tdata = document.getElementById("table");

  var createLink = function(text, href) {
    return "<a href='" + href + "'>" + text + "</a>";
  }

  var createHistoryLink = function(text, id, file) {
    return createLink(text, "../history/" + id + "/" + file);
  }

  var createTd = function(tr, text) {
    var td = document.createElement("td");
    td.innerHTML = text;
    tr.appendChild(td);
    return td;
  }

  for (var idx = jsonResults.length - 1; idx >= 0; idx--) {
    var result = jsonResults[idx];
    var id = result.id;
    var test = result.test;
    var lint = result.lint;

    var tr = document.createElement("tr");
    createTd(tr, id + " " + createHistoryLink("log", id, "log"));
    createTd(tr, "todo");
    createTd(tr, createHistoryLink(test, id, "test"));
    createTd(tr, createHistoryLink(lint, id, "lint"));

    tdata.appendChild(tr);
  }
}