'use client'

import './globals.css'
import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const [queryClient] = React.useState(() => new QueryClient())

	return (
		<html lang='en'>
			{/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
			<head />
			<body>
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			</body>
		</html>
	)
}
