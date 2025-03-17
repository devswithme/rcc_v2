'use client'

import ContactPerson from '@/components/contact-person'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { ArrowUpRight } from 'lucide-react'
// import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
	const router = useRouter()
	return (
		<div className='p-6 pb-20'>
			<ContactPerson />
			<Card className='mx-auto max-w-sm overflow-hidden border-none'>
				<CardHeader className='relative aspect-square bg-neutral-200'>
					{/* <Image
						src='/cover.jpg'
						alt='home'
						fill
						className='object-cover object-top'
						priority
						sizes='20'
					/> */}
				</CardHeader>
				<CardContent className='space-y-3 pt-6'>
					<div className='text-center text-[#10133a] space-y-1'>
						<h1 className='text-xl font-semibold text-balance leading-tight'>
							The Power Of His Resurrection
						</h1>
						<p className='text-sm'>Jadwal Ibadah Jumat Agung dan Paskah RCC</p>
					</div>
					<Table className="w-full">
						<TableHeader>
							<TableRow>
							<TableHead className="w-1/3 min-w-[150px]">Ibadah</TableHead>
							<TableHead className="w-1/3 min-w-[200px] text-center">
								Waktu
							</TableHead>
							<TableHead className="w-1/3 min-w-[250px] text-right">
								Pembicara
							</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{[
							{ ibadah: "Jumat Agung", jam: "18 April 2025", pembicara: "" },
							{ ibadah: "KU 1", jam: "16:00 WITA", pembicara: "Pdt. David Limanto" },
							{ ibadah: "KU 2", jam: "19:00 WITA", pembicara: "Pdt. Ronny DS" },
							{ ibadah: "Paskah", jam: "20 April 2025", pembicara: "" },
							{ ibadah: "KU 1", jam: "08:30 WITA", pembicara: "Pdt. Eluzai Frengky Utana" },
							{ ibadah: "KU 2", jam: "12:00 WITA", pembicara: "Pdm. Immanuel Ricco" },
							{ ibadah: "KU 3", jam: "17:00 WITA", pembicara: "Pdt. David Limanto" },
							].map((item, i) => (
							<TableRow
								key={i}
								className={`${
								(item.ibadah === "Jumat Agung" || item.ibadah === "Paskah") &&
								"bg-neutral-50"
								}`}>
								<TableCell
								className={`whitespace-nowrap ${
									item.ibadah === "Jumat Agung" || item.ibadah === "Paskah"
									? "font-semibold"
									: "font-medium"
								}`}>
								{item.ibadah}
								</TableCell>
								<TableCell
								className={`text-center whitespace-nowrap ${
									item.ibadah === "Jumat Agung" || item.ibadah === "Paskah"
									? "font-semibold"
									: "font-medium"
								}`}>
								{item.jam}
								</TableCell>
								<TableCell className="text-right whitespace-nowrap">
								{item.pembicara}
								</TableCell>
							</TableRow>
							))}
						</TableBody>
					</Table>

					<Button
						className='w-full !mt-10'
						onClick={() => router.push('/r')}>
						Daftar Sekarang <ArrowUpRight />
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}
