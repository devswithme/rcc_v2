import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
	try {
		const result = await db.quota.findFirst({
			where: { id: 1 },
		})

		return NextResponse.json(result, { status: 200 })
	} catch (err) {
		return NextResponse.json(err, { status: 500 })
	}
}
