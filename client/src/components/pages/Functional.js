import React, { Component } from "react";
import { Router } from "@reach/router";

import { get, post } from "../../utilities";

// pages
import Profile from "./Profile";
import NotFound from "./NotFound";

// modules
import FloatNav from "../modules/FloatNav";

// style
import "./Functional.css";

class Functional extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
	}

	render(){
		return(<>
			<div className="Functional-container">
			<FloatNav handleLogout={this.props.handleLogout} />
			<div className="Functional-page">
			<Router>
				<Profile path="/me" username={this.props.username}/>
				<NotFound default />	
			</Router>
			</div>
			</div>
		</>);
	}
}

export default Functional;
