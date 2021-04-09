import {SignInGTN} from "./widget/SignInGtn"
let widgetConfig = {
    client_uid: "c01512d0-9222-11eb-b482-6f5342f32225",
    redirectUri: "http://localhost:5000/mainpage",
    appearance: {
        logo: {
            src: "https://www.x5.ru/ru/assets/img/content/logo-01.jpg",
            width: "100px"
        },
		signInFormText: "Зайти в пятерочку",
		signUpFormText: "Зарегаться в пятерочке",
        lang: "ru",
		width: "500px"
    },
    features: {
        registration: true,
        rememberMe : true
    }
}
const scal = function() {
	alert()
}
const ercal = function() {
	alert("bad")
}
let w = new SignInGTN(widgetConfig, scal, ercal)

w.renderEl("app")
window.widget = SignInGTN
export default SignInGTN;