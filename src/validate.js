// validate form for submit button to be activated

export default function validate(name, email, uType, password) {
    const nameEval = name.value.length > 2;
    const uTypeEval = uType.value !== 'I would describe my user type as';
    const passwordEval = password.value.length >=8;

    return (nameEval && email && uTypeEval && passwordEval);
}