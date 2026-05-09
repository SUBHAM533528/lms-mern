import { Webhook } from "svix";
import User from "../models/User.js";

const clerkWebhooks = async (req, res) => {
  try {

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify webhook
    const payload = req.body.toString();

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const evt = whook.verify(payload, headers);

    const { data, type } = evt;

    console.log("Webhook Type:", type);

    switch (type) {

      case "user.created": {

        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`,
          imageUrl: data.image_url,
        };

        await User.create(userData);

        console.log("User Saved");

        break;
      }

      case "user.updated": {

        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`,
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);

        console.log("User Updated");

        break;
      }

      case "user.deleted": {

        await User.findByIdAndDelete(data.id);

        console.log("User Deleted");

        break;
      }

      default:
        console.log("Unhandled Event");
    }

    return res.status(200).json({
      success: true,
    });

  } catch (error) {

    console.log("Webhook Error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default clerkWebhooks;