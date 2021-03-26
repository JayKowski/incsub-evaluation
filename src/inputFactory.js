import elementFactory from './elementFactory';

// pure function to generate basic form input elements
const inputFactory = (iFor, iPlaceholder,iType, iElem) => {
    const element = iElem ? elementFactory(`${iElem}`, 'form-input selector') : elementFactory('input', 'form-input');
    element.setAttribute('for', `${iFor}`);
    element.setAttribute('placeholder', `${iPlaceholder}`);
    element.setAttribute('type', `${iType}`);

    return element;
}

export default inputFactory;