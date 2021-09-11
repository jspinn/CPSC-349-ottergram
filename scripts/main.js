var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var PREVIOUS_BUTTON_CLASS = '[data-button-role="previous-button"]';
var NEXT_BUTTON_CLASS = '[data-button-role="next-button"]';
var ESC_KEY = 27;
var LEFT_KEY = 37;
var UP_KEY = 38;
var RIGHT_KEY = 39;
var DOWN_KEY = 40;

var currentThumb = document.querySelector(THUMBNAIL_LINK_SELECTOR);

function setDetails(imageUrl, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  if (thumbnail !== null) {
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
    currentThumb = thumbnail;
  }
}

function addThumbClickHandler(thumbnail) {
  'use strict';
  thumbnail.addEventListener('click', function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumbnail);
    showDetails();
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
  'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function() {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function selectNextThumbnail() {
  'use strict';
  var next = currentThumb.parentElement.nextElementSibling
  if (next !== null) {
    setDetailsFromThumb(next.firstChild)
    showDetails();
  }
}

function selectPreviousThumbnail() {
  'use strict';
  var previous = currentThumb.parentElement.previousElementSibling
  if (previous !== null) {
    setDetailsFromThumb(previous.firstChild)
    showDetails();
  }
}

function addKeyPressHandler() {
  'use strict';
  document.body.addEventListener('keyup', function (event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === ESC_KEY) {
      hideDetails();
    }
    else if (event.keyCode === RIGHT_KEY || event.keyCode === DOWN_KEY) {
      selectNextThumbnail();
    }
    else if (event.keyCode === LEFT_KEY || event.keyCode === UP_KEY) {
      selectPreviousThumbnail();
    }
  });
}

function addButtonPressHandlers() {
  'use strict';
  var previousButton = document.querySelector(PREVIOUS_BUTTON_CLASS);
  var nextButton = document.querySelector(NEXT_BUTTON_CLASS);

  previousButton.addEventListener('click', function(event) {
    event.preventDefault();
    selectPreviousThumbnail();
  });

  nextButton.addEventListener('click', function(event) {
    event.preventDefault();
    selectNextThumbnail();
  });
}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
  addButtonPressHandlers();
}

initializeEvents();