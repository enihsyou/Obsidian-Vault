let activeModal: HTMLElement | null = null
let currentCleanup: (() => void) | null = null

function closeModal(
  modal: HTMLElement,
  handlers: ModalHandlers,
  executeAction?: "search" | "graph" | "reader",
) {
  if (!activeModal) return

  document.removeEventListener("keydown", handlers.handleEsc)
  modal.removeEventListener("mousedown", handlers.handleOutsideClick)
  handlers.closeBtn.removeEventListener("click", handlers.handleCloseClick)
  handlers.content.removeEventListener("click", handlers.handleShortcutClick)

  activeModal.remove()
  activeModal = null

  if (executeAction === "search" || executeAction === "reader") {
    dispatchShortcut(executeAction === "search" ? "k" : "e")
  } else if (executeAction === "graph") {
    toggleGraph()
  }
}

function dispatchShortcut(key: string) {
  document.dispatchEvent(
    new KeyboardEvent("keydown", {
      key,
      ctrlKey: true,
      metaKey: true,
    }),
  )
}

function showShortcutSheet() {
  if (activeModal) return

  const modal = document.createElement("div")
  const content = document.createElement("div")
  const closeBtn = document.createElement("button")

  activeModal = modal
  modal.className = "shortcut-sheet-modal"
  content.className = "shortcut-sheet-content"
  closeBtn.className = "shortcut-sheet-close"
  closeBtn.textContent = "x"
  content.innerHTML = `
    <h3>键盘快捷键</h3>
    <div class="shortcut-list">
      <div class="shortcut-item" data-shortcut="search">
        <span class="shortcut-keys">
          <kbd class="retro-key">⌘</kbd> / <kbd class="retro-key">Ctrl</kbd> +
          <kbd class="retro-key">K</kbd>
        </span>
        <span class="shortcut-desc">搜索</span>
      </div>
      <div class="shortcut-item" data-shortcut="graph">
        <span class="shortcut-keys">
          <kbd class="retro-key">⌘</kbd> / <kbd class="retro-key">Ctrl</kbd> +
          <kbd class="retro-key">G</kbd>
        </span>
        <span class="shortcut-desc">全局图谱</span>
      </div>
      <div class="shortcut-item" data-shortcut="reader">
        <span class="shortcut-keys">
          <kbd class="retro-key">⌘</kbd> / <kbd class="retro-key">Ctrl</kbd> +
          <kbd class="retro-key">E</kbd>
        </span>
        <span class="shortcut-desc">阅读模式</span>
      </div>
    </div>
  `
  content.insertBefore(closeBtn, content.firstChild)
  modal.appendChild(content)

  const handlers = createModalHandlers(modal, content, closeBtn)
  document.addEventListener("keydown", handlers.handleEsc)
  modal.addEventListener("mousedown", handlers.handleOutsideClick)
  closeBtn.addEventListener("click", handlers.handleCloseClick)
  content.addEventListener("click", handlers.handleShortcutClick)
  document.body.appendChild(modal)
}

function createModalHandlers(
  modal: HTMLElement,
  content: HTMLElement,
  closeBtn: HTMLButtonElement,
): ModalHandlers {
  const handlers: ModalHandlers = {
    closeBtn,
    content,
    handleEsc(event) {
      if (event.key === "Escape") closeModal(modal, handlers)
    },
    handleOutsideClick(event) {
      if (event.target !== modal || event.currentTarget !== modal) return
      event.preventDefault()
      event.stopPropagation()
      closeModal(modal, handlers)
    },
    handleCloseClick(event) {
      event.preventDefault()
      event.stopPropagation()
      closeModal(modal, handlers)
    },
    handleShortcutClick(event) {
      const target = event.target
      if (!(target instanceof Element)) return

      const shortcutItem = target.closest(".shortcut-item")
      const action = shortcutItem?.getAttribute("data-shortcut")
      if (action === "search" || action === "graph" || action === "reader") {
        closeModal(modal, handlers, action)
      }
    },
  }

  return handlers
}

function toggleGraph() {
  const graphComponent = document.querySelector(".graph")
  if (!(graphComponent instanceof HTMLElement)) return

  if (graphComponent.classList.contains("active")) {
    graphComponent.classList.remove("active")
    return
  }

  graphComponent.classList.add("active")
  document
    .getElementById("global-graph-icon")
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
    case "shortcuts":
      showShortcutSheet()
      break
  }
}

function setupFloatingButtons() {
  currentCleanup?.()
  const buttonGroups = document.querySelectorAll<HTMLElement>(".button-group")
  buttonGroups.forEach((group) => group.addEventListener("click", handleButtonClick))

  currentCleanup = () => {
    buttonGroups.forEach((group) => group.removeEventListener("click", handleButtonClick))
    activeModal?.remove()
    activeModal = null
  }
}

interface ModalHandlers {
  closeBtn: HTMLButtonElement
  content: HTMLElement
  handleEsc: (event: KeyboardEvent) => void
  handleOutsideClick: (event: MouseEvent) => void
  handleCloseClick: (event: MouseEvent) => void
  handleShortcutClick: (event: MouseEvent) => void
}

document.addEventListener("DOMContentLoaded", setupFloatingButtons)
document.addEventListener("nav", setupFloatingButtons)
