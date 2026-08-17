// Progressively enhances the headed lists in #work-tabs into an ARIA
// tablist/tabpanel set. If this never runs, the headings stay put and
// the lists just read stacked — no broken layout either way.
(function () {
  var container = document.getElementById("work-tabs");
  if (!container) return;

  var groups = container.querySelectorAll(":scope > .work-group");
  if (groups.length < 2) return;

  var tablist = document.createElement("div");
  tablist.setAttribute("role", "tablist");
  tablist.setAttribute("aria-label", "Our work, by category");
  tablist.className = "work-tablist";

  var tabs = [];

  groups.forEach(function (group, i) {
    var heading = group.querySelector("h3");
    var tabId = "work-tab-" + i;
    var panelId = "work-panel-" + i;

    group.id = panelId;
    group.setAttribute("role", "tabpanel");
    group.setAttribute("aria-labelledby", tabId);
    group.hidden = i !== 0;
    group.classList.remove("mt-10");

    var tab = document.createElement("button");
    tab.type = "button";
    tab.id = tabId;
    tab.className = "work-tab";
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panelId);
    tab.setAttribute("aria-selected", i === 0 ? "true" : "false");
    tab.tabIndex = i === 0 ? 0 : -1;
    tab.textContent = heading.textContent;

    tablist.appendChild(tab);
    tabs.push(tab);
    heading.remove();
  });

  container.insertBefore(tablist, container.firstChild);
  groups.forEach(function (group) {
    group.classList.add("mt-6");
  });

  function selectTab(tab) {
    tabs.forEach(function (t) {
      var selected = t === tab;
      t.setAttribute("aria-selected", selected ? "true" : "false");
      t.tabIndex = selected ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !selected;
    });
    tab.focus();
  }

  tablist.addEventListener("click", function (e) {
    var tab = e.target.closest('[role="tab"]');
    if (tab) selectTab(tab);
  });

  tablist.addEventListener("keydown", function (e) {
    var idx = tabs.indexOf(document.activeElement);
    if (idx === -1) return;

    var next = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = tabs[(idx + 1) % tabs.length];
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = tabs[(idx - 1 + tabs.length) % tabs.length];
    else if (e.key === "Home") next = tabs[0];
    else if (e.key === "End") next = tabs[tabs.length - 1];

    if (next) {
      e.preventDefault();
      selectTab(next);
    }
  });
})();
