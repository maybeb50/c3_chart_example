/* Example 1 */
var g_barChart = null;
var g_workTimeInfo = {
    "totalAvgWorkTime": 106.21,
    "maxTotalTime": 239.2,
    "totalTime": 184.0,
    "standardTime": 128,
    "total": {
        "overtime": 0.0,
        "workTime": 106.21,
        "xaxis": "avg",
        "xaxisName": "\uD3C9\uADE0"
    },
    "workTimeList": [
        {
            "overtime": 0.0,
            "workTime": 103.17,
            "xaxis": "14664",
            "xaxisName": "1"
        },
        {
            "overtime": 0.0,
            "workTime": 119.38,
            "xaxis": "17949",
            "xaxisName": "2"
        },
        {
            "overtime": 0.0,
            "workTime": 87.72,
            "xaxis": "13590",
            "xaxisName": "3"
        },
        {
            "overtime": 0.0,
            "workTime": 128.38,
            "xaxis": "13588",
            "xaxisName": "4"
        }, {
            "overtime": 0.0,
            "workTime": 125.07,
            "xaxis": "13589",
            "xaxisName": "5"
        }, {
            "overtime": 0.0,
            "workTime": 139.82,
            "xaxis": "17950",
            "xaxisName": "6"
        }, {
            "overtime": 0.0,
            "workTime": 85.87,
            "xaxis": "13597",
            "xaxisName": "7"
        }, {
            "overtime": 0.0,
            "workTime": 81.63,
            "xaxis": "13598",
            "xaxisName": "8"
        }, {
            "overtime": 68.83,
            "workTime": 184.0,
            "xaxis": "17519",
            "xaxisName": "9"
        }, {
            "overtime": 0.0,
            "workTime": 79.87,
            "xaxis": "18151",
            "xaxisName": "10"
        }, {
            "overtime": 0.0,
            "workTime": 125.0,
            "xaxis": "13591",
            "xaxisName": "11"
        }, {
            "overtime": 0.0,
            "workTime": 86.92,
            "xaxis": "14665",
            "xaxisName": "12"
        }, {
            "overtime": 0.0,
            "workTime": 125.0,
            "xaxis": "13593",
            "xaxisName": "13"
        }, {
            "overtime": 0.0,
            "workTime": 50.0,
            "xaxis": "13594",
            "xaxisName": "14"
        }, {
            "overtime": 0.0,
            "workTime": 94.19,
            "xaxis": "13595",
            "xaxisName": "15"
        }, {
            "overtime": 0.0,
            "workTime": 86.34,
            "xaxis": "13586",
            "xaxisName": "16"
        }, {
            "overtime": 0.0,
            "workTime": 92.28,
            "xaxis": "13596",
            "xaxisName": "17"
        }
    ]
};

var arrXAxis = ['x', g_workTimeInfo.total.xaxis];
var arrWorkTime = ['작업시간', g_workTimeInfo.total.workTime];
var arrOverTime = ['초과시간', g_workTimeInfo.total.overtime];
var objXAxisName = {'avg': g_workTimeInfo.total.xaxisName}; // 평균 

for (var index in g_workTimeInfo.workTimeList) {
    var dt = g_workTimeInfo.workTimeList[index];
    
    arrXAxis.push(dt.xaxis);
    arrWorkTime.push(dt.workTime);
    arrOverTime.push(dt.overtime);
    objXAxisName[dt.xaxis] = dt.xaxisName;
}

var columnsData = [arrXAxis, arrWorkTime, arrOverTime];

var maxY = 0;
for(var i=1; i < columnsData[1].length; i++) {
    var value = columnsData[1][i] + columnsData[2][i];      // 작업시간 + 초과시간
    maxY = (maxY < value) ? value : maxY;   // maxY, value 값을 비교해서 큰 수를 maxY에 담는다
}

var max_total_time = g_workTimeInfo.maxTotalTime;   // 52시간 기준 totalTime : 239.2;
maxY = (maxY > max_total_time) ? maxY : max_total_time; // 작업시간+초과시간 값과 토탈시간 비교해서 더 큰 값을 maxY에 저장

/* Chart */
g_barChart = c3.generate({
    bindto: '#chart1',
    size: {
        width: null,
        height: 500
    },
    bar: {
        width: 50,
        ratio: 0.5
    },
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    color: {
        pattern: ['#5dbac6', '#b585c0', '#ED2222', '#ACB6DD']
    },
    grid: {
        x: {
            show: false
        },
        y: {
            lines: [
                {value: g_workTimeInfo.maxTotalTime, text: '주52시간 기준 ' + g_workTimeInfo.maxTotalTime, position: 'start', class:'red'},
                {value: g_workTimeInfo.totalTime, text: '주40시간 기준 ' + g_workTimeInfo.totalTime, position: 'start', class:'red'},
                {value: g_workTimeInfo.standardTime, text: '현시점 기준시간 ' + g_workTimeInfo.standardTime, position: 'start', class:'red'},
                {value: g_workTimeInfo.totalAvgWorkTime, text: '평균시간 '+ g_workTimeInfo.totalAvgWorkTime, position: 'start', class:'red'},
            ]
        }
    },
    axis: {
        rotated: false,
        x: {
            type: 'category',
            centered: true,
            tick: {
                format: function(x) {
                    return objXAxisName[arrXAxis[x + 1]];
                }
            }
        },
        y: {
            show: false,
            max: maxY,
        }
    },
    tooltip: {
        grouped: true
    },
    legend: {
        show: true,
        position: 'inset', 
        inset: {
            anchor: 'top-right', 
            x: 0,
            y: 0,
            step: undefined
        }
    },
    data: {
        x: 'x',
        columns: columnsData,
        names: objXAxisName,
        groups: [
            ['작업시간', '초과시간']
        ],
        type: 'bar',
        order: null,
        empty: {
            label: {
                text: '데이터가 없습니다'
            }
        },
        labels: {
            format: function(v, id, i, j) {
                if(id === '초과시간') {
                    if(v > 0) {
                        return v; 
                    } else {
                        return '';
                    }
                } else {
                    return v;
                };
            }
        },
        color: function(inColor, data) {
            var color = ['#5dbac6', '#b585c0', '#ED2222', '#ACB6DD'];
            if(data.id === '작업시간') {
                return color[0];
            } else if(data.id === '초과시간') {
                return color[1];
            }
            return inColor;
        },
    },
});
    

/* Example 2 */
var g_pieChartClient = null;
var g_todoClientList = [
    {
        "todoDate": null,
        "clientNo": 48,
        "clientTitle": "1",
        "todoMinuteTotal": 30,
        "todoMinuteNormal": 30,
        "todoMinuteExtend": 0,
        "sum": 26231,
        "ratio": 0.11
    },
    {
        "todoDate": null,
        "clientNo": 19,
        "clientTitle": "2",
        "todoMinuteTotal": 1124,
        "todoMinuteNormal": 1047,
        "todoMinuteExtend": 77,
        "sum": 26231,
        "ratio": 4.29
    },
    {
        "todoDate": null,
        "clientNo": 47,
        "clientTitle": "3",
        "todoMinuteTotal": 3322,
        "todoMinuteNormal": 3082,
        "todoMinuteExtend": 240,
        "sum": 26231,
        "ratio": 12.66
    },
    {
        "todoDate": null,
        "clientNo": 84,
        "clientTitle": "4",
        "todoMinuteTotal": 4648,
        "todoMinuteNormal": 4479,
        "todoMinuteExtend": 169,
        "sum": 26231,
        "ratio": 17.72
    }, {
        "todoDate": null,
        "clientNo": 1,
        "clientTitle": "5",
        "todoMinuteTotal": 17047,
        "todoMinuteNormal": 16424,
        "todoMinuteExtend": 623,
        "sum": 26231,
        "ratio": 64.99
    }, {
        "todoDate": null,
        "clientNo": 42,
        "clientTitle": "6",
        "todoMinuteTotal": 60,
        "todoMinuteNormal": 60,
        "todoMinuteExtend": 0,
        "sum": 26231,
        "ratio": 0.23
    }
];

var arrColumns = new Array();
var objNames = {};

for (var index in g_todoClientList) {
    var dt = g_todoClientList[index];
    var id = 'data' + index + '_' + dt.clientNo;
    arrColumns.push([id, dt.ratio]);
    objNames[id] = dt.clientTitle;
}

arrColumns.sort(function(a, b) {
    return b[1] - a[1];
})

function chart2Fn() {
    /* Chart */
    g_pieChartClient = c3.generate({
        bindto: '#chart2',
        size: {
            height: 84
        },
        bar: {
            width: 84,
        },
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        color: {
            pattern: ['#3867d6', '#45aaf2', '#77c8d7', '#26de81', '#249b23', '#ff5723', '#ffeb3c', '#795548', '#ff9800', '#eb3b5a', '#e51c22', '#9d27b0',
                    '#592337', '#1b91bf', '#f2b950', '#f26835', '#f23a29', '#3c74a6', '#66b8d9', '#bcbf60', '#d9a25f', '#d95436', '#3e403f']
        },
        axis: {
            rotated: true,

            x: {
                show: true,
                tick: {
                    outer: false,
                    values: ['']
                },
                padding: {
                    left: 0,
                    right: 0
                },
            },
            y: {
                show: false,
                inner: true,
                tick: {
                    outer: false,
                    values: [],
                },
                padding: {
                    top: 0,
                    bottom: 0
                },
            },
        },
        tooltip: {
            grouped: false,
            format: {
                title: function(x, index) { return '';},
                value: function(value, ratio, id, index) { return value + '%'}
            }
        },
        legend: {
            show: true,
            position: 'bottom', 
        },
        data: {
            columns: arrColumns,
            names: objNames,
            groups: [
                arrColumns.map(function(e) {
                    return e[0];
                })
            ],
            type: 'bar',
            order: 'asc',
            empty: {
                label: {
                    text: '데이터가 없습니다'
                }
            },
            labels: {
                format: function(v, id, i, j) {
                    if(v < 5.0) {
                        return '';
                    } else {
                        return v + '%';
                    }
                    // return v + '%';
                }
            },
            color: function(color, d) {
                return color;
            },
            onclick: function(d, element) {
                console.log(d.id);
                // console.log(document.querySelector('#chart2__select').value);
                // $('#chart2__select').val(o.id.split('-')[1]).trigger('change');
            }
        },
        onrendered: function() {
            for(var index in arrColumns) {
                var gbar = document.querySelector('#chart2 .c3-chart-bars .c3-target-'+ arrColumns[index][0] +' path').getBoundingClientRect();
                var gtext = document.querySelector('#chart2 .c3-chart-texts .c3-texts-'+ arrColumns[index][0] +' text');
                
                gtext.setAttribute('x', gbar.x + gbar.width / 2 - (gtext.getBoundingClientRect().width / 2 + 5));
            }

            // $.each(arrColumns, function(index, item) {
            //     var gbar = document.querySelector('#chart2 .c3-chart-bars .c3-target-'+item[0]+' path').getBBox();
            //     var gtext = document.querySelector('#chart2 .c3-chart-texts .c3-texts-'+item[0]+' text');

            //     gtext.setAttribute('x', gbar.x + gbar.width / 2 - (gtext.getBoundingClientRect().width / 2));
            // });
        }
    });
}

/* Chart2 Select Search 기능 */
var chart2SelectElem = document.querySelector('#chart2__select');

for(var i = 0; i < Object.keys(objNames).length; i++) {
    var optionElem = document.createElement('option');
    optionElem.setAttribute('value', Object.keys(objNames)[i]);
    optionElem.innerHTML = Object.values(objNames)[i];
    chart2SelectElem.appendChild(optionElem);
};

function selectHandler(event) {
    var selectOption = event.target.value;
    var objKeys = Object.keys(objNames);

    objKeys.forEach(function(value) {
        if(selectOption === value) {
            return selectOption;
        }   
    });

    console.log(selectOption);

    // /* AJAX  */
    // var params = {
    //     targetDepartmentNo : 13590,
    //     empNo : null,
    //     startDate : "2020-07-01",
    //     endDate : "2020-07-31",
    //     clientNo: selectOption
    // };

    // $.ajax({
    //     type: 'GET',
    //     data: params, 
    //     url: '',
    //     success: function(response) {
    //         /* Component 초기화 */
    //         $('#chart2__select').html('<option value="">선택</option>');

    //         if(g_pieChartClient != null) {
    //             g_pieChartClient.destroy();
    //             g_pieChartClient = null; 
    //         }

    //         if(response.code === ('OK') && response.data !== null) {
    //             var projects = response.data;
    //             g_todoProjectList = projects;
    //             chart2Fn();

    //             $('#chart2__select').trigger('change');
    //         }
    //     },
    //     error: function() {
    //         console.log('통신실패');
    //     }
    // });
}

chart2SelectElem.addEventListener('change', selectHandler);
chart2Fn();

