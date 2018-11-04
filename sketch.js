let checklistSelection;
let saveKinegramButton, uploadImagesBtn, takePicBtn, submitImgBtn;
let overlayToggleCheckbox;

let marioImages = [];
let marioKinegram;

let uploadImages = [];
let uploadKinegram;

let currentKinegram;

let pos = 0;

let camera;

function preload() {
    for (let i = 0; i < 4; i++) {
        marioImages[i] = loadImage('images/pattern5/pattern' + i + '.png');
    }
}

function setup() {

    createCanvas(720, 600);
    frameRate(10);

    var constraints = {
        video: {
            mandatory: {
                minWidth: 640,
                minHeight: 360
            },
            optional: [{
                maxFrameRate: 10
            }]
        },
        audio: false
    };

    camera = createCapture(constraints);
    camera.hide();

    checklistSelection = select('#mode');
    checklistSelection.changed(changeMode);

    imageMode(CENTER);

    // set up first kinegram to be displayed on load i.e. mario
    marioKinegram = new Kinegram(marioImages, 7, "Mario Kinegram");
    marioKinegram.generateKinegram();
    marioKinegram.generateOverlay();
    currentKinegram = marioKinegram;

    cameraKinegram = new Kinegram();
    //uploadKinegram = new Kinegram();
    gifKinegram = new Kinegram();


    saveKinegramButton = select('#saveBtn');
    saveKinegramButton.mouseClicked(saveToDisk);

    // Didn't find a straightforward way to do this. :( with just p5
    uploadImagesBtn = select('#uploadPicBtn');
    uploadImagesBtnDOM = document.getElementById('uploadPicBtn');

    submitImgBtn = select('#submitImageBtn');
    submitImgBtn.mouseClicked(addImagesFromComputer);

    takePicBtn = select('#takePicBtn');
    takePicBtn.mouseClicked(takePicture);

    // overlayToggleCheckbox.select('#overlayToggle');
    changeMode();
}

function draw() {
    // print(currentKinegram.frames.length);
    background(240);
    if (currentKinegram.frames.length > 1) {
        currentKinegram.showKinegram();
        currentKinegram.showOverlay(pos++);
    } else {
        text("take / upload a few more pictures", width / 2, height / 2);
    }
}
