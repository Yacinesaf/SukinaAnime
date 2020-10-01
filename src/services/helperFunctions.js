const rateToFive = (rate) => {
  return (rate / 20).toFixed(2)
}

const titleFormater = (title) => {
  return title.charAt(0).toUpperCase() + title.slice(1)
}



export {
  rateToFive,
  titleFormater,
}