import elementFactory from '../src/elementFactory';
import formPage from "./pageOne";
import dummySect from './dummySection';

// main function to append all segments of the page to the wrapper tag in the index.html file
function mainBody() {
    const wrapper = document.querySelector('.wrapper');
    const bodyDiv = elementFactory('div', 'main-body');
    const bodyContent = elementFactory('div', 'body-content');
    const tabCont = elementFactory('div', 'tab-content');
    //appens elements to index.html .wrapper div tag
    wrapper.appendChild(bodyDiv);
    bodyDiv.appendChild(bodyContent);
    bodyContent.appendChild(tabCont);
    // attach form section to body div
    formPage();
    // attach dummy section to body div
    dummySect();
}

mainBody();