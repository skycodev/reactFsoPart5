import Toggable from './Toggable'

const LoginForm = (props) => {
  return (
    <Toggable buttonLabel='Show login'>

      <form onSubmit={props.handleLogin}>
        <div>
          username &nbsp;
          <input
            type='text'
            value={props.username}
            name='Username'
            onChange={props.handleUsernameChange}
          />
        </div>
        <div>
          password &nbsp;
          <input
            type='password'
            value={props.password}
            name='Password'
            onChange={props.handlePasswordChange}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </Toggable>

  )
}

export default LoginForm
