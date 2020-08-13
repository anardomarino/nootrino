import React, { Component } from "react";
import { Router } from "@reach/router";
import { Link } from "@reach/router";
import { GoogleLogout } from "react-google-login";

// style
import "./FloatNav.css";

// img
import LOGO	from "../../../../public/noot.png";
import HOME 	from "../../../../public/home.png";
import ME 	from "../../../../public/me.png";
import GROUPS 	from "../../../../public/groups.png";

// macros
const GOOGLE_CLIENT_ID = "21463356845-mhut4f51s3veef6b80pfaqkp8iuu6ogg.apps.googleusercontent.com";

class FloatNav extends Component {
	constructor(props){
		super(props);
		this.state = {
			open: true,
			active: "me",
		}
	}

	handleSwitch = (event) => {
		this.setState({open: !this.state.open});
	}

	handleHome = (event) => {
		this.setState({active: "home"});
	}

	handleMe = (event) => {
		this.setState({active: "me"});
	}

	handleGroups = (event) => {
		this.setState({active: "groups"});
	}

	render(){
		return(<>
		<div className="FloatNav-container" id={(this.state.open)?"open":"closed"}>
			<button className="FloatNav-slider" onClick={this.handleSwitch}>
				<img src={LOGO} className="FloatNav-logo" />
			</button>
			<Link to="/home" className="FloatNav-option" onClick={this.handleHome}
				id={(this.state.active==="home")?"active":""}>
				<img src={HOME} className="FloatNav-nail" />
				home
			</Link>
			<Link to="/me" className="FloatNav-option" onClick={this.handleMe}
				id={(this.state.active==="me")?"active":""}>
				<img src={ME} className="FloatNav-nail" />
				me
			</Link>
			<Link to="/groups" className="FloatNav-option" onClick={this.handleGroups}
				id={(this.state.active==="groups")?"active":""}>
				<img src={GROUPS} className="FloatNav-nail" />
				groups
			</Link>
			<GoogleLogout
				clientId={GOOGLE_CLIENT_ID}
				buttonText="Logout"
				onLogoutSuccess={this.props.handleLogout}
				onFailure={(err) => console.log(err)}
				className="FloatNav-google"
			/>
		</div>
		</>);
	}
}

export default FloatNav;
