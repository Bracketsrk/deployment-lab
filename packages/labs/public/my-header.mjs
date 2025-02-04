import { attachShadow } from "./utils.mjs";

const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
<style>
h1 {
    font-family: "Jersey 15", serif;
    font-weight: 400;
    font-style: normal;
    padding: 0;
    margin: 0;
    font-size: 3rem;
    color: var(--color-text-header);
}
header {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;

    font-family: "Jersey 15", serif;
    font-weight: 400;
    font-style: normal;
    color: var(--color-text-header);
    background-color: var(--color-back-header);
}
a {
    color: var(--color-text-link);
    text-decoration: none;
}
nav {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    font-size: 1.5rem;
    padding: 1rem;
    padding-left: 2rem;
    /* margin: 2rem; */
}
#nav-button {
    display: initial;
    margin: 1.5rem;
}
.nav-link {
    display: none;
}
@media screen and (min-width: 45rem) {
    #nav-button {
        display: none;
    }
    .nav-link {
        display: initial;
    }
    nav {
        flex-direction: row;
    }
}

</style>

<header>
<nav>
    <h1 style="margin-right: 2rem">Elliot Gerlach</h1>
    <a class="nav-link" href="index.html">About me</a>
    <a class="nav-link" href="games.html">Video games</a> 
</nav> 
<label style="align-self: center; margin: 1rem">
    <input type="checkbox" name="darkmode" autocomplete="off" />
    Dark mode
</label>
<button id="nav-button" type="button">Menu</button> 
</header>`;

class MyHeader extends HTMLElement {
    connectedCallback() {
        const shadowRoot = attachShadow(this, TEMPLATE);
        let curPage = window.location.pathname.substring(1);
        const hrefs = shadowRoot.querySelectorAll('a');
        hrefs.forEach(link => {
            const linkLoc = link.getAttribute('href');
            if (linkLoc === curPage) {
                link.style.textDecoration = 'underline';
            }
        });

        // Check dark mode
        var darkMode = shadowRoot.querySelector("input[name=darkmode]");
        const darkModeStore = localStorage.getItem("darkMode");
        if (darkModeStore == "true") {
            document.body.classList.add("dark-mode");
            darkMode.checked = true;
        }

        var button = shadowRoot.getElementById("nav-button");
        button.addEventListener("click", (event) => {
            // var navLinks = document.querySelectorAll('.nav-link');

            // console.log("hi1");

            // if (event.defaultPrevented) return;

            // console.log("hi2");
            // alert("clicked");
            hrefs.forEach(link => {
                if (link.style.display === "none" || link.style.display === "") {
                    link.style.display = "initial"; 
                } else {
                    link.style.display = "none";
                }
            });
            event.preventDefault();
        });

        document.body.addEventListener("click", (event) => {
            if (event.target == this || button.style.display === "") {
                // console.log("Blah2");
                return;
            }

            if (event.defaultPrevented) return;

            // console.log("Blah");
            hrefs.forEach(link => {
                link.style.display = "none"; 
            });
        });

        darkMode.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add("dark-mode");
                localStorage.setItem("darkMode", "true");
            } else {
                document.body.classList.remove("dark-mode");
                localStorage.removeItem("darkMode");
            }
        });
    }
}

customElements.define("my-header", MyHeader);

