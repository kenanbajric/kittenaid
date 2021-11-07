// my imports 
const AidReqPost = require('../models/aid-request.js');
const User = require('../models/user.js');

exports.createReqPost = async (req, res, next) => {
    const userId = req.userId;
    const reqTitle = req.body.title;
    const reqText = req.body.text;
    // const photo = ... upload slike za post

    const aidReqPost = new AidReqPost({
        title: reqTitle,
        text: reqText,
        creator: userId
    });
    
    try {
        await aidReqPost.save();
        const user = await User.findById(userId);
        res.status(201).json({
            message: 'Aid request post created successufully',
            aidReqPost: aidReqPost,
            creator: { _id: user._id, name: user.name }
        })
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}

exports.adminGetReqPosts = async (req, res, next) => {
    try {
        const posts = await AidReqPost.find(); //napraviti filter isFinished i sortirati po datumu
        res.status(201).json({
            message: 'Aid request fetched successufully',
            posts: posts,
        })
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}

exports.approveReq = async (req, res, next) => {
// admin odobrava zahtjev i upucuje na tacnu lokaciju vet. stanice (dodati geoLocation)
// i tada se request proslijedi stanici da ocekuju pacijenta

    const answer = req.body.answer;
    const reqId = req.params.reqId;
    
    try {
        const reqPost = await AidReqPost.findById(reqId);
        
        console.log(reqPost);

    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }

    // poslati 
}