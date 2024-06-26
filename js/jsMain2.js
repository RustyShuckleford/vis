// Global variables and initialization
// object names (Projects)
var arr_keys = Object.keys(dataSets);
// Get first object as an jquery call
var dataSet_jid = "#" + arr_keys[0];
//  Gets first Project layer object 
var dataSet = dataSets[arr_keys[0]][0];
// initalize layer object groups  
var mapList = ['map', 'flickerMap', 'map1', 'map2', 'map3'];
var lyrGroups = initializeLayerGroups(mapList);
//
var lastActiveSection = 'singleYearContainer';
var clean = { "flicker": 1, "split": 1, "swipe": 1 };
var hvlist = [];
// update the late year values for all late year sliders when any late year slider is changed - note tha>
var leftYearContainers = ["singleYearContainer", "flickerContainer"];
var bothYearContainers = ["splitContainer", "swipeContainer"];
var polyPointerDirty = 0;
var flicker = 0;
// function to start flickering the layers
var flickerInter;
//var a;
// THIS IS STUFF FOR THE OVERLAYS
var overlays = {"ard": {"maps": {}, "path": "", "name": "ARD", "label": "TileID"}};
var aoilays = {"aoi": {"maps": {}, "path": "", "name": "aoi", "label": "TID"}};
hvlist = [];
cleanList = [];
var multiTrace = [];
var multiTraceColor = ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c"];
var drawControl = 0;
// define the L.map options
var mapOptions = {
    center: dataSet.coordinates,  //TODO: this depends on the dataset - it needs to be an attribute of t>
    zoom: dataSet.zoom,
    minZoom: 0,
    maxZoom: 13,
    zoomControl: false,
    doubleClickZoom: false
};



// Initial setup
$(document).ready(function () {


   initializeInterface();
   bindEventHandlers();
   setupMaps();


});

// Function definitions

function initializeLayerGroups(mapList) {

    var groups = {};
    mapList.forEach(function(mapName) {
        groups[mapName] = {"base": {}, "data": {}, "overlay": {}};
    });
    return groups;
}

function initializeInterface() {

    setMinMax(dataSet)
    // Add dynamic interface elements and bindings here
    $("#right").append("<div id='clickMap'><h3>Click the map anytime to view point time series</h3><img id='hidePT' class='pointer' src='./imgs/cancel.svg' style='height:20px; width:auto; position:absolute; right:3px; top:3px; border-radius:10px;'></div>")
    // make html input range elements to insert when page loads

    var earlyYearHTML = '<div class="slidecontainer">'+
                            '<input class="slider dataYear earlyYear" type="range" min="' + dataSet.minYear + '" max="' + dataSet.maxYear + '" value="' + dataSet.minYear + '">'+
                            '<p class="sliderLabel">Year: <span class="earlyYearSpan">' + dataSet.minYear + '</span></p>'+
                        '</div>';
    
    var lateYearHTML = '<div class="slidecontainer">'+
                           '<input class="slider dataYear lateYear" type="range" min="' + dataSet.minYear + '" max="' + dataSet.maxYear + '" value="' + dataSet.maxYear + '">'+
                           '<p class="sliderLabel">Year: <span class="lateYearSpan">' + dataSet.maxYear + '</span></p>'+
                       '</div>';
    
    // prepend the sliders to the page
    $(".singleYear").prepend(lateYearHTML);
    $(".multiYear").prepend(lateYearHTML).prepend(earlyYearHTML);

    //
    $("#dataSelectContainer").addClass('w3-show');
    $("#singleYearContainer").addClass('w3-show');

    for (a in dataSets) { //------------------------------    loops through each project CONUS and WAORCA.

        var dataselectTag = '<div class="dataCover pointer">'+
                                             '<p>' + a + 
                                                  '<a href="https://emapr.ceoas.oregonstate.edu/", target="_blank" >'+
                                                       '<i class="fa fa-info-circle w3-right" style="margin-top: 4px; margin-right: 0.2em; vertical-align: top; aria-hidden="true"></i>'+
                                                  '</a>'+
                                             '</p>'+
                                         '</div>' +
                                         '<div id="' + a + '" class="dataPage w3-hide" style="height: auto; overflow-y: auto;">' +
                                             '<div id="' + a + '2" class="datalistContainer"></div>'+
                                         '</div>'

        $("#dataSelectContainer").append(dataselectTag)
        
        var place = "#" + a + "2"; //-------------------------make a jquery selector for each dataset to be appended to
        // adds each project's layer object to the DOM
        for (i in dataSets[a]) { //-                          loop through each dataset pre project
            var dataInfo = dataSets[a][i]; //-------------    this attaches each dataset to a varible ie biomass
            var value1 = dataInfo.id; //------------------    this is added to url for the metadata page so it knows what to load
            var queryString = "?para1=" + value1; //------    prety much the same as above. this goes on the end of the url
            $(place).append('' +
                '<div>' +
                '<input id="' + dataInfo.id + '" class="radio-input dataList" type="radio" value="Street">' +
                '<label class="radio-label">' + '  ' + dataInfo.name + '</label>' +
                '<a href=' + dataInfo.metaDataURL + queryString + ', target="_blank">' +
                '<i class="fa fa-question-circle w3-right" style="margin-top: 4px; vertical-align: top; aria-hidden="true"></i>' +
                '</a>' +
                '</div>')
        }
    }

        // gets the first  project object and select it firtst layer object to be displayed on init
        var arr_keys = Object.keys(dataSets);
        var first = "#"+dataSets[arr_keys[0]][0].id
        $("#"+arr_keys[0]).addClass('w3-show');//---------------   checks the first project layer button
        $(first).trigger('click');//---------------   checks the first project layer button
        console.log(first)
        $("#legend").attr("src", dataSets[arr_keys[0]][0].legendPath);
}


function setupMaps() {

    // Setup map-related functionality here, like L.map instances
    var map = makeMap('map', mapOptions);
    var flickerMap = makeMap('flickerMap', mapOptions);

    // make the maps and set them a global variables so other functions can access them
    var map1 = makeMap('map1', mapOptions);
    var map2 = makeMap('map2', mapOptions);
    var map3 = makeMap('map3', mapOptions);

    makeBaseLyrGroups();

    // add scale bar
    L.control.scale().addTo(map);
    L.control.scale().addTo(flickerMap);
    L.control.scale().addTo(map1);
    L.control.scale().addTo(map3);

    L.control.mousePosition().addTo(map);

    //myLayer.addData(aoi);
    style ={
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0
    }


    // add the base layer group to maps 
    lyrGroups.map.base.addTo(map);
    lyrGroups.flickerMap.base.addTo(flickerMap);
    lyrGroups.map1.base.addTo(map1);
    lyrGroups.map2.base.addTo(map2);
    lyrGroups.map3.base.addTo(map3);

    makeDataLyrGroups();

    lyrGroups.map.data.addTo(map);
    lyrGroups.flickerMap.data.addTo(flickerMap);
    lyrGroups.map1.data.addTo(map1);
    lyrGroups.map2.data.addTo(map2);
    lyrGroups.map3.data.addTo(map3);


    var swipeLayers = lyrGroups.map3.data.getLayers();
    var leftSwipe = swipeLayers[0];
    var rightSwipe = swipeLayers[1];
    sideBySide = L.control.sideBySide(leftSwipe, rightSwipe);
    sideBySide.addTo(map3);

    makeOverlayLyrGroups();

    map.sync(flickerMap);
    map.sync(map1);
    map.sync(map2);
    map.sync(map3);
 
    flickerMap.sync(map);
    flickerMap.sync(map1);
    flickerMap.sync(map2);
    flickerMap.sync(map3);

    map1.sync(map);
    map1.sync(flickerMap);
    map1.sync(map2, {syncCursor: true});
    map1.sync(map3);
    

    map2.sync(map);
    map2.sync(flickerMap);
    map2.sync(map1, {syncCursor: true});
    map2.sync(map3);

    map3.sync(map);
    map3.sync(flickerMap);
    map3.sync(map1);
    map3.sync(map2);


    jsonPath = dataSet.aoi
    jsonStyle = dataSet.aoiStyle

    var geojsonLayer = L.geoJSON(null,{style:jsonStyle}).addTo(map);
    var geojsonLayer1 = L.geoJSON(null,{style:jsonStyle}).addTo(map1);
    var geojsonLayer2 = L.geoJSON(null,{style:jsonStyle}).addTo(map2);
    var geojsonLayer3 = L.geoJSON(null,{style:jsonStyle}).addTo(map3);
    var geojsonLayer4 = L.geoJSON(null,{style:jsonStyle}).addTo(flickerMap);

    $.getJSON(jsonPath, function(data) {
        // Add the GeoJSON data to the geojsonLayer
        geojsonLayer.addData(data);
        geojsonLayer1.addData(data);
        geojsonLayer2.addData(data);
        geojsonLayer3.addData(data);
        geojsonLayer4.addData(data);
    });

    var info = L.control();
    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // CHANGE DISPLAY WHEN DATA YEARS CHANGE
    var a = $(".slider").on("input", function () { // Peter added the a var
        var year = $(this).val();
        $(this).siblings(".sliderLabel").children('span').html(year)
    });


    info.update = function () {
        this._div.innerHTML = a.val();
    };

    info.addTo(map);

    $('.dataCover').click(function () {
        $('.dataPage').removeClass('w3-show');
        $(this).next('.dataPage').addClass('w3-show');
        var set = dataSets[$(this).text()][0]
        if ($("#"+set.title).hasClass('w3-show')){
            map.flyTo(set.coordinates,set.zoom)
            $('#'+set.id).trigger('click') // two of the same statement to remove pervious layer.
            $('#'+set.id).trigger('click')
     }
    })

    map.on('click', function (e) {
        if ($('.overlayList').data('waschecked')=== true) {
            hidePlot();
        } else {
            $('#latlong').empty();
            plotPixelTimeSeries(e)
        }
    });

    flickerMap.on('click', function (e) {
        if ($('.overlayList').data('waschecked')=== true) {
            hidePlot();
        } else {
            $('#latlong').empty();
            plotPixelTimeSeries(e)
        }
    });

    map1.on('click', function (e) {
        if ($('.overlayList').data('waschecked')=== true) {
            hidePlot();
        } else {
            $('#latlong').empty();
            plotPixelTimeSeries(e)
        }
    });

    map2.on('click', function (e) {
        if ($('.overlayList').data('waschecked')=== true) {
            hidePlot();
        } else {
            $('#latlong').empty();
            plotPixelTimeSeries(e)
        }
    });

    map3.on('click', function (e) {
        if ($('.overlayList').data('waschecked')=== true || $('.leaflet-sbs-range').is(':hover') === true ) {
            hidePlot();
        } else {
                $('#latlong').empty();
            plotPixelTimeSeries(e)
        }
    })

    $("#hidePlot").click(function(){hidePlot();})

    $("#legendControl" ).trigger( "click" ); // opens legend

}


function bindEventHandlers() {
    // Bind click, mouseup, change events here
    $('#left, #right').mouseup(function () {
        $('#clickMap').remove();
    });

    $('#download').click(function () {
        if (hvlist.length > 0) {// check to make sure a tile is selected
            $('#downloadModal').show();
        }

        var str = '<ul id="listy">'; // creates a dom for a list of selected tiles to be displayed in the do>
        hvlist.forEach(function(item) {
            str += '<li>'+ item + '</li>';
        });
        str += '</ul>';
        $("#regionListDL").html(str)
    });

    $('#out').click(function () { //this removes the above list when form is closed
        $('#listy').remove()
    });

    // update opacity when the opacity slider is moved 
    $("#alphaSlider").change(function () {
        updateOpacity();
    });


    // show hide the layer legend
    $("#legendControl").click(function () {
	$("#legendHolder").toggle("fast", function () {
	});
    });


    $(document).on("change", ".lateYear", function () {
	var year = $(this).val();
	$(".lateYear").val(year);
	$(".lateYearSpan").html(year);
	redrawMap('late');
	// figure out what year label to update - left or right
	if (leftYearContainers.indexOf(lastActiveSection) >= 0) {
	    updateYearLabel("#leftYear", year);
	} else if (bothYearContainers.indexOf(lastActiveSection) >= 0) {
	    updateYearLabel("#rightYear", year);
        }
    });

    // update the early value for all early year sliders when any early year slider is changed
    $(document).on("change", ".earlyYear", function () {
        var year = $(this).val();
        $(".earlyYear").val(year);
        $(".earlyYearSpan").html(year);
        redrawMap('early');
        updateYearLabel("#leftYear", year);
    });

    // if any year changes stop flicker if it is running (even if not running it will try anyway)
    $(document).on("change", ".dataYear", function () {
        stopFlicker();
    });

    // handler for when a base layer is selected
    $(".baseList").click(function () {
        $(".baseList").prop("checked", false);
        $(this).prop("checked", true);
        var index = $(this).parent().index();
        mapList.forEach(function (key) {
            var baseLayers = lyrGroups[key].base.getLayers();
            lyrGroups[key].base.eachLayer(function (layer) {
                layer.setOpacity(0);
            });
            baseLayers[index].setOpacity(1)
        });
    });


   // https://stackoverflow.com/questions/10920355/attaching-click-event-to-a-jquery-object-not-yet-added-t>
    $(document).on("click", ".dataList", function () {
        hidePlot();
        $(".dataList").prop("checked", false);
        $(this).prop("checked", true);

        dataSet = getDataSetClicked($(this).attr('id'));
        dataSet_jid = "#"+dataSet.title 

        // reset the slide min and max 
        setMinMax(dataSet)
          
        // update the legend
        $("#legend").attr("src", dataSet.legendPath);

        // update the tileURL - TODO: we don't need var tileURL, we can just call dataSet.tmsURL when needed
        tileURL = dataSet.tmsURL;

        //TODO: need to update year sliders to min and max year of this selected dataset


        // redraw all the maps (both left (single) side and right side maps)
        redrawMap('both');
    });


    //When you click on the 'select download' the radio button is on by default
    $('#selectOverlayBtn').click(function () { //                          this is the select download butto>
        if ($('#overlaySelectContainer').hasClass("w3-show")===false) { // only if the download container is>
            $("#ardGrid,#singleView").trigger("click"); //                 this applys the radio button that>
        }
        if (map.getZoom() > 8) { //                                        if the map zoom is above 8 it wil>
            map.flyTo(map.getCenter(), 8, {
            animate: true,
            duration: 3     // this the time between zoom levels
            });
        }
    });
    $('.sectionButton' ).click(function () {
        if ($('#overlaySelectContainer').hasClass("w3-show") ) {
            $("#ardGrid, #hideDL").trigger("click");
        }
    });

    $(document).on("click", ".overlayList", function () {
        var rad = $(this);
        if (rad.data('waschecked') === true) {
            hidePlot();
            rad.prop('checked', false);
            rad.data('waschecked', false);
            Object.keys(lyrGroups).forEach(function (key) {
                eval(key).removeLayer(overlays[rad.prop('value')].maps[key].layer)
            })

        } else {
            hidePlot()
            rad.data('waschecked', true);
            Object.keys(lyrGroups).forEach(function (key) {
                eval(key).addLayer(overlays[rad.prop('value')].maps[key].layer)
            })

            $("#right").append("<div id='clickTile'><h3>Double click a tile to select for download</h3><img id='hideDL' class='pointer' src='./imgs/cancel.svg' style='height:20px; width:auto; position:absolute; right:3px; top:3px; border-radius:10px;'></div>")

            $('#hideDL').on('click', function () {
                $('#clickTile').remove();
            });
        }
        if (polyPointerDirty === 0) {
            $('.leaflet-interactive').css('cursor', 'default');
            polyPointerDirty = 1

        }
    });

    // handler for when clicking on the flicker go!/stop! button
    $("#flicker").click(function (event) {
        event.preventDefault();
        if ($(this).hasClass("selected")) {
            stopFlicker();
        } else {
            $(this).removeClass('w3-green').addClass('selected stopColor');
            $(this).html('Stop Flicker');
            flickerInterval();
        }
    });

    // handler for when the flicker speed slider changes
    $("#flickerSpeed").change(function () {
        if ($("#flicker").hasClass("selected")) {
            var flickerSpeed = $("#flickerSpeed").val();
            clearInterval(flickerInter);
            flickerInterval()
        }
    });


    $("#yearSwipe1").change(function () {
        swipe()
    });

    $("#yearSwipe2").change(function () {
        swipe()
    });

    $('.layerButton').click(function () {
        if ($(this).next('.layerContainer').hasClass('w3-show')) {
            $(this).next('.layerContainer').removeClass('w3-show');
        } else {
            $('.layerContainer').removeClass('w3-show');
            $(this).next('.layerContainer').addClass('w3-show');
        }
    });

    $(dataSet_jid).addClass('w3-show')

    // DO STUFF WHEN A SECTION BUTTON IS PRESSED
    $('.activityButton').click(function () {
        // show/hide the contents of the sections
        $('.sectionContainer').removeClass('w3-show');
        $(this).next('.sectionContainer').addClass('w3-show');
        $('#overlaySelectContainer').removeClass('w3-show'); //hides the download container when activit>

        // do a default action for each section
        var id = $(this).next('.sectionContainer').attr('id');
        displayHandler(id, repeat = false);
        lastActiveSection = id
    });

}

/////////////////////////////////////////////////////////FUNCTIONS//////////////////////////////////////////////////////////////////////
function makeMap(id, options) {
    return L.map(id, options);
}

function getMaxOfArray(numArray) {
        return Math.max.apply(null, numArray);
}

// this function fetches a new tile layer for a given dataset and year
function getDataTileLyr(year) {
    var lyr = L.tileLayer(dataSet.tmsURL + '/' + year.toString() + '/{z}/{x}/{y}.png', {
        tms: true,
        opacity: 1,
        attribution: "",
        maxNativeZoom: 11,
        maxZoom: 13
    });
    return (lyr);
}


// this function removes old tiles that have accumulated past a certain number
function removeOldTiles() {
    mapList.forEach(function (key) {   //for(key in lyrGroups){
        var dataLayers = lyrGroups[key].data.getLayers();
        if (dataLayers.length > 2) { // TODO: if you change the year fast with arrow, the loading can't >
            for (var i = 0; i < (dataLayers.length - 2); i++) {
                lyrGroups[key].data.removeLayer(dataLayers[i])
            }
            //console.log('n layers: '+lyrGroups[key].data.getLayers().length.toString())
        }
    })
}


// function to update opacity of data tiles when opacity slider is changed - 
function updateOpacity() {
    var opacity = $("#alphaSlider").val();
    mapList.forEach(function (key) {              //for(key in lyrGroups){
        lyrGroups[key].data.eachLayer(function (layer) {  // TODO: this is throwing errors until all key>
            layer.setOpacity(opacity);
        });
    });
}


// Add more functions as necessary...
// if year is moved - update the map for the open activity
function redrawMap(slider) {
    var lateYear = $(".lateYear").first().val();
    var earlyYear = $(".earlyYear").first().val();
    if (slider === 'late' || slider === 'both') {
        ['map', 'flickerMap', 'map2'].forEach(function (key) {
            var lateLayer = getDataTileLyr(lateYear);
            lateLayer.addTo(lyrGroups[key].data);
        });
    }
    if (slider === 'early' || slider === 'both') {
        ['flickerMap', 'map1'].forEach(function (key) {
            var earlyLayer = getDataTileLyr(earlyYear);
            earlyLayer.addTo(lyrGroups[key].data);
        });
    }

    ['map3'].forEach(function (key) {
        var earlyLayer = getDataTileLyr(earlyYear);
        var lateLayer = getDataTileLyr(lateYear);
        earlyLayer.addTo(lyrGroups[key].data);
        lateLayer.addTo(lyrGroups[key].data);
    });

    removeOldTiles();
    updateOpacity();

    var dataLayers = lyrGroups.map3.data.getLayers();
    var leftSwipe = dataLayers[0];
    var rightSwipe = dataLayers[1];
    sideBySide.setLeftLayers(leftSwipe);
    sideBySide.setRightLayers(rightSwipe);
}

function updateYearLabel(labelID, year) {
    $(labelID).html(year);
}


// a function to return the the dataset object for the data set that was clicked on in the dataset menu
function getDataSetClicked(id) {
    var keys = Object.keys(dataSets);
    for (var k = 0; k < keys.length; k++) {
        for (var i = 0; i < dataSets[keys[k]].length; i++) {
            if (dataSets[keys[k]][i].id === id) {
                return dataSets[keys[k]][i]
            }
        }
    }
}

// SET YEAR SLIDER MIN AND MAX
function setMinMax(dataSet) {
    
    $(".slider.dataYear").attr({
        "min": dataSet.minYear,
        "max": dataSet.maxYear
    });

}

// a function to stop flickering and reset the GO! button
function stopFlicker() {
    $("#flicker").removeClass('selected stopColor').addClass('w3-green');
    $("#flicker").html('Start Flicker');
    clearInterval(flickerInter);
}

function flickerInterval() {
    orderFlickerLayers();
    var flickerSpeed = $("#flickerSpeed").val();
    flickerInter = setInterval(function () {
        runFlicker()
    }, flickerSpeed);
}


// reset the order of layers so that late year is on top or early year
function orderFlickerLayers() {
    var earlyYear = $(".earlyYear").first().val();
    var lateYear = $(".lateYear").first().val();
    var earlyLayer = getDataTileLyr(earlyYear);
    var lateLayer = getDataTileLyr(lateYear);
    earlyLayer.addTo(lyrGroups.flickerMap.data);
    lateLayer.addTo(lyrGroups.flickerMap.data);
    updateYearLabel("#leftYear", $(".lateYear").first().val());
    removeOldTiles();
    updateOpacity();

}


// function to turn set and remove transparency
function runFlicker() {
    var year;
    if (flicker === 0) {
        flicker = $("#alphaSlider").val();
        year = $(".lateYear").first().val();
    } else {
        flicker = 0;
        year = $(".earlyYear").first().val();
    }
    updateYearLabel("#leftYear", year);
    lyrGroups.flickerMap.data.getLayers()[1].setOpacity(flicker);
}

function swipe() {
    var year1 = $("#yearSwipe1").val();
    var year2 = $("#yearSwipe2").val();
    leftSwipe = L.tileLayer(tileURL + '/' + year1 + '/{z}/{x}/{y}.png', {
        tms: true,
        opacity: 1,
        attribution: "",
        maxNativeZoom: 11,
        maxZoom: 13
    });
    rightSwipe = L.tileLayer(tileURL + '/' + year2 + '/{z}/{x}/{y}.png', {
        tms: true,
        opacity: 1,
        attribution: "",
        maxNativeZoom: 11,
        maxZoom: 13
    });

    map3.removeLayer(leftSwipe);
    map3.removeLayer(rightSwipe);
    map3.addLayer(leftSwipe);
    map3.addLayer(rightSwipe);
    sideBySide.setLeftLayers(leftSwipe);
    sideBySide.setRightLayers(rightSwipe);
}


function clearMapTileLayers() {
    stopFlicker(); // stop the flickering and reset the button if we change sections - do it regardless >
    if (drawControl === 1) {
        map.removeControl(drawControl);
    }
}

function initializeYearLabel(label) {
    if (label === "left") {
        $("#rightYear").hide();
        $("#leftYear").show();
        updateYearLabel("#leftYear", $(".lateYear").first().val());
    } else if (label === "both") {
        $("#rightYear").show();
        $("#leftYear").show();
        updateYearLabel("#leftYear", $(".earlyYear").first().val());
        updateYearLabel("#rightYear", $(".lateYear").first().val());
    }
}

function displayHandler(id, repeat = false) {
    clearMapTileLayers();
    switch (id) {

        case 'singleYearContainer':
            if (lastActiveSection === id && repeat === false) {

                return
            }
            $("#map").removeClass('hide').addClass('show');
            $("#flickerMap, #map1, #map2, #map3").removeClass('show').addClass('hide');
            initializeYearLabel("left");
            break;
        case 'flickerContainer':
            if (lastActiveSection === id && repeat === false) {
                return
            }
            $("#flickerMap").removeClass('hide').addClass('show');
            $("#map, #map1, #map2, #map3").removeClass('show').addClass('hide');
            initializeYearLabel("left");
            break;
        case 'splitContainer':
            if (lastActiveSection === id && repeat === false) {
                return
            }
            $("#map1, #map2").removeClass('hide').addClass('show');
            $("#map, #flickerMap, #map3").removeClass('show').addClass('hide');
            initializeYearLabel("both");
            break;
        case 'swipeContainer':
            if (lastActiveSection === id && repeat === false) {
                return
            }
            $("#map3").removeClass('hide').addClass('show');
            $("#map, #flickerMap, #map1, #map2").removeClass('show').addClass('hide');
            initializeYearLabel("both");
            //swipe()
            break;
        case 'multiPointContainer':
            if (lastActiveSection === id && repeat === false) {
                return
            }

            // clear the maps and layers
            $("#map").removeClass('hide').addClass('show');
            $("#map1, #map2").removeClass('show').addClass('hide');
            $("#map3").removeClass('show').addClass('hide');
            clearMapTileLayers();
            var year = $("#year").val();

            lyr = L.tileLayer(tileURL + '/' + year + '/{z}/{x}/{y}.png', {
                tms: true,
                opacity: 1,
                attribution: "",
                maxNativeZoom: 12,
                maxZoom: 13
            });
            map.addLayer(lyr);
            map.addControl(drawControl);
            drawControl = 1;
            break;
    }
}


// HANDLER FOR CLICKING ON THE PLOT EXIT BUTTON
function hidePlot() {
    $("#plot").hide();
}

// function to make a leaflet map and bind it to a div element
function makeMap(id, options) {
    return L.map(id, options)
}

function makeBaseLyrGroups() {
    for (var key in lyrGroups) {
        var osm = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            //attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });

        var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
            //attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
        });

        var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            //attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });

        lyrGroups[key].base = L.layerGroup([Esri_WorldImagery, Esri_NatGeoWorldMap, osm])
    }
}


// function to initialize the data layer group per map - it gets called after the year sliders are added
function makeDataLyrGroups() {
    var earlyYear = $(".earlyYear").first().val();
    var lateYear = $(".lateYear").first().val();
    for (var key in lyrGroups) {
        if (key === 'map') {
            var lateLayer = getDataTileLyr(lateYear);
            lyrGroups[key].data = L.layerGroup([lateLayer]);
        } else if (key === 'flickerMap') {
            var earlyLayer = getDataTileLyr(earlyYear);
            var lateLayer = getDataTileLyr(lateYear);
            lyrGroups[key].data = L.layerGroup([earlyLayer, lateLayer]);
        } else if (key === 'map1') {
            var earlyLayer = getDataTileLyr(earlyYear);
            lyrGroups[key].data = L.layerGroup([earlyLayer]);
        } else if (key === 'map2') {
            var lateLayer = getDataTileLyr(lateYear);
            lyrGroups[key].data = L.layerGroup([lateLayer]);
        } else if (key === 'map3') {
            var earlyLayer = getDataTileLyr(earlyYear);
            var lateLayer = getDataTileLyr(lateYear);
            lyrGroups[key].data = L.layerGroup([earlyLayer, lateLayer]);
        }
    }
}


// Define the style function outside as it doesn't need to be redefined every time
function style(feature) {
    return {
        opacity: 1,
        color: '#51b9ff',
        dashArray: '1,1,1',
        fillOpacity: 0.0,
        fillColor: '#ffffff'
    };
}

// Define highlightFeature function
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

// Define markFeature function
function markFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 7,
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    // Call dataListControl with 'select' action
    dataListControl(e, 'select');
}

// Define resetHighlight function
function resetHighlight(e) {
    var layer = e.target;
    ardLayer.resetStyle(e.target);
    // Call dataListControl with 'deselect' action
    dataListControl(e, 'deselect');
}

// Refactor dataListControl function to manage tile selection/deselection
function dataListControl(e, action) {
    var e_info = e.target.label; // Extract tile information
    if (action === 'select') {
        if (!hvlist.includes(e_info)) {
            hvlist.push(e_info);
        }
    } else if (action === 'deselect') {
        const index = hvlist.indexOf(e_info);
        if (index > -1) {
            hvlist.splice(index, 1);
        }
    }
    updateDownloadButtonState();
}

// Function to update download button state based on selected tiles
function updateDownloadButtonState() {
    if (hvlist.length < 1) {
        $('#download').removeClass('w3-green').addClass('w3-grey').css('cursor', 'not-allowed').text('Select Tile(s)');
    } else {
        $('#download').removeClass('w3-grey').addClass('w3-green').css('cursor', 'pointer').text("Download: " + hvlist.length + " tile(s)");
    }
}

// Updated function to initialize the overlay layer group per map
function makeOverlayLyrGroups() {
    for (var key in lyrGroups) {

        var ardLayer = L.geoJSON(ard, {
            style: style,
            onEachFeature: function(feature, layer) {
                layer['label'] = JSON.stringify(feature.properties.ARD_tile).replace(/[\{\}"]/g, '');
                layer.on({ dblclick: markFeature, click: resetHighlight });
            }
        });

        overlays.ard.maps[key] = {'layer': ardLayer};
    }
}


function plotMultiTimeSeriesData(coords) {
    if (multiTrace.length >= 6) {
        return
    }
    if ($("#plot").not(":visible")) {
        $("#plot").show();
    }

    var ts;
    $.post("request_handler_test.php", coords, function (data, status) {
        var data = JSON.parse(data);
        var trace = {
            x: data.yr,
            y: data.ts,
            type: 'scatter',
            line: {
                color: multiTraceColor[multiTrace.length], //'#498AF3', //'#D62851',
                width: '4'
            }
        };

        multiTrace.push(trace);
        var layout = {
            showlegend: false,
            paper_bgcolor: 'rgba(255,255,255,0)',
            plot_bgcolor: 'rgba(255,255,255,0)',
            width: 800,
            height: 170,
            margin: {
                l: 45,
                r: 10,
                t: 10,
                b: 30
            },
            xaxis: {
                gridcolor: '#545454'
            },
            yaxis: {
                range: [-100, 6000],
                gridcolor: '#545454'
            }
        };
        Plotly.newPlot('plot', multiTrace, layout, {
            scrollZoom: true,
            displaylogo: false,
            displayModeBar: false
        });
    });
}


