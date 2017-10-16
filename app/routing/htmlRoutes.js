var path    = require("path");

module.exports = function(app)
{
  app.get("/:location?", function(req, res)
  {
    var chosen = req.params.location;
	
    if (chosen === "survey")
    {
      res.sendFile(path.join(__dirname, "..", "public", "survey.html"));
    }

    else
    {
      res.sendFile(path.join(__dirname, "..", "public", "home.html"));
    }
  });
};