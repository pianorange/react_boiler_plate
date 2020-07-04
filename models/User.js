const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    firstname: {
        type: String,
        maxlength: 50
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//mongodb schema 데이터를 model 에 반영하기 전에 전처리
userSchema.pre('save', function( next ){
    var user = this;

    //pre는 모델에 값 반영하기전에 무조건 실행되므로
    //password항목이 변경됬을때로 한정
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            //plain pw, 생성된 salt, 후처리 콜백function
            bcrypt.hash(user.password, salt, function(err, hash){
                //실패했으면 그냥 다음처리로 
                if(err) return next(err)
                //성공이면 password에 hash 설정
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {

    //plainPassword 암호화해서 DB저장된 암호화된 비밀번호 비교 필요
    //->복호화 불가능 해서. 
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function (cb) {
    
    console.log("generateToken");
    var user = this;

    //jsonwebtoken을 이용해서 토큰 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null,user)
    })
}


//Schema 를 Model로 Wrap한다(mongoose.model 메소드로 모델 생성)
const User = mongoose.model('User', userSchema);
//다른곳에서 참조 가능하게 model export 
module.exports = { User }