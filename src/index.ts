//importing modules for the project
import express from 'express';
import fs from 'fs';
import sizeOf from 'image-size';
import sharp from 'sharp';
import path from 'path';

const app = express();
const port = 3500;

//sets the images as static files for the images endpoint
app.use('/images', express.static('images'));

app.get('/images', async (req, res) => {
  //gets the necessary information from the query string
  const name = req.query.filename;
  const mywidth = parseInt(req.query.width as string);
  const myheight = parseInt(req.query.height as string);

  //checks if there is an error in the query string values
  if (!fs.existsSync(`./images/${name}.jpg`)) {
    res.send(`Error: there is no image with that name in the images directory`);
  } else if (isNaN(mywidth) || isNaN(myheight)) {
    res.send(`you need to enter numbers in the height and width value`);
  } else {
    //checks if the resized image doesn't exist or not, if not create it
    if (!fs.existsSync(`./images/resized/${name}-resized.jpg`)) {
      await sharp(`images/${name}.jpg`)
        .resize({ width: mywidth, height: myheight })
        .toFile(`images/resized/${name}-resized.jpg`);
      res.sendFile(
        `${path.join(
          __dirname,
          '..',
          'images',
          'resized',
          `${name}-resized.jpg`
        )}`
      );
    } else {
      //gets the image path
      const resizedImage = path.join(
        __dirname,
        '..',
        'images',
        'resized',
        `${name}-resized.jpg`
      );
      //gets the dimensions of the image
      const dimensions = sizeOf(resizedImage);
      if (
        //checks if the dimensions are the same or not
        dimensions.width === mywidth &&
        dimensions.height === myheight
      ) {
        res.sendFile(resizedImage);
      } else {
        await sharp(`images/${name}.jpg`)
          .resize({ width: mywidth, height: myheight })
          .toFile(`images/resized/${name}-resized.jpg`);
        res.sendFile(resizedImage);
      }
    }
  }
});
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

export default app;
