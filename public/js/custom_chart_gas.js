
  var gas_01 =  {
    type: 'line',
    data: {
    labels: [],
    datasets: [{
      label: "가스",
      backgroundColor: "rgba(38, 185, 154, 0.31)",
      borderColor: "rgba(38, 185, 154, 0.7)",
      pointBorderColor: "rgba(38, 185, 154, 0.7)",
      pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointBorderWidth: 1,
      data: []
    }]
  },
  options:{
    responsive:true,
    scales:{
      yAxes:[{
        ticks:{
          suggestedMax: 100,
          beginAtZero : true
        },
        display:true
      }]
    }
  }
 };


function init_charts_gas() {

    console.log('run_charts  typeof [' + typeof (Chart) + ']');

    if( typeof (Chart) === 'undefined'){ return; }

    console.log('init_charts');


    Chart.defaults.global.legend = {
      enabled: false

    };

  var gas1 = document.getElementById("gas01");
  window.gasLine1 = new Chart(gas1,gas_01);

}
$(document).ready(function() {

 init_charts_gas();

});


const socket03 = io.connect("http://127.0.0.1:3000");

socket03.on('dashValue',function (dataArray) {
  var wtMax= 12; // 그래프 점 갯수
  var now = new Date();
  var hour = now.getHours();
  var min = now.getMinutes();
  var second = now.getSeconds();


  // gas_01
  if(gas_01.data.datasets.length>0){
    gas_01.data.labels.push(hour+":"+min+":"+second);

    if(gas_01.data.labels.length==wtMax){
      $.each(gas_01.data.datasets,function (i,datasets) {
        gas_01.data.labels.shift(0,wtMax);
        gas_01.data.datasets[0].data.shift(0,wtMax-1);
        gas_01.data.datasets[0].data.push(dataArray[2]);
      })
    }
    else{
      $.each(gas_01.data.datasets,function (i,datasets) {
        gas_01.data.datasets[0].data.push(dataArray[2]);
      })
    }

    window.gasLine1.update();
  }
});
