window.onload = function () {

    loadData();
}

function loadData() {

    axios.get('datasets/boston-ocg-y.csv')
        .then(function (response) {
            console.log("Success");
            formNewDataArray(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function formNewDataArray(responseData) {

    let offenceSet = new Set();
    let newMainArr = [];
    let recordSplit = responseData.data.split("\n");

    let data2015 = 0;
    let data2016 = 0;
    let data2017 = 0;
    let data2018 = 0;
    let oldOcg = "";
    let firstStat = false;
    let resetStat = false;

    for (let record of recordSplit) {

        let columnSplit = record.split(",");

        if (oldOcg !== columnSplit[0] && firstStat) {

            resetStat = true
            let newData = [data2015, data2016, data2017, data2018];
            newMainArr.push(newData);
        }

        firstStat = true;
        oldOcg = columnSplit[0];

        if (resetStat) {
            data2015 = 0;
            data2016 = 0;
            data2017 = 0;
            data2018 = 0;
            resetStat = false;
        }

        switch (columnSplit[1]) {

            case "2015":
                data2015 += parseInt(columnSplit[2]);
                break;
            case "2016":
                data2016 += parseInt(columnSplit[2]);
                break;
            case "2017":
                data2017 += parseInt(columnSplit[2]);
                break;
            case "2018":
                data2018 += parseInt(columnSplit[2]);
                break;
            default:
                let nullVal = parseInt(columnSplit[2]);
                let toAddVal = Math.floor(nullVal / 4);

                data2015 += toAddVal;
                data2016 += toAddVal;
                data2017 += toAddVal;
                data2018 += toAddVal;
        }

        offenceSet.add(columnSplit[0]);
    }
    //for loop recordSplit ends

    // console.log(newMainArr);

    let ocgLabels = [];

    for (let off of offenceSet) {
        ocgLabels.push(off);
    }

    segregateData(newMainArr, ocgLabels);
}

function segregateData(newMainArr, ocgLabels) {

    console.log("sss " + newMainArr.length);

    let crimeData2015 = [];
    let crimeData2016 = [];
    let crimeData2017 = [];
    let crimeData2018 = [];

    for (let singleArr of newMainArr) {

        crimeData2015.push(singleArr[0]);
        crimeData2016.push(singleArr[1]);
        crimeData2017.push(singleArr[2]);
        crimeData2018.push(singleArr[3]);
    }

    loadYearlyChart(ocgLabels, crimeData2015, crimeData2016, crimeData2017, crimeData2018);
}


function loadYearlyChart(ocgLabels, crimeData2015, crimeData2016, crimeData2017, crimeData2018) {

    let myChartCanvas = document.getElementById("myChart");
    let myChartContext = myChartCanvas.getContext('2d')

    // Chart.defaults.global.defaultFontFamily='Consolas';
    Chart.defaults.global.defaultFontSize = 14;
    Chart.defaults.global.defaultFontColor = '#333';

    let crimeChart = new Chart(myChartContext, {
        type: 'bar',
        data: {
            labels: ocgLabels,
            datasets: [
                {
                    label: '2015',
                    backgroundColor: "#EA80FC",
                    data: crimeData2015,
                    hoverBorderWidth: 1,
                    hoverBorderColor: '#000'
                }, {
                    label: '2016',
                    backgroundColor: "#69F0AE",
                    data: crimeData2016,
                    hoverBorderWidth: 1,
                    hoverBorderColor: '#000'
                }, {
                    label: '2017',
                    backgroundColor: "#64B5F6",
                    data: crimeData2017,
                    hoverBorderWidth: 1,
                    hoverBorderColor: '#000'
                }, {
                    label: '2018',
                    backgroundColor: "#FFE082",
                    data: crimeData2018,
                    hoverBorderWidth: 1,
                    hoverBorderColor: '#000'
                }],
        },
        options: {
            // responsive: false,
            // maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Boston Crime Data :: Offence Code Group-Yearly Count',
                fontSize: 20,
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
}
