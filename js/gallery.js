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
function GalleryImage(imgLocation, description, date, imgPath) {
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	this.imgLocation = imgLocation;
	//2. description of photo
	this.description = description;
	//3. the date when the photo was taken
	this.date = date;
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
	this.imgPath = imgPath;
}

//PART 2: SLIDESHOW
// Counter for the mImages array
var mCurrentIndex = 0;

//Current image
var currentImg;

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
			mImages.push(new GalleryImage(mJson.images[i].imgLocation, mJson.images[i].description, mJson.images[i].date, mJson.images[i].imgPath))
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
	
	//Use a counter called mCurrentIndex to loop through all GalleryImage objects in the array.
	//When you reach the end, start over again.
	if(mCurrentIndex < mImages.length){
		mCurrentIndex++;
	}
	else{
		mCurrentIndex = 0;
	};
	//Swap current photo with new src / update the detail section
	//div.details section with the extracted info.
	$("#photo").attr("src",mImages[mCurrentIndex].imgPath);
	$("#location").html("Location: " + currentImg.imgLocation);
	$("#description").html("Description: " + currentImg.description);
	$("#date").html("Date: " + currentImg.date);
	
	console.log('swap photo');
}

//Loop in reverse
function reverseSwap(){
	if(mCurrentIndex <= 0){
		mCurrentIndex = mImages.length;
	}
	else{
		mCurrentIndex --;
		currentImg = mImages[mCurrentIndex];
	};
	
	$("#photo").attr("src",mImages[mCurrentIndex].imgPath);
	$("#location").html("Location: " + currentImg.imgLocation);
	$("#description").html("Description: " + currentImg.description);
	$("#date").html("Date: " + currentImg.date);
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
	//PART 3: GELLERY
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
	// Toggle image information
	//Add a click handler to the img.moreIndicator
	$('#more').on('click', () => {
		if($(this).hasClass("rot90")){
			//cause the arrow to animate upside down
			$('#more').addClass('rot270'); 
			$('#more').removeClass('rot90');
			//Slides down/up the div.details depending on the arrow direction
			$('.details').eq(0).slideDown();
		}
		else{
			$('#more').addClass('rot90');
			$('#more').removeClass('rot270');
			$('.details').eq(0).slideUp();
		}
	});
	
	//Add click handlers (in jQuery) to the #nextPhoto and #prevPhoto in the div#nav so that when
	//they are clicked, they will go to the next photo or the previous photo, respectively. They
	//should be shown in the array order. On the last photo, it should loop back to the first photo
	//when #nextPhoto is pressed. Likewise, on the first photo, it should loop back to the last photo
	//when #prevphoto is pressed.

	$('#prevPhoto').click(function() {
		console.log(mCurrentIndex);
		swapPhotoBack();		
	});
	
	$('#nextPhoto').on('click', function() {
		swapPhoto();	
		console.log(mCurrentIndex);
	});
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);
