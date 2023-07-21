import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"

export default function Register() {
    const router = useRouter()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const response = await axios.post('/api/user/auth/register', user)
            alert(response.data.message)
            router.push('/login')
        } catch (error) {
            alert(error.response.data.message)
        }

        setUser({
            name: "",
            email: "",
            password: ""
        })
    }

    return (
        <section className="container mt-5">
            <div className="card border">
                <div className="card-body">
                    <h1 className="card-title">Register</h1>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input onChange={(e) => handleChange(e)} value={user.name} type="text" className="form-control" name="name" id="name" placeholder="Enter your name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input onChange={(e) => handleChange(e)} value={user.email} type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter your email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input onChange={(e) => handleChange(e)} value={user.password} type="password" className="form-control" name="password" id="password" placeholder="Enter a password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                    <br />
                    <p className="text-muted">If you have an account? <a href="/login">Login</a></p>
                </div>
            </div>
        </section>
    )
}