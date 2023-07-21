import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"

export default function Login() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [auth, setAuth] = useState(false)
    const [qrImg, setQrImg] = useState('')
    const [otp, setOtp] = useState()

    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const response = await axios.post('/api/user/auth/login', user)
            setQrImg(response.data.qrcode)
            setAuth(true)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    async function handleUserVerification(e) {
        e.preventDefault()

        try {
            const response = await axios.post('/api/user/auth/verify', { email: user.email, otp: otp })
            alert(response.data.message)
            router.push('/')
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <section className="container mt-5">
            <div className="card border">
                {
                    !auth && (
                        <div className="card-body">
                            <h1 className="card-title">Login</h1>
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input onChange={(e) => handleChange(e)} value={user.email} type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter your email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input onChange={(e) => handleChange(e)} value={user.password} type="password" className="form-control" name="password" id="password" placeholder="Enter a password" />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                            <br />
                            <p className="text-muted">Don't have an account? <a href="/register">Register</a></p>
                        </div>
                    )
                }
                {
                    auth && (
                        <div className="card-body">
                            <h1 className="card-title">QR Code Scan</h1>
                            <form onSubmit={(e) => handleUserVerification(e)}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Verify Code</label>
                                    <div>
                                        <img src={qrImg} alt="qrcode" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">OTP</label>
                                    <input onChange={(e) => setOtp(e.target.value)} type="text" className="form-control" name="otp" id="otp" placeholder="Enter a otp" />
                                </div>
                                <button type="submit" className="btn btn-primary">Verify</button>
                            </form>
                        </div>
                    )
                }
            </div>
        </section>
    )
}