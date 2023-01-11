/** @type {import('next').NextConfig} */
const nextConfig = {
	productionBrowserSourceMaps: true,
	images: {
		domains: ['localhost:3000'],
	  },
	
};

module.exports = nextConfig;
