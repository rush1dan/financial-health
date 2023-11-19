import { connectToMongoDB, disconnectFromMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs/dist/bcrypt";
    
const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: { },
            async authorize(credentials, req) { 
                const { email, password } = credentials;

                try {
                    await connectToMongoDB();

                    const user = await User.findOne({ email });

                    if (!user) {
                        throw new Error("Not Registered");
                    }

                    const passwordsMatched = await bcrypt.compare(password, user.password);

                    if (!passwordsMatched) {
                        throw new Error("Incorrect Password");
                    }
                    
                    await disconnectFromMongoDB();

                    return user;
                } catch (error) {
                    console.error(error);
                    throw new Error(error.message);
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            token.accessToken = token.sub;
            if (user) {
                token.username = user.username;
                token.email = user.email;
                token.id = user._id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.accessToken = token.accessToken;
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.email = token.email;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    pages: {
        signIn: '/login',
    },
}

export default authOptions;