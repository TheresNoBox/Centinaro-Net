
/*
 * GET home page.
 */

exports.imageGallery = function(req, res){
  res.render('imageGallery', { title: 'Image Gallery Widget' });
};