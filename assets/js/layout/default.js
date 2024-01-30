---
---
'use strict';
var glbUtil = {
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
    const lightState = ui("mode") == "dark" ? "light" : "dark";
    glbUtil.state.currentLightMode = lightState;
    ui("mode", glbUtil.state.currentLightMode);
    lightToggles(lightState);
    glbUtil.store();
}

function lightToggles(lightState) {
    const toggles = [];
    for (let lightToggle of ["light_mode", "light_mode_small"]) {
        const lightToggleElem = document.getElementById(lightToggle);
        const toggleIcon = lightToggleElem.getElementsByTagName("i")[0];
        if (toggleIcon) {
            toggleIcon.innerText = `${lightState}_mode`;
        }
        toggles.push(lightToggleElem);
    }
    return toggles;
}

function works_done() {
    glbUtil.restore();
    var mainClasses = document.getElementById("main").classList;
    var theme = ui("theme", "{{ site.root_beer.beercss.theme }}");
    function applyStoredLightMode(lightMode) {
        lightMode && ui("mode", lightMode);
        mainClasses.add("active");
        const currentLightToggleIcon = glbUtil.state.currentLightMode === "dark" ? "dark_mode" : "light_mode";
        const toggles = lightToggles(currentLightToggleIcon);
        for (let lightToggle of toggles) {
            lightToggle.onclick = toggleLightMode;
        }
    }
    if (!glbUtil.state.currentLightMode && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        glbUtil.state.currentLightMode = "dark";
    }
    if (theme.then) {
        theme.then(applyStoredLightMode.bind(null, glbUtil.state.currentLightMode));
    } else {
        applyStoredLightMode(glbUtil.state.currentLightMode);
    }
}