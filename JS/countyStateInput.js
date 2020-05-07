// State and County HTML
let countyList = document.getElementById("countyList");
let errorList = document.getElementById("errorList");
let stateName = document.getElementById("stateTextBox");
let countyName = document.getElementById("countyTextBox");
let hospitalized = document.getElementById("hospitalList");

// Enter Button HTML
let enterButton = document.getElementById("enterButton");

// Enter Button functionality
enterButton.addEventListener("click", function () {
  if (stateName.value) {
    getStateInfo();
  }
  if (countyName) {
    getCountyInfo();
  }

  //Function to get STATE stats on deaths, infected, etc.
  function getStateInfo() {
    let DailyDataURL = "https://covidtracking.com/api/states/daily";
    //API Call
    fetch(DailyDataURL)
      .then((response) => response.json())
      .then((result) => {
        //Function to return state initials from state name
        let stateAbbr = abbrState(stateName.value, "abbr");
        const state = result.find((stateObject) => {
          if (stateObject.state == stateAbbr) {
            return stateObject;
          }
        });
        if (!state) {
          return;
        }
        let stateFacts = `<ul class="output">
                            <h5><p>${state.state} as of ${state.lastUpdateEt}<p></h5>
                            <p>Number Infected: ${state.positive}</p>
                            <p>Hospitalized Currently: ${state.hospitalizedCurrently}</p>
                            <p>Deaths: ${state.death}</p>
                            <p>Recovered: ${state.recovered}</p>
                          </ul>`;

        errorList.innerHTML = "";
        hospitalList.innerHTML = stateFacts;

        //Exception handling
      })
      .catch(function (err) {
        hospitalList.innerHTML = "";
        errorList.innerHTML =
          "Error. Please enter a valid state and/or county.";
      });
  }

  //Function to get COUNTY contact info
  function getCountyInfo() {
    let state = stateTextBox.value.toLowerCase();
    state = state.replace(" ", "-");
    let stateURL = `https://postman-data-api-templates.github.io/county-health-departments/api/${state}.json`;
    // API Call
    fetch(stateURL)
      .then((response) => response.json())
      .then((result) => {
        let countyId = result.find((county) =>
          county.name.toLowerCase().includes(countyName.value.toLowerCase())
        );
        let countyFacts = `<ul class = "output">
                                <p><h5><a href = "${countyId.website}">${
          countyId.name
        }</a></h5></p>
                                <p>${countyId.phone}</p>
                                <p>Address: ${
                                  countyId.undefined
                                    ? countyId.undefined
                                    : countyId.address
                                }</p>
                                <a class="btn btn-block btn-social btn-twitter">
                                <a href ="${
                                  countyId.twitter
                                }" span class="fa fa-twitter"></span> Latest Tweets</a>
                                <a class="btn btn-block btn-social btn-facebook">
                                <a href ="${
                                  countyId.facebook
                                }" span class="fa fa-facebook"></span> Updates</a>
                            </ul>`;
        errorList.innerHTML = "";
        infoList.innerHTML = countyFacts;

        // Exception handling
      })
      .catch(function () {
        infoList.innerHTML = "";
        errorList.innerHTML =
          "Error. Please enter a valid state and/or county.";
      });
  }
});
