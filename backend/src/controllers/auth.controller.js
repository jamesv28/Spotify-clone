import { User } from "../models/User.model.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;
    // check if user exists
    const user = await User.findOne({ clerId: id });
    if (!user) {
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
