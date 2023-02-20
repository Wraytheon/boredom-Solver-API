/* Api request url*/
const baseUrl = "https://www.boredapi.com/api/activity";

/*Run program if user presses submit button or hits Enter key*/
document.getElementById("submit").addEventListener("click", selectType);
window.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("submit").click();
  }
});

/*Get value of selected input from dropdown to display correct categorical results*/
function selectType() {
  const selectedTypeEl = document.getElementById("type");
  const selectedIndex = selectedTypeEl.selectedIndex;
  console.log(selectedIndex);
  /*If the selected dropdown option is not "Random" (the first index) get the value of the selected option and displays corresponding results*/
  if (selectedIndex !== 0) {
    const typeValue =
      selectedTypeEl.options[selectedTypeEl.selectedIndex].value;
    url = `${baseUrl}?type=${typeValue}`;
    /*If selected option from dropdown is "Random", set url to api that retrieves random data each time*/
  } else {
    url = baseUrl;
  }
  getFetch();
}

function getFetch() {
  fetch(url)
    /*Gets query value from date input*/
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);

      /*Display activity name*/
      document.getElementById("activity-name").innerText = data.activity;

      /*Capitalize first letter for activity name then display it */
      const activityType = data.type;
      document.getElementById("activity-type").innerText =
        activityType.charAt(0).toUpperCase() + activityType.slice(1);
      document.getElementById("activity-participants").innerText =
        data.participants;

      /*Only show link element if link is received from API data*/
      const linkElement = document.querySelector(".link-el");
      if (data.link === "") {
        linkElement.classList.add("hide");
      } else {
        linkElement.classList.remove("hide");
        document.getElementById("activity-link").innerText = data.link;
      }

      /* Accessibility bar calc*/
      document.getElementById("accessibility-bar").style.width =
        100 - data.accessibility * 100 + "%";

      /* Price bar calc*/
      document.getElementById("price-bar").style.width = data.price * 100 + "%";

      /*Display result container*/
      const resultEl = document.querySelector(".result-container");
      resultEl.classList.remove("hide");
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
