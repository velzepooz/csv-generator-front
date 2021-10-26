export function setCssClass({
  elementSelector,
  newClass,
  toAdd = false,
}) {
  const element = document.querySelector(elementSelector);

  return toAdd
    ? element.classList.add(newClass)
    : element.classList.remove(newClass);
}
