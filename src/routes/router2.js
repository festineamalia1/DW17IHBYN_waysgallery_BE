const express = require("express");

const router = express.Router();

const { authenticated } = require("../middleware/authentication");
const { register, login, checkAuth } = require("../controller/auth");
 
const { uploadImage } = require("../middleware/upload");
const { uploadImage2 } = require("../middleware/upload2");

const {addBestart, detailBestart} = require("../controller/bestcontroller");
const { addArt, allArt, detailArt } = require("../controller/artcontroller");
const { addPhoto, allPhoto, detailPhoto } = require("../controller/photocontroller");
const {allPhoto2} = require("../controller/photocontroller2");
const { editUser, detailUser } = require("../controller/usercontroller");
const { addPhotoprojek } = require("../controller/photoprojekcontroller");
const { addProjek, detailProjek } = require("../controller/projekcontroller");
const { createFollow, getAllFollow } = require("../controller/followcontroller");
const {createHired, allOffer, allOrder, editHired} = require("../controller/hiredcontroller");

router.post("/best", authenticated, uploadImage("art"), addBestart);
router.get("/best/:id", authenticated, detailBestart);

router.get("/art", allArt);
router.get("/art/:id", authenticated, detailArt);
router.post("/art", authenticated, uploadImage2("image"), addArt);


router.post("/follow/:follower", authenticated, createFollow);
router.get("/follow/:id", authenticated, getAllFollow);

router.post("/hired/:orderTo", authenticated, createHired);
router.get("/hired/:orderTo", authenticated, allOffer);
router.get("/hired2/:orderBy", authenticated, allOrder);
router.patch("/hired/:id", authenticated, editHired);

router.post("/photo/:ArtId", authenticated, uploadImage("image"), addPhoto);
router.get("/photo", authenticated, allPhoto);
router.get("/photo/:id", authenticated, detailPhoto);

router.get("/photo2", allPhoto2);

router.post(
  "/photoprojek/:projekId",
  authenticated,
  uploadImage("photo"),
  addPhotoprojek
);
router.post("/projek/:hiredId", authenticated, uploadImage2("photo"), addProjek);
router.get("/projek/:hiredId", authenticated, detailProjek);

router.patch(
  "/user/:id",
  authenticated,

  uploadImage("avatar"),
 
  editUser
);
router.get("/user/:id", authenticated, detailUser);

router.post("/register", register);
router.post("/login", login);
router.get("/auth", authenticated, checkAuth);

  module.exports = router;