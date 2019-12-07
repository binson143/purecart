function compileTemplate() {
  const templates = document.querySelectorAll("[data-dtl]");
  let container;
  for (let i = 0; i < templates.length; i++) {
    container = templates[i];
    loadPartialViews(container.dataset.dtl).then(d => {
      templates[i].innerHTML = dtlEngine(d, window[container.dataset.bind]);
    });
  }
  // 4th world implementation ,need better solution for compiling and data management,memory management.
}

function loadPartialViews(name) {
  name = `templates/${name}.dtf`;
  return new Promise(function(resolve, reject) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        resolve(this.responseText);
      }
    };
    xhttp.open("GET", name, true);
    xhttp.send();
  });
}

function initRoutes(routes) {
  const links = document.querySelectorAll("[data-link]");
  for (let i = 0; i < links.length; i++) {
    routerLink = links[i];
    const route = routes.find(r => r.path === routerLink.dataset.link);
    if (route) {
      routerLink.addEventListener(
        "click",
        function() {
          performRoute({
            template: route.template,
            templateData: route.data()
          });
        },
        false
      );
    }
  }
}

function performRoute($event) {
  loadPartialViews($event.template).then(ui => {
    document.getElementById("ui-placeHolder").innerHTML = dtlEngine(
      ui,
      $event.templateData
    );
  });
}

function bootstrapApp() {
  initRoutes(window.routes);
  compileTemplate();
}
