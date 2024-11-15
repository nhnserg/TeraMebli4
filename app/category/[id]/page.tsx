'use client'
import CategoryPage from '@/components/CategoryPage'
import SearchPage from '@/components/SearchPage'
import { useEffect, useState } from 'react'

export default function CategoryId({ params }: { params: { id: string } }) {
	const { id } = params
	const isSearchMode = id === '20000'
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	if (!isClient) {
		return <div>Загрузка...</div>
	}

	return isSearchMode ? <SearchPage /> : <CategoryPage id={id} />
}
