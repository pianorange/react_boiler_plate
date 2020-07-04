const express = require('express')
const app = express()
const port = 5000
const config = require('./config/key')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const { auth } = require('./middleware/auth')
const { User } = require('./models/User')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected....'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/api/users/register',(req, res)=>{

    //회원 가입 할때 필요한 정보들을 client 에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.

    //body-parser 가 model 에 req.body 바로 맵핑해줌
    const user = new User(req.body);

    //MongoDB 모델객체가 가진 save메소드
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})


app.post('/api/users/login', (req, res) => {
    //요청된 이메일 DB에서 검색
    User.findOne({ email: req.body.email}, (err, user)=>{
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다"
            })
        }

        //요청된 이메일이 db에 있다면 Pw 확인
        user.comparePassword(req.body.password, ( err, isMatch ) => {
            if(!isMatch)
                return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다"})
            
            //비밀번호까지 맞다면 토큰 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지,세션 등
                //여기선 cookie 에 넣는다
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id})
            }) 
        })
    })
})



app.get('/api/users/auth', auth, (req, res)=>{
//여기까지 미들웨어(auth.js 여기선 auth) 통과해 왔다는 건 인증 true라는뜻
//바로 인증 통과정보 제공 
//role 0 일반유저 role 1 admin  이런식으로 준다고 가정하고 일단 0
  res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image
  })
})

//logout login된 상태일테니 auth 같이 넣어줌
app.get('/api/users/logout', auth,(req, res) => {
    User.findOneAndUpdate({ _id: req.user._id}
        , {token:""}
        , (err, user) => {
            if(err) return res.json({success: false, err});
            return res.status(200).send({
                success: true
            })
        })
})

    //요청된 이메일 존재하면 PW 확인
    //문제없으면 토큰 생성
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))