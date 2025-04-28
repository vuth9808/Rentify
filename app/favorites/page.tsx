import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listings/ListingCard";
import Container from "@/components/Container";
import prisma from "@/lib/prismadb";

export const metadata = {
  title: "Tin đăng yêu thích | Rentify",
  description: "Danh sách tin đăng yêu thích của bạn",
};

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/auth/login");
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    return <EmptyState title="Không tìm thấy người dùng" />;
  }

  const favorites = await prisma.listing.findMany({
    where: {
      id: {
        in: currentUser.favoriteIds
      }
    },
    include: {
      user: true
    }
  });

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="Chưa có tin đăng yêu thích"
        subtitle="Hãy thêm tin đăng vào danh sách yêu thích của bạn"
      />
    );
  }

  const safeFavorites = favorites.map(favorite => ({
    ...favorite,
    createdAt: favorite.createdAt.toISOString(),
    user: {
      ...favorite.user,
      createdAt: favorite.user.createdAt.toISOString(),
      updatedAt: favorite.user.updatedAt.toISOString(),
      emailVerified: favorite.user.emailVerified?.toISOString() || null,
    }
  }));

  const safeUser = {
    ...currentUser,
    createdAt: currentUser.createdAt.toISOString(),
    updatedAt: currentUser.updatedAt.toISOString(),
    emailVerified: currentUser.emailVerified?.toISOString() || null,
  };

  return (
    <Container>
      <div className="pt-8">
        <h1 className="text-2xl font-bold mb-6">Tin đăng yêu thích</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {safeFavorites.map((listing: any) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={safeUser}
            />
          ))}
        </div>
      </div>
    </Container>
  );
} 