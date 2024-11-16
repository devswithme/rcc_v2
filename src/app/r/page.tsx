'use client'

import ContactPerson from '@/components/contact-person'
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
import {
	RadioGroup,
	RadioGroupItem,
} from '@/components/ui/radio-group'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { formSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const Page = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nama: '',
			whatsapp: '',
			usia: '',
			alamat: '',
			komsel: 'sudah',
			GKK: '',
			KK: 'rcc',
			link: '',
		},
	})

	const router = useRouter()

	const [quota, setQuota] = useState<{
		KU1: number
		KU2: number
		KU3: number
	}>({
		KU1: 0,
		KU2: 0,
		KU3: 0,
	})

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [loader, setLoader] = useState<boolean>(true)

	useEffect(() => {
		async function getQuota() {
			try {
				const result = await axios.get(
					'https://rccdenpasar.org/api/quota'
				)

				const {KU1, KU2, KU3} = result.data

				if(KU1 === 0 && KU2 === 0 && KU3 === 0){
					alert('Maaf kuota sudah penuh')
				} else {
					setQuota(result.data)
					setLoader(false)
				}
			} catch {
				alert('terjadi kesalahan')
			}
		}
		getQuota()
	}, [])

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			setIsLoading(true)
			const result = await axios.post(
				'https://rccdenpasar.org/api/user',
				values
			)

			if(result.status === 200){
				alert('Maaf mohon mengulang mengisi data')
			} else {
				router.push(`/id/${result.data.id}`)
				form.reset()
				// setIsLoading(false)
			}
		} catch {
			alert('terjadi kesalahan')
		}
	}

	if (loader)
		return (
		<div className='p-6'>
			<ContactPerson />
			<Card className='mx-auto max-w-sm'>
				<CardContent className='pt-6'>
					<div className='space-y-3'>
						<div className='space-y-2'>
							<Skeleton className='h-8 w-[100px]' />
							<Skeleton className='h-10 w-full' />
						</div>
						<div className='space-y-2'>
							<Skeleton className='h-8 w-[100px]' />
							<Skeleton className='h-10 w-full' />
						</div>
						<div className='space-y-2'>
							<Skeleton className='h-8 w-[100px]' />
							<Skeleton className='h-10 w-full' />
						</div>
						<Skeleton className='w-full h-10' />
					</div>
				</CardContent>
			</Card>
		</div>
		)

	return (
		<div className='p-6 pb-20'>
			<ContactPerson />
		<Card className='max-w-sm mx-auto'>
			<CardContent className='space-y-3 pt-6'>
				<Image
					src='/logo.png'
					width={40}
					height={40}
					alt='logo'
					className='mx-auto w-auto h-auto'
				/>
				<div className='text-center text-[#871d39] space-y-1'>
					<h1 className='text-xl font-semibold text-balance leading-tight'>
						Formulir Registrasi Online Ibadah Natal RCC
					</h1>
					<p className='text-sm'>* Wajib dilengkapi</p>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-3'>
						<FormField
							control={form.control}
							name='ibadah'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='font-semibold'>
										<span className='font-mono text-xs font-light'>
											[1]
										</span>{' '}
										Ibadah *
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Pilih ibadah' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{quota.KU1 > 0 && (
												<SelectItem value='KU 1'>
													KU 1 - 08:30 WITA{' '}
													<span className='font-semibold'>
														(Sisa kuota: {quota.KU1} orang)
													</span>
												</SelectItem>
											)}
											{quota.KU2 > 0 && (
												<SelectItem value='KU 2'>
													KU 2 - 12:00 WITA{' '}
													<span className='font-semibold'>
														(Sisa kuota: {quota.KU2} orang)
													</span>
												</SelectItem>
											)}
											{quota.KU3 > 0 && (
												<SelectItem value='KU 3'>
													KU 3 - 16:00 WITA{' '}
													<span className='font-semibold'>
														(Sisa kuota: {quota.KU3} orang)
													</span>
												</SelectItem>
											)}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='nama'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='font-semibold'>
										<span className='font-mono text-xs font-light'>
											[2]
										</span>{' '}
										Nama Lengkap *
									</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='whatsapp'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='font-semibold'>
										<span className='font-mono text-xs font-light'>
											[3]
										</span>{' '}
										Nomor Whatsapp *
									</FormLabel>
									<FormControl>
										<Input {...field} type='tel' placeholder='08'/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='usia'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='font-semibold'>
										<span className='font-mono text-xs font-light'>
											[4]
										</span>{' '}
										Usia *
									</FormLabel>
									<FormControl>
										<Input
											type='number'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='alamat'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='font-semibold'>
										<span className='font-mono text-xs font-light'>
											[5]
										</span>{' '}
										Alamat Lengkap *
									</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='komsel'
							render={({ field }) => (
								<FormItem className='space-y-3'>
									<FormLabel className='font-semibold'>
										<span className='font-mono text-xs font-light'>
											[6]
										</span>{' '}
										Sudah berkomsel? *
									</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className='flex gap-x-3'>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='sudah' />
												</FormControl>
												<FormLabel className='font-normal'>
													Sudah
												</FormLabel>
											</FormItem>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='belum' />
												</FormControl>
												<FormLabel className='font-normal'>
													Belum
												</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
								</FormItem>
							)}
						/>
						{form.getValues('komsel') === 'sudah' && (
							<>
								<FormField
									control={form.control}
									name='GKK'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='font-semibold'>
												<span className='font-mono text-xs font-light'>
													[7]
												</span>{' '}
												Nama GKK *
											</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='KK'
									className='hidden'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='font-semibold'>
												<span className='font-mono text-xs font-light'>
													[8]
												</span>{' '}
												Nama KK *
											</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
							</>
						)}
						<Button
							type='submit'
							className='w-full !mt-10'
							disabled={isLoading}>
							{!isLoading ? (
								<>
									Kirim Sekarang <ArrowUpRight />
								</>
							) : (
								<>
									Mohon Tunggu <Loader2 className='animate-spin' />
								</>
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
		</div>
	)
}

export default Page
