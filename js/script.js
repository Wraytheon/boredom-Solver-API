const url = "https://www.boredapi.com/api/activity";
document.getElementById("submit").addEventListener("click", getFetch);

function getFetch() {
  const searchInput = document.querySelector("input").value;

  fetch(url)
    /*Gets query value from date input*/
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);

      // const typeSelected = document.getElementById("type")
      // function selectType {
      //   const typeValue = typeSelected.options[typeSelected.selectedIndex].value
      //   const typeResult = typeSelected.options[typeSelected.selectedIndex].text
      //   document.querySelector('input').textContent = typeValue

      // }
      document.getElementById("activity-name").innerText = data.activity;
      document.getElementById("activity-type").innerText = data.type;
      document.getElementById("activity-participants").innerText =
        data.participants;
      document.getElementById("activity-price").innerText = data.price;
      document.getElementById("activity-accessibility").innerText = data.accessibility;
      const linkElement = document.querySelector(".link-el")
      if(data.link === "") {
        linkElement.classList.add("hide")
      } else {
        linkElement.classList.remove("hide")
        document.getElementById("activity-link").innerText = data.link;
      }

      /* Progress bar calc*/
      // document.getElementsByClassName("progress-bar").style.width = data.accessibility * 100 + "%"
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
