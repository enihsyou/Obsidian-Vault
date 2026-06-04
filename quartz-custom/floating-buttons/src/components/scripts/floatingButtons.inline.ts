let currentCleanup: (() => void) | null = null

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
      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>(".global-graph-icon")
          ?.dispatchEvent(new MouseEvent("click"))
      });
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

document.addEventListener("DOMContentLoaded", setupFloatingButtons)
document.addEventListener("nav", setupFloatingButtons)
