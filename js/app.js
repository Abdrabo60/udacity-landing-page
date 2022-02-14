/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
let navBarList = document.querySelector("#navbar__list");
let sections = document.querySelectorAll("section");
let scrollToTopBtn = document.querySelector("#scroll-top");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function buildNav() {
  for (let section of sections) {
    let li = document.createElement("li");
    li.innerHTML = `<a class="menu__link" href="${
      section.id
    }">${section.getAttribute("data-nav")}</a>`;
    navBarList.appendChild(li);
  }
}
// Add class 'active' to section when near top of viewport
function addActiveSectionEvents() {
  for (let section of sections) {
    document.addEventListener("scroll", () => {
      //hide scroll to top button if y position =<10
      scrollToTopBtn.hidden = window.scrollY <= 10;

      let secRect = section.getBoundingClientRect();
      //get child link elemnt to set or remove active
      let aNode;
      document.querySelectorAll("a").forEach((elm) => {
        if (elm.getAttribute("href") === section.id) {
          aNode = elm;
        }
      });
      //check if section top corner in the view port
      if (secRect.top < 50 && secRect.top > -secRect.height + 50) {
        section.classList.add("section-active");
        aNode.classList.add("link-active");
      } else {
        section.classList.remove("section-active");
        aNode.classList.remove("link-active");
      }
    });
  }
}

// Scroll to anchor ID using scrollTO event
function addScrollToSectionEvents() {
  let aList = document.querySelectorAll(".menu__link");
  for (let a of aList) {
    a.onclick = (evt) => {
      evt.preventDefault();
      let section = document.getElementById(a.getAttribute("href"));
      window.scrollTo({ top: section.offsetTop, behavior: "smooth" });
    };
  }
}

function addScrollToTopEvents() {
  scrollToTopBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNav();
// Scroll to section on link click
addScrollToSectionEvents();
// Set sections as active
addActiveSectionEvents();
//add scroll to top on click event
addScrollToTopEvents();
