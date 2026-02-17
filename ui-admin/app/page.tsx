export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Dashboard Tổng quan</h2>
        <p className="text-gray-600">Thống kê và hoạt động hệ thống</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-2">Tổng Users</div>
          <div className="text-3xl font-bold">12,458</div>
          <div className="text-sm text-green-600 mt-2">+12% so với tháng trước</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-2">Tổng Videos</div>
          <div className="text-3xl font-bold">45,892</div>
          <div className="text-sm text-green-600 mt-2">+8% so với tháng trước</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-2">Doanh thu (Stars)</div>
          <div className="text-3xl font-bold">2.4M</div>
          <div className="text-sm text-green-600 mt-2">+15% so với tháng trước</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-2">Active Users (24h)</div>
          <div className="text-3xl font-bold">3,542</div>
          <div className="text-sm text-gray-600 mt-2">28% của tổng users</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Hành động nhanh</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border rounded-lg hover:bg-gray-50">
            <div className="text-2xl mb-2">👤</div>
            <div className="text-sm font-medium">Quản lý Users</div>
          </button>
          <button className="p-4 border rounded-lg hover:bg-gray-50">
            <div className="text-2xl mb-2">🎬</div>
            <div className="text-sm font-medium">Kiểm duyệt Video</div>
          </button>
          <button className="p-4 border rounded-lg hover:bg-gray-50">
            <div className="text-2xl mb-2">💰</div>
            <div className="text-sm font-medium">Thanh toán</div>
          </button>
          <button className="p-4 border rounded-lg hover:bg-gray-50">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="text-sm font-medium">Cấu hình</div>
          </button>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Hoạt động gần đây</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium">User đăng ký mới</div>
                  <div className="text-gray-600">john_doe@example.com</div>
                </div>
                <div className="text-gray-500">5 phút trước</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Báo cáo chờ xử lý</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <div className="font-medium">Video vi phạm nội dung</div>
                  <div className="text-sm text-gray-600">Video ID: abc123</div>
                </div>
                <button className="px-3 py-1 bg-red-500 text-white text-sm rounded">
                  Xem
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Biểu đồ thống kê</h3>
        <div className="h-64 flex items-center justify-center border-2 border-dashed rounded">
          <div className="text-gray-400">
            Biểu đồ sẽ được hiển thị ở đây (sử dụng Recharts)
          </div>
        </div>
      </div>
    </div>
  );
}
