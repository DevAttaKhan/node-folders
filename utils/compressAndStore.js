const sharp = require("sharp");
const path = require("path");

const resizeImage = async (filename) => {
  try {
    const thumbnail = await sharp(
      path.join(__dirname, "../public/photos/", filename)
    )
      .resize(350, 260)
      .toFile(path.join(__dirname, "../public/photos/thumbnail", filename));
  } catch (err) {
    throw new Error(err.message);
  }
};

const compressImage = async (buffer) => {
  const name = uuid();
  const image = await sharp(buffer)
    .jpeg({ quality: 80 })
    .toFile(path.join(__dirname, "../public/photos/", `${name}.jpeg`));
  return name;
};

const compressAndStore = async (files) => {
  for (let i = 0; i < files.length; i++) {
    await resizeImage(files[i].filename);
  }
};

module.exports = compressAndStore;
