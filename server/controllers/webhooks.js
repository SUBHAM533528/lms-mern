import User from "../models/User.js";

const clerkWebhooks = async (req, res) => {

  try {

    console.log("Webhook Hit");
    console.log(req.body);

    const { data, type } = req.body;

    if (type === "user.created") {

      const userData = {
        _id: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name || ""} ${data.last_name || ""}`,
        imageUrl: data.image_url,
      };

      await User.create(userData);

      console.log("User Saved Successfully");
    }

    return res.status(200).json({
      success: true
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export default clerkWebhooks;