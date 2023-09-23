import { find, findById } from '/app/backend/models/SkalarInfo';

function filterBlockedUsers(req, res, next) {
    const input = req.query.input;
    const userId = req.query.userId;
   
    findById(userId, (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error, Blocked Skalar' });
      }
      if (!user) {
        return res.status(404).json({ error: 'Skalar not found' });
      }
  
      // Filter out blocked users from the search query
      const filteredQuery = {
        $and: [
          { _id: { $ne: userId } }, // Exclude the current user
          { _id: { $nin: user.blocklist } }, // Exclude users in the blocklist
          // Add other search conditions as needed
        ],
      };
  
      // Apply the filtered query to your MongoDB search
      find(filteredQuery, (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error, Blocked Filter' });
        }
  
        // Send the filtered results as a response
        res.json(results);
      });
    });
  }
  