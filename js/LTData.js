/**
 * Created by PeterClary on 10/12/2018.
 */
var dataSets = {

    "WAORCA": [{
        "title":"WAORCA",
        "name": "Biomass",
        "minYear": 1990,
        "maxYear": 2012,
        "yMin": -100, // this sets the plotting yMin
        "yMax": 600, // this sets the plotting yMax
        "dType": "continuous",
        "scalar": 0.1,
        "yAxisLab": "Biomass (Mg/ha)",
        "tmsURL": "https://emapr.ceoas.oregonstate.edu/pages/data/viz/tms/waorca-biomass/crm", //./tms/waorca-biomass/crm", //"./biomass_tws_z11",
        "metaDataURL": "https://emapr.ceoas.oregonstate.edu/metadata.html",
        "id": "biomassLI",
        "dataPath": "/data/maps/WAORCA_biomass/crm/default.vrt",
        "legendPath": "./imgs/biomass.svg",
        "coordinates": [41.079,-121.06],
        "zoom": 5,
        "aoi": "./vector/WAORCA.geojson",
        "aoiStyle":{
             weight: 10,
             color: '#3248a8',
             dashArray: '',
             fillOpacity: 0
        }


    }, {
        "title":"WAORCA",
        "name": "Canopy Cover",
        "minYear": 1990,
        "maxYear": 2012,
        "yMin": 0, // this sets the plotting yMin
        "yMax": 100, // this sets the plotting yMax
        "dType": "continuous",
        "scalar": 1,
        "yAxisLab": "Canopy Cover (%)",
        "tmsURL": "https://emapr.ceoas.oregonstate.edu/pages/data/viz/tms/waorca-pystem/canopycover", //./tms/waorca-biomass/crm", //"./biomass_tws_z11",
        "metaDataURL": "https://emapr.ceoas.oregonstate.edu/metadata.html",
        "id": "canopycoverLI",
        "dataPath": "/data/maps/WAORCA_pystem/canopycover/default.vrt",
        "legendPath": "./imgs/canopy.svg",
        "coordinates": [41.079,-121.06],
        "zoom": 5,
        "aoi": "./vector/WAORCA.geojson",
        "aoiStyle":{
             weight: 5,
             color: '#de1457',
             dashArray: '',
             fillOpacity: 0
        }

    },{
        "title":"WAORCA",
        "name": "Impervious Cover",
        "minYear": 1990,
        "maxYear": 2012,
        "yMin": 0, // this sets the plotting yMin
        "yMax": 100, // this sets the plotting yMax
        "dType": "continuous",
        "scalar": 1,
        "yAxisLab": "Impervious Cover (%)",
        "tmsURL": "https://emapr.ceoas.oregonstate.edu/pages/data/viz/tms/waorca-pystem/impervcover", //./tms/waorca-biomass/crm", //"./biomass_tws_z11",
        "metaDataURL": "https://emapr.ceoas.oregonstate.edu/metadata.html",
        "id": "impervcoverLI",
        "dataPath": "/data/maps/WAORCA_pystem/impervcover/default.vrt",
        "legendPath": "./imgs/imperv.svg",
        "coordinates": [41.079,-121.06],
        "zoom": 5,
        "aoi": "./vector/WAORCA.geojson",
        "aoiStyle":{
             weight: 5,
             color: '#000000',
             dashArray: '',
             fillOpacity: 0
        }

    },{
        "title":"WAORCA",
        "name": "Land Cover",
        "minYear": 1990, // min year in the series
        "maxYear": 2012, // max year in the series
        "yMin": 0, // this sets the plotting yMin
        "yMax": 100, // this sets the plotting yMax
        "dType": "categorical", // the data type
        "scalar": null,
        "yAxisLab": "Land Cover Class",
        "tmsURL": "https://emapr.ceoas.oregonstate.edu/pages/data/viz/tms/waorca-pystem/landcover", //"./tms/waorca-pystem/landcover", //"./landcover_tws_z11",
        "metaDataURL": "https://emapr.ceoas.oregonstate.edu/metadata.html",
        "id": "landcoverLI", // the <li> id under the Select Data Layer section
        "dataPath": "/data/maps/WAORCA_pystem/landcover/default.vrt",
        "plotDisplay": {
            11: {color: '#476ba1', label: 'Open Water'},
            12: {color: '#d1defa', label: 'Perennial Ice/Snow'},
            21: {color: '#decaca', label: 'Developed, Open Space'},
            22: {color: '#d99482', label: 'Developed, Low Intensity'},
            23: {color: '#ee0000', label: 'Developed, Medium Intensity'},
            24: {color: '#ab0000', label: 'Developed High Intensity'},
            31: {color: '#b3aea3', label: 'Barren Land (Rock/Sand/Clay)'},
            41: {color: '#68ab63', label: 'Deciduous Forest'},
            42: {color: '#1c6330', label: 'Evergreen Forest'},
            43: {color: '#b5ca8f', label: 'Mixed Forest'},
            51: {color: '#a68c30', label: 'Dwarf Scrub'},
            52: {color: '#ccba7d', label: 'Shrub/Scrub'},
            71: {color: '#e3e3c2', label: 'Grassland/Herbaceous'},
            72: {color: '#caca78', label: 'Sedge/Herbaceous'},
            73: {color: '#99c247', label: 'Lichens'},
            74: {color: '#78ae94', label: 'Moss'},
            81: {color: '#dcd93d', label: 'Pasture/Hay'},
            82: {color: '#ab7028', label: 'Cultivated Crops'},
            90: {color: '#bad9eb', label: 'Woody Wetlands'},
            95: {color: '#70a3ba', label: 'Emergent Herbaceous Wetlands'}
        },
        "markerSize": '20',
        "legendPath": "./imgs/landcover.svg",
        "coordinates": [41.079,-121.06],
        "zoom": 5,
        "aoi": "./vector/WAORCA.geojson",
        "aoiStyle":{
             weight: 5,
             color: '#999',
             dashArray: '',
             fillOpacity: 0
        }

    }],

    "CONUS":[{
        "title":"CONUS",
        "name": "Land Cover",
        "minYear": 1990,
        "maxYear": 2017,
        "yMin": 0, // this sets the plotting yMin
        "yMax": 100, // this sets the plotting yMax
        "dType": "categorical",
        "scalar": null,
        "yAxisLab": "Land Cover Class",
        "tmsURL": "https://emapr.ceoas.oregonstate.edu/pages/data/viz/tms/conus/lt-stem_landcover_v0.1_vote",
        "metaDataURL": "https://emapr.ceoas.oregonstate.edu/metadata.html",
        "id": "lt_landcover_vote",
        "dataPath": "/data/maps/CONUS/lt-stem_landcover_v0.1/lt-stem_landcover_v0.1_vote.vrt",
        "plotDisplay": {
            11: {color: '#476ba1', label: 'Open Water'},
            12: {color: '#d1defa', label: 'Perennial Ice/Snow'},
            21: {color: '#decaca', label: 'Developed, Open Space'},
            22: {color: '#d99482', label: 'Developed, Low Intensity'},
            23: {color: '#ee0000', label: 'Developed, Medium Intensity'},
            24: {color: '#ab0000', label: 'Developed High Intensity'},
            31: {color: '#b3aea3', label: 'Barren Land (Rock/Sand/Clay)'},
            41: {color: '#68ab63', label: 'Deciduous Forest'},
            42: {color: '#1c6330', label: 'Evergreen Forest'},
            43: {color: '#b5ca8f', label: 'Mixed Forest'},
            51: {color: '#a68c30', label: 'Dwarf Scrub'},
            52: {color: '#ccba7d', label: 'Shrub/Scrub'},
            71: {color: '#e3e3c2', label: 'Grassland/Herbaceous'},
            72: {color: '#caca78', label: 'Sedge/Herbaceous'},
            73: {color: '#99c247', label: 'Lichens'},
            74: {color: '#78ae94', label: 'Moss'},
            81: {color: '#dcd93d', label: 'Pasture/Hay'},
            82: {color: '#ab7028', label: 'Cultivated Crops'},
            90: {color: '#bad9eb', label: 'Woody Wetlands'},
            95: {color: '#70a3ba', label: 'Emergent Herbaceous Wetlands'}
        },
        "markerSize": '20',
        "legendPath": "./imgs/landcover.svg",
        "coordinates": [40.079,-97.06],
        "zoom": 5,
        "aoi": "./vector/CONUS.geojson",
        "aoiStyle":{
             weight: 5,
             color: '#666',
             dashArray: '',
             fillOpacity: 0
        }


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
        "tmsURL": "https://emapr.ceoas.oregonstate.edu/pages/data/viz/tms/conus/lt-stem_biomass_nbcd_v0.1_median",
        "metaDataURL": "https://emapr.ceoas.oregonstate.edu/metadata.html",
        "id": "lt-stem_biomass_nbcd_v0.1_median",
        "dataPath": "/data/maps/CONUS/biomass_nbcd/lt-stem_biomass_nbcd_v0.1_median.vrt",
        "legendPath": "./imgs/biomass_nbcd_fia.svg",
        "coordinates": [40.079,-97.06],
        "zoom": 5,
        "aoi": "./vector/CONUS.geojson",
        "aoiStyle":{
             weight: 5,
             color: '#666',
             dashArray: '',
             fillOpacity: 0
        }


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
        "tmsURL": "https://emapr.ceoas.oregonstate.edu/pages/data/viz/tms/conus/lt-stem_forest_canopy_cover_nlcd_v0.1_mean",
        "metaDataURL": "https://emapr.ceoas.oregonstate.edu/metadata.html",
        "id": "lt-stem_forest_canopy_cover_nlcd_v0.1_mean",
        "dataPath": "/data/maps/CONUS/lt-stem_forest_canopy_cover_nlcd_v0.1/lt-stem_forest_canopy_cover_nlcd_v0.1_mean.vrt",
        "legendPath": "./imgs/canopy_conus.svg",
        "coordinates": [40.079,-97.06],
        "zoom": 5,
        "aoi": "./vector/CONUS.geojson",
        "aoiStyle":{
             weight: 5,
             color: '#666',
             dashArray: '',
             fillOpacity: 0
        }


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
        "tmsURL": "https://emapr.ceoas.oregonstate.edu/pages/data/viz/tms/conus/lt-stem_impervious_surface_nlcd_v0.1_median", //./tms/waorca-biomass/crm", //"./biomass_tws_z11",
        "metaDataURL": "https://emapr.ceoas.oregonstate.edu/metadata.html",
        "id": "lt-stem_impervious_surface_nlcd_v0.1_median",
        "dataPath": "/data/maps/CONUS/lt-stem_impervious_surface_nlcd_v0.1/lt-stem_impervious_surface_nlcd_v0.1_median.vrt",
        "legendPath": "./imgs/imperv.svg",
        "coordinates": [40.079,-97.06],
        "zoom": 5,
        "aoi": "./vector/CONUS.geojson",
        "aoiStyle":{
             weight: 5,
             color: '#666',
             dashArray: '',
             fillOpacity: 0
        }


    }],
    "Disturbance":[{
        "title":"Disturbance",
	"name": "disturbance",
        "minYear": 1985,
        "maxYear": 2012,
        "yMin": 0, // this sets the plotting yMin
        "yMax": 100, // this sets the plotting yMax
        "dType": "categorical",
        "scalar": null,
        "yAxisLab": "Disturbance Attribution Class",
        "tmsURL": "https://emapr.ceoas.oregonstate.edu/pages/data/viz/tms/waorca_attribute",
        "metaDataURL": "https://emapr.ceoas.oregonstate.edu/metadata.html",
        "id": "disturbance_attribution",
        "dataPath": "/data/maps/WAORCA_attributions/WAORCA_attributions_5070_clipped.vrt",
        "plotDisplay": {
            1: {color: '#000000', label: 'Undisturbed'},
            10: {color: '#000000', label: 'Unknown Agent'},
            11: {color: '#255d7d', label: 'Other'},
            20: {color: '#a07208', label: 'Clearcut'},
            21: {color: '#cbd32c', label: 'Partial Harvest'},
            22: {color: '#000000', label: 'Salvage'},
            30: {color: '#e40def', label: 'Development'},
            31: {color: '#000000', label: 'Road'},
            40: {color: '#cf0003', label: 'Fire'},
            50: {color: '#eb82d1', label: 'Insect/Disease'},
            51: {color: '#eb82d1', label: 'Insect/Disease'},
            52: {color: '#eb82d1', label: 'Insect/Disease'},
            53: {color: '#eb82d1', label: 'Insect/Disease'},
            54: {color: '#eb82d1', label: 'Insect/Disease'},
            100: {color: '#89877f', label: 'Unknow Slow'},
            110: {color: '#001bca', label: 'Unknow Abrupt'},
            160: {color: '#048000', label: 'Recovery'},
            200: {color: '#ededed', label: 'No Visible Change'},
            201: {color: '#00c9d3', label: 'False Change'}
        },
        "markerSize": '20',
        "legendPath": "./imgs/att.PNG",
        "coordinates": [41.079,-121.06],
        "zoom": 5,
        "aoi": "./vector/WAORCA.geojson",
        "aoiStyle":{
             weight: 5,
             color: '#666',
             dashArray: '',
             fillOpacity: 0
        }



    }],
     "Renoster":[{
        "title":"Renoster",
	"name": "renoster",
        "minYear": 1984,
        "maxYear": 2022,
        "yMin": 0, // this sets the plotting yMin
        "yMax": 3, // this sets the plotting yMax
        "dType": "categorical",
        "scalar": null,
        "yAxisLab": "Bugnet likelihood Class",
        "tmsURL": "httpss://ermin3.com/projects/LTvis/RGB",
        "metaDataURL": "https://emapr.ceoas.oregonstate.edu/metadata.html",
        "id": "renoster",
        "dataPath": "/data/maps/bugnet_R6/option2/annual/bugnet_option2_v1.vrt",
        "plotDisplay": {
            1: {color: 'gray', label: 'one'},
            2: {color: 'orange', label: 'two'},
            3: {color: 'red', label: 'three'},
        },
        "markerSize": '20',
        "coordinates": [-12.017,-68.7],
        "zoom": 8,
        //"legendPath": "./imgs/att.PNG"
        "aoi": "./vector/renoster.geojson",
        "aoiStyle":{
             weight: 3,
             color: '#112',
             dashArray: '',
             fillOpacity: 0
        }

    }]
};
