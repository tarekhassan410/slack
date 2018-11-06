import React from "react";
import LoginDialog from "./LoginDialog";
import Auth from ".././firebase/auth";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.userLoggedIn == false ? (
          <button
            type="button"
            onClick={this.props.onLoginClick}
            className="bp3-button bp3-round bp3-intent-primary modifier"
          >
            login
          </button>
        ) : (
          <div>
            {this.props.user.map(u => <span> {u.displayName} </span>)}
            <button
              type="button"
              onClick={this.props.onLogoutClick}
              className="bp3-button bp3-round bp3-intent-primary modifier"
            >
              Logout
            </button>
          </div>
        )}
        {this.props.showLoginDialog == true && (
          <LoginDialog
            showDialog={this.props.showLoginDialog}
            onClose={this.props.onLoginClose}
            user={this.props.user}
            handleUserLogin={this.props.handleUserLogin}
          />
        )}
      </div>
    );
  }
}

export default Login;
