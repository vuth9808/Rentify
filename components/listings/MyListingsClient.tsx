'use client';

import { SafeListing, SafeUser } from "@/types";
import Container from "../Container";
import Heading from "../Heading";
import ListingCard from "./ListingCard";

interface MyListingsClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const MyListingsClient: React.FC<MyListingsClientProps> = ({
  listings,
  currentUser
}) => {
  return (
    <Container>
      <Heading
        title="Phòng của tôi"
        subtitle="Danh sách phòng bạn đã đăng"
      />
      <div className="
        mt-10
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
      ">
        {listings.map((listing: SafeListing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default MyListingsClient; 