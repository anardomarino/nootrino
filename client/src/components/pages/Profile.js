import React, { Component } from "react";
import GoogleLogin from "react-google-login";

import { get } from "../../utilities";

// style
import "./Profile.css";

// images
import LOGO from "../../../../public/noot.png";

// macros
const GOOGLE_CLIENT_ID = "21463356845-mhut4f51s3veef6b80pfaqkp8iuu6ogg.apps.googleusercontent.com";

class Profile extends Component {
	constructor(props){
		super(props);
	}
	
	render(){
		return(<>
			<div className="Profile-container">
			Profile
			</div>
		</>);
	}
}

export default Profile;
