// Stand in template file for the GitHub repository to keep API key out of the repo
// Copy to environment and environment.prod, then replace the placeholder with the actual API key.

export const environment = {
    production: false,
    tmdbApiKey: 'KEY_HERE'
}