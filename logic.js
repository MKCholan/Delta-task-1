//inserting the images
function insertImage() {
  document.querySelectorAll(".box").forEach((image) => {
    if (image.innerText.length !== 0) {
      if (image.innerText == "Rtitan" || image.innerText == "Btitan") {
        image.innerHTML = `${image.innerText} <img class='all-img all-titan' src="${image.innerText}.png" alt="">`;
        image.style.cursor = "pointer";
      } else {
        image.innerHTML = `${image.innerText} <img class='all-img' src="${image.innerText}.png" alt="">`;
        image.style.cursor = "pointer";
      }
    }
  });
}
insertImage();

//Coloring the board:
function coloring() {
  const color = document.querySelectorAll(".box");

  color.forEach((color) => {
    color.style.backgroundColor = "initial";
  });
}

//To calculate distance
function getDistancesFromBody(element) {
  // Get element's bounding rectangle
  const rect = element.getBoundingClientRect();

  // Get distances from the element to the edges of the body
  const distances = {
    top: rect.top, // Distance to the top of the viewport
    left: rect.left, // Distance to the left of the viewport
    bottom: window.innerHeight - rect.bottom, // Distance to the bottom of the viewport
    right: window.innerWidth - rect.right, // Distance to the right of the viewport
  };

  return distances;
}

//CANNON id:
let redCannonid = "b108";
let blueCannonid = "b801";

//Red bullet firing function:
const redBulletFiring = function () {
  boundaryElementId = "b808";
  // Select the target element
  let targetElementForCannon = document.getElementById(redCannonid);
  let targetElementForBoundary = document.getElementById(boundaryElementId);
  // Get distances
  let distancesForCannon = getDistancesFromBody(targetElementForCannon);
  let distancesForBoundary = getDistancesFromBody(targetElementForBoundary);

  // Output distances to console
  // console.log("Distances from target element to body edges:", distances);

  //shooting BULLET:
  const bulletContainer = document.getElementById("bulletContainer");

  const rect = bulletContainer.getBoundingClientRect();
  const centerX = distancesForCannon.left + 34;
  const centerY = distancesForCannon.top;

  const angle = -(Math.PI / 2);
  const velocity = {
    x: Math.cos(angle) * 2,
    y: Math.sin(angle) * 2,
  };

  function createBullet(x, y, velocity) {
    const bullet = document.createElement("div");
    bullet.classList.add("Rbullet");
    bullet.style.left = `${x}px`;
    bullet.style.top = `${y}px`;
    bulletContainer.appendChild(bullet);

    let posX = x;
    let posY = y;

    function updateBullet() {
      posX += velocity.x;
      posY += velocity.y;
      bullet.style.left = `${posX}px`;
      bullet.style.top = `${posY}px`;

      //Remove bullet when it goes out of bounds
      if (
        posX < 0 ||
        posX > window.innerWidth ||
        posY < distancesForBoundary.top ||
        posY > window.innerHeight
      ) {
        bullet.remove();
        return;
      }

      requestAnimationFrame(updateBullet);
    }
    updateBullet();
  }

  createBullet(centerX, centerY, velocity);
};

//Blue bullet firing function:
const blueBulletFiring = function () {
  boundaryElementId = "b101";

  // Select the target element
  let targetElementForCannon = document.getElementById(blueCannonid);
  let targetElementForBoundary = document.getElementById(boundaryElementId);
  // Get distances
  let distancesForCannon = getDistancesFromBody(targetElementForCannon);
  let distancesForBoundary = getDistancesFromBody(targetElementForBoundary);

  // Output distances to console
  // console.log("Distances from target element to body edges:", distances);

  //shooting BULLET:
  const bulletContainer = document.getElementById("bulletContainer");

  const rect = bulletContainer.getBoundingClientRect();
  const centerX = distancesForCannon.left + 34;
  const centerY = distancesForCannon.top + 75;

  const angle = Math.PI / 2;
  const velocity = {
    x: Math.cos(angle) * 3,
    y: Math.sin(angle) * 3,
  };

  function createBullet(x, y, velocity) {
    const bullet = document.createElement("div");
    bullet.classList.add("Bbullet");
    bullet.style.left = `${x}px`;
    bullet.style.top = `${y}px`;
    bulletContainer.appendChild(bullet);

    let posX = x;
    let posY = y;

    function updateBullet() {
      posX += velocity.x;
      posY += velocity.y;
      bullet.style.left = `${posX}px`;
      bullet.style.top = `${posY}px`;

      //Remove bullet when it goes out of bounds
      if (
        // posX < 0 ||
        // posX > window.innerWidth ||
        posY >
        distancesForBoundary.top + 75
        // posY > window.innerHeight
      ) {
        bullet.remove();
        return;
      }

      requestAnimationFrame(updateBullet);
    }

    updateBullet();
  }

  createBullet(centerX, centerY, velocity);
};

// Toggling the turn
function toggling() {
  if (tog % 2 !== 0) {
    document.getElementById("tog").innerText = "Red's Turn";
    // whosTurn("R");
  }
  if (tog % 2 == 0) {
    document.getElementById("tog").innerText = "Blue's Turn";
    // whosTurn("B");
  }
}

// //Coloring the board:
// function coloring() {
//   const color = document.querySelectorAll(".box");

//   color.forEach((color) => {
//     color.style.backgroundColor = "initial";
//   });
// }

//reset button
document.getElementById("reset-btn").addEventListener("click", function () {
  location.reload();
});

tog = 1;

let firstPieceId;

document.querySelectorAll(".box").forEach((item) => {
  item.addEventListener("click", function () {
    if (
      item.style.backgroundColor == "greenyellow" &&
      item.innerText.length == 0
    ) {
      tog = tog + 1;
    } else {
      coloring();
      insertImage();
    }

    firstPieceId = item.id;
    console.log(item.innerText, item.id);

    //Position of pieces
    getId = item.id;
    arr = Array.from(getId);
    arr.shift();
    aside = eval(arr.pop());
    arr.push("0");
    aup = eval(arr.join(""));
    a = aside + aup;

    //function to display the available paths for all pieces:
    function whosTurn(toggle) {
      // RED CANNON possible paths:
      if (item.innerText == `${toggle}cannon` && toggle == "R") {
        item.style.backgroundColor = "blue";

        //When RED CANNON is in right end of the grid:
        if (aside == "8") {
          if (document.getElementById("b107").innerText == "") {
            document.getElementById("b107").style.backgroundColor =
              "greenyellow";
          }
        }

        //When RED CANNON is in left end of the grid:
        if (aside == "1") {
          if (document.getElementById("b102").innerText == "") {
            document.getElementById("b102").style.backgroundColor =
              "greenyellow";
          }
        }

        //When RED CANNON is inbetween the grid:
        if (aside < 8 && aside > 1) {
          //For left side possibility:
          if (document.getElementById(`b10${aside - 1}`).innerText == "") {
            document.getElementById(`b10${aside - 1}`).style.backgroundColor =
              "greenyellow";
          }
          //For right side possibility:
          if (document.getElementById(`b10${aside + 1}`).innerText == "") {
            document.getElementById(`b10${aside + 1}`).style.backgroundColor =
              "greenyellow";
          }
        }
      }
      //BLUE CANNON possible paths:
      if (item.innerText == `${toggle}cannon` && toggle == "B") {
        item.style.backgroundColor = "blue";

        //When BLUE CANNON is in right end of the grid:
        if (aside == "8") {
          if (document.getElementById("b807").innerText == "") {
            document.getElementById("b807").style.backgroundColor =
              "greenyellow";
          }
        }

        //When BLUE CANNON is in left end of the grid:
        if (aside == "1") {
          if (document.getElementById("b802").innerText == "") {
            document.getElementById("b802").style.backgroundColor =
              "greenyellow";
          }
        }

        //When BLUE CANNON is inbetween the grid:
        if (aside < 8 && aside > 1) {
          //For left side possibility:
          if (document.getElementById(`b80${aside - 1}`).innerText == "") {
            document.getElementById(`b80${aside - 1}`).style.backgroundColor =
              "greenyellow";
          }
          //For right side possibility:
          if (document.getElementById(`b80${aside + 1}`).innerText == "") {
            document.getElementById(`b80${aside + 1}`).style.backgroundColor =
              "greenyellow";
          }
        }
      }
      //TITAN possible paths:
      if (item.innerText == `${toggle}titan`) {
        item.style.backgroundColor = "blue";
        //for row1:
        if (aup == "100") {
          //for "b108":
          if (a == "108") {
            if (document.getElementById("b107").innerText.length == 0) {
              document.getElementById("b107").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b207").innerText.length == 0) {
              document.getElementById("b207").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b208").innerText.length == 0) {
              document.getElementById("b208").style.backgroundColor =
                "greenyellow";
            }
          }
          //for "b101":
          if (a == "101") {
            if (document.getElementById("b102").innerText.length == 0) {
              document.getElementById("b102").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b202").innerText.length == 0) {
              document.getElementById("b202").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b201").innerText.length == 0) {
              document.getElementById("b201").style.backgroundColor =
                "greenyellow";
            }
          }
          //for "101"<a<"108" :
          if (a < 108 && a > 101) {
            //for left possibility:
            if (document.getElementById(`b${a - 1}`).innerText.length == 0) {
              document.getElementById(`b${a - 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 100 - 1}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 100 - 1}`).style.backgroundColor =
                "greenyellow";
            }
            //for center possibility:
            if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
              document.getElementById(`b${a + 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for right posssibility:
            if (document.getElementById(`b${a + 1}`).innerText.length == 0) {
              document.getElementById(`b${a + 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 100 + 1}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 100 + 1}`).style.backgroundColor =
                "greenyellow";
            }
          }
        }
        //for row8:
        if (aup == "800") {
          //for "b808":
          if (a == "808") {
            if (document.getElementById("b807").innerText.length == 0) {
              document.getElementById("b807").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b707").innerText.length == 0) {
              document.getElementById("b707").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b708").innerText.length == 0) {
              document.getElementById("b708").style.backgroundColor =
                "greenyellow";
            }
          }
          //for "b801":
          if (a == "801") {
            if (document.getElementById("b802").innerText.length == 0) {
              document.getElementById("b802").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b702").innerText.length == 0) {
              document.getElementById("b702").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b701").innerText.length == 0) {
              document.getElementById("b701").style.backgroundColor =
                "greenyellow";
            }
          }
          //for "801"<a<"808" :
          if (a < 808 && a > 801) {
            //for left possibility:
            if (document.getElementById(`b${a - 1}`).innerText.length == 0) {
              document.getElementById(`b${a - 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 100 - 1}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 100 - 1}`).style.backgroundColor =
                "greenyellow";
            }
            //for center possibility:
            if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
              document.getElementById(`b${a - 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for right posssibility:
            if (document.getElementById(`b${a + 1}`).innerText.length == 0) {
              document.getElementById(`b${a + 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 100 + 1}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 100 + 1}`).style.backgroundColor =
                "greenyellow";
            }
          }
        }
        //for row 2 to row 7:
        if (aup > 100 && aup < 800) {
          //for rigth edge of the grid:
          if (aside == "8") {
            //for left possibility:
            if (document.getElementById(`b${a - 1}`).innerText.length == 0) {
              document.getElementById(`b${a - 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 1 + 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 1 + 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 1 - 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 1 - 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for center possibility:
            if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
              document.getElementById(`b${a - 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
              document.getElementById(`b${a + 100}`).style.backgroundColor =
                "greenyellow";
            }
          }
          //for left edge of the grid:
          if (aside == "1") {
            //for right possibility:
            if (document.getElementById(`b${a + 1}`).innerText.length == 0) {
              document.getElementById(`b${a + 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 1 + 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 1 + 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 1 - 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 1 - 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for center possibility:
            if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
              document.getElementById(`b${a - 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
              document.getElementById(`b${a + 100}`).style.backgroundColor =
                "greenyellow";
            }
          }
          //for column between 1 and 8 ie) aside<8 and aside>1:
          if (aside < 8 && aside > 1) {
            //for left possibility:
            if (document.getElementById(`b${a - 1}`).innerText.length == 0) {
              document.getElementById(`b${a - 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 1 - 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 1 - 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 1 + 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 1 + 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for right possibility:
            if (document.getElementById(`b${a + 1}`).innerText.length == 0) {
              document.getElementById(`b${a + 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 1 - 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 1 - 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 1 + 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 1 + 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for center possibility:
            if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
              document.getElementById(`b${a - 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
              document.getElementById(`b${a + 100}`).style.backgroundColor =
                "greenyellow";
            }
          }
        }
      }
      //TANK possible paths:
      if (item.innerText == `${toggle}tank`) {
        item.style.backgroundColor = "blue";
        //for row1:
        if (aup == "100") {
          //for "b108":
          if (a == "108") {
            if (document.getElementById("b107").innerText.length == 0) {
              document.getElementById("b107").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b207").innerText.length == 0) {
              document.getElementById("b207").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b208").innerText.length == 0) {
              document.getElementById("b208").style.backgroundColor =
                "greenyellow";
            }
          }
          //for "b101":
          if (a == "101") {
            if (document.getElementById("b102").innerText.length == 0) {
              document.getElementById("b102").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b202").innerText.length == 0) {
              document.getElementById("b202").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b201").innerText.length == 0) {
              document.getElementById("b201").style.backgroundColor =
                "greenyellow";
            }
          }
          //for "101"<a<"108" :
          if (a < 108 && a > 101) {
            //for left possibility:
            if (document.getElementById(`b${a - 1}`).innerText.length == 0) {
              document.getElementById(`b${a - 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 100 - 1}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 100 - 1}`).style.backgroundColor =
                "greenyellow";
            }
            //for center possibility:
            if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
              document.getElementById(`b${a + 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for right posssibility:
            if (document.getElementById(`b${a + 1}`).innerText.length == 0) {
              document.getElementById(`b${a + 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 100 + 1}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 100 + 1}`).style.backgroundColor =
                "greenyellow";
            }
          }
        }
        //for row8:
        if (aup == "800") {
          //for "b808":
          if (a == "808") {
            if (document.getElementById("b807").innerText.length == 0) {
              document.getElementById("b807").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b707").innerText.length == 0) {
              document.getElementById("b707").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b708").innerText.length == 0) {
              document.getElementById("b708").style.backgroundColor =
                "greenyellow";
            }
          }
          //for "b801":
          if (a == "801") {
            if (document.getElementById("b802").innerText.length == 0) {
              document.getElementById("b802").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b702").innerText.length == 0) {
              document.getElementById("b702").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b701").innerText.length == 0) {
              document.getElementById("b701").style.backgroundColor =
                "greenyellow";
            }
          }
          //for "801"<a<"808" :
          if (a < 808 && a > 801) {
            //for left possibility:
            if (document.getElementById(`b${a - 1}`).innerText.length == 0) {
              document.getElementById(`b${a - 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 100 - 1}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 100 - 1}`).style.backgroundColor =
                "greenyellow";
            }
            //for center possibility:
            if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
              document.getElementById(`b${a - 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for right posssibility:
            if (document.getElementById(`b${a + 1}`).innerText.length == 0) {
              document.getElementById(`b${a + 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 100 + 1}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 100 + 1}`).style.backgroundColor =
                "greenyellow";
            }
          }
        }
        //for row 2 to row 7:
        if (aup > 100 && aup < 800) {
          //for rigth edge of the grid:
          if (aside == "8") {
            //for left possibility:
            if (document.getElementById(`b${a - 1}`).innerText.length == 0) {
              document.getElementById(`b${a - 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 1 + 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 1 + 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 1 - 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 1 - 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for center possibility:
            if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
              document.getElementById(`b${a - 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
              document.getElementById(`b${a + 100}`).style.backgroundColor =
                "greenyellow";
            }
          }
          //for left edge of the grid:
          if (aside == "1") {
            //for right possibility:
            if (document.getElementById(`b${a + 1}`).innerText.length == 0) {
              document.getElementById(`b${a + 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 1 + 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 1 + 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 1 - 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 1 - 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for center possibility:
            if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
              document.getElementById(`b${a - 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
              document.getElementById(`b${a + 100}`).style.backgroundColor =
                "greenyellow";
            }
          }
          //for column between 1 and 8 ie) aside<8 and aside>1:
          if (aside < 8 && aside > 1) {
            //for left possibility:
            if (document.getElementById(`b${a - 1}`).innerText.length == 0) {
              document.getElementById(`b${a - 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 1 - 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 1 - 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 1 + 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 1 + 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for right possibility:
            if (document.getElementById(`b${a + 1}`).innerText.length == 0) {
              document.getElementById(`b${a + 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 1 - 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 1 - 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 1 + 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 1 + 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for center possibility:
            if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
              document.getElementById(`b${a - 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
              document.getElementById(`b${a + 100}`).style.backgroundColor =
                "greenyellow";
            }
          }
        }
      }
      //RICOCHET possible paths:
      if (
        item.innerText == `${toggle}ricochet1` ||
        item.innerText == `${toggle}ricochet2`
      ) {
        item.style.backgroundColor = "blue";
        // rotate(item.id);

        //for row1:
        if (aup == "100") {
          //for "b108":
          if (a == "108") {
            if (document.getElementById("b107").innerText.length == 0) {
              document.getElementById("b107").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b207").innerText.length == 0) {
              document.getElementById("b207").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b208").innerText.length == 0) {
              document.getElementById("b208").style.backgroundColor =
                "greenyellow";
            }
          }
          //for "b101":
          if (a == "101") {
            if (document.getElementById("b102").innerText.length == 0) {
              document.getElementById("b102").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b202").innerText.length == 0) {
              document.getElementById("b202").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b201").innerText.length == 0) {
              document.getElementById("b201").style.backgroundColor =
                "greenyellow";
            }
          }
          //for "101"<a<"108" :
          if (a < 108 && a > 101) {
            //for left possibility:
            if (document.getElementById(`b${a - 1}`).innerText.length == 0) {
              document.getElementById(`b${a - 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 100 - 1}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 100 - 1}`).style.backgroundColor =
                "greenyellow";
            }
            //for center possibility:
            if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
              document.getElementById(`b${a + 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for right posssibility:
            if (document.getElementById(`b${a + 1}`).innerText.length == 0) {
              document.getElementById(`b${a + 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 100 + 1}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 100 + 1}`).style.backgroundColor =
                "greenyellow";
            }
          }
        }
        //for row8:
        if (aup == "800") {
          //for "b808":
          if (a == "808") {
            if (document.getElementById("b807").innerText.length == 0) {
              document.getElementById("b807").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b707").innerText.length == 0) {
              document.getElementById("b707").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b708").innerText.length == 0) {
              document.getElementById("b708").style.backgroundColor =
                "greenyellow";
            }
          }
          //for "b801":
          if (a == "801") {
            if (document.getElementById("b802").innerText.length == 0) {
              document.getElementById("b802").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b702").innerText.length == 0) {
              document.getElementById("b702").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b701").innerText.length == 0) {
              document.getElementById("b701").style.backgroundColor =
                "greenyellow";
            }
          }
          //for "801"<a<"808" :
          if (a < 808 && a > 801) {
            //for left possibility:
            if (document.getElementById(`b${a - 1}`).innerText.length == 0) {
              document.getElementById(`b${a - 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 100 - 1}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 100 - 1}`).style.backgroundColor =
                "greenyellow";
            }
            //for center possibility:
            if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
              document.getElementById(`b${a - 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for right posssibility:
            if (document.getElementById(`b${a + 1}`).innerText.length == 0) {
              document.getElementById(`b${a + 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 100 + 1}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 100 + 1}`).style.backgroundColor =
                "greenyellow";
            }
          }
        }
        //for row 2 to row 7:
        if (aup > 100 && aup < 800) {
          //for rigth edge of the grid:
          if (aside == "8") {
            //for left possibility:
            if (document.getElementById(`b${a - 1}`).innerText.length == 0) {
              document.getElementById(`b${a - 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 1 + 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 1 + 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 1 - 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 1 - 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for center possibility:
            if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
              document.getElementById(`b${a - 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
              document.getElementById(`b${a + 100}`).style.backgroundColor =
                "greenyellow";
            }
          }
          //for left edge of the grid:
          if (aside == "1") {
            //for right possibility:
            if (document.getElementById(`b${a + 1}`).innerText.length == 0) {
              document.getElementById(`b${a + 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 1 + 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 1 + 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 1 - 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 1 - 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for center possibility:
            if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
              document.getElementById(`b${a - 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
              document.getElementById(`b${a + 100}`).style.backgroundColor =
                "greenyellow";
            }
          }
          //for column between 1 and 8 ie) aside<8 and aside>1:
          if (aside < 8 && aside > 1) {
            //for left possibility:
            if (document.getElementById(`b${a - 1}`).innerText.length == 0) {
              document.getElementById(`b${a - 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 1 - 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 1 - 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 1 + 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 1 + 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for right possibility:
            if (document.getElementById(`b${a + 1}`).innerText.length == 0) {
              document.getElementById(`b${a + 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 1 - 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 1 - 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 1 + 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 1 + 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for center possibility:
            if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
              document.getElementById(`b${a - 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
              document.getElementById(`b${a + 100}`).style.backgroundColor =
                "greenyellow";
            }
          }
        }
      }
      //SEMIRICOCHET possible paths:
      if (
        item.innerText == `${toggle}semiricochet1` ||
        item.innerText == `${toggle}semiricochet2` ||
        item.innerText == `${toggle}semiricochet3` ||
        item.innerText == `${toggle}semiricochet4`
      ) {
        item.style.backgroundColor = "blue";
        // rotate(item.id);

        //for row1:
        if (aup == "100") {
          //for "b108":
          if (a == "108") {
            if (document.getElementById("b107").innerText.length == 0) {
              document.getElementById("b107").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b207").innerText.length == 0) {
              document.getElementById("b207").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b208").innerText.length == 0) {
              document.getElementById("b208").style.backgroundColor =
                "greenyellow";
            }
          }
          //for "b101":
          if (a == "101") {
            if (document.getElementById("b102").innerText.length == 0) {
              document.getElementById("b102").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b202").innerText.length == 0) {
              document.getElementById("b202").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b201").innerText.length == 0) {
              document.getElementById("b201").style.backgroundColor =
                "greenyellow";
            }
          }
          //for "101"<a<"108" :
          if (a < 108 && a > 101) {
            //for left possibility:
            if (document.getElementById(`b${a - 1}`).innerText.length == 0) {
              document.getElementById(`b${a - 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 100 - 1}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 100 - 1}`).style.backgroundColor =
                "greenyellow";
            }
            //for center possibility:
            if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
              document.getElementById(`b${a + 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for right posssibility:
            if (document.getElementById(`b${a + 1}`).innerText.length == 0) {
              document.getElementById(`b${a + 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 100 + 1}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 100 + 1}`).style.backgroundColor =
                "greenyellow";
            }
          }
        }
        //for row8:
        if (aup == "800") {
          //for "b808":
          if (a == "808") {
            if (document.getElementById("b807").innerText.length == 0) {
              document.getElementById("b807").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b707").innerText.length == 0) {
              document.getElementById("b707").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b708").innerText.length == 0) {
              document.getElementById("b708").style.backgroundColor =
                "greenyellow";
            }
          }
          //for "b801":
          if (a == "801") {
            if (document.getElementById("b802").innerText.length == 0) {
              document.getElementById("b802").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b702").innerText.length == 0) {
              document.getElementById("b702").style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById("b701").innerText.length == 0) {
              document.getElementById("b701").style.backgroundColor =
                "greenyellow";
            }
          }
          //for "801"<a<"808" :
          if (a < 808 && a > 801) {
            //for left possibility:
            if (document.getElementById(`b${a - 1}`).innerText.length == 0) {
              document.getElementById(`b${a - 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 100 - 1}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 100 - 1}`).style.backgroundColor =
                "greenyellow";
            }
            //for center possibility:
            if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
              document.getElementById(`b${a - 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for right posssibility:
            if (document.getElementById(`b${a + 1}`).innerText.length == 0) {
              document.getElementById(`b${a + 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 100 + 1}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 100 + 1}`).style.backgroundColor =
                "greenyellow";
            }
          }
        }
        //for row 2 to row 7:
        if (aup > 100 && aup < 800) {
          //for rigth edge of the grid:
          if (aside == "8") {
            //for left possibility:
            if (document.getElementById(`b${a - 1}`).innerText.length == 0) {
              document.getElementById(`b${a - 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 1 + 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 1 + 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 1 - 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 1 - 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for center possibility:
            if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
              document.getElementById(`b${a - 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
              document.getElementById(`b${a + 100}`).style.backgroundColor =
                "greenyellow";
            }
          }
          //for left edge of the grid:
          if (aside == "1") {
            //for right possibility:
            if (document.getElementById(`b${a + 1}`).innerText.length == 0) {
              document.getElementById(`b${a + 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 1 + 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 1 + 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 1 - 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 1 - 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for center possibility:
            if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
              document.getElementById(`b${a - 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
              document.getElementById(`b${a + 100}`).style.backgroundColor =
                "greenyellow";
            }
          }
          //for column between 1 and 8 ie) aside<8 and aside>1:
          if (aside < 8 && aside > 1) {
            //for left possibility:
            if (document.getElementById(`b${a - 1}`).innerText.length == 0) {
              document.getElementById(`b${a - 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 1 - 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 1 - 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a - 1 + 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 1 + 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for right possibility:
            if (document.getElementById(`b${a + 1}`).innerText.length == 0) {
              document.getElementById(`b${a + 1}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 1 - 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 1 - 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (
              document.getElementById(`b${a + 1 + 100}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 1 + 100}`).style.backgroundColor =
                "greenyellow";
            }
            //for center possibility:
            if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
              document.getElementById(`b${a - 100}`).style.backgroundColor =
                "greenyellow";
            }
            if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
              document.getElementById(`b${a + 100}`).style.backgroundColor =
                "greenyellow";
            }
          }
        }
      }
    }

    // Toggling the turn

    if (tog % 2 !== 0) {
      document.getElementById("tog").innerText = "Red's Turn";
      whosTurn("R");
    }
    if (tog % 2 == 0) {
      document.getElementById("tog").innerText = "Blue's Turn";
      whosTurn("B");
    }
  });
});

// Moving the element
document.querySelectorAll(".box").forEach((hathiTest) => {
  hathiTest.addEventListener("click", function () {
    if (hathiTest.style.backgroundColor == "blue") {
      blueId = hathiTest.id;
      blueText = hathiTest.innerText;

      // //CANNON id:
      // let redCannonid = "b108";
      // let blueCannonid = "b801";

      document.querySelectorAll(".box").forEach((hathiTest2) => {
        hathiTest2.addEventListener("click", function () {
          if (
            hathiTest2.style.backgroundColor == "greenyellow" &&
            hathiTest2.innerText.length == 0
          ) {
            if (
              hathiTest.innerText == "Rcannon" ||
              hathiTest.innerText == "Rricochet1" ||
              hathiTest.innerText == "Rricochet2" ||
              hathiTest.innerText == "Rsemiricochet1" ||
              hathiTest.innerText == "Rsemiricochet2" ||
              hathiTest.innerText == "Rsemiricochet3" ||
              hathiTest.innerText == "Rsemiricochet4" ||
              hathiTest.innerText == "Rtank" ||
              hathiTest.innerText == "Rtitan"
            ) {
              console.log(hathiTest.innerText, hathiTest.id);
              // redBulletFiring();

              boundaryElementId = "b808";
              // Select the target element
              let targetElementForCannon = document.getElementById(redCannonid);
              let targetElementForBoundary =
                document.getElementById(boundaryElementId);
              // Get distances
              let distancesForCannon = getDistancesFromBody(
                targetElementForCannon
              );
              let distancesForBoundary = getDistancesFromBody(
                targetElementForBoundary
              );

              // Output distances to console
              // console.log("Distances from target element to body edges:", distances);

              //shooting BULLET:
              const bulletContainer =
                document.getElementById("bulletContainer");

              const rect = bulletContainer.getBoundingClientRect();
              const centerX = distancesForCannon.left + 34;
              const centerY = distancesForCannon.top;

              const angle = -(Math.PI / 2);
              const velocity = {
                x: Math.cos(angle) * 2,
                y: Math.sin(angle) * 2,
              };

              function createBullet(x, y, velocity) {
                const bullet = document.createElement("div");
                bullet.classList.add("Rbullet");
                bullet.style.left = `${x}px`;
                bullet.style.top = `${y}px`;
                bulletContainer.appendChild(bullet);

                let posX = x;
                let posY = y;

                function updateBullet() {
                  posX += velocity.x;
                  posY += velocity.y;
                  bullet.style.left = `${posX}px`;
                  bullet.style.top = `${posY}px`;

                  //Remove bullet when it goes out of bounds
                  if (
                    posX < 0 ||
                    posX > window.innerWidth ||
                    posY < distancesForBoundary.top ||
                    posY > window.innerHeight
                  ) {
                    bullet.remove();
                    return;
                  }

                  requestAnimationFrame(updateBullet);
                }
                updateBullet();
              }

              createBullet(centerX, centerY, velocity);
              //
              document.getElementById(blueId).innerText = "";
              hathiTest2.innerText = blueText;

              
              coloring();
              insertImage();
            } else if (
              hathiTest.innerText == "Bcannon" ||
              hathiTest.innerText == "Bricochet1" ||
              hathiTest.innerText == "Bricochet2" ||
              hathiTest.innerText == "Bsemiricochet1" ||
              hathiTest.innerText == "Bsemiricochet2" ||
              hathiTest.innerText == "Bsemiricochet3" ||
              hathiTest.innerText == "Bsemiricochet4" ||
              hathiTest.innerText == "Btank" ||
              hathiTest.innerText == "Btitan"
            ) {
              console.log(hathiTest.innerText, hathiTest.id);

              // blueBulletFiring();

              boundaryElementId = "b101";

              // Select the target element
              let targetElementForCannon =
                document.getElementById(blueCannonid);
              let targetElementForBoundary =
                document.getElementById(boundaryElementId);
              // Get distances
              let distancesForCannon = getDistancesFromBody(
                targetElementForCannon
              );
              let distancesForBoundary = getDistancesFromBody(
                targetElementForBoundary
              );

              // Output distances to console
              // console.log("Distances from target element to body edges:", distances);

              //shooting BULLET:
              const bulletContainer =
                document.getElementById("bulletContainer");

              const rect = bulletContainer.getBoundingClientRect();
              const centerX = distancesForCannon.left + 34;
              const centerY = distancesForCannon.top + 75;

              const angle = Math.PI / 2;
              const velocity = {
                x: Math.cos(angle) * 3,
                y: Math.sin(angle) * 3,
              };

              function createBullet(x, y, velocity) {
                const bullet = document.createElement("div");
                bullet.classList.add("Bbullet");
                bullet.style.left = `${x}px`;
                bullet.style.top = `${y}px`;
                bulletContainer.appendChild(bullet);

                let posX = x;
                let posY = y;

                function updateBullet() {
                  posX += velocity.x;
                  posY += velocity.y;
                  bullet.style.left = `${posX}px`;
                  bullet.style.top = `${posY}px`;

                  //Remove bullet when it goes out of bounds
                  if (
                    // posX < 0 ||
                    // posX > window.innerWidth ||
                    posY >
                    distancesForBoundary.top + 75
                    // posY > window.innerHeight
                  ) {
                    bullet.remove();
                    return;
                  }

                  requestAnimationFrame(updateBullet);
                }

                updateBullet();
              }

              createBullet(centerX, centerY, velocity);
              document.getElementById(blueId).innerText = "";
              hathiTest2.innerText = blueText;

              
              coloring();
              insertImage();
            }

            //
            // document.getElementById(blueId).innerText = "";
            // hathiTest2.innerText = blueText;
            // coloring();
            // insertImage();
          }
        });
      });
    }
  });
});

//rotate button:
document.getElementById("rotate-btn").addEventListener("click", function () {
  //for RICOCHET:
  if (
    document.getElementById(firstPieceId).innerText == "Rricochet1" ||
    document.getElementById(firstPieceId).innerText == "Bricochet1" ||
    document.getElementById(firstPieceId).innerText == "Bricochet2" ||
    document.getElementById(firstPieceId).innerText == "Rricochet2"
  ) {
    if (document.getElementById(firstPieceId).innerText == "Rricochet1") {
      document.getElementById(firstPieceId).innerText = "Rricochet2";
      redBulletFiring();
    } else if (
      document.getElementById(firstPieceId).innerText == "Bricochet1"
    ) {
      document.getElementById(firstPieceId).innerText = "Bricochet2";
      blueBulletFiring();
    } else if (
      document.getElementById(firstPieceId).innerText == "Rricochet2"
    ) {
      document.getElementById(firstPieceId).innerText = "Rricochet1";
      redBulletFiring();
    } else if (
      document.getElementById(firstPieceId).innerText == "Bricochet2"
    ) {
      document.getElementById(firstPieceId).innerText = "Bricochet1";
      blueBulletFiring();
    }

    tog = tog + 1;

    toggling();
    coloring();
    insertImage();
  }

  //for SEMIRICOCHET:
  if (
    document.getElementById(firstPieceId).innerText == "Rsemiricochet1" ||
    document.getElementById(firstPieceId).innerText == "Rsemiricochet2" ||
    document.getElementById(firstPieceId).innerText == "Rsemiricochet3" ||
    document.getElementById(firstPieceId).innerText == "Rsemiricochet4" ||
    document.getElementById(firstPieceId).innerText == "Bsemiricochet1" ||
    document.getElementById(firstPieceId).innerText == "Bsemiricochet2" ||
    document.getElementById(firstPieceId).innerText == "Bsemiricochet3" ||
    document.getElementById(firstPieceId).innerText == "Bsemiricochet4"
  ) {
    if (document.getElementById(firstPieceId).innerText == "Rsemiricochet1") {
      document.getElementById(firstPieceId).innerText = "Rsemiricochet2";
      redBulletFiring();
    } else if (
      document.getElementById(firstPieceId).innerText == "Rsemiricochet2"
    ) {
      document.getElementById(firstPieceId).innerText = "Rsemiricochet3";
      redBulletFiring();
    } else if (
      document.getElementById(firstPieceId).innerText == "Rsemiricochet3"
    ) {
      document.getElementById(firstPieceId).innerText = "Rsemiricochet4";
      redBulletFiring();
    } else if (
      document.getElementById(firstPieceId).innerText == "Rsemiricochet4"
    ) {
      document.getElementById(firstPieceId).innerText = "Rsemiricochet1";
      redBulletFiring();
    } else if (
      document.getElementById(firstPieceId).innerText == "Bsemiricochet1"
    ) {
      document.getElementById(firstPieceId).innerText = "Bsemiricochet2";
      blueBulletFiring();
    } else if (
      document.getElementById(firstPieceId).innerText == "Bsemiricochet2"
    ) {
      document.getElementById(firstPieceId).innerText = "Bsemiricochet3";
      blueBulletFiring();
    } else if (
      document.getElementById(firstPieceId).innerText == "Bsemiricochet3"
    ) {
      document.getElementById(firstPieceId).innerText = "Bsemiricochet4";
      blueBulletFiring();
    } else if (
      document.getElementById(firstPieceId).innerText == "Bsemiricochet4"
    ) {
      document.getElementById(firstPieceId).innerText = "Bsemiricochet1";
      blueBulletFiring();
    }
    tog = tog + 1;

    toggling();
    coloring();
    insertImage();
  }
});

//BULLET:
/*
const bulletContainer = document.getElementById("bulletContainer");
const shootButton = document.getElementById("shootButton");

function createBullet(x, y, velocity) {
  const bullet = document.createElement("div");
  bullet.classList.add("bullet");
  bullet.style.left = `${x}px`;
  bullet.style.top = `${y}px`;
  bulletContainer.appendChild(bullet);

  let posX = x;
  let posY = y;

  function updateBullet() {
    posX += velocity.x;
    posY += velocity.y;
    bullet.style.left = `${posX}px`;
    bullet.style.top = `${posY}px`;

    // Remove bullet when it goes out of bounds
    if (
      posX < 0 ||
      posX > window.innerWidth ||
      posY < 0 ||
      posY > window.innerHeight
    ) {
      bullet.remove();
      return;
    }

    requestAnimationFrame(updateBullet);
  }

  updateBullet();
}

function shootBullet(event) {
  const rect = bulletContainer.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  console.log(centerY);
  console.log(event.clientY - centerY);

  const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
  console.log(angle);
  const velocity = {
    x: Math.cos(angle) * 5,
    y: Math.sin(angle) * 5,
  };

  createBullet(centerX, centerY, velocity);
}

shootButton.addEventListener("click", (event) => {
  console.log(event.clientY);
  shootBullet(event);
});
*/

function getDistancesFromBody(element) {
  // Get element's bounding rectangle
  const rect = element.getBoundingClientRect();

  // Get distances from the element to the edges of the body
  const distances = {
    top: rect.top, // Distance to the top of the viewport
    left: rect.left, // Distance to the left of the viewport
    bottom: window.innerHeight - rect.bottom, // Distance to the bottom of the viewport
    right: window.innerWidth - rect.right, // Distance to the right of the viewport
  };

  return distances;
}

// // Select the target element
// const targetElement = document.getElementById("b808");

// // Get distances
// const distances = getDistancesFromBody(targetElement);

// // Output distances to console
// console.log('Distances from target element to body edges:', distances);
