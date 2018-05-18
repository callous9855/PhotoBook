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


// Start zoom picture
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
// End zoom picture
//drag and drop image 
// ************************ Drag and drop ***************** //
let dropArea = document.getElementById("drop-area")

// Prevent default drag behaviors
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)   
  document.body.addEventListener(eventName, preventDefaults, false)
})

// Highlight drop area when item is dragged over it
;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('active')
}

function handleDrop(e) {
  var dt = e.dataTransfer
  var files = dt.files

  handleFiles(files)
}

let uploadProgress = []
let progressBar = document.getElementById('progress-bar')

function initializeProgress(numFiles) {
  progressBar.value = 0
  uploadProgress = []

  for(let i = numFiles; i > 0; i--) {
    uploadProgress.push(0)
  }
}

function updateProgress(fileNumber, percent) {
  uploadProgress[fileNumber] = percent
  let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
  console.debug('update', fileNumber, percent, total)
  progressBar.value = total
}

function handleFiles(files) {
  files = [...files]
  initializeProgress(files.length)
  files.forEach(uploadFile)
  files.forEach(previewFile)
}

// preview image
function previewFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function() {
    let img = document.createElement('img');
    img.setAttribute('name','upload_img');
    img.setAttribute('id','img_upload');
    img.src = reader.result
    document.getElementById('gallery').appendChild(img);
    document.getElementById("drop-image-here").style.display = "none";
    document.getElementById('img_upload').style.margin = '0px 50px';
    document.getElementById('up_photo_btn').classList.remove('hideButton');
    document.getElementById('crop_resize').classList.remove('hideButton');
    document.getElementById('select-image').classList.add('hideButton');

  }
}

// upload image
function uploadFile(file, i) {
  var url = 'https://api.cloudinary.com/v1_1/joezim007/image/upload'
  var xhr = new XMLHttpRequest()
  var formData = new FormData()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function(e) {
    updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
  })

  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateProgress(i, 100) // <- Add this
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  })

  formData.append('upload_preset', 'ujpu6gyk')
  formData.append('file', file)
  xhr.send(formData)
}
// end drag and drop image

// GET DATA
// get group photo story
function getGroupPhoto(){

}

// get group list
function getGroupList(){

}

// start document
$(document).ready(function(){
  getGroupPhoto();
  getGroupList();

  //3.1 start add group
  $('#').click(function (e){
    e.preventDefault();
    var form = $('#').serialize();

    $.ajax({
      url: '/groups/create',
      method: 'POST',
      dataType: 'json',
      data: form,

    }).done(function (data){
      
      // reload
      // getGroupList();

    }).fail(function (error, group) {
      console.log(error.message); 
    
      // json group object 
      console.log(group);
    });
  });
  // end add group

  //3.2.1 start search user
  $('#us_find_btn').click(function (e){
    e.preventDefault();
    var form = $('#').serialize();

    $.ajax({
      url: '/findUser',
      method: 'POST',
      dataType: 'json',
      data: form,

    }).done(function (data){
      

    }).fail(function (error, username, found) {
      console.log(error.message); 
      console.log(found);
      // json username object 
      console.log(username);
    });
  });
  // end search user

  //3.2.2 start add user
  $('#us_add_btn').click(function (e){
    e.preventDefault();
    var form = $('#').serialize();

    $.ajax({
      url: '/groups/addMember',
      method: 'POST',
      dataType: 'json',
      data: form,

    }).done(function (data){
      

    }).fail(function (error, member) {
      console.log(error.message); 
    
      // json photo object 
      console.log(member);
    });
  });
  // end add user

  //4.1 start upload photo story
  $('#up_photo_btn').click(function (e){
    e.preventDefault();
    var form = document.querySelector('#up_photo_form');

    $.ajax({
      url: '/groups/<group_code>/upload',
      method: 'POST',
      dataType: 'json',
      data: new FormData(form),
      processData: false,
      contentType: false,

    }).done(function (data){
      form.reset();

      // reload
      // getGroupPhoto();

    }).fail(function (error, photo) {
      console.log(error.message); 
      // json photo object 
      console.log(photo);
    });
  });
  // end thêm photo story

})
// end document