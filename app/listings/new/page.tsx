"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

import Container from "@/components/Container"
import ListingForm from "@/components/listings/ListingForm"

export default function NewListingPage() {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) {
      router.push("/auth/login")
    }
  }, [session, router])

  if (!session) {
    return null
  }

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 mt-6">
            <h1 className="text-2xl font-bold">
              Đăng tin cho thuê phòng trọ
            </h1>
            <p className="text-neutral-500">
              Điền thông tin chi tiết về phòng trọ của bạn
            </p>
          </div>
          <ListingForm />
        </div>
      </div>
    </Container>
  )
} 