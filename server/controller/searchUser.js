import User from "../database/models/User.js";
const searchUser = async (req, res) => {
  try {
    const { search } = req.body;

    // i: This is a flag specifying that the regular expression should perform a case-insensitive search. It means that the search will ignore the case of the characters, so A and a would be considered the same.

    // g: This is a flag for global search, which indicates that the regular expression should find all matches in the text rather than stopping after the first match. This flag ensures the search continues through the entire text, not just at the first occurrence.

    const query = new RegExp(search, "i", "g");

    const user = await User.find({
      $or: [{ name: query }, { email: query }],
    }).select("-password");

    return res.json({
      message: "all user",
      data: user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export default searchUser;
