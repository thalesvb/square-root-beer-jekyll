---
---
glbUtil = {
    store: function() {
        window.name = JSON.stringify(glbUtil.state);
    },
    restore: function() {
        if (window.name.length === 0) {
            return;
        } 
        glbUtil.state = JSON.parse(window.name);
    },
    state: {
        currentLightMode: null
    }
}
function toggleLightMode () {
    glbUtil.state.currentLightMode = ui("mode") == "dark" ? "light" : "dark";
    ui("mode", glbUtil.state.currentLightMode);
    glbUtil.store();
}
function works_done() {
    var mainClasses = document.getElementById("main").classList;
    var theme = ui("theme", "{{ site.root_beer.beercss.theme }}");
    glbUtil.restore();
    if (!glbUtil.state.currentLightMode && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        glbUtil.state.currentLightMode = "dark";
    }
    if (glbUtil.state.currentLightMode) {
        theme.then(function(){
            ui("mode", glbUtil.state.currentLightMode);
            mainClasses.add("active");
        });
    } else {
        theme.then(function(){ mainClasses.add("active"); });
    }
    document.getElementById("light_mode").onclick = toggleLightMode;
}