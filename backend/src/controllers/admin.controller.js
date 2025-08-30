import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

export const checkAdmin = (req, res, next) => {
  res.status(200).json({ admin: true });
};

const uploadToCloudinary = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file.tempFilePath, {
      result_type: "auto",
    });
    return res.secure_url;
  } catch (error) {
    console.log(`Error uploading: ${error}`);
    throw new Error("Error uploading to cloudinary");
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload all files" });
    }
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    await song.save();
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $puish: { songs: song._id },
      });
    }
    res.status(201).json(song);
  } catch (error) {
    console.log(`Error creating song: ${error}`);
    // res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });

      await Song.findByIdAndDelete(id);
      res.status(200).json({ message: "Song deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
};

export const createAlbums = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;
    const imageUrl = await uploadToCloudinary(imageFile);
    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });
    await album.save();
    res.status(200).json({ message: "album saved successfully" });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const deleteAlbums = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.deleteMangy({ albumId: id });
    await Album.findByIdAndDelete(id);
    res.status(200).json({ message: "album successfully deleted" });
  } catch (error) {
    console.log(`Error deleting album: ${error.message}`);
    next(error);
  }
};
