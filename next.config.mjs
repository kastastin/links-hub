/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "*.googleusercontent.com",
			},
			{
				hostname: "links-hub.s3.amazonaws.com",
			},
		],
	},
};

export default nextConfig;
