let specificModeBtns = document.getElementsByClassName('specificModeButtons');
let uploadedImage;

function changeMode() {
    for (let i = 0; i < specificModeBtns.length; i++) {
        specificModeBtns[i].style.display = "none";
        print(i);
    }
    switch (checklistSelection.value()) {
        case 'mario':
            currentKinegram = marioKinegram;
            break;
        case 'camera':
            takePicBtn.show();
            // overlayToggleCheckbox.show();
            currentKinegram = cameraKinegram;

            break;
        case 'upload':
            uploadImagesBtn.show();
            submitImgBtn.show();
            break;
        case 'gif':
            currentKinegram = gifKinegram;
            break;
    }
}

function saveToDisk() {
    currentKinegram.save();
}

function takePicture() {
    print('taking pic');
}


function handleFile(file) {
    print(file);
    if (file.type === 'image') {
        let img = createImg(file.data);
        uploadKinegram.addFrame(img);
        if (uploadKinegram.frames.length > 1) {
            uploadKinegram.generateKinegram();
            uploadKinegram.generateOverlay();
        }
        currentKinegram = uploadKinegram;
    }
}

function gotFile(file) {

  var img = createImg(file.data).hide();
    print(img);
  // Draw the image onto the canvas
  image(img, 0, 0, width, height);
}

function addImagesFromComputer() {
    // var theFile = new p5.File(uploadImagesBtnDOM.files[0]);
    // var img = createImg(theFile.data).hide();
    // print(theFile);
    // image(img,0,0);
    // //uploadedImage = loadImage(theFile.data, drawImg);
    previewFile();
}

function drawImg() {
    image(uploadedImage,0,0);
}

function previewFile(){
   var preview = document.getElementById('image_preview'); //selects the query named img
   var files    = document.querySelector('input[type=file]').files; //sames as here

   let i;
   for(i = 0; i < files.length - 1; i++) {
        uploadImages[i] = loadImage(window.URL.createObjectURL(files[i]));
   }

    uploadImages[i] = loadImage(window.URL.createObjectURL(files[i]), generateUploadKinegram);
    console.log("Done!");
}

function generateUploadKinegram() {
    console.log("Ho ho ho");
    uploadKinegram = new Kinegram(uploadImages, 5, "Upload Kinegram");
    uploadKinegram.generateKinegram();
    uploadKinegram.generateOverlay();
    currentKinegram = uploadKinegram;
}
