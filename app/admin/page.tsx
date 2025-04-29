'use client';

import { useState } from 'react';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('searchBuilding');

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Trang quản trị</h1>

            {/* Tab Navigation */}
            <div className="flex border-b mb-4">
                <button
                    className={`px-4 py-2 ${activeTab === 'searchBuilding' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('searchBuilding')}
                >
                    Tìm Kiếm Tòa Nhà
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'addOrEditBuilding' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('addOrEditBuilding')}
                >
                    Thêm hoặc Sửa Tòa Nhà
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'searchSource' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('searchSource')}
                >
                    Tìm Kiếm Nguồn Dẫn
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'searchBuilding' && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Tìm Kiếm Tòa Nhà</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Tên tòa nhà</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Quận</label>
                            <select className="w-full p-2 border rounded">
                                <option>Chọn Quận</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1">Phường</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Đường</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Kết cấu</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Số tầng hầm</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Diện tích sàn</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Hướng</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Diện tích thuê</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Giá thuê</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Mở tgia</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Phí dịch vụ</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Tên quản lý</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">SĐT quản lý</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Nhân viên</label>
                            <select className="w-full p-2 border rounded">
                                <option>Chọn Nhân Viên</option>
                            </select>
                        </div>
                    </div>
                    <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Tìm Kiếm</button>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Kết Quả Tìm Kiếm</h2>
                        <table className="w-full border-collapse border">
                            <thead>
                                <tr>
                                    <th className="border p-2">
                                        <input type="checkbox" />
                                    </th>
                                    <th className="border p-2">Tên tòa nhà</th>
                                    <th className="border p-2">Địa chỉ</th>
                                    <th className="border p-2">Số tầng hầm</th>
                                    <th className="border p-2">Tên quản lý</th>
                                    <th className="border p-2">SĐT quản lý</th>
                                    <th className="border p-2">D.tích sàn</th>
                                    <th className="border p-2">D.tích thuê</th>
                                    <th className="border p-2">Giá Thuê</th>
                                    <th className="border p-2">Phí dịch vụ</th>
                                    <th className="border p-2">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-2">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="border p-2">NAM GIAO BUILDING TOWER</td>
                                    <td className="border p-2">59 phan xích long, Phường 2, Quận 1</td>
                                    <td className="border p-2">2</td>
                                    <td className="border p-2">Anh Nam - Chi Lợi</td>
                                    <td className="border p-2">0913533727</td>
                                    <td className="border p-2">200</td>
                                    <td className="border p-2">100, 200</td>
                                    <td className="border p-2">15</td>
                                    <td className="border p-2">3</td>
                                    <td className="border p-2">
                                        <button className="text-blue-500">Sửa</button>
                                        <button className="text-red-500 ml-2">Xóa</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border p-2">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="border p-2">ACM TOWER</td>
                                    <td className="border p-2">96 cao thắng, Phường 4, Quận 3</td>
                                    <td className="border p-2">2</td>
                                    <td className="border p-2">Chị Thảo</td>
                                    <td className="border p-2">0173546293</td>
                                    <td className="border p-2">650</td>
                                    <td className="border p-2">200, 300, 400</td>
                                    <td className="border p-2">18</td>
                                    <td className="border p-2">3</td>
                                    <td className="border p-2">
                                        <button className="text-blue-500">Sửa</button>
                                        <button className="text-red-500 ml-2">Xóa</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="mt-2">13 items found, displaying 1 to 2.</p>
                        <div className="flex justify-center mt-4">
                            <button className="px-2 py-1 border"></button>
                            <button className="px-2 py-1 border bg-gray-200">1</button>
                            <button className="px-2 py-1 border">2</button>
                            <button className="px-2 py-1 border">3</button>
                            <button className="px-2 py-1 border">4</button>
                            <button className="px-2 py-1 border">5</button>
                            <button className="px-2 py-1 border"></button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'addOrEditBuilding' && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Thêm hoặc Sửa Tòa Nhà</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Tên tòa nhà</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Quận</label>
                            <select className="w-full p-2 border rounded">
                                <option>Chọn Quận</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1">Phường</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Đường</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Kết cấu</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Số tầng hầm</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Diện tích sàn</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Hướng</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Diện tích thuê</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Giá thuê</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Mô tả giá</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Phí dịch vụ</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Phí ô tô</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Phí mô tô</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Thanh toán</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Thời hạn thuê</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Thời gian trang trí</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Tên quản lý</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">SĐT quản lý</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div className="col-span-2">
                            <label className="block mb-1">Loại tòa nhà</label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    Nguyên căn
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    Nội thất
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    Tầng trệt
                                </label>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className="block mb-1">Ghi chú</label>
                            <textarea className="w-full p-2 border rounded" rows={3}></textarea>
                        </div>
                        <div className="col-span-2">
                            <label className="block mb-1">Hình ảnh đại diện</label>
                            <input type="file" className="w-full p-2 border rounded" />
                        </div>
                    </div>
                    <div className="mt-4 flex space-x-4">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded">Thêm tòa nhà</button>
                        <button className="px-4 py-2 bg-gray-500 text-white rounded">Hủy thao tác</button>
                    </div>
                </div>
            )}

            {activeTab === 'searchSource' && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Tìm kiếm</h2>
                    <div className="mb-4">
                        <label className="block mb-1">Giá trị cần tìm</label>
                        <input type="text" className="w-full p-2 border rounded" />
                    </div>
                    <button className="px-4 py-2 bg-green-500 text-white rounded">Tìm kiếm</button>
                    <table className="w-full border-collapse border mt-4">
                        <thead>
                            <tr>
                                <th className="border p-2">
                                    <input type="checkbox" />
                                </th>
                                <th className="border p-2">Tên</th>
                                <th className="border p-2">Full name</th>
                                <th className="border p-2">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border p-2">
                                    <input type="checkbox" />
                                </td>
                                <td className="border p-2">nguyen.van.a</td>
                                <td className="border p-2">nguyen van a</td>
                                <td className="border p-2">
                                    <button className="text-blue-500">Khóa đề xuất thao tác</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="border p-2">
                                    <input type="checkbox" />
                                </td>
                                <td className="border p-2">nguyen.van.b</td>
                                <td className="border p-2">nguyen van b</td>
                                <td className="border p-2">
                                    <button className="text-blue-500">Khóa đề xuất thao tác</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="mt-2">4 items found, displaying 1 to 2.</p>
                    <div className="flex justify-center mt-4">
                        <button className="px-2 py-1 border"></button>
                        <button className="px-2 py-1 border bg-gray-200">1</button>
                        <button className="px-2 py-1 border">2</button>
                        <button className="px-2 py-1 border"></button>
                    </div>
                </div>
            )}
        </div>
    );
}