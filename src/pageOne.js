import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import elementFactory from './elementFactory';
import inputFactory from './inputFactory';
import validate from './validate';

//add password reveal/conceal icon to password reveal icon
library.add(faEye, faEyeSlash);

function formPage() {

    //pre-form elements
    const tabCont = document.querySelector('.tab-content');
    const pageOne = elementFactory('div', 'page-one');
    const contentDiv = elementFactory('div', 'content-div');
    const stepsDiv = elementFactory('div', 'steps-div');
    const cSpan = elementFactory('span', 'steps-text', 'Step 1 of 3');
    const circle1 = elementFactory('div', 'circle black');
    const circle2 = elementFactory('div', 'circle');
    const circle3 = elementFactory('div', 'circle');
    const h1 = elementFactory('h2', 'main-heading', 'Let\'s set up your account');
    const prompt = elementFactory('p', 'ask-account' , 'Already have an account?  ');
    const signInLink = elementFactory('a', '', ' Sign in');
    signInLink.setAttribute('href', '#');
    
    //form elements
    const form = elementFactory('form', 'signin-form');
        //form input fields
    const nameInput = inputFactory('name', 'Your name', 'text');
    const emailInput = inputFactory('email', 'Email address', 'email');
    const emailError = elementFactory('span', 'email-error', 'Please enter a valid email address');
    const userTypeSelect = inputFactory('user-type', '', 'select', 'select');
    const option1 = elementFactory('option', 'dummy-option', 'I would describe my user type as');
    option1.setAttribute('disabled', true);
    option1.setAttribute('selected', true);
    const option2 = elementFactory('option', '', 'Developer');
    option2.setAttribute('value', 'Developer');
    const option3 = elementFactory('option', '', 'Administrator');
    option3.setAttribute('value', 'Administrator');
    const passwordInput = inputFactory('password', 'Password', 'password');
    const revealPass = elementFactory('span', 'pass-span');
    revealPass.innerHTML = icon({ prefix: 'fas', iconName: 'eye-slash' }).html;

        //form labels
    const nameLabel = elementFactory('label', 'form-label', 'Your Name');
    nameLabel.setAttribute('for', 'name')
    const emailLabel = elementFactory('label', 'form-label', 'Email address');
    emailLabel.setAttribute('for', 'email')
    const passLabel = elementFactory('label', 'form-label', 'Password');
    passLabel.setAttribute('for', 'password');
    
        //form input breaks
    const brk1 = elementFactory('br');
    const brk2 = elementFactory('br');
    const brk3 = elementFactory('br');
    const brk4 = elementFactory('br');
    const brk5 = elementFactory('br');

        //form footer
    const span2 = elementFactory('span', 'char-size', 'Minimum 8 characters');
    const next = elementFactory('button', 'signin-btn', 'Next');

    //form-page footer
    const claim = elementFactory('p', 'policy-claim', 'By clicking the \'Next\' button, you agree to creating a free account, and to ');
    const terms = elementFactory('a', '', 'Terms of Service');
    terms.setAttribute('href', '#');
    const policy = elementFactory('a', '', 'Privacy Policy.');
    policy.setAttribute('href', '#');
    const span3 = elementFactory('span', '', ' and ');

    // append page children
    tabCont.appendChild(pageOne);
    pageOne.appendChild(stepsDiv);
    stepsDiv.appendChild(cSpan);
    stepsDiv.appendChild(circle1);
    stepsDiv.appendChild(circle2);
    stepsDiv.appendChild(circle3);
    pageOne.appendChild(contentDiv);
    contentDiv.appendChild(h1);
    contentDiv.appendChild(prompt);
    prompt.appendChild(signInLink);
    contentDiv.appendChild(form);
    //append form elements
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(brk1);
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(emailError);
    form.appendChild(brk2);
    form.appendChild(userTypeSelect);
    userTypeSelect.appendChild(option1);
    userTypeSelect.appendChild(option2);
    userTypeSelect.appendChild(option3);
    form.appendChild(brk3);
    form.appendChild(passLabel)
    form.appendChild(passwordInput);
    form.appendChild(revealPass);
    form.appendChild(brk4);
    form.appendChild(span2);
    form.appendChild(brk5);
    form.appendChild(next);
    // append form footer
    form.appendChild(claim);
    claim.appendChild(terms);
    claim.appendChild(span3);
    claim.appendChild(policy);
    
    let togglePass = true;
    form.addEventListener('submit', e => {
        e.preventDefault();
    })
    form.addEventListener('click', e => {
        const eyeSpan = document.querySelector('.pass-span');
        const passField = form.elements[3];
        if(e.target.parentElement.nodeName === "SPAN" || e.target.parentElement.nodeName === "svg") {
            if(passField.value.length > 0) {
                if(togglePass){
                    eyeSpan.innerHTML = icon({ prefix: 'fas', iconName: 'eye' }).html;
                    passField.type = "text";
                    togglePass = false;
                } else {
                    eyeSpan.innerHTML = icon({ prefix: 'fas', iconName: 'eye-slash' }).html;
                    passField.type = "password";
                    togglePass = true;
                }
            }
        };
    });
    
    let toggled = false;

    form.addEventListener('change', e => {
        const targ = e.target;
        const fieldAtt = targ.getAttribute('name');
        const label = document.querySelector(`label[for=${fieldAtt}]`);

        if(targ.value === '' && toggled) {
            label.classList.remove("show");
            targ.setAttribute('placeholder', `${label.innerHTML}`);
            toggled = false;
        }
    });

    form.addEventListener('keyup', e => {
        const REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const field  = e.target;
        const evalBool = REGEX.test(field.value.toString());
        const fieldAtt = field.getAttribute('name');
        const label = document.querySelector(`label[for=${fieldAtt}]`);

        if(form.elements[1] === field){
            if(!evalBool) {
                e.target.classList.add("invalid");
                emailError.classList.add("visible");
                label.classList.add("invalid-email");
            } else if (evalBool){
                e.target.classList.remove("invalid");
                emailError.classList.remove("visible");
                label.classList.remove("invalid-email")
            }
        }

        if(field.value.length > 0 || field === document.activeElement && !toggled) {
            field.removeAttribute('placeholder');
            label.classList.add("show");
            toggled = true;
        } 

        //grab field values to pass to validate() for evaluation;
        const name = form.elements[0];
        const email = REGEX.test(form.elements[1].value.toString());
        const select = form.elements[2];
        const password = form.elements[3];

        const pass = validate(name, email, select, password);
        //toggle submit button colors
        const nextBtn = document.querySelector('.signin-btn');
        pass ? nextBtn.classList.add("valid-form") : nextBtn.classList.remove("valid-form");
    });

}

export default formPage