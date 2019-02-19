$(document).ready(function () {
    //Bar Chart 1 JS
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: ["General", "Training", "Equip & D", "Infrastructure", "Manpower", "L&D"],
            datasets: [{
                label: '# Score',
                data: [120, 70, 110, 120, 100, 120],
                backgroundColor: [
                'rgb(0, 184, 255)',
                'rgb(225, 42, 42)',
                'rgb(0, 194, 232)',
                'rgb(225, 128, 0)',
                'rgb(63, 72, 204)',
                'rgb(39, 216, 139)'
            ],
                borderColor: [
                'rgba(0, 184, 255, 0)',
                'rgba(225, 42, 42, 0)',
                'rgba(0, 194, 232, 0)',
                'rgba(225, 128, 0, 0)',
                'rgba(63, 72, 204, 0)',
                'rgba(39, 216, 139, 0)'
            ],
                borderWidth: 0
        }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: '#444',
                        fontFamily: "'Roboto', sans-serif",
                        max: 120
                    },
                    gridLines: {
                        offsetGridLines: false,
                        display: false,
                        tickMarkLength: 12,
                        drawBorder: false
                    }
                }],
                yAxes: [{
                    /*barThickness: 28,*/
                    position: 'left',
                    ticks: {
                        beginAtZero: true,
                        fontColor: '#444',
                        fontFamily: "'Roboto', sans-serif"
                    },
                    gridLines: {
                        offsetGridLines: false,
                        display: false,
                        tickMarkLength: 12,
                        drawBorder: false
                    }
                }]
            },
            legend: {
                display: false
            }

        }
    });

    //Bar Chart 2 JS
    var ctx2 = document.getElementById("myChart2").getContext('2d');
    var myChart2 = new Chart(ctx2, {
        type: 'horizontalBar',
        data: {
            labels: ["General", "Training", "Equip & D", "Infrastructure", "Manpower", "L&D"],
            datasets: [{
                label: '# Score',
                data: [16, 20, 12, 16, 11, 17],
                backgroundColor: [
                'rgb(0, 184, 255)',
                'rgb(225, 42, 42)',
                'rgb(0, 194, 232)',
                'rgb(225, 128, 0)',
                'rgb(63, 72, 204)',
                'rgb(39, 216, 139)'
            ],
                borderColor: [
                'rgba(0, 184, 255, 0)',
                'rgba(225, 42, 42, 0)',
                'rgba(0, 194, 232, 0)',
                'rgba(225, 128, 0, 0)',
                'rgba(63, 72, 204, 0)',
                'rgba(39, 216, 139, 0)'
            ],
                borderWidth: 0
        }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: '#444',
                        fontFamily: "'Roboto', sans-serif",
                        max: 20
                    },
                    gridLines: {
                        offsetGridLines: false,
                        display: false,
                        tickMarkLength: 12,
                        drawBorder: false
                    }
                }],
                yAxes: [{
                    /*barThickness: 28,*/
                    position: 'left',
                    ticks: {
                        beginAtZero: true,
                        fontColor: '#444',
                        fontFamily: "'Roboto', sans-serif"
                    },
                    gridLines: {
                        offsetGridLines: false,
                        display: false,
                        tickMarkLength: 12,
                        drawBorder: false
                    }
                }]
            },
            legend: {
                display: false
            }

        }
    });

    //Pie Chart
    new Chart(document.getElementById("pie-chart"), {
        type: 'pie',
        data: {
            labels: ["General", "Training", "Equip & D", "Infrastructure", "Manpower", "L&D"],
            datasets: [{
                label: "Population (millions)",
                backgroundColor: ["#f57f20", "#4a55a5", "#56bd84", "#ee3432", "#09c1e7", "#fec010"],
                data: [35, 5, 15, 10, 15, 20]
      }]
        },
        options: {
            title: {
                display: false
            },
            legend: {
                display: true,
                position: 'bottom'
            }
        }
    });
    // Side bar JS
    $('.sidebar-toggle').click(function () {
        $('body').toggleClass('sidebar-small');
    });

});

// (function ($) {
//     $(window).on("load", function () {
//         $(".districts-table").mCustomScrollbar({
//             scrollbarPosition: "outside"
//         });
//     })
// })(jQuery);