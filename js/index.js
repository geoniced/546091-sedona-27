var popover = document.querySelector('.booking-popover');
var popoverButton = document.querySelector('.booking-button-popover');

var form = document.querySelector('.booking-form');
var bookingButton = form.querySelector('.booking-button');

var checkIn = form.querySelector('[name=booking-check-in]');
var checkOut = form.querySelector('[name=booking-check-out]');
var bookingAdults = form.querySelector('[name=booking-adults]');
var bookingChildren = form.querySelector('[name=booking-children]');

var isEmptyFields = false;
var isWrongAmount = false;
var isStorageSupport = true;
var peopleBooked = {};

try {
  peopleBooked.adults = localStorage.getItem('adults');
  peopleBooked.children = localStorage.getItem('children');
} catch (err) {
  isStorageSupport = false;
}

popover.classList.remove('booking-popover-show');
popover.classList.add('booking-popover-hide');

popoverButton.addEventListener("click", function(evt) {
  evt.preventDefault();

  popover.classList.remove('booking-popover-error');

  if (popover.classList.contains('booking-popover-show')) {
    window.removeEventListener('keydown', keydownHandler);
  } else {
    window.addEventListener('keydown', keydownHandler);

    checkIn.focus();

    if (peopleBooked.adults && peopleBooked.children) {
      bookingAdults.value = peopleBooked.adults;
      bookingChildren.value = peopleBooked.children;
    }
  }

  popover.classList.toggle('booking-popover-show');
  popover.classList.toggle('booking-popover-hide');
});

form.addEventListener('submit', function(evt) {
  isEmptyFields = !checkIn.value || !checkOut.value || !bookingAdults.value || !bookingChildren.value;
  isWrongAmount = (bookingAdults.value <= 0) || (bookingChildren.value < 0);
  if (isEmptyFields || isWrongAmount) {
    evt.preventDefault();
    popover.classList.remove('booking-popover-error');
    popover.offsetWidth = popover.offsetWidth;
    popover.classList.add('booking-popover-error');
  } else if (isStorageSupport) {
    localStorage.setItem('adults', bookingAdults.value);
    localStorage.setItem('children', bookingChildren.value);
  }
});

function keydownHandler(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    popover.classList.remove('booking-popover-show');
    popover.classList.add('booking-popover-hide');
    popover.classList.remove('booking-popover-error');

    window.removeEventListener('keydown', keydownHandler);
  }
}
