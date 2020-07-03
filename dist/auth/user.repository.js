"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async signUp(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const user = new user_entity_1.User();
        const salt = await bcrypt.genSalt();
        user.username = username;
        user.password = await this.hashPassword(password, salt);
        user.salt = salt;
        try {
            await user.save();
        }
        catch (error) {
            console.log(error.code);
        }
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
    signIn(authCredentialsDto) {
        return this.validateUserPassword(authCredentialsDto);
    }
    async validateUserPassword(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username });
        const hashed = await this.hashPassword(password, user.salt);
        if (user.password === hashed) {
            return username;
        }
        else {
            return "no";
        }
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map