import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	env: {
		PIN: process.env.PIN,
	},
}

export default nextConfig
