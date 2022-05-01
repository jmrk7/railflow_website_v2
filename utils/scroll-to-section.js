const scrollToSection = sectionElementId => {
  if (typeof document === "undefined") {
    return
  }

  const sectionElement = document.getElementById(sectionElementId)

  if (!sectionElement) {
    return
  }

  sectionElement.scrollIntoView({
    alignToTop: true,
    behavior: "smooth",
  })
}

export default scrollToSection
