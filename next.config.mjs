/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'raw.githubusercontent.com',
            port: '',
            pathname: '/gustafer/pokedata/main/pokemon-gifs/*',
        },
        ]
    }
};

export default nextConfig;
