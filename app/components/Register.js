import React from 'react';

export default function Register(props) {
  return (
    <form onSubmit={props.onSubmit}>
        <input value={props.userName} onChange={props.onUpdateUserName} placeholder="your name" /><br />
        <br />
        <input value={props.email} onChange={props.onUpdateEmail} placeholder="email" /><br />
        <br />
        <input type="password" value={props.password} onChange={props.onUpdatePassword} placeholder="password" />
        <br />
        <br />
        <input type="submit" value="Register" className="btn btn-info" />
    </form>
  )
}
