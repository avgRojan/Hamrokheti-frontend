export default function removeUnderScore(text) {
  if (text.indexOf("_") !== -1) {
    return text.replace(/_/g, " ");
  } else {
    return text;
  }
}
