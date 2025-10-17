const {model, Schema} = require('mongoose');
const {isEmail} = require('validator');
const {encryptPassword, checkPassword} = require('../../bcrypt');
const { generateToken } = require('../utils/jwt');  // Add this import

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        unique: true,  // This creates an index automatically
        lowercase: true,
        validate: [isEmail, 'Invalid email format']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minlength: [8, 'Password must be at least 8 characters'],
        validate: {
            validator: function(pass) {
                return !pass.toLowerCase().includes('password');
            },
            message: 'Password should not contain the word "password"'
        }
    },
    role: {
        type: String,
        enum: ['user','librarian'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

userSchema.pre('save',async function(next){
    const user = this ;
    if(user.modifiedPaths().includes('password')){
        user.password = await encryptPassword(user.password);
    }
    next();
})

//Autherization method
userSchema.statics.findByEmailAndPasswordForAuth = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Invalid login credentials");
  }
  const isMatch = await checkPassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid login credentials");
  }
  return user;
};

userSchema.methods.generateToken = async function(){
    const user = this;
    const token = generateToken(user);
    user.tokens.push({token});
    await user.save();
    return token;
}
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

const User = model('User', userSchema);

module.exports = User;