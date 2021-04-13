import {SignInGTN} from "./widget/SignInGtn"
let widgetConfig = {
    client_uid: "c01512d0-9222-11eb-b482-6f5342f32225",
    redirectUri: "http://localhost:5000/mainpage",
    appearance: {
        logo: {
            src: "https://www.get-net.ru/img/logo.png",
            width: "400px"
        },
		signInFormText: "Get-Net Sign in",
		signUpFormText: "Get-Net Sign Up",
		width: "500px"
    },
    lang: "en",
    features: {
        registration: true,
        rememberMe : true
    }
}

const scal = function() {
	alert("verification succeded")
}
const ercal = function(error) {
    console.log(error)
	alert("bad")
}

let w = new SignInGTN(widgetConfig, scal, ercal)

w.renderEl("app")
export default SignInGTN;