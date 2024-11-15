import { useState, useEffect } from 'react'
import { useSearchProductsQuery } from '@/api/categoryApi'
import { Product } from '@/types/redux'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'next/navigation'

interface UseProductSearchResult {
	query: string
	setQuery: (query: string) => void
	searchResults: Product[] | undefined
	total: number
	isLoading: boolean
	error: any
	totalPages: number
	currentPage: number
	setPage: (page: number) => void
}

export const useProductSearch = (
	initialQuery: string = '',
	initialPage: number = 1,
	limit: number = 12
): UseProductSearchResult => {
	const [query, setQuery] = useState<string>(initialQuery)
	const [page, setPage] = useState<number>(initialPage)
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	const selectedStorage =
		useSelector((state: RootState) => state.selectedStorage.storage) ||
		'paramsFrom_03_MebliPervomaisk'

	const {
		data: searchResultsData,
		error,
		isLoading,
	} = useSearchProductsQuery(
		{ info: query, page, limit, storage: selectedStorage },
		{ skip: !query }
	)

	const searchParams = isClient ? useSearchParams() : null
	const urlPage = searchParams?.get('page')
	const parsedPage = urlPage ? parseInt(urlPage, 10) : initialPage

	useEffect(() => {
		if (initialQuery) {
			setQuery(initialQuery)
		}
		if (parsedPage) {
			setPage(parsedPage)
		}
	}, [initialQuery, urlPage])

	const searchResults = searchResultsData?.results || []
	const total = searchResultsData?.total || 200
	const totalPages = Math.ceil(total / limit) || 1

	return {
		query,
		setQuery,
		searchResults,
		total,
		isLoading,
		error,
		totalPages,
		currentPage: page,
		setPage,
	}
}
