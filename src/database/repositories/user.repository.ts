import { dataSource } from "..";
import { User } from "../entities";

export const userRepository = dataSource.getRepository(User);
