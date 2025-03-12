'use client'

import { Card, CardContent } from '@/components/ui/card'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import QRcode from 'react-qr-code'
import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	ArrowRight,
	CheckCircle,
	Copy,
	Download,
	Info,
} from 'lucide-react'
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from '@/components/ui/alert'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import ContactPerson from '@/components/contact-person'

const Page = () => {
	const { slug } = useParams()
	const router = useRouter()

	const [msg, setMsg] = useState<{
		status: string
		data?: string
		desc?: string
	}>({
		status: '',
		data: '',
		desc: '',
	})

	const [data, setData] = useState<{
		nama: string
		ibadah: string
		whatsapp: string
		link: string
		isVerified: boolean
	}>({
		nama: '',
		ibadah: '',
		whatsapp: '',
		link: '',
		isVerified: false,
	})

	const [loader, setLoader] = useState<boolean>(true)

	useEffect(() => {
		async function getUser() {
			try {
				const result = await axios.put(
					`${process.env.NEXT_PUBLIC_APP_URL}/api/user`,
					{
						id: slug,
					}
				)
				setLoader(false)
				setData(result.data)

				if (result.data.isVerified)
					setMsg({
						status: 'err',
						data: 'Maaf',
						desc: 'ID sudah terverifikasi',
					})
			} catch {
				setMsg({
					status: 'err',
					data: 'ID tidak ditemukan',
					desc: 'Periksa kembali link anda',
				})
			}
		}

		getUser()
	}, [slug])

	if (loader) {
		return (
			<div className='p-6'>
				<ContactPerson />
				<Card className='mx-auto max-w-sm'>
					<CardContent className='pt-6'>
						<div className='flex flex-col space-y-3'>
							<Skeleton className='aspect-square w-full rounded-xl' />
							<div className='space-y-2'>
								<Skeleton className='h-10 w-[200px]' />
								<Skeleton className='h-10 w-full' />
							</div>
							<div className='flex gap-x-2'>
								<Skeleton className='h-10 w-[250px]' />
								<Skeleton className='h-10 w-[250px]' />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}

	return (
		<div className='p-6 pb-20'>
			<ContactPerson />
			<Card className='mx-auto max-w-sm'>
				<CardContent className='pt-6 space-y-6'>
					<Image
						src='/logo.png'
						width={40}
						height={40}
						alt='logo'
						className='mx-auto w-auto h-auto'
					/>
					{msg.status !== '' ? (
						<div className='flex flex-col items-center justify-center gap-y-2'>
							{msg.status === 'success' ? (
								<CheckCircle className='w-12 h-12' />
							) : (
								msg.status === 'err' && <Info className='w-12 h-12' />
							)}
							<div className='text-center'>
								<h1 className='font-semibold text-xl'>{msg.data}</h1>
								<p>{msg.desc}</p>
							</div>
						</div>
					) : (
						<div className='space-y-3'>
							<div className='p-6 bg-neutral-50 border rounded-lg'>
								<QRcode
									className='w-full h-auto'
									value={data.link}
								/>
							</div>
							<div>
								<Label>Nama Lengkap</Label>
								<h1 className='font-semibold'>{data.nama}</h1>
							</div>
							<div>
								<Label>Ibadah</Label>
								<h1 className='font-semibold'>
									{data.ibadah === 'KU 1'
										? data.ibadah + ' : 16:30 - 17:25 WITA'
										: data.ibadah === 'KU 2'
										? data.ibadah + ' : 19:00 - 20:25 WITA'
										: data.ibadah === 'KU 3'
										? 'KU 1 : 08:30 - 10:00 WITA'
										: data.ibadah === 'KU 4'
										? 'KU 2 : 12:00 - 13:30 WITA'
										: data.ibadah === 'KU 5' &&
										  'KU 3 : 17:00 - 18:30 WITA'}
								</h1>
							</div>
							<div className='space-y-1'>
								<Label>Link</Label>
								<div className='flex gap-x-2'>
									<Input
										value={data.link.replace('/v/', '/id/')}
										disabled
									/>
									<Button
										size='icon'
										className='aspect-square'
										variant='outline'
										onClick={() => {
											window.navigator.clipboard.writeText(
												data.link.replace('/v/', '/id/')
											)
										}}>
										<Copy />
									</Button>
								</div>
							</div>
							<Alert>
								<Info className='h-4 w-4' />
								<AlertTitle className='font-semibold'>
									Informasi
								</AlertTitle>
								<AlertDescription>
									Jemaat Wajib untuk melakukan registrasi ulang saat
									ibadah. Mohon hadir 30 menit sebelum jam ibadah dan
									menunjukan kode QR diatas kepada petugas registrasi.
								</AlertDescription>
							</Alert>
							<div className='flex gap-x-2'>
								<Button
									variant='outline'
									className='w-full'
									onClick={() => {
										window.location.href = `https://api.whatsapp.com/send/?phone=${
											'62' + data.whatsapp.slice(1)
										}&text=Shalom, Berikut adalah kode QR anda tunjukan saat anda datang beribadah. Pastikan anda datang 30 menit sebelum ibadah dimulai.%0A${data.link.replace(
											'/v/',
											'/id/'
										)}`
									}}>
									Simpan <Download />
								</Button>
								<Button
									className='w-full'
									onClick={() => router.push('/')}>
									Daftar lagi <ArrowRight />
								</Button>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	)
}

export default Page
