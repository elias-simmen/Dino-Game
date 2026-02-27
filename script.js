const eagle = document.getElementById("eagle")
const obstacle = document.getElementById("obstacle")
const score = document.getElementById("score")

function jump() {
  eagle.classList.add("jump-animation")
  setTimeout(() => eagle.classList.remove("jump-animation"), 750)
}

document.addEventListener("keypress", (event) => {
  if (!eagle.classList.contains("jump-animation")) {
    jump()
  }
})

setInterval(() => {
  const eagleTop = parseInt(
    window.getComputedStyle(eagle).getPropertyValue("top"),
  )
  const obstacleLeft = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("left"),
  )
  score.innerText = parseInt(score.innerText) + 2;

  if (obstacleLeft < 0) {
    obstacle.style.display = "none"
  } else {
    obstacle.style.display = ""
  }

  if (obstacleLeft < 50 && obstacleLeft > 0 && eagleTop > 150) 
  {score.innerText = 0}
}, 50)
