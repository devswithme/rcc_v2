'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { pinSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { ArrowUpRight, CheckCircle, Info } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const Page = () => {
	const { slug } = useParams()

	const [msg, setMsg] = useState<{
		status: string
		data?: string
		desc?: string
	}>({
		status: '',
		data: '',
		desc: '',
	})

	const [loader, setLoader] = useState<boolean>(true)

	useEffect(() => {
		async function getData() {
			try {
				const result = await axios.put(
					'https://rccdenpasar.org/api/user',
					{
						id: slug,
					}
				)
				setLoader(false)
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
		getData()
	}, [slug])

	const form = useForm<z.infer<typeof pinSchema>>({
		resolver: zodResolver(pinSchema),
		defaultValues: {
			PIN: '',
		},
	})

	async function onSubmit(value: z.infer<typeof pinSchema>) {
		if (value.PIN === process.env.NEXT_PUBLIC_PIN) {
			await axios.patch('https://rccdenpasar.org/api/user', {
				id: slug,
			})
			setMsg({
				status: 'success',
				data: 'Berhasil diverifikasi',
				desc: 'Selamat beribadah',
			})

			form.reset()
		}
	}

	if (loader) {
		return (
			<Card className='mx-auto max-w-sm'>
				<CardContent className='pt-6'>
					<div className='space-y-3'>
						<div className='space-y-2'>
							<Skeleton className='h-8 w-[100px]' />
							<Skeleton className='h-10 w-full' />
						</div>
						<Skeleton className='w-full h-10' />
					</div>
				</CardContent>
			</Card>
		)
	}

	return (
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
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-3'>
							<FormField
								control={form.control}
								name='PIN'
								render={({ field }) => (
									<FormItem>
										<FormLabel>PIN</FormLabel>
										<FormControl>
											<Input
												type='password'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								type='submit'
								className='w-full !mt-10'>
								Verify <ArrowUpRight />
							</Button>
						</form>
					</Form>
				)}
			</CardContent>
		</Card>
	)
}

export default Page
