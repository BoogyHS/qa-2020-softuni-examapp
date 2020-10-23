module.exports = {
    development: {
        port: process.env.PORT || 5555,
        dbPath: "mongodb+srv://boogy:softuni@softuni-qa-2020.xdr1u.mongodb.net/SoftUni-QA-2020?retryWrites=true&w=majority"
        // dbPath: "mongodb://localhost:27017/qa-2020"
    },
    production: {
        port: process.env.PORT || 5555,
        dbPath: "mongodb+srv://boogy:softuni@softuni-qa-2020.xdr1u.mongodb.net/<dbname>?retryWrites=true&w=majority"
    }
};
