'use client'

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
		<Card className='mx-auto max-w-sm overflow-hidden border-none'>
			<CardHeader className='relative aspect-square'>
				<Image
					src='/home.jpg'
					alt='home'
					fill
					priority
					sizes='20'
				/>
			</CardHeader>
			<CardContent className='space-y-3'>
				<div className='text-center text-[#871d39] space-y-1'>
					<h1 className='text-xl font-semibold text-balance leading-tight'>
						Jadwal Ibadah Natal RCC
					</h1>
					<p className='text-sm'>22 Desember 2024</p>
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Ibadah</TableHead>
							<TableHead className='text-center'>Jam</TableHead>
							<TableHead className='text-right'>Pembicara</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{[
							{
								jam: '8:30 WITA',
								pembicara: 'Pdt. David Limanto',
							},
							{
								jam: '12:00 WITA',
								pembicara: 'Pdt. David Limanto',
							},
							{
								jam: '16:00 WITA',
								pembicara: 'Pdt. David Limanto',
							},
						].map((item, i) => (
							<TableRow key={i}>
								<TableCell className='font-medium'>{`KU ${
									i + 1
								}`}</TableCell>
								<TableCell className='text-center'>
									{item.jam}
								</TableCell>
								<TableCell className='text-right'>
									{item.pembicara}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<Button
					className='w-full !mt-10'
					onClick={() => router.push('/r')}>
					Daftar sekarang <ArrowUpRight />
				</Button>
			</CardContent>
		</Card>
	)
}
