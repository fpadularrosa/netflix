import { useState } from "react"

export default Login = () => {
    const [user, useUser] = useState({
        name: '',
        password: ''
    });
    const [error, useError] = useState(null);
    
    useEffect(() => {
        let token;

        if(user.name && user.password) {
        token = fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: user,
            authorization: `${process.env.BearerTokenLoginAuthentication}`
        }).then(res => {
            res.status === 200 && window.localStorage.setItem('user', token);
        }).catch(res => useError(res));
    }
    }, []);

    return (
        <div>
            <label className="label-form" >BIENVENIDO A NETFLAX</label>
            <label>Email</label>
            <input onChange={useUser(user.name)} value={user.name}></input>
            <label>Password</label>
            <input onChange={useUser(user.password)} value={user.password}></input>     
            <div>{error && error}</div>           
        </div>
    )
}