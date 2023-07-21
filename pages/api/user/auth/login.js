import connectToDB from "@/helper/connectToDB"
import User from "@/models/user"
import bcrypt from "bcrypt"
import speakeasy from 'speakeasy'
import QRCode from "qrcode"

export default async function (req, res) {
    await connectToDB()

    if (req.method == "POST") {
        try {
            const user = await User.findOne({ email: req.body.email })

            if (!user) {
                return res.status(401).json({
                    message: "Unvalid user credentials.",
                    success: false
                })
            }

            const match = await bcrypt.compare(req.body.password, user.password)

            if (!match) {
                return res.status(401).json({
                    message: "Unvalid user credentials.",
                    success: false
                })
            }

            const secret = speakeasy.generateSecret()

            let qrcode

            QRCode.toDataURL(secret.otpauth_url, (err, data) => {
                qrcode = data
            })

            await User.findOneAndUpdate({ email: req.body.email }, { secret: secret.base32, verified: false })
 
            return res.status(200).json({
                message: "You logged in successfully.",
                success: true,
                qrcode: qrcode
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error.",
                err: error,
                success: false
            })
        }
    }

    return res.status(405).json({
        message: "Method not allowed.",
        success: false
    })
}