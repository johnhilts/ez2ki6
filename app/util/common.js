export const range  = (start, end) => {
  if (typeof(end) != "undefined") {
    return [...Array(end-start).keys()].map(v => start+v)
  }
  else {
    return [...Array(start).keys()]
  }
}
