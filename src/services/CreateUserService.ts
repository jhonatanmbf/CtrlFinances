import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
  name: string;
  email: string;
  cpf: string;
  password: string;
}

class CreateUserService {
  async execute({name, email, cpf, password} : IUserRequest){
    const usersRepository = getCustomRepository(UsersRepositories);

    if(!email && cpf){
      throw new Error("Email and cpf incorrect");
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
      cpf
    })

    if(userAlreadyExists){
      throw new Error("User already exists")
    }

    const passwordHash = await hash(password, 8);

    const user =  usersRepository.create({
      name,
      email,
      cpf,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export {CreateUserService};
