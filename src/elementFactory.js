// pure function to generate basic form elements with classes and content if any

export default function createElement(element, theClass, content) {
  const el = document.createElement(`${element}`);
  theClass && theClass.length !== 0 ? el.classList += `${theClass}` : false;
  content && content.length !== 0 ? el.innerText += `${content}` : false;
  return el;
}