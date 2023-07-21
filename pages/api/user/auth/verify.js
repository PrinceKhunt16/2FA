import connectToDB from "@/helper/connectToDB"
import User from "@/models/user"
import speakeasy from 'speakeasy'

export default async function (req, res) {
    connectToDB()

    if (req.method === 'POST') {
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            const verified = speakeasy.totp.verify({
                secret: user.secret,
                token: req.body.otp,
                encoding: 'base32'
            })

            if (verified) {
                await User.findOneAndUpdate({ email: req.body.email }, {
                    verified: true,
                    $unset: {
                        secret: user.secret
                    }
                })

                return res.status(200).send({
                    message: "User verified successfully."
                })
            }

            return res.status(401).json({
                message: "Invalid OTP.",
                success: false
            })
        }

        return res.status(404).json({
            message: "User not found.",
            success: false
        })
    }

    return res.status(405).json({
        message: "Method not allowed.",
        success: false
    })
}