
  var humi_01 =  {
    type: 'line',
    data: {
    labels: [],
    datasets: [{
      label: "습도",
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
          suggestedMax:100,
          suggestedMin:0
        },
        display:true
      }]
    }
  }
 };


function init_charts_humi() {

    console.log('run_charts  typeof [' + typeof (Chart) + ']');

    if( typeof (Chart) === 'undefined'){ return; }

    console.log('init_charts');


    Chart.defaults.global.legend = {
      enabled: false

    };

  var humi1 = document.getElementById("humi01");

  window.humiLine1 = new Chart(humi1,humi_01);

}
$(document).ready(function() {

 init_charts_humi();

});


const socket01 = io.connect("http://127.0.0.1:3000");

socket01.on('dashValue',function (dataArray) {
  var wtMax= 12; // 그래프 점 갯수
  var now = new Date();
  var hour = now.getHours();
  var min = now.getMinutes();
  var second = now.getSeconds();


  // humi_01
  if(humi_01.data.datasets.length>0){
    humi_01.data.labels.push(hour+":"+min+":"+second);

    if(humi_01.data.labels.length==wtMax){
      $.each(humi_01.data.datasets,function (i,datasets) {
        humi_01.data.labels.shift(0,wtMax);
        humi_01.data.datasets[0].data.shift(0,wtMax-1);
        humi_01.data.datasets[0].data.push(dataArray[1]);
      })
    }
    else{
      $.each(humi_01.data.datasets,function (i,datasets) {
        humi_01.data.datasets[0].data.push(dataArray[1]);
      })
    }

    window.humiLine1.update();
  }

});
