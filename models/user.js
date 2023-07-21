import { model, models, Schema } from "mongoose"

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        secret: {
            type: String
        },
        verified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export default models.User || model("User", userSchema);