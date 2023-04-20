const mongoose = require('mongoose');
const UserSchema = require('../schemas/userSchema');

// UserSchema를 기반으로 한 User Mongoose 모델 생성
const User = mongoose.model('users', UserSchema);

class UserModel {
    // 이메일을 사용하여 사용자를 찾기
    async findByEmail(email) {
        const user = await User.findOne({ email });
        return user;
    }

    // 사용자 ID를 사용하여 사용자 찾기
    async findByUserId(userId) {
        const user = await User.findOne({ _id: userId });
        return user;
    }

    // 사용자 정보를 사용하여 새로운 사용자를 생성
    async create(userInfo) {

        // 입력된 phoneNumber 값을 문자열로 변경해줍니다.
        userInfo.phoneNumber = String(userInfo.phoneNumber);

        const createdNewUser = await User.create(userInfo);
        return createdNewUser;
    }

    // 모든 사용자 검색
    async findAll() {
        const users = await User.find({});
        return users;
    }

    // 사용자 정보 업데이트
    async update({ userId, update }) {
        const filter = { _id: userId };
        const option = { returnOriginal: false };

        const updatedUser = await User.findOneAndUpdate(filter, update, option);
        return updatedUser;
    }
}

// UserModel 인스턴스 생성
const userModel = new UserModel();

// userModel 내보내기
module.exports = userModel;
