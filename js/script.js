const baseUrl = "https://www.boredapi.com/api/activity";
document.getElementById("submit").addEventListener("click", selectType);
window.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("submit").click();
  }
});

function selectType() {
  const selectedTypeEl = document.getElementById("type");
  const selectedIndex = selectedTypeEl.selectedIndex;
  console.log(selectedIndex);
  if (selectedIndex !== 0) {
    // const typeResult = selectedTypeEl.options[selectedTypeEl.selectedIndex].text;
    const typeValue = selectedTypeEl.options[selectedTypeEl.selectedIndex].value;
    console.log(typeValue);
    // document.querySelector("input").textContent = typeValue;
    url = `${baseUrl}?type=${typeValue}`
  } else {
    url = baseUrl
  }
  getFetch()
}

function getFetch() {
  // const searchInput = document.querySelector("input").value;

  fetch(url)
    /*Gets query value from date input*/
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data)
      console.log(`url: ${url}`)

      document.getElementById("activity-name").innerText = data.activity;
      document.getElementById("activity-type").innerText = data.type;
      document.getElementById("activity-participants").innerText =
        data.participants;
      document.getElementById("activity-price").innerText = data.price;
      document.getElementById("activity-accessibility").innerText =
        data.accessibility;

      const linkElement = document.querySelector(".link-el");
      if (data.link === "") {
        linkElement.classList.add("hide");
      } else {
        linkElement.classList.remove("hide");
        document.getElementById("activity-link").innerText = data.link;
      }

      /* Accessibility bar calc*/
      document.getElementById("accessibility-bar").style.width = 100 - (data.accessibility * 100) + "%"

      /* Price bar calc*/
      document.getElementById("price-bar").style.width = data.price * 100 + "%"

      const resultEl = document.querySelector(".result-container")
      resultEl.classList.remove("hide")

    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
