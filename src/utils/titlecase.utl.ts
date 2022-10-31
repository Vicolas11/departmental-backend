const titleCase = (str: string): string => {
    let words = str.split(" ");
    let result = ""
    words.map(w => {
      let tc = w[0].toUpperCase() + w.substring(1).toLowerCase()
      result += tc + " ";
    })
    return result.trim();
  }

  export default titleCase;