import sizeOf from 'image-size';
import fs from 'fs';
import supertest from 'supertest';
import app from '../index';

//testing the image-size module
it('get the right dimensions of an image', () => {
  const width = sizeOf('images/fjord.jpg').width;
  const height = sizeOf('images/fjord.jpg').height;
  expect(width).toEqual(1920);
  expect(height).toEqual(1280);
});

//testing if the fs module will check the existing of an image
it('test if an image file exists', () => {
  expect(fs.existsSync('images/fjord.jpg')).toBe(true);
  expect(fs.existsSync('images/wrongname.jpg')).toBe(false);
});

//testing the endpoint
it('the endpoint status', (done) => {
  supertest(app).get('/images').expect(200);
  done();
});
