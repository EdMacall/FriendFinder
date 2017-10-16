var friendsData = require("../data/friends");

module.exports = function(app)
{
  app.get("/api/friends", function(req, res)
  {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res)
  {
    var bestMatch = 100;
    var bestMatchScore = 0;
    var friendsDifference = [];
    var friendDifference = 0;

    var newFriend = req.body;

    for(var i = 0; i < friendsData.length; i++)
    {
      friendDifference = 0;
      for(var j = 0; j < 10; j++)
      {
        friendDifference += getDifference(friendsData[i].scores[j], newFriend.scores[j]);
      }
      friendsDifference.push(friendDifference);
      if(i == 0)
      {
        bestMatch = 0;
        bestMatchScore = friendDifference;
      }
      else
      {
        if(friendDifference < bestMatchScore)
        {
          bestMatch = i;
          bestMatchScore = friendDifference;
        }
      }
    }

    friendsData.push(req.body);
    res.json(friendsData[bestMatch]);
  });

  function getDifference(val1, val2)
  {
    var num1 = parseInt(val1);
    var num2 = parseInt(val2);
    if(num1 > num2)
    {
      return num1 - num2;
    }
    else
    {
      return num2 - num1;
    }
  };
};