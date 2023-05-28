export const GOOGLE_CLIENT_ID =
    '940998776447-oee711om5d818g4a0ats6osvhlrf079i.apps.googleusercontent.com';
export const googleLoginConfig = {
    usePKCE: false,
    clientId: GOOGLE_CLIENT_ID,
    redirectUrl: 'https://flow-backend.herokuapp.com/auth/google-redirect',
    scopes: ['email', 'profile'],
    issuer: 'https://accounts.google.com',
    connectionTimeoutSeconds: 5,
    warmAndPrefetchChrome: true,
};

export const FACEBOOK_CLIENT_ID = "760112739095608"

export const facebookLoginConfig = {
    usePKCE: false,
    clientId: FACEBOOK_CLIENT_ID,
    redirectUrl: 'https://flow-backend.herokuapp.com/auth/facebook-redirect',
    scopes: ['public_profile', 'user_birthday', 'email'],
    issuer: 'https://www.facebook.com',
    connectionTimeoutSeconds: 5,
    warmAndPrefetchChrome: true,
}