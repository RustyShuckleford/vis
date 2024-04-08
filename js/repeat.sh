#!/bin/bash

# Define the file to which the JSON objects will be appended
output_file="output.json"

# JSON object template
json_template_top='{'
json_template=' "CONUS_COUNT":[{
        "title":"CONUS",
        "name": "Land Cover",
        "minYear": 1990,
        "maxYear": 2017,
        "yMin": 0, // this sets the plotting yMin
        "yMax": 100, // this sets the plotting yMax
        "dType": "categorical",
        "scalar": null,
        "yAxisLab": "Land Cover Class",
        "tmsURL": "http://emapr.ceoas.oregonstate.edu/pages/data/viz/tms/conus/lt-stem_landcover_v0.1_vote",
        "metaDataURL": "http://emapr.ceoas.oregonstate.edu/metadata.html",
        "id": "lt_landcover_vote",
        "dataPath": "/data/maps/CONUS/lt-stem_landcover_v0.1/lt-stem_landcover_v0.1_vote.vrt",
        "markerSize": '20',
        "legendPath": "./imgs/landcover.svg",
        "coordinates": [40,-95],
        "zoom": 5

    }, {
        "title":"CONUS",
        "name": "Biomass",
        "minYear": 1990,
        "maxYear": 2017,
        "yMin": 0, // this sets the plotting yMin
        "yMax": 350, // this sets the plotting yMax
        "dType": "continuous",
        "scalar": 1,
        "yAxisLab": "Biomass (Mg/ha)",
        "tmsURL": "http://emapr.ceoas.oregonstate.edu/pages/data/viz/tms/conus/lt-stem_biomass_nbcd_v0.1_median",
        "metaDataURL": "http://emapr.ceoas.oregonstate.edu/metadata.html",
        "id": "lt-stem_biomass_nbcd_v0.1_median",
        "dataPath": "/data/maps/CONUS/biomass_nbcd/lt-stem_biomass_nbcd_v0.1_median.vrt",
        "legendPath": "./imgs/biomass_nbcd_fia.svg",
        "coordinates": [41.079,-121.06],
        "zoom": 5

    }, {
        "title":"CONUS",
        "name": "Canopy Cover",
        "minYear": 1990,
        "maxYear": 2017,
        "yMin": 0, // this sets the plotting yMin
        "yMax": 100, // this sets the plotting yMax
        "dType": "continuous",
        "scalar": 1,
        "yAxisLab": "Canopy Cover (%)",
        "tmsURL": "http://emapr.ceoas.oregonstate.edu/pages/data/viz/tms/conus/lt-stem_forest_canopy_cover_nlcd_v0.1_mean",
        "metaDataURL": "http://emapr.ceoas.oregonstate.edu/metadata.html",
        "id": "lt-stem_forest_canopy_cover_nlcd_v0.1_mean",
        "dataPath": "/data/maps/CONUS/lt-stem_forest_canopy_cover_nlcd_v0.1/lt-stem_forest_canopy_cover_nlcd_v0.1_mean.vrt",
        "legendPath": "./imgs/canopy_conus.svg",
        "coordinates": [40,-95],
        "zoom": 5

    }, {
        "title":"CONUS",
        "name": "Impervious Cover",
        "minYear": 1990,
        "maxYear": 2017,
        "yMin": 0, // this sets the plotting yMin
        "yMax": 100, // this sets the plotting yMax
        "dType": "continuous",
        "scalar": 1,
        "yAxisLab": "Impervious Cover (%)",
        "tmsURL": "http://emapr.ceoas.oregonstate.edu/pages/data/viz/tms/conus/lt-stem_impervious_surface_nlcd_v0.1_median", //./tms/waorca-biomass/crm", //"./biomass_tws_z11",
        "metaDataURL": "http://emapr.ceoas.oregonstate.edu/metadata.html",
        "id": "lt-stem_impervious_surface_nlcd_v0.1_median",
        "dataPath": "/data/maps/CONUS/lt-stem_impervious_surface_nlcd_v0.1/lt-stem_impervious_surface_nlcd_v0.1_median.vrt",
        "legendPath": "./imgs/imperv.svg",
        "coordinates": [41.079,-95],
        "zoom": 5

    }],'
json_template_bottom='}'

# Repeat the object 50 times
# Repeat the object 50 times
for i in {1..5000}; do
    if [ $i -eq 1 ]; then
        modified_json=$(echo "$json_template" | sed "s/CONUS_COUNT/CONUS$i/g")
        echo "$modified_json_top" >> "$output_file"
        echo "$modified_json" >> "$output_file"

    elif [ $i -eq 50 ]; then
        modified_json=$(echo "$json_template" | sed "s/CONUS_COUNT/CONUS$i/g")
        echo "$modified_json" >> "$output_file"
        echo "$modified_json_bottom" >> "$output_file"
    else
        modified_json=$(echo "$json_template" | sed "s/CONUS_COUNT/CONUS$i/g")
        echo "$modified_json" >> "$output_file"
    fi
done
