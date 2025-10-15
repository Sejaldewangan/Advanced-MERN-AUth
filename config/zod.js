import z from "zod";

export const registerSchema = z.object({
    name: z.string().min(3,"too short name"),
    email: z.string().email("invalid emali"),
    password:z.string().min(8,"make a long password")
})