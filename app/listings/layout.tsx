import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Danh sách phòng trọ | Rentify',
  description: 'Tìm kiếm và lọc phòng trọ theo nhu cầu của bạn',
}

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 