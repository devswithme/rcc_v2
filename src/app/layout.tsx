import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const font = Manrope({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '700'],
})
export const metadata: Metadata = {
	icons: {
		icon: {
			url: '/logo.png',
			sizes: '16x16',
			type: 'image/png',
		},
	},
	title: 'The Power Of His Resurrection - Ibadah Jumat Agung dan Paskah',
	description: 'Jadwal Ibadah Jumat Agung dan Paskah RCC',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${font.className} antialiased bg-[#824405] relative`}>
				{children}
			</body>
		</html>
	)
}
