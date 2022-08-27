"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var image_size_1 = __importDefault(require("image-size"));
var fs_1 = __importDefault(require("fs"));
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../index"));
//testing the image-size module
it('get the right dimensions of an image', function () {
    var width = (0, image_size_1.default)('images/fjord.jpg').width;
    var height = (0, image_size_1.default)('images/fjord.jpg').height;
    expect(width).toEqual(1920);
    expect(height).toEqual(1280);
});
//testing if the fs module will check the existing of an image
it('test if an image file exists', function () {
    expect(fs_1.default.existsSync('images/fjord.jpg')).toBe(true);
    expect(fs_1.default.existsSync('images/wrongname.jpg')).toBe(false);
});
//testing the endpoint
it('the endpoint status', function (done) {
    (0, supertest_1.default)(index_1.default).get('/images').expect(200);
    done();
});
