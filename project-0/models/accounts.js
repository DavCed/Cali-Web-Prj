const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const accSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Minimum length is 8 characters']
    }
});

accSchema.pre('save', async(next) => {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

accSchema.statics.login = async (username, password) => {
    const acc = await this.findOne(this.username);
    if(acc){
        const unHash = await bcrypt.compare(this.password, acc.password);
        if(unHash){
            return acc;
        } else {
            throw Error('Incorrect password');
        }
    } else {
        throw Error('Incorrect username');
    }
}

const Account = mongoose.model('account', accSchema);
module.exports = Account;