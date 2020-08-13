import React, { Component} from "react";
import { Router } from '@reach/router';

import { socket } from "../client-socket.js";
import { post, get } from "../utilities";

// pages
import Login 	from "./pages/Login";
import Profile 	from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Loading 	from "./pages/Loading";
import Functional from "./pages/Functional";

// style
import "../utilities.css";
import "./App.css";

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			userId: undefined,
			username: undefined,
			page: <Loading />,
		}
	}

	componentDidMount(){
		get("/api/whoami").then((user) => {
			if (user._id) {
				this.setState({	userId : user._id,
						page: <Functional handleLogout={this.handleLogout}
						 username={this.state.userId} />,
				});
			}else{
				this.setState({page: <Login handleLogin={this.handleLogin} />});
			}
		});
	}

	handleLogin = (res) => {
		console.log(`Logged in as ${res.profileObj.name}`);
		const userToken = res.tokenObj.id_token;
		post("/api/login", { token: userToken }).then((user) => {
			this.setState({ userId: user._id,
					username: user.name});
			post("/api/initsocket", {socketid: socket.id});
			this.setState({page: <Functional handleLogout={this.handleLogout}
						 username={user.name} />});
		});
	}

	handleLogout = (res) => {
		this.setState({	userId: undefined,
				page: <Login handleLogin={this.handleLogin} />});
		post("/api/logout");
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
