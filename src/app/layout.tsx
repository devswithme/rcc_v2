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
			type: 'image/png'
		}
	},
	title: 'SON OF MAN - Christmas Celebration 2024',
	description: 'Formulir Registrasi Online Ibadah Natal RCC',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${font.className} antialiased bg-[#871d39] relative`}>
				{children}
			</body>
		</html>
	)
}
