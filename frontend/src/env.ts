export const env = {
    isProd     : process.env.NODE_ENV === 'production',
    isDev      : process.env.NODE_ENV !== 'production',
    apiBaseUrl : process.env.REACT_APP_API_BASE_URL
}

console.log( env );
