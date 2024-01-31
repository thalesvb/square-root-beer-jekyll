---
---

const Search = (function () {

    class SearchEngine {
        #db;
        #engine;
        async search(term) {
            if(!term) {
                return;
            }
            if (!this.#engine) {
                try {
                    this.#engine = await this.#initializeEngine();
                } catch(err) {
                    console.log("Search not available at this time");
                    console.error(err);
                    return;
                }
            }
            const resultsEngine = this.#engine.search(term);
            const results = [];
            for (let re of resultsEngine) {
                const entry = this.#db[re.ref];
                results.push(entry);
            }
            return results;
        }
        
        async #initializeEngine() {
            await Promise.all([
                this.#loadLibrary("https://unpkg.com/lunr@2.3.9/lunr.min.js", "sha384-203J0SNzyqHby3iU6hzvzltrWi/M41wOP5Gu+BiJMz5nwKykbkUx8Kp7iti0Lpli"),
                this.#loadLibrary("https://unpkg.com/handlebars@4.7.8/dist/handlebars.min.js", "sha384-/7IOPDPk7kcWe970wNJpeApuC/EzCQwonLz5G/s//R5Jji9QWBcbfASHI0G1nh2p"),
                this.#loadDatabase()
            ]);

            const db = this.#db;
            
            const engine = lunr(function (){
                this.ref('slug');
                this.field('title', { boost: 10 });
                this.field('author');
                this.field('category');
                this.field('content');
                
                for (let slug in db) {
                    const entry = db[slug];
                    this.add({
                        ...entry,
                        slug: slug
                    });
                }
            });

            return engine;
        }

        async #loadDatabase() {
            this.#db = await (await fetch("{{ "/assets/js/se/db_posts.json" | relative_url }}")).json();
        }

        async #loadLibrary(url, integrityHash) {
            return new Promise((resolve, reject) => {
                const libElem = document.createElement("script");
                libElem.type = "text/javascript";
                libElem.src = url;
                libElem.crossOrigin = "anonymous";
                if (integrityHash) {
                    libElem.integrity = integrityHash;
                }
                libElem.addEventListener("load", () => {resolve();});
                libElem.addEventListener("error", () => {
                    reject({
                        message: `Failed to load Search library ${url}`
                    });
                });
                libElem.setAttribute("defer", true);
                document.body.appendChild(libElem);
            });
        }
    }

    class SearchUI {
        presentTerm(term) {
            if (!term) {
                return;
            }
            const termElem = document.getElementsByName('query')[0];
            termElem.value = term;
        }
        presentResults(results) {
            const resultsElem = document.getElementById('search-results');
            let html = "";
            if (results && results.length) {
                const resTemplate = this.#template('result-entry-template');
                for (let r of results) {
                    html += resTemplate(r);
                }
                if (html.length) {
                    resultsElem.innerHTML = html;
                }
            } else {
                const noResTemplate = this.#template('no-results-template');
                resultsElem.innerHTML = noResTemplate();
            }
        }
        #template(id) {
            const resultTemplateSource = document.getElementById(id).innerHTML;
            return Handlebars.compile(resultTemplateSource);
        }
    }

    let engine;
    let ui;
    return {
        process: function() {
            if (!engine) {
                engine = new SearchEngine();
                ui = new SearchUI();
            }
            const params = new URLSearchParams(window.location.search)
            const term = params.get("query");
            if(term) {
                ui.presentTerm(term);
                engine.search(term).then((results) => {
                    ui.presentResults(results);
                });
            }
        }
    }
})();

Search.process();