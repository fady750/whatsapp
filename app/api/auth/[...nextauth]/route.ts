import NextAuth from "next-auth"
import { authOptions } from "@/app/_lib/nextAuth"


const {handlers} = NextAuth(authOptions);

// export {handlers as GET, handlers as POST};
const {GET, POST} = handlers
export {GET, POST}

// export {GET, POST} from "@/app/_lib/auth"
