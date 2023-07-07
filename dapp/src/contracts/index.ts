import { environment } from "../lib/constants";
import BlogContract from "./Blog";

export const blog = new BlogContract(environment.CONTRACTS.BLOG);
