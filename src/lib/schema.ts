import { z } from 'zod'

const formSchema = z.object({
	ibadah: z.string(),
	nama: z.string().nonempty(),
	whatsapp: z.string().nonempty(),
	usia: z.string().nonempty(),
	alamat: z.string().nonempty(),
	komsel: z.string(),
	GKK: z.string(),
	KK: z.string(),
	link: z.string(),
}).refine(
    (data) => data.komsel !== "sudah" || data.GKK.trim().length > 0,
    {
      path: ["GKK"],
    }
  ).refine(
    (data) => data.komsel !== "sudah" || data.KK.trim().length > 0,
    {
      path: ["KK"],
    }
  )

const pinSchema = z.object({
	PIN: z.string().nonempty(),
})

export { formSchema, pinSchema }
