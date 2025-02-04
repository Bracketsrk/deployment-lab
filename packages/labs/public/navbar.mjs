// import toHtmlElement from toHtmlElement;

// import { toHtmlElement } from "./toHtmlElement.mjs";
// // import { attachShadow } from "./utils.mjs";
// // import { MyHeader } from "./my-Headers.mjs";
// import { attachShadow } from "./utils.mjs";
// import { TEMPLATE } from "my-header.mjs";

// class MyHeader extends HTMLElement {
//     connectedCallback() {
//         const shadowRoot = attachShadow(this, TEMPLATE);
//     }
// }

// customElements.define("my-header", MyHeader);

// // console.log("Hello");
// // const tagname = "nav";
// // document.createElement(tagname);

// // const navbar = toHtmlElement('<nav><h1 style="margin-right: 2rem">Elliot Gerlach</h1><a href="index.html">About me</a><a href="games.html">Video games</a></nav>')

// // var shadow = attachShadow('my-header', MyHeader)

// window.addEventListener("load", () => { // Create a function on the fly
//     // Code in this function will run once the page is done loading

//     // Replace navbar with the one in this file
//     // const navbarOrig = document.getElementsByTagName("nav")[0];
//     // navbarOrig.replaceWith(navbar);

//     // Find the current page and underline the link so that the user knows
//     // where they are
//     // var header = document.getElementById("myDIV");
//     let curPage = window.location.pathname.substring(1);
//     const hrefs = shadowRoot.querySelectorAll('a');
//     hrefs.forEach(link => {
//         const linkLoc = link.getAttribute('href');
//         if (linkLoc === curPage) {
//             link.style.textDecoration = 'underline';
//         }
//     });
// });