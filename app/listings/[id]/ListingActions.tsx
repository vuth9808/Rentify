'use client'

import React from 'react'

interface ListingActionsProps {
  price: number
}

export default function ListingActions({ price }: ListingActionsProps) {
  // Format price with thousand separators
  const formattedPrice = new Intl.NumberFormat('vi-VN').format(price)

  const handleContact = () => {
    // Xử lý logic liên hệ ở đây
    console.log('Liên hệ')
  }

  const handleSave = () => {
    // Xử lý logic lưu tin ở đây
    console.log('Lưu tin')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg sticky top-4">
      <div className="mb-4">
        <p className="text-2xl font-bold text-teal-600">{formattedPrice} đ/tháng</p>
      </div>
      
      <button 
        onClick={handleContact}
        className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-teal-700 transition-colors mb-2"
      >
        Liên hệ ngay
      </button>
      
      <button 
        onClick={handleSave}
        className="w-full border border-teal-600 text-teal-600 py-3 px-4 rounded-lg font-medium hover:bg-teal-50 transition-colors"
      >
        Lưu tin này
      </button>
    </div>
  )
} 