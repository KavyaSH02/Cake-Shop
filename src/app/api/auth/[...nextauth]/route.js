import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login'
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        try {
          const response = await fetch('http://127.0.0.1:5000/api/auth/google-signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token: account.id_token,
            }),
          })

          const data = await response.json()
          
          if (response.ok) {
            user.backendToken = data.token
            user.userData = data.user
            return true
          }
        } catch (error) {
          console.error('Google sign-in error:', error)
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user?.backendToken) {
        token.backendToken = user.backendToken
        token.userData = user.userData
      }
      return token
    },
    async session({ session, token }) {
      session.backendToken = token.backendToken
      session.userData = token.userData
      return session
    }
  }
})

export { handler as GET, handler as POST }