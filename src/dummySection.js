import elementFactory from './elementFactory';

const dummyText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

function dummySect() {
    const tabCont = document.querySelector('.tab-content');
    const dummyWrap = elementFactory('div', 'dummy-wrap');
    const dummyDiv = elementFactory('div', 'dummy-sect');
    const h2 = elementFactory('h2', '', 'Dummy Heading');
    const p = elementFactory('p', '', `${dummyText}`);

    tabCont.appendChild(dummyDiv);
    dummyDiv.appendChild(dummyWrap);
    dummyWrap.appendChild(h2)
    dummyWrap.appendChild(p)

}

export default dummySect;