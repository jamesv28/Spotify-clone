import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { User } from "../models/user.model.js";

export const getAllStatistics = async (req, res, next) => {
  try {
    const [totalSongs, totalUsers, totalAlbums, totalArtists] =
      await Promise.all([
        Song.countDocuments(),
        User.countDocuments(),
        Album.countDocuments(),
        Song.aggregate([
          {
            $unionWith: {
              col: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);
    res.status(200).json({
      totalAlbums,
      totalSongs,
      totalUsers,
      uniqueArtists: totalArtists[0]?.count || 0,
    });
  } catch (error) {
    next(error);
  }
};
