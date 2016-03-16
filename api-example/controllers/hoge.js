var pg = require('pg');


exports.postHoge = function(req, res) {
  console.log(req.body.name);
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      res.status(500).json({ success: false, data: err});
    }
    else {
      client.query("INSERT INTO hoge (name, catchphrase) values($1, $2)", [req.body.name, req.body.catchphrase]);
      done();
      res.json({"message":"success", "result":{"name":req.body.name, "catchphrase":req.body.catchphrase}});
    }
  });
};

exports.getHoges = function(req, res) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      res.status(500).json({ success: false, data: err});
    }
    var results = [];
    var query = client.query("SELECT * FROM hoge");

    query.on('row', function(row) {
        results.push(row);
    });
    query.on('end', function() {
        done();
        res.json({"message":"success", "results":results});
    });
  });
};

exports.getHoge = function(req, res) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      res.status(500).json({ success: false, data: err});
    }
    var hoge = {};
    var query = client.query("SELECT * FROM hoge WHERE id=$1", req.params.hoge_id);

    query.on('row', function(row) {
        hoge = row;
    });
    query.on('end', function() {
        done();
        res.json({"message":"success", "result":hoge});
    });
  });
};

exports.updateHoge = function(req, res) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      res.status(500).json({ success: false, data: err});
    }
    else {
      client.query("UPDATE hoge SET name=$1, catchphrase=$2 WHERE id=$3", [req.body.name, req.body.catchphrase, req.params.hoge_id]);
      var query = client.query("SELECT * FROM hoge WHERE id=$1", req.params.hoge_id);

      var hoge = {};
      query.on('row', function(row) {
          hoge = row;
      });
      query.on('end', function() {
        done();
        res.json({"message":"success", "result":hoge});
      });
    }
  });
}
exports.deleteHoge = function(req, res) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      res.status(500).json({ success: false, data: err});
    }
    else {
      client.query("DELETE FROM hoge WHERE id=$1", req.params.hoge_id);
      done();
      res.json({"message":"success", "result":{"deleted_id":req.params.hoge_id}});
    }
  });
}