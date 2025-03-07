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
				{/* <CardHeader className='relative aspect-square'>
					<Image
						src='/cover.jpg'
						alt='home'
						fill
						className='object-cover object-top'
						priority
						sizes='20'
					/>
				</CardHeader> */}
				<CardContent className='space-y-3 pt-6'>
					<h1 className='text-2xl font-bold text-balance leading-tight mb-8'>
						The power of His Resurrection
					</h1>

					<div className='text-[#10133a] space-y-1 flex justify-between'>
						<h1 className='text-md font-semibold text-balance leading-tight'>
							<span className='font-mono text-xs font-light mr-1'>
								[1]
							</span>
							Jumat Agung
						</h1>
						<p className='text-xs'>18 April 2025</p>
					</div>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Ibadah</TableHead>
								<TableHead>Jam</TableHead>
								{/* <TableHead className='text-right'>
									Pembicara
								</TableHead> */}
							</TableRow>
						</TableHeader>
						<TableBody>
							{[
								{
									jam: '16:00 - 17:25 WITA',
									pembicara: 'Pdt. David Limanto',
								},
								{
									jam: '19:00 - 20:25 WITA',
									pembicara: 'Pdp. Immanuel Ricco',
								},
							].map((item, i) => (
								<TableRow key={i}>
									<TableCell className='font-medium'>{`KU ${
										i + 1
									}`}</TableCell>
									<TableCell>{item.jam}</TableCell>
									{/* <TableCell className='text-right'>
										{item.pembicara}
									</TableCell> */}
								</TableRow>
							))}
						</TableBody>
					</Table>
					<div className='text-[#10133a] space-y-1 flex justify-between'>
						<h1 className='text-md font-semibold text-balance leading-tight'>
							<span className='font-mono text-xs font-light mr-1'>
								[2]
							</span>
							Paskah
						</h1>
						<p className='text-xs'>20 April 2025</p>
					</div>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Ibadah</TableHead>
								<TableHead>Jam</TableHead>
								{/* <TableHead className='text-right'>
									Pembicara
								</TableHead> */}
							</TableRow>
						</TableHeader>
						<TableBody>
							{[
								{
									jam: '08:30 - 10:00 WITA',
									// pembicara: 'Pdt. David Limanto',
								},
								{
									jam: '12:00 - 13:30 WITA',
									// pembicara: 'Pdp. Immanuel Ricco',
								},
								{
									jam: '17:00 - 18:30 WITA',
									// pembicara: 'Pdp. Immanuel Ricco',
								},
							].map((item, i) => (
								<TableRow key={i}>
									<TableCell className='font-medium'>{`KU ${
										i + 1
									}`}</TableCell>
									<TableCell>{item.jam}</TableCell>
									{/* <TableCell className='text-right'>
										{item.pembicara}
									</TableCell> */}
								</TableRow>
							))}
						</TableBody>
					</Table>
					<div className='flex gap-x-3'>
						<Button
							className='w-full !mt-3'
							onClick={() => router.push('/r?q=j')}>
							Jumat Agung <ArrowUpRight />
						</Button>
						<Button
							className='w-full !mt-3'
							onClick={() => router.push('/r?q=p')}>
							Paskah <ArrowUpRight />
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
