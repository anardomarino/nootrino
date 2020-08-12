import React, { Component } from "react";
import GoogleLogin from "react-google-login";

import { get } from "../../utilities";

// style
import "./Login.css";

// images
import LOGO from "../../../../public/noot.png";

// macros
const GOOGLE_CLIENT_ID = "21463356845-mhut4f51s3veef6b80pfaqkp8iuu6ogg.apps.googleusercontent.com";

class Login extends Component {
	constructor(props){
		super(props);
	}
	
	render(){
		return(<>
			<div className="Login-container">
				<div className="Login-column-top">
					<div className="Login-head">
					<div className="Login-logo-container">
						<img className="Login-logo"
							src={LOGO} />
					</div>
					<div className="Login-title underline">
						nootrino
					</div>
					</div>
					
				</div>
				<div className="Login-column-bot">
					<GoogleLogin
						clientId={GOOGLE_CLIENT_ID}
						buttonText="Login"
						onSuccess={this.props.handleLogin}
						onFailure={(err)=>console.log(err)}
						className="Login-google"
					/>
				</div>
			</div>
		</>);
	}
}

export default Login;
