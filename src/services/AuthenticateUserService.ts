import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import {sign} from "jsonwebtoken";

interface IAuthenticateRequest{
  email: string;
  password: string;
}

class AuthenticateUserService{
  async execute({email, password} : IAuthenticateRequest){

    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      email
    });

    if(!user){
      throw new Error("Email/Password incorrect! ");
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      throw new Error("Email/Password incorrect!");
    }

    const token = sign({
      id:user.id,
      name:user.name
    }, "d3407e6692d6fdd9b365ae98178c7273", {
      subject: user.id,
      expiresIn:"1d"
    });

    return token;
  }
}

export {AuthenticateUserService};
