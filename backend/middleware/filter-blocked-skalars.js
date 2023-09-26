import { find, findById } from '/app/backend/models/SkalarInfo';

const filterBlockedUsers = async (req, res, next) =>  {
    try {
    // req.query.userId; might be '' if not logged in
    const userId = req.query.userId;
    findById(userId, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error, Blocked Skalar.' });
      }
      if (!user) {
        return res.status(404).json({ message: 'Skalar not found.' });
      }
      // Filter out blocked users from the search query
      const filteredQuery = {
        $and: [
          { _id: { $ne: userId } }, // Exclude the current skalar
          { _id: { $nin: user.blocklist } }, // Exclude users in the blocklist
          // Add other search conditions as needed
        ],
      };
   // Attach user data to the request object for use in subsequent route handlers
   req.filteredQuery = filteredQuery;
   // Apply the filtered query to your MongoDB search
   next(); // Continue to the next middleware or route handler
    });
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed.' });
  }
};
  // Export the middleware function for use in routes
module.exports = filterBlockedUsers;