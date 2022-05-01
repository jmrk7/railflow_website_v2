const onEnterKeyDown = function (callback) {
  return event => {
    if (event.keyCode === 13 && typeof callback === "function") {
      callback(...arguments.slice(2))
    }
  }
}

export default onEnterKeyDown
