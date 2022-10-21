import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "src/typeorm";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "datlinh1"
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;
        const user = await User.findOne({ where: { email } })
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}