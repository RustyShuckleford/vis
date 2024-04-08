//var dataSets = {
    // Data sets go here
//};

const queryString = new URLSearchParams(window.location.search);
const para1Value = queryString.get('para1');
var queries = para1Value.split("para1=");

// Extract the requested dataSet key and id
const dataSetKey = queries[0];
const dataSetId = queries[1];

// Check if the dataSetKey exists in dataSets
if (dataSets.hasOwnProperty(dataSetKey)) {
    const dataSetArray = dataSets[dataSetKey];
    const filteredDataSet = dataSetArray.find(obj => obj.id === dataSetId);

    // Update dataSets to only include the filtered dataSet
    // If dataSetId is not found, return the whole array for the key
    dataSets = {
        [dataSetKey]: filteredDataSet ? [filteredDataSet] : dataSetArray
    };
} else {
    console.log('No match for the given parameters');
}
