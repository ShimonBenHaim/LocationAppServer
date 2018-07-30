const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    location:{lat: Number, lng: Number},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true}
    // participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}]
});

module.exports = mongoose.model('Event', eventSchema);

// {"publicKey":"BEdhwFSa8aLPW5AkBewRIciHLbx3TTfGVSA2l_SgmwFA2hzb4_6Tv3XSFJ5v3n9Y4YttHPQPxqUDKxLw3bkp7PA","privateKey":"iEETi3t8_KYIsFj-vDyrajtY86VaNApNuOjb1kaI8UI"}
