// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/
//PART 1: CREATE A JAVASCRIPT OBJECT
function GalleryImage(imgLocation, description, date, img) {
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	this.imgLocation = imgLocation;
	//2. description of photo
	this.description = description;
	//3. the date when the photo was taken
	this.date = date;
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
	this.img = img;
}

//PART 2: SLIDESHOW
// Counter for the mImages array
var mCurrentIndex = 0;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';

// Array holding GalleryImage objects (see below).
var mImages = [];

// XMLHttpRequest variable - fetches JSON located inside images.json file -- make a string
var mRequest = new XMLHttpRequest();
mRequest.onreadystatechange = function() {
	if (mRequest.readyState == 4 && mRequest.status == 200){
		// Holds the retrived JSON information - contains a list of photo URLs and related metadata
		var mJson = JSON.parse(mRequest.responseText);
		for (var i = 0; i < mJson.images.length; i++){ 
			mImages.push(new GalleryImage(mJson.images[i].imgLocation, mJson.images[i].description, mJson.images[i].date, mJson.images[i].img))
		}
	}
};
mRequest.open("GET", mUrl, true);
mRequest.send();

//Create a slide show to iterate over GalleryImage Objects in mImages[] 
function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	
	//Implement swapPhoto() so when it gets called, it finds the <img> inside the div#slideShow
	//and swaps its current src with a new src on a GalleryImage object in your array. Use the
	//GalleryImage’s metadata information (Description, Location, and Date) and update the
	//div.details section with the extracted info.
	$("#photo").attr("src",mImages[mCurrentIndex].img);
	$("#location").attr("value",mImages[mCurrentIndex].imgLocation);
	$("#description").attr("value",mImages[mCurrentIndex].description);
	$("#date").attr("value",mImages[mCurrentIndex].date);
	
	//Use a counter called mCurrentIndex to loop through all GalleryImage objects in the array.
	//When you reach the end, start over again.
	if(mCurrentIndex < mImages.length){
		mCurrentIndex++;
	}
	else{
		mCurrentIndex = 0;
	};
	console.log('swap photo');
}


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);
