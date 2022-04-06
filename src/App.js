import './App.css';
import GoogleLogin from "react-google-login"
import {useState} from "react";

function App() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
    ? JSON.parse(localStorage.getItem("loginData"))
    : null
  )
  const handleFailure = (result) => {
    alert(result);
  }
  const handleLogin = async (googleData) => {
    const res = await fetch("/api/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));


  }
  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>LOGIN</h1>
        <div>
        {
          loginData ?(
            <div>
              <h3>You are login as {loginData.email}</h3>
              <button onclick={handleLogout}>Logout</button>
            </div>
          ) : (
            <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="login with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
          ></GoogleLogin>

          )
        }
         
        </div>
      </header>
    </div>
  );
}

export default App;
