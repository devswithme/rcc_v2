import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
	try {
		const result = await db.quota.findFirst({
			where: { id: 1 },
			select: {
				KU1: true,
				KU2: true,
				KU3: true,
				KU4: true,
				KU5: true,
			},
		})

		return NextResponse.json(result, { status: 200 })
	} catch (err) {
		return NextResponse.json(err, { status: 500 })
	}
}
