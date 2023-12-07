import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: { label: "Username", type: "text", placeholder: "AcHRaF && AkRam" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {

        const user = {
          id: "1",
          username: "admin",
          password: process.env.AUTH_PASSWORD as string
        }

        // If no error and we have user data, return it
        if (user.username === credentials?.username && user.password === credentials.password) {
          return user
        }

        return null

      }
    })
  ],
})

export { handler as GET, handler as POST }