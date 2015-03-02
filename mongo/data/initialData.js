db.fieldtype.remove({});
db.fieldtype.insert(
    {
        "_id": new ObjectId().valueOf(),
        "name": "text"
    });
db.fieldtype.insert({
    "_id": new ObjectId().valueOf(),
    "name": "image"
});
db.fieldtype.insert({
    "_id": new ObjectId().valueOf(),
    "name": "link"
});
db.fieldtype.insert({
    "_id": new ObjectId().valueOf(),
    "name": "content"
});
db.fieldtype.insert({
    "_id": new ObjectId().valueOf(),
    "name": "video"
});
db.fieldtype.insert({
    "_id": new ObjectId().valueOf(),
    "name": "markdown"
});