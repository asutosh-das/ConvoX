import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { getAIResponse } from "../services/ai.service.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // Save both in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        // SOCKET IO FUNCTIONALITY WENT HERE
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        // --- AI LOGIC ---
        // Check if receiver is the AI user
        const receiverNode = await User.findById(receiverId);
        if (receiverNode && receiverNode.isAI) {
            // Respond as AI asynchronously so we dont block the human's requested response
            handleAIReply(message, senderId, receiverId, conversation);
        } else if (message.startsWith("/ai ")) {
            // Handle explicit /ai commands in normal human-human chat
            const aiQuery = message.replace("/ai ", "");
            handleAIReply(aiQuery, senderId, receiverId, conversation, true);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const handleAIReply = async (prompt, senderId, receiverId, conversation, isInlineCommand = false) => {
    try {
        // If inline command, the AI is "interjecting" in a human conversation
        // The sender of the AI msg will be the AI user. 
        // We'll broadcast it to BOTH participants of the conversation.
        const aiUser = await User.findOne({ isAI: true });
        if (!aiUser) return;

        // Use the service to query openai
        const aiTextResponse = await getAIResponse(prompt);

        const aiMessage = new Message({
            senderId: aiUser._id,
            receiverId: isInlineCommand ? receiverId : senderId,
            message: aiTextResponse
        });

        conversation.messages.push(aiMessage._id);
        await Promise.all([conversation.save(), aiMessage.save()]);

        // Send to original sender
        const senderSocketId = getReceiverSocketId(senderId);
        if (senderSocketId) {
            io.to(senderSocketId).emit("newMessage", aiMessage);
        }

        // If it was an inline command for another user, send to them too
        if (isInlineCommand) {
            const receiverSocketId = getReceiverSocketId(receiverId);
            if (receiverSocketId && receiverSocketId !== senderSocketId) {
                io.to(receiverSocketId).emit("newMessage", aiMessage);
            }
        }

    } catch (err) {
        console.log("Error in handling AI reply: ", err.message);
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
