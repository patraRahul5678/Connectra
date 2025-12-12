import { StreamChat } from "stream-chat"
import "dotenv/config"

const apiKey = process.env.STEAM_API_KEY
const apiSecret = process.env.STEAM_API_SECRET

if (!apiKey || !apiSecret) {
    throw new Error("API key and secret are required")
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData;
    } catch (error) {
        console.error("Error upserting Stram User:", error);
    }
}

export const generateStreamToken = (userId) => {
    try {
        const userIdStr = userId.toString();
        const token = streamClient.createToken(userIdStr);
        return token;
    } catch (error) {
        console.error("Error generating Stream Token:", error);
        throw error;
    }
}