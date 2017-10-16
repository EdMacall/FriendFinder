var friendsData = require("../data/friends");

module.exports = function(app)
{
  app.get("/api/friends", function(req, res)
  {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res)
  {
    var bestMatchIndex = 0;
    var bestMatchScore = 100;
    var friendsDifference = [];
    var friendDifference = 0;

    var userData = req.body;

    for(var i = 0; i < friendsData.length; i++)
    {
      friendDifference = 0;
      for(var j = 0; j < 10; j++)
      {
        friendDifference += getDifference(friendsData[i].scores[j], userData.scores[j]);
      }
      friendsDifference.push(friendDifference);
      if(i == 0)
      {
        bestMatchIndex = 0;
        bestMatchScore = friendDifference;
      }
      else
      {
        if(friendDifference < bestMatchScore)
        {
          bestMatchIndex = i;
          bestMatchScore = friendDifference;
        }
      }
    }

    var bestMatch = 
    {
      name: friendsData[bestMatchIndex].name,
      photo: friendsData[bestMatchIndex].photo,
      friendDifference: ((40.0 - bestMatchScore) * 2.5)
    };

    friendsData.push(userData);
    res.json(bestMatch);
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