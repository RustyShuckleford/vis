const queryString = new URLSearchParams(window.location.search);
const para1Value = queryString.get("para1");
var queries = para1Value.split("para1=");

// Filter the dataset based on the query parameter
switch (queries[0]) {
  case 'WAORCA':
    if (queries[1] === "landcoverLI") {
      dataSets = {"WAORCA":[dataSets['WAORCA'].find(obj=>obj.id === queries[1])]};
    }if (queries[1] === "canopycoverLI") {
      dataSets = {"WAORCA":[dataSets['WAORCA'].find(obj=>obj.id === queries[1])]};
    }if (queries[1] === "biomassLI") {
      dataSets = {"WAORCA":[dataSets['WAORCA'].find(obj=>obj.id === queries[1])]};
    }else{
      dataSets = { "WAORCA": dataSets['WAORCA'] };
    }
    break;
  case 'CONUS':
    if (queries[1] === "lt_landcover_vote") {
      dataSets = {"CONUS":[dataSets['CONUS'].find(obj=>obj.id === queries[1])]};
    }if (queries[1] === "lt-stem_forest_canopy_cover_nlcd_v0.1_mean") {
      dataSets = {"CONUS":[dataSets['CONUS'].find(obj=>obj.id === queries[1])]};
    }if (queries[1] === "lt-stem_biomass_nbcd_v0.1_median") {
      dataSets = {"CONUS":[dataSets['CONUS'].find(obj=>obj.id === queries[1])]};
    }else{
      dataSets = { "CONUS": dataSets['CONUS'] };
    }
    break;
  case 'Disturbance':
    if (queries[1] === "disturbance") {
      dataSets = {"Disturbance":[dataSets['Disturbance'].find(obj=>obj.id === queries[1])]};
    }else{
      dataSets = { "Disturbance": dataSets['Disturbance'] };
    }
    break;
  case 'Renoster':
    if (queries[1] === "renoster") {
      dataSets = {"Renoster":[dataSets['Renoster'].find(obj=>obj.id === queries[1])]};
    }else{
      dataSets = { "Renoster": dataSets['Renoster'] };
    }
    break;
  default:
    console.log('No match');
}

