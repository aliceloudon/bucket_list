var MongoClient = require("mongodb").MongoClient
var ObjectID = require("mongodb").ObjectID

var CountryQuery = function(){
  this.url = "mongodb://localhost:27017/bucket_list"
}

CountryQuery.prototype = {

  all: function(onQueryFinished){
    MongoClient.connect(this.url,function(err,db){
      if(db){
        var collection = db.collection("countries")
        collection.find().toArray(function(err,docs){
          onQueryFinished(docs)
        })
      }
    })
  },

  show: function(id, onQueryFinished){
    MongoClient.connect(this.url,function(err,db){
      if(db){
        var collection = db.collection("countries")
        collection.find( { _id: ObjectID(id) } ).toArray(function(err,docs){
          onQueryFinished(docs)
        })
      }
    })
  },

  add: function(countryToAdd,onQueryFinished){
    MongoClient.connect(this.url,function(err,db){
      if(db){
        var collection = db.collection("countries")
        collection.insert(countryToAdd)
        collection.find().toArray(function(err,docs){
          onQueryFinished(docs)
        })
        }
      })
  },

  update: function(id,newName,onQueryFinished){
    MongoClient.connect(this.url,function(err,db){
      if(db){
        var collection = db.collection("countries")
        collection.updateOne( { _id: ObjectID(id) } , {$set: {name: newName}})
        collection.find().toArray(function(err,docs){
          onQueryFinished(docs)
        })
      }
    })
  },

  delete: function(id, onQueryFinished){
    MongoClient.connect(this.url,function(err,db){
      if(db){
        var collection = db.collection("countries")
        collection.deleteOne( { _id: ObjectID(id) } )
        collection.find().toArray(function(err,docs){
          onQueryFinished(docs)
        })
      }
    })
  }

}

module.exports = CountryQuery