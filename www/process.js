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

  var clean = function(text) {
    var repl = function(text, x, y) {
      while (text.indexOf(x) > 0) {
        text = text.replace(x, y);
      }
      return text;
    }
    text = repl(text, "<", "&lt;");
    return repl(text, ">", "&gt;");
  }

  for (var idx = jsonResults.length - 1; idx >= 0; idx--) {
    var result = jsonResults[idx];
    var id = result.id;
    var test = result.test;
    var lint = result.lint;

    var tr = document.createElement("tr");
    createTd(tr,
        createHistoryLink(id.substr(0, 6), id, "log") + "&nbsp;" + 
        createLink("gh", "http://www.github.com/danvk/dygraphs/commit/" + id));
    createTd(tr, new Date(Date.parse(result.date))); // TODO(show original date?)

    var testTd = createTd(tr, createHistoryLink(result.testText, id, "test"));
    if (test.toUpperCase() == "FAIL") {
      testTd.className = "test-fail test";
    } else if (test.toUpperCase() == "PASS") {
      testTd.className = "test-pass test";
    } else {
      testTd.className = "test-unknown test";
    }

    var lintTd = createTd(tr, createHistoryLink(lint, id, "lint"));
    if (lint === ":)") {
      lintTd.className = "lint-pass lint";
    } else {
      lintTd.className = "lint-fail lint";
    }

    createTd(tr, clean(result.author));
    createTd(tr, result.description.substr(0, 80));

    tdata.appendChild(tr);
  }
}
