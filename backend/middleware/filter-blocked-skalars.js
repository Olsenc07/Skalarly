import SkalarInfo  from '../models/skalarInfo.js';

const filterBlockedUsers = async (req, res, next) =>  {
    try {
    // req.query.userId; might be '' if not logged in
    const userId = req.query.userId;
    const idSearch = req.query?.id;

    if(idSearch){
    const userSearch = await SkalarInfo.findById(idSearch).exec();

    if (!userSearch) {
      return res.status(404).json({ message: 'Skalar not found.' });
    }else{
    const isUserBlocked = userSearch.blocklist.includes(userId);
   req.blocked = isUserBlocked 
   next(); // Continue to the next middleware or route handler
    }
  }else{
      const user = await SkalarInfo.findById(userId).exec();
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
  } 
} catch (error) {
  res.status(401).json({ message: 'Authentication failed.'
});
}
};

export {filterBlockedUsers};