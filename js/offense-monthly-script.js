window.onload = function () {

    loadData();
}

function loadData() {

    let responseData;

    axios.get('datasets/boston-ocg-m.csv')
        .then(function (response) {
            console.log("Success");
            responseData = response;
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

    let dataJan = 0;
    let dataFeb = 0;
    let dataMar = 0;
    let dataApr = 0;
    let dataMay = 0;
    let dataJun = 0;
    let dataJul = 0;
    let dataAug = 0;
    let dataSep = 0;
    let dataOct = 0;
    let dataNov = 0;
    let dataDec = 0;
    let oldOcg = "";
    let firstStat = false;
    let resetStat = false;

    for (let record of recordSplit) {

        let columnSplit = record.split(",");

        if (oldOcg !== columnSplit[0] && firstStat) {

            resetStat = true
            let newData = [dataJan, dataFeb, dataMar, dataApr, dataMay, dataJun, dataJul, dataAug,
                dataSep, dataOct, dataNov, dataDec];
            newMainArr.push(newData);
        }

        firstStat = true;
        oldOcg = columnSplit[0];

        if (resetStat) {
            dataJan = 0;
            dataFeb = 0;
            dataMar = 0;
            dataApr = 0;
            dataMay = 0;
            dataJun = 0;
            dataJul = 0;
            dataAug = 0;
            dataSep = 0;
            dataOct = 0;
            dataNov = 0;
            dataDec = 0;
            resetStat = false;
        }

        switch (columnSplit[1]) {

            case "1":
                dataJan += parseInt(columnSplit[2]);
                break;
            case "2":
                dataFeb += parseInt(columnSplit[2]);
                break;
            case "3":
                dataMar += parseInt(columnSplit[2]);
                break;
            case "4":
                dataApr += parseInt(columnSplit[2]);
                break;
            case "5":
                dataMay += parseInt(columnSplit[2]);
                break;
            case "6":
                dataJun += parseInt(columnSplit[2]);
                break;
            case "7":
                dataJul += parseInt(columnSplit[2]);
                break;
            case "8":
                dataAug += parseInt(columnSplit[2]);
                break;
            case "9":
                dataSep += parseInt(columnSplit[2]);
                break;
            case "10":
                dataOct += parseInt(columnSplit[2]);
                break;
            case "11":
                dataNov += parseInt(columnSplit[2]);
                break;
            case "12":
                dataDec += parseInt(columnSplit[2]);
                break;
            default:
                let nullVal = parseInt(columnSplit[2]);
                let toAddVal = Math.floor(nullVal / 12);

                dataJan += toAddVal;
                dataFeb += toAddVal;
                dataMar += toAddVal;
                dataApr += toAddVal;
                dataMay += toAddVal;
                dataJun += toAddVal;
                dataJul += toAddVal;
                dataAug += toAddVal;
                dataSep += toAddVal;
                dataOct += toAddVal;
                dataNov += toAddVal;
                dataDec += toAddVal;
        }

        offenceSet.add(columnSplit[0]);
    }
    //for loop recordSplit ends

    let ocgLabels = [];

    for (let off of offenceSet) {
        ocgLabels.push(off);
    }

    segregateData(newMainArr, ocgLabels);
}

function segregateData(newMainArr, ocgLabels) {

    console.log("sss " + newMainArr.length);

    let crimeDataJan = [];
    let crimeDataFeb = [];
    let crimeDataMar = [];
    let crimeDataApr = [];
    let crimeDataMay = [];
    let crimeDataJun = [];
    let crimeDataJul = [];
    let crimeDataAug = [];
    let crimeDataSep = [];
    let crimeDataOct = [];
    let crimeDataNov = [];
    let crimeDataDec = [];

    for (let singleArr of newMainArr) {

        crimeDataJan.push(singleArr[0]);
        crimeDataFeb.push(singleArr[1]);
        crimeDataMar.push(singleArr[2]);
        crimeDataApr.push(singleArr[3]);
        crimeDataMay.push(singleArr[4]);
        crimeDataJun.push(singleArr[5]);
        crimeDataJul.push(singleArr[6]);
        crimeDataAug.push(singleArr[7]);
        crimeDataSep.push(singleArr[8]);
        crimeDataOct.push(singleArr[9]);
        crimeDataNov.push(singleArr[10]);
        crimeDataDec.push(singleArr[11]);
    }

    loadYearlyChart(ocgLabels, crimeDataJan, crimeDataFeb, crimeDataMar, crimeDataApr, crimeDataMay,
        crimeDataJun, crimeDataJul, crimeDataAug, crimeDataSep, crimeDataOct, crimeDataNov, crimeDataDec);
}


function loadYearlyChart(ocgLabels, crimeDataJan, crimeDataFeb, crimeDataMar, crimeDataApr, crimeDataMay,
                         crimeDataJun, crimeDataJul, crimeDataAug, crimeDataSep, crimeDataOct,
                         crimeDataNov, crimeDataDec) {

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
                    label: 'Jan',
                    backgroundColor: "#EA80FC",
                    data: crimeDataJan,
                    hoverBorderWidth: 1,
                    hoverBorderColor: '#000'
                }, {
                    label: 'Feb',
                    backgroundColor: "#69F0AE",
                    data: crimeDataFeb,
                    hoverBorderWidth: 1,
                    hoverBorderColor: '#000'
                }, {
                    label: 'Mar',
                    backgroundColor: "#64B5F6",
                    data: crimeDataMar,
                    hoverBorderWidth: 1,
                    hoverBorderColor: '#000'
                }, {
                    label: 'Apr',
                    backgroundColor: "#FFE082",
                    data: crimeDataApr,
                    hoverBorderWidth: 1,
                    hoverBorderColor: '#000'
                }, {
                    label: 'May',
                    backgroundColor: "#ef9a9a",
                    data: crimeDataMay,
                    hoverBorderWidth: 1,
                    hoverBorderColor: '#000'
                }, {
                    label: 'Jun',
                    backgroundColor: "#B0BEC5",
                    data: crimeDataJun,
                    hoverBorderWidth: 1,
                    hoverBorderColor: '#000'
                }, {
                    label: 'Jul',
                    backgroundColor: "#0063B1",
                    data: crimeDataJul,
                    hoverBorderWidth: 1,
                    hoverBorderColor: '#000'
                }, {
                    label: 'Aug',
                    backgroundColor: "#DCEDC8",
                    data: crimeDataAug,
                    hoverBorderWidth: 1,
                    hoverBorderColor: '#000'
                }, {
                    label: 'Sep',
                    backgroundColor: "#689F38",
                    data: crimeDataSep,
                    hoverBorderWidth: 1,
                    hoverBorderColor: '#000'
                }, {
                    label: 'Oct',
                    backgroundColor: "#FFCCBC",
                    data: crimeDataOct,
                    hoverBorderWidth: 1,
                    hoverBorderColor: '#000'
                }, {
                    label: 'Nov',
                    backgroundColor: "#E91E63",
                    data: crimeDataNov,
                    hoverBorderWidth: 1,
                    hoverBorderColor: '#000'
                }, {
                    label: 'Dec',
                    backgroundColor: "#00B294",
                    data: crimeDataDec,
                    hoverBorderWidth: 1,
                    hoverBorderColor: '#000'
                }],
        },
        options: {
            // responsive: false,
            // maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Boston Crime Data :: Offence Code Group-Monthly Count',
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
