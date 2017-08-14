import React from 'react';

 export default function Login(props) {
  return (
    <form onSubmit={props.onSubmit}>
        <input value={props.email} onChange={props.onUpdateEmail} placeholder="email" type="email" className="invertedText" /><br />
        <br />
        <input type="password" value={props.password} onChange={props.onUpdatePassword} placeholder="password" className="invertedText" />
        <br />
        <br />
        <input type="submit" value="Login" className="btn btn-info" />
    </form>
  )
}
