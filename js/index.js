var popover = document.querySelector('.booking-popover');
var popoverButton = document.querySelector('.booking-button-popover');

var form = document.querySelector('.booking-form');
var bookingButton = form.querySelector('.booking-button');

var checkIn = form.querySelector('[name=booking-check-in]');
var checkOut = form.querySelector('[name=booking-check-out]');
var bookingAdults = form.querySelector('[name=booking-adults]');
var bookingChildren = form.querySelector('[name=booking-children]');

var isEmptyFields = false;
var isStorageSupport = true;
var peopleBooked = {};

try {
  peopleBooked.adults = localStorage.getItem('adults');
  peopleBooked.children = localStorage.getItem('children');
} catch (err) {
  isStorageSupport = false;
}

popover.classList.remove('booking-popover-show');

popoverButton.addEventListener("click", function(evt) {
  evt.preventDefault();

  popover.classList.toggle('booking-popover-show');
  popover.classList.remove('booking-popover-error');

  checkIn.focus();

  if (peopleBooked.adults && peopleBooked.children) {
    bookingAdults.value = peopleBooked.adults;
    bookingChildren.value = peopleBooked.children;
  }
});

bookingButton.addEventListener('click', function(evt) {
  isEmptyFields = !checkIn.value || !checkOut.value || !bookingAdults.value || !bookingChildren.value;
  if (isEmptyFields) {
    evt.preventDefault();
    popover.classList.remove('booking-popover-error');
    popover.offsetWidth = popover.offsetWidth;
    popover.classList.add('booking-popover-error');
  } else {
    localStorage.setItem('adults', bookingAdults.value);
    localStorage.setItem('children', bookingChildren.value);
  }
});

window.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27 && popover.classList.contains('booking-popover-show')) {
    evt.preventDefault();
    popover.classList.remove('booking-popover-show');
    popover.classList.remove('booking-popover-error');
  }
});
