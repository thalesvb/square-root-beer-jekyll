
function rewriteAntiHeroic() {
    let content = document.getElementById("antiheroic_content");
    let bannerHeader;
    let firstLevels = content.getElementsByTagName("H1");
    bannerHeader = firstLevels[0];
    buildBanner(bannerHeader);

    works_done();
}

function buildBanner(nodeStart) {
    let source = document.getElementById("banner-template").innerHTML;
    let template = Handlebars.compile(source);
    let title = nodeStart.innerText;
    let short_desc = nodeStart.nextElementSibling.innerText;
    document.getElementById("antiheroic_banner").insertAdjacentHTML( 'afterbegin', template({title: title, short_description: short_desc}));
    let parent = nodeStart.parentElement;
    parent.removeChild(nodeStart.nextElementSibling);
    parent.removeChild(nodeStart);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", rewriteAntiHeroic);
} else { 
    rewriteAntiHeroic();
}