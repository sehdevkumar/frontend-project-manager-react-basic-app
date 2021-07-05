import React,{useState,useEffect} from 'react'
import { registerAction } from '../../Redux/Actions/authAction'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

function Register() {
   
    const history = useHistory()

    const [getInputs,setInputs] = useState({
        name:"",
        email:"",
        password:'',
        role:"select"
    })

     const dispatch = useDispatch()
     const imformation = useSelector(state=>state.authReducer)
    
     const token = localStorage.getItem("jwt_token");
     useEffect(() => {
       if (imformation.loggedOn || token) {
         history.push("/");
       }
     }, [imformation, token, history]);

    const inputHandler = (e)=>{
       
        setInputs({
            ...getInputs,
            [e.target.name]:e.target.value
        })
    }

    const submitForm = (e)=>{
        e.preventDefault();
        const {name,email,password,role} = getInputs
        dispatch(registerAction(name,email,password,role))
    }

    return (
      <>
        <div className="container mt-4">
            <center><p style={{color:'red',fontWeight:'bolder'}}>{imformation.error}</p></center>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <form className="form-group">
                <label>
                  <strong>Name</strong>
                </label>
                <input
                  type="text"
                  name="name"
                  value={getInputs.name}
                  className="form-control"
                  placeholder="Name"
                  onChange={inputHandler}
                />
                <label>
                  <strong>Email</strong>
                </label>
                <input
                  type="email"
                  name="email"
                  value={getInputs.email}
                  className="form-control"
                  placeholder="email"
                  onChange={inputHandler}
                />
                <label>
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  name="password"
                  value={getInputs.password}
                  className="form-control"
                  placeholder="*****"
                  onChange={inputHandler}
                />
                <label>
                  <strong>Role</strong>
                </label>
                <select
                  name="role"
                  className="form-control"
                  value={getInputs.role}
                  onChange={inputHandler}
                >
                  <option value="select">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="developer">Developer</option>
                </select>
                <br />
                <button
                  className=" btn btn-primary form-control"
                  type="submit"
                  onClick={submitForm}
                >
                  Register
                </button>
              </form>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </>
    );
}

export default Register
