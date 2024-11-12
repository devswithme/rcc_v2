import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
	try {
		const request = await req.json()

		const result = await db.user.create({
			data: request,
			select: { id: true, ibadah: true },
		})

		await db.user.update({
			where: {
				id: result.id,
			},
			data: { link: `https://rccdenpasar.org/id/${result.id}` },
		})

		const quota = await db.quota.findMany()

		await db.quota.update({
			where: { id: 1 },
			data: {
				[result.ibadah.replaceAll(' ', '')]:
				// @ts-expect-error test
					quota[0][result.ibadah.replaceAll(' ', '')] - 1,
			},
		})

		return NextResponse.json(result, { status: 201 })
	} catch (err) {
		return NextResponse.json(err, { status: 500 })
	}
}

export async function PUT(req: Request) {
	try {
		const request = await req.json()

		const result = await db.user.findUnique({
			where: { id: request.id },
			select: {
				link: true,
				nama: true,
				ibadah: true,
				whatsapp: true,
				isVerified: true,
			},
		})

		return NextResponse.json(result, { status: 200 })
	} catch (err) {
		return NextResponse.json(err, { status: 500 })
	}
}

export async function PATCH(req: Request) {
	try {
		const request = await req.json()

		await db.user.update({
			where: { id: request.id },
			data: { isVerified: true },
		})

		return NextResponse.json({ status: 200 })
	} catch (err) {
		return NextResponse.json(err, { status: 500 })
	}
}
