jQuery(document).ready(function($){
	
	var timelines = $('.cd-horizontal-timeline'),
		eventsMinDistance = 100;
	var mymap;
	var markers = [];
	
	initMap();
	
	(timelines.length > 0) && initTimeline(timelines);

	function initMap(){ 
		mymap = L.map('mapid').setView([0, 0], 2);
		mymap.options.minZoom = 1;
		//L.tileLayer('https://api.mapbox.com/styles/v1/wcramblitt/civ1ah3n3009v2ipqozublzqz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2NyYW1ibGl0dCIsImEiOiJjaXV5dTQ5N24wNG9sMnlwZGRqOG1kaTJqIn0.pgQe-LwXG6REDkpe_1jVTQ').addTo(mymap);
				L.tileLayer('https://api.mapbox.com/styles/v1/wcramblitt/ciuzu3a7n005w2ikhxlcgks2v/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2NyYW1ibGl0dCIsImEiOiJjaXV5dTQ5N24wNG9sMnlwZGRqOG1kaTJqIn0.pgQe-LwXG6REDkpe_1jVTQ').addTo(mymap);

		var marker = L.marker([39.7167 , 2.9]).bindPopup("1438 - Inca Empire founded");
		marker.date = new Date("01/01/1438");
		markers = [marker];
		
		marker = L.marker([25.0343 , -77.3963]).bindPopup("1492 - Christopher Columbus Discovered America");
		marker.date = new Date("01/01/1492");
		markers.push(marker);
		
		marker = L.marker([43.2141 , 43.2141]).bindPopup("1444 - Ottoman Empire defeated Polish and Hungarian armies at Varna");
		marker.date = new Date("01/01/1444");
		markers.push(marker);
		
		marker = L.marker([37.2083 , -76.7741]).bindPopup("1502 - First African Slaves arrive in America");
		marker.date = new Date("01/01/1502");
		markers.push(marker);
		
		marker = L.marker([19.435  , -99.131]).bindPopup("1521 - Spanish conquered Mexico");
		marker.date = new Date("01/01/1521");
		markers.push(marker);
		
		marker = L.marker([17  , -4]).bindPopup("1599 - Mali Empire defeated");
		marker.date = new Date("01/01/1599");
		markers.push(marker);
		
		marker = L.marker([51.5074  , -0.1]).bindPopup("1663 - Robert Hook discovered cells");
		marker.date = new Date("01/01/1663");
		markers.push(marker);
		
		marker = L.marker([46.2276  , -2.2]).bindPopup("1692 - Famine in France killed 2 million people");
		marker.date = new Date("01/01/1692");
		markers.push(marker);
		
		marker = L.marker([39.1  , 35.6]).bindPopup("1711 - Ottoman Empire Russian War");
		marker.date = new Date("01/01/1711");
		markers.push(marker);
		
		marker = L.marker([61.5240  , 105.3]).bindPopup("1723 - Slavery abolished in Russia");
		marker.date = new Date("01/01/1723");
		markers.push(marker);
		
		marker = L.marker([-33.8688  , 151.2]).bindPopup("1788 - First settlement established in Sydney, Australia");
		marker.date = new Date("01/01/1788");
		markers.push(marker);
		
		marker = L.marker([40.7128  , -74]).bindPopup("1792 - New York Stock Exchange founded");
		marker.date = new Date("01/01/1792");
		markers.push(marker);
		
		marker = L.marker([55.3781  , -3.4]).bindPopup("1801 - Ireland and Great Britain merge to form the United Kingdom");
		marker.date = new Date("01/01/1801");
		markers.push(marker);
		
		marker = L.marker([32.7523  , -79.87]).bindPopup("1861 - American Civil War began");
		marker.date = new Date("01/01/1861");
		markers.push(marker);
		
		marker = L.marker([64.2008  , -149.49]).bindPopup("1867 - Alaska purchased by United States from Russia");
		marker.date = new Date("01/01/1867");
		markers.push(marker);
		
		marker = L.marker([30.751448  , 32.32]).bindPopup("1869 - Suez Canal opened");
		marker.date = new Date("01/01/1869");
		markers.push(marker);
		
		marker = L.marker([48.8699  , 2.32]).bindPopup("1894 - First commercial film was released");
		marker.date = new Date("01/01/1894");
		markers.push(marker);
		

	}
	
	function initTimeline(timelines) {
		timelines.each(function(){
			var timeline = $(this),
				timelineComponents = {};
			//cache timeline components 
			timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
			timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
			timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
			timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
			timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
			timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
			timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
			timelineComponents['eventsContent'] = timeline.children('.events-content');

			//assign a left postion to the single events along the timeline
			setDatePosition(timelineComponents, eventsMinDistance);
			//assign a width to the timeline
			var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
			//the timeline has been initialize - show it
			timeline.addClass('loaded');

			//detect click on the next arrow
			timelineComponents['timelineNavigation'].on('click', '.next', function(event){
				event.preventDefault();
				updateSlide(timelineComponents, timelineTotWidth, 'next');
			});
			//detect click on the prev arrow
			timelineComponents['timelineNavigation'].on('click', '.prev', function(event){
				event.preventDefault();
				updateSlide(timelineComponents, timelineTotWidth, 'prev');
			});
			timelineComponents['timelineNavigation'].on('click', '.up', function(event){
				event.preventDefault();
				updateVisibleContent();
				timelineComponents['timelineEvents'].removeClass('selected');
				timelineComponents['timelineNavigation'].find('.up').addClass('inactive')
				updateFilling(null, timelineComponents['fillingLine'], timelineTotWidth);
			});
			//detect click on the a single event - show new event content
			timelineComponents['eventsWrapper'].on('click', 'a', function(event){
				event.preventDefault();
				timelineComponents['timelineEvents'].removeClass('selected');
				$(this).addClass('selected');
				timelineComponents['timelineNavigation'].find('.up').removeClass('inactive')
				updateOlderEvents($(this));
				updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
				updateVisibleContent($(this), timelineComponents['eventsContent']);
			});

			//on swipe, show next/prev event content
			timelineComponents['eventsContent'].on('swipeleft', function(){
				var mq = checkMQ();
				( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'next');
			});
			timelineComponents['eventsContent'].on('swiperight', function(){
				var mq = checkMQ();
				( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'prev');
			});

			//keyboard navigation
			$(document).keyup(function(event){
				if(event.which=='37' && elementInViewport(timeline.get(0)) ) {
					showNewContent(timelineComponents, timelineTotWidth, 'prev');
				} else if( event.which=='39' && elementInViewport(timeline.get(0))) {
					showNewContent(timelineComponents, timelineTotWidth, 'next');
				}
			});
			initVisibleContent();
			$('#currentYearRange').text('Displaying all events');
			timelineComponents['timelineNavigation'].find('.up').addClass('inactive')
		});
	}

	function updateSlide(timelineComponents, timelineTotWidth, string) {
		//retrieve translateX value of timelineComponents['eventsWrapper']
		var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
			wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
		//translate the timeline to the left('next')/right('prev') 
		(string == 'next') 
			? translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth)
			: translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
	}

	function showNewContent(timelineComponents, timelineTotWidth, string) {
		//go from one event to the next/previous one
		var visibleContent =  timelineComponents['eventsContent'].find('.selected'),
			newContent = ( string == 'next' ) ? visibleContent.next() : visibleContent.prev();

		if ( newContent.length > 0 ) { //if there's a next/prev event - show it
			var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
				newEvent = ( string == 'next' ) ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');
			
			updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
			updateVisibleContent(newEvent, timelineComponents['eventsContent']);
			newEvent.addClass('selected');
			selectedDate.removeClass('selected');
			updateOlderEvents(newEvent);
			updateTimelinePosition(string, newEvent, timelineComponents);
		}
	}

	function updateTimelinePosition(string, event, timelineComponents) {
		if (event.length == 0) return;
		//translate timeline to the left/right according to the position of the selected event
		var eventStyle = window.getComputedStyle(event.get(0), null),
			eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
			timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
			timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
		var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

        if( (string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < - timelineTranslate) ) {
        	translateTimeline(timelineComponents, - eventLeft + timelineWidth/2, timelineWidth - timelineTotWidth);
        }
	}

	function translateTimeline(timelineComponents, value, totWidth) {
		var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
		value = (value > 0) ? 0 : value; //only negative translate value
		value = ( !(typeof totWidth === 'undefined') &&  value < totWidth ) ? totWidth : value; //do not translate more than timeline width
		setTransformValue(eventsWrapper, 'translateX', value+'px');
		//update navigation arrows visibility
		(value == 0 ) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
		(value == totWidth ) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
	}

	function updateFilling(selectedEvent, filling, totWidth) {
		if (!selectedEvent || selectedEvent.length == 0) 
		{
			setTransformValue(filling.get(0), 'scaleX', 0);
		}
		else
		{
			//change .filling-line length according to the selected event
		var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
			eventLeft = eventStyle.getPropertyValue("left"),
			eventWidth = eventStyle.getPropertyValue("width");
		eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', ''))/2;
		var scaleValue = eventLeft/totWidth;
		setTransformValue(filling.get(0), 'scaleX', scaleValue);		
		}
	}

	function setDatePosition(timelineComponents, min) {
		for (i = 0; i < timelineComponents['timelineDates'].length; i++) { 
		    var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]),
		    	distanceNorm = Math.round(distance/timelineComponents['eventsMinLapse']) + 2;
		    timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm*min+'px');
		}
	}

	function setTimelineWidth(timelineComponents, width) {
		var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length-1]),
			timeSpanNorm = timeSpan/timelineComponents['eventsMinLapse'],
			timeSpanNorm = Math.round(timeSpanNorm) + 4,
			totalWidth = timeSpanNorm*width;
		timelineComponents['eventsWrapper'].css('width', totalWidth+'px');
		updateFilling(timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents['fillingLine'], totalWidth);
		updateTimelinePosition('next', timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents);
	
		return totalWidth;
	}

	function initVisibleContent(selectedDate) {
		for (var i =0; i < markers.length; i++)
		{
			if (!selectedDate)
			{
				markers[i].addTo(mymap);
			}
			else if (parseInt(markers[i].date.getFullYear()/100)*100 == selectedDate){
				markers[i].addTo(mymap);
			}
		}
	}
	
	function updateVisibleContent(event, eventsContent) {
		if (!event)
		{
			$('#currentYearRange').text('Displaying all events');
			for (var i =0; i < markers.length; i++)
			{
				mymap.removeLayer(markers[i]);
				markers[i].addTo(mymap);
				
			}
			return;
		}
		$('#currentYearRange').text('Displaying events from '+ event.data('date') + " - " + (100 + Number(event.data('date'))));
		for (var i =0; i < markers.length; i++)
		{
			if (parseInt(markers[i].date.getFullYear()/100)*100 == event.data('date')){
				markers[i].addTo(mymap);
			}
			else{
				mymap.removeLayer(markers[i]);
			}
		}
	}

	function updateOlderEvents(event) {
		event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
	}

	function getTranslateValue(timeline) {
		var timelineStyle = window.getComputedStyle(timeline.get(0), null),
			timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
         		timelineStyle.getPropertyValue("-moz-transform") ||
         		timelineStyle.getPropertyValue("-ms-transform") ||
         		timelineStyle.getPropertyValue("-o-transform") ||
         		timelineStyle.getPropertyValue("transform");

        if( timelineTranslate.indexOf('(') >=0 ) {
        	var timelineTranslate = timelineTranslate.split('(')[1];
    		timelineTranslate = timelineTranslate.split(')')[0];
    		timelineTranslate = timelineTranslate.split(',');
    		var translateValue = timelineTranslate[4];
        } else {
        	var translateValue = 0;
        }

        return Number(translateValue);
	}

	function setTransformValue(element, property, value) {
		element.style["-webkit-transform"] = property+"("+value+")";
		element.style["-moz-transform"] = property+"("+value+")";
		element.style["-ms-transform"] = property+"("+value+")";
		element.style["-o-transform"] = property+"("+value+")";
		element.style["transform"] = property+"("+value+")";
	}

	//based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
	function parseDate(events) {
		var dateArrays = [];
		events.each(function(){
			var singleDate = $(this),
				dateComp = singleDate.data('date');
			var	newDate = new Date(dateComp);
			dateArrays.push(newDate);
		});
	    return dateArrays;
	}

	function daydiff(first, second) {
	    return Math.round((second-first));
	}

	function minLapse(dates) {
		//determine the minimum distance among events
		var dateDistances = [];
		for (i = 1; i < dates.length; i++) { 
		    var distance = daydiff(dates[i-1], dates[i]);
		    dateDistances.push(distance);
		}
		return Math.min.apply(null, dateDistances);
	}

	/*
		How to tell if a DOM element is visible in the current viewport?
		http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
	*/
	function elementInViewport(el) {
		var top = el.offsetTop;
		var left = el.offsetLeft;
		var width = el.offsetWidth;
		var height = el.offsetHeight;

		while(el.offsetParent) {
		    el = el.offsetParent;
		    top += el.offsetTop;
		    left += el.offsetLeft;
		}

		return (
		    top < (window.pageYOffset + window.innerHeight) &&
		    left < (window.pageXOffset + window.innerWidth) &&
		    (top + height) > window.pageYOffset &&
		    (left + width) > window.pageXOffset
		);
	}

	function checkMQ() {
		//check if mobile or desktop device
		return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}
	
	var markersToRestore = [];
	$( "#searchBox" ).keyup(function() {
		//restore any removedMarkers
		for (var i = 0; i < markersToRestore.length; i++)
		{
			markersToRestore[i].addTo(mymap);
			
		}
		markersToRestore = [];
		//Search for keyword and update map accordingly
			$.each(mymap._layers, function( index, value ) {
				if (value._popup && value._popup._content)
				{
					if (!value._popup._content.toLowerCase().includes($("#searchBox").val().toLowerCase()))
					{
						markersToRestore.push(value);
						mymap.removeLayer(value);
					}
				}
			});
		
	});
});

function openTracksFrame(track) {
	var tracksFrame = document.getElementById("tracksFrame");
	var tracksModal = document.getElementById("tracksModal");
	tracksModal.style.display = "block";
	tracksFrame.style.display="block";
	tracksFrame.src = track;
}

function closeTracksFrame() {
	var tracksFrame = document.getElementById("tracksFrame");
		var tracksModal = document.getElementById("tracksModal");
	tracksModal.style.display = "none";
	tracksFrame.style.display="none";
	tracksFrame.src = track;
}
