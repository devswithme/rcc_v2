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
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
	const router = useRouter()
	return (
		<div className='p-6 pb-20'>
			<ContactPerson />
			<Card className='mx-auto max-w-sm overflow-hidden border-none'>
				<CardHeader className='relative aspect-square'>
					<Image
						src='/cover-web.jpg'
						alt='home'
						fill
						className='object-cover object-top'
						priority
						sizes='20'
					/>
				</CardHeader>
				<CardContent className='space-y-3 pt-6'>
					<div className='text-center text-[#10133a] space-y-1'>
						<h1 className='text-xl font-semibold text-balance leading-tight'>
						Jadwal Ibadah Jumat Agung dan Paskah RCC
						</h1>
						<p className='text-sm'>18 & 20April 2025</p>
					</div>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Ibadah</TableHead>
								<TableHead>Waktu</TableHead>
								<TableHead>
									Pembicara
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{[
								{
									ibadah: 'Jumat Agung',
									jam: '18 April 2025',
									pembicara: '',
								},
								{
									ibadah: 'KU 1',
									jam: '16:00 WITA',
									pembicara: 'Pdt. David Limanto',
								},
								{
									ibadah: 'KU 2',
									jam: '19:00 WITA',
									pembicara: 'Pdt. Ronny DS',
								},
								{
									ibadah: 'Paskah',
									jam: '20 April 2025',
									pembicara: '',
								},
								{
									ibadah: 'KU 1',
									jam: '08:30 WITA',
									pembicara: 'Pdt. Eluzai Frengky Utana',
								},
								{
									ibadah: 'KU 2',
									jam: '12:00 WITA',
									pembicara: 'Pdm. Immanuel Ricco',
								},
								{
									ibadah: 'KU 3',
									jam: '17:00 WITA',
									pembicara: 'Pdt. David Limanto',
								},
							].map((item, i) => (
								<TableRow
									key={i}
									className={`${
										(item.ibadah === 'Jumat Agung' ||
											item.ibadah === 'Paskah') &&
										'bg-neutral-50'
									}`}>
									<TableCell
										className={`${
											item.ibadah === 'Jumat Agung' ||
											item.ibadah === 'Paskah'
												? 'font-semibold'
												: 'font-medium'
										}`}>
										{item.ibadah}
									</TableCell>
									<TableCell
										className={`${
											item.ibadah === 'Jumat Agung' ||
											item.ibadah === 'Paskah'
												? 'font-semibold'
												: 'font-medium'
										}`}>
										{item.jam}
									</TableCell>
									<TableCell>
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
