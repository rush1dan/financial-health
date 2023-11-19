import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Financial Health',
	description: 'Financial health indicator app',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	)
}
