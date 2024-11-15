import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
const ContactPerson = () => {
	return (
		<Button
			className='fixed bottom-6 right-6 rounded-full bg-gradient-to-tr from-[#075e54] to-[#25d366] border border-[#075e54] hover:brightness-105'
			onClick={() => {
				window.location.href =
					'https://wa.me/6285100878950?text=Shalom%20Saya%20Perlu%20Bantuan%20Mengenai%20Registrasi%20Natal'
			}}>
			<Image
				src='whatsapp.svg'
				alt='whatsapp'
				width={20}
				height={20}
				style={{
					filter:
						'invert(100%) sepia(100%) saturate(0%) hue-rotate(180deg) brightness(100%) contrast(100%)',
				}}
			/>
			Perlu Bantuan?
		</Button>
	)
}

export default ContactPerson
