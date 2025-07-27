// Counter animation logic for React migration
// To be refactored into a Counter component

// Example usage in vanilla JS (to be converted to React):
// var observer = new IntersectionObserver(function (entries) {
//   entries.forEach(function (entry) {
//     if (entry.isIntersecting) {
//       var number = entry.target.getElementsByClassName('counter-number')[0];
//       var max = parseInt(entry.target.getAttribute('data-max'));
//       var duration = 5000;
//       var increment = Math.ceil(max / (duration / 10));
//       var interval = setInterval(function () {
//         if (parseInt(number.textContent) < max) {
//           number.textContent = parseInt(number.textContent) + increment;
//         } else {
//           number.textContent = max;
//           clearInterval(interval);
//         }
//       }, 10);
//     }
//   });
// });
//
// var boxes = document.getElementsByClassName('cb');
// for (var i = 0; i < boxes.length; i++) {
//   observer.observe(boxes[i]);
// } 