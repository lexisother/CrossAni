import "./style.css";
import "@crossani/spring";

const box = document.getElementById("box");

let isDragging = false;
let boxPos = [200, 200];

const calcPos = (curP, boxS) => Math.max(0, curP - boxS / 2);

const middleLeft = () => window.innerWidth / 2 - box.clientWidth / 2;
const middleTop = () => window.innerHeight / 2 - box.clientHeight / 2;

const updateBoxCssPos = () => {
  box.style.left = boxPos[0] + "px";
  box.style.top = boxPos[1] + "px";
};

window.addEventListener("mousemove", (ev) => {
  if (!isDragging) return;

  boxPos = [
    calcPos(ev.clientX, box.clientWidth),
    calcPos(ev.clientY, box.clientHeight),
  ];

  updateBoxCssPos();
});

box.addEventListener("mousedown", () => {
  isDragging = true;
  box.abortSprings();
  box.removeCrossAni();
  box.style.left = "200px";
  box.style.top = "200px";
});
box.addEventListener("mouseup", () => {
  isDragging = false;
  box.doSpring(
    boxPos[0],
    middleLeft(),
    "left",
    "px",
    { damping: 0.5 }
  );
  box.doSpring(
    boxPos[1],
    middleTop(),
    "top",
    "px",
    { damping: 0.5 }
  );
});

boxPos = [middleLeft(), middleTop()];
updateBoxCssPos();