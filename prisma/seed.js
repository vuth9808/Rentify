const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Xóa dữ liệu cũ
  await prisma.image.deleteMany();
  await prisma.listing.deleteMany();

  // Tạo user mẫu
  const user = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@rentify.com",
      image: "/images/placeholder.jpg"
    }
  });

  // Tạo phòng trọ 1
  const listing1 = await prisma.listing.create({
    data: {
      title: "Phòng trọ cao cấp gần Đại học Bách Khoa",
      description: "Phòng trọ mới xây, đầy đủ nội thất, có ban công, cửa sổ thoáng mát. Vị trí trung tâm, thuận tiện di chuyển.",
      imageSrc: "/images/rooms/room1.jpg",
      price: 3000000,
      area: 25,
      type: "STUDIO",
      bedrooms: 1,
      bathrooms: 1,
      roomCount: 1,
      bathroomCount: 1,
      amenities: ["Máy lạnh", "Tủ lạnh", "Máy giặt", "Nội thất", "Ban công", "Cửa sổ", "Bảo vệ 24/7"],
      utilities: ["Điện", "Nước", "Internet"],
      locationValue: "Hai Bà Trưng, Hà Nội",
      address: "123 Hai Bà Trưng, Hà Nội",
      phone: "0123456789",
      latitude: 21.007529,
      longitude: 105.847280,
      userId: user.id,
      images: {
        create: [
          {
            url: "/images/rooms/room1.jpg",
            publicId: "room1"
          },
          {
            url: "/images/rooms/room1-2.jpg",
            publicId: "room1-2"
          }
        ]
      }
    }
  });

  // Tạo phòng trọ 2
  const listing2 = await prisma.listing.create({
    data: {
      title: "Căn hộ mini full nội thất khu vực Cầu Giấy",
      description: "Căn hộ mini cao cấp, đầy đủ tiện nghi, an ninh 24/7, gần các trung tâm thương mại và văn phòng.",
      imageSrc: "/images/rooms/room2.jpg",
      price: 5500000,
      area: 35,
      type: "APARTMENT",
      bedrooms: 1,
      bathrooms: 1,
      roomCount: 2,
      bathroomCount: 1,
      amenities: ["Full nội thất", "Máy lạnh", "Tủ lạnh", "Máy giặt", "Bếp", "Ban công", "Thang máy"],
      utilities: ["Điện", "Nước", "Internet", "Dọn vệ sinh"],
      locationValue: "Cầu Giấy, Hà Nội",
      address: "456 Cầu Giấy, Hà Nội",
      phone: "0987654321",
      latitude: 21.031887,
      longitude: 105.799034,
      userId: user.id,
      images: {
        create: [
          {
            url: "/images/rooms/room2.jpg",
            publicId: "room2"
          },
          {
            url: "/images/rooms/room2-2.jpg",
            publicId: "room2-2"
          }
        ]
      }
    }
  });

  // Tạo phòng trọ 3
  const listing3 = await prisma.listing.create({
    data: {
      title: "Phòng trọ mới xây có gác lửng, ban công",
      description: "Phòng trọ mới xây 100%, thiết kế hiện đại, có gác lửng rộng rãi, ban công thoáng mát.",
      imageSrc: "/images/rooms/room3.jpg",
      price: 2500000,
      area: 20,
      type: "ROOM",
      bedrooms: 1,
      bathrooms: 1,
      roomCount: 1,
      bathroomCount: 1,
      amenities: ["Gác lửng", "Ban công", "Tủ quần áo", "Máy lạnh", "Camera an ninh", "Wifi miễn phí"],
      utilities: ["Điện", "Nước", "Internet"],
      locationValue: "Bình Thạnh, TP. Hồ Chí Minh",
      address: "456 Xô Viết Nghệ Tĩnh, Bình Thạnh, TP. Hồ Chí Minh",
      phone: "0909123456",
      latitude: 10.801660,
      longitude: 106.709498,
      userId: user.id,
      images: {
        create: [
          {
            url: "/images/rooms/room3.jpg",
            publicId: "room3"
          },
          {
            url: "/images/rooms/room3-2.jpg",
            publicId: "room3-2"
          }
        ]
      }
    }
  });
  console.log('Đã tạo xong dữ liệu mẫu:', { listing1, listing2, listing3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 