document.getElementById("submit").addEventListener("click", getFetch)
function getFetch () {
  const searchInput = document.querySelector("input").value;


  fetch("https://www.boredapi.com/api/activity")
                    /*Gets query value from date input*/
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {

      console.log(data);
      const typeSelected = document.getElementById("type")
      // function selectType {
      //   const typeValue = typeSelected.options[typeSelected.selectedIndex].value
      //   const typeResult = typeSelected.options[typeSelected.selectedIndex].text
      //   document.querySelector('input').textContent = typeValue

      // }
      document.getElementById("activity_name").innerText = data.activity;
      document.getElementById("activity_type").innerText = data.type;
      document.getElementById("activity_participants").innerText = data.participants;
      document.getElementById("activity_price").innerText = data.price;
      /* Progress bar calc*/
      // document.getElementsByClassName("progress-bar").style.width = data.accessibility * 100 + "%"

    })
    .catch((err) => {
      console.log(`error ${err}`);
    });

}