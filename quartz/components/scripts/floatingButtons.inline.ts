let currentCleanup: (() => void) | null = null

function toggleGraph() {
  const graphComponent = document.querySelector(".graph")
  if (!(graphComponent instanceof HTMLElement)) return

  if (graphComponent.classList.contains("active")) {
    graphComponent.classList.remove("active")
    return
  }

  graphComponent.classList.add("active")
  document
    .querySelector(".global-graph-icon")
    ?.dispatchEvent(new MouseEvent("click", { view: window, bubbles: true, cancelable: true }))

  const handleEsc = (event: KeyboardEvent) => {
    if (event.key !== "Escape") return
    graphComponent.classList.remove("active")
    document.removeEventListener("keydown", handleEsc)
  }
  document.addEventListener("keydown", handleEsc)
}

function handleButtonClick(event: Event) {
  const target = event.target
  if (!(target instanceof Element)) return

  const button = target.closest("[data-action]")
  const center = document.querySelector(".center")
  if (!button || !center) return

  switch (button.getAttribute("data-action")) {
    case "scrollTop":
      center.firstElementChild?.scrollIntoView({ behavior: "smooth" })
      break
    case "scrollBottom":
      center.lastElementChild?.scrollIntoView({ behavior: "smooth" })
      break
    case "graph":
      toggleGraph()
      break
  }
}

function setupFloatingButtons() {
  currentCleanup?.()
  const buttonGroups = document.querySelectorAll<HTMLElement>(".button-group")
  buttonGroups.forEach((group) => group.addEventListener("click", handleButtonClick))

  currentCleanup = () => {
    buttonGroups.forEach((group) => group.removeEventListener("click", handleButtonClick))
  }
}

document.addEventListener('DOMContentLoaded', setupFloatingButtons)
document.addEventListener('nav', setupFloatingButtons)
