import EmptyState from "@/components/EmptyState";
import MyListingsClient from "@/components/listings/MyListingsClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

export default async function MyListingsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Chưa đăng nhập"
        subtitle="Vui lòng đăng nhập để xem tin đăng của bạn"
      />
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="Chưa có tin đăng nào"
        subtitle="Bạn chưa đăng tin nào"
      />
    );
  }

  return (
    <MyListingsClient
      listings={listings}
      currentUser={currentUser}
    />
  );
} 