import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";

export const categories = [
  {
    label: 'Phòng trọ',
    icon: TbBeach,
    description: 'Phòng trọ cho thuê!',
  },
  {
    label: 'Nhà nguyên căn',
    icon: GiWindmill,
    description: 'Nhà nguyên căn cho thuê!'
  },
  {
    label: 'Căn hộ',
    icon: MdOutlineVilla,
    description: 'Căn hộ cho thuê!'
  },
  {
    label: 'Chung cư mini',
    icon: TbMountain,
    description: 'Chung cư mini cho thuê!'
  },
  {
    label: 'Homestay',
    icon: TbPool,
    description: 'Homestay cho thuê!'
  },
  {
    label: 'Villa',
    icon: IoDiamond,
    description: 'Villa cho thuê!'
  },
  {
    label: 'Mặt bằng',
    icon: GiCastle,
    description: 'Mặt bằng cho thuê!'
  },
  {
    label: 'Văn phòng',
    icon: GiCaveEntrance,
    description: 'Văn phòng cho thuê!'
  },
]; 