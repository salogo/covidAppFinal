let box = document.getElementById("box")

// Fetching datas from US Public Health Laboratory Testing for COVID-19 API
// https://covid19-docs.chrismichael.now.sh/
fetch("https://covid19api.io/api/v1/TestsInUS")
    .then(response => response.json())
    .then(datat =>{
      const labels = datat.tests.table.map((value)=> value.DateCollected)
      const lab = datat.tests.table.map((value)=> parseInt(value.USPublicHealthLabs) );

// Using jsbin graphic library to display Statistic Chart 
//https://jsbin.com/?html,console,output

  function displayLineChart() {
    var data = {
        labels ,
        datasets: [
            {
                label: "CUSPublicHealthLabs",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: lab
            }
        ]
    };
    var ctx = document.getElementById("lineChart").getContext("2d");
    var options = { };
    var lineChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
  });
  }

 displayLineChart()
  })