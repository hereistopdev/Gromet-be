export const validationMessages = {
    email: "Email is Invalid",
    password: {
        min: "Password should be at least 6 Characters",
        max: "Password is too long"
    },
    passwordNotMatch: "Password does not match",
    noIdProvided: "No id provided",
    required: (field : string) => {
        return `${field} field is required`
    }
};
