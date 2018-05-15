(function() {
  function updateTimelineItems(event, firstRun) {
    var top = 0;
    var bottom = window.innerHeight;

    [].slice.call(document.querySelectorAll('.fs-timeline-item')).forEach(function(element, i) {
      var rect = element.getBoundingClientRect();
      if (rect.bottom >= top && rect.top <= bottom) {
        if (firstRun === true) {
          setTimeout(function() {
            this.classList.add('is-visible');
          }.bind(element), i * 120);
        } else {
          element.classList.add('is-visible');
        }
      } else {
        element.classList.remove('is-visible');
      }
    });
  }
  window.addEventListener('resize', updateTimelineItems);
  window.addEventListener('scroll', updateTimelineItems);
  updateTimelineItems(null, true);
})();


// Get the modal
var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById('myImg');
var modalImg = document.getElementById("img01");
img.onclick = function(){
    document.getElementById("photo-timeline").style.display = 'none';
    modal.style.display = "block";
    modalImg.src = this.src;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
  document.getElementById("photo-timeline").style.display = ""; 
}