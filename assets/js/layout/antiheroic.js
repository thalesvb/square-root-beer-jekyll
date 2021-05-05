
function rewriteAntiHeroic() {
    let content = document.getElementById("antiheroic_content");
    let bannerHeader, cardsHeader;
    let firstLevels = content.getElementsByTagName("H1");
    bannerHeader = firstLevels[0];
    cardsHeader = firstLevels[1];

    buildBanner(bannerHeader);

    if(cardsHeader != null) {
        buildCards(cardsHeader.nextElementSibling);
        let lastElementBeforeCards = cardsHeader.previousElementSibling;
        while(lastElementBeforeCards.nextElementSibling) {
            lastElementBeforeCards.nextElementSibling.remove();
        }
    }
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
function buildCards(nodeStart) {
    let source = document.getElementById("card-template").innerHTML;
    let template = Handlebars.compile(source);
    var cardsSink = document.getElementById("cards");
    
    let node = nodeStart;
    let cardTitle = null;
    let cardDescription = "";

    while(node.nextElementSibling) {
        if (node.tagName === "H2") {
            if (cardTitle !== null) {
                cardsSink.insertAdjacentHTML( 'beforeend', template({title: cardTitle, description: cardDescription}) );
                cardDescription = "";
            }
            cardTitle = node.innerText;
        } else {
            cardDescription += node.innerText;
        }
        node = node.nextElementSibling;
    }
    cardsSink.insertAdjacentHTML( 'beforeend', template({title: cardTitle, description: cardDescription}) );
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", rewriteAntiHeroic);
} else { 
    rewriteAntiHeroic();
}