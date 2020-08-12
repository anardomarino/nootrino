import React, { Component} from "react";
import { Router } from '@reach/router';

import { socket } from "../client-socket.js";
import { post, get } from "../utilities";

// pages
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// style
import "../utilities.css";
import "./App.css";

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			userId: undefined,
			page: <></>,
		}
	}

	componentDidMount(){
		this.setState({page: <Login handleLogin={this.handleLogin} />});
		get("/api/whoami").then((user) => {
			if (user._id) {
				this.setState({userId : user._id});
			}
		});
	}

	handleLogin = (res) => {
		console.log(`Logged in as ${res.profileObj.name}`);
		const userToken = res.tokenObj.id_token;
		post("/api/login", { token: userToken }).then((user) => {
			this.setState({ userId: user._id });
		});
		this.setState({page: <Profile />});
	}

	render(){
		return(<>
			<div className="App-container">
			{this.state.page}
			</div>
		</>);
	}
}

export default App;
