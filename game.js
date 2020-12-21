buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var ceckNumber = 0;
var playstart = false;

function nextSequence() {
  max = 3;
  min = 0;
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  var color = buttonColours[randomNumber];

  gamePattern.push(color);

  setTimeout(function () {
    if (gamePattern.length < 2) {
      $("#level-title").text("LEVEL" + gamePattern.length);
    } else {
      $("#level-title").text("👏 LEVEL" + gamePattern.length);
    }

    playSound(color);
    fade(color);
    ceckNumber = 0;
    userClickedPattern = [];
  }, 500);
}

for (idxBtnCol = 0; idxBtnCol < buttonColours.length; idxBtnCol++) {
  $("#" + buttonColours[idxBtnCol]).click(function (event) {
    var actColor = event.target.id;
    if (playstart) {
      userClickedPattern.push(actColor);

      if (userClickedPattern[ceckNumber] == gamePattern[ceckNumber]) {
        playSound(actColor);
        fade(actColor);
        ceckNumber++;
        if (ceckNumber == gamePattern.length) {
          nextSequence();
        }
      } else {
        playstart = false;
        playSound("wrong");
        $("#level-title").text("😫GAME OVER!😪");
        $("#level-title-line2").text("LEVEL" + gamePattern.length.toString());
        $("#level-title-line3").text("Press A Key to Re-Start");
        $("body").addClass("game-over");

        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 500);
      }
    }
  });
}

$(document).keydown(function (event) {
  if (event.originalEvent.key === "a") {
    $("#level-title-line2").text("");
    $("#level-title-line3").text("");

    gamePattern = [];
    userClickedPattern = [];
    nextSequence();
    playstart = true;
  }
});

function playSound(color) {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "./sounds/" + color + ".mp3");
  audioElement.play();
}

function fade(color) {
  $("#" + color)
    .fadeOut(100)
    .fadeIn(100);
}
