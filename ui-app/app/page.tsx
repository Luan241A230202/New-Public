export default function HomePage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold mb-4">
          Chào mừng đến với New Public
        </h1>
        <p className="text-lg text-muted mb-6">
          Nền tảng chia sẻ video với tính năng NFT, membership và monetization cho creators
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Videos Trending</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="aspect-video bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Video Title {i}</h3>
                <p className="text-sm text-muted">Creator Name</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted">
                  <span>1.2K views</span>
                  <span>2 days ago</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Danh mục nổi bật</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['Gaming', 'Music', 'Education', 'Entertainment', 'Technology', 'Sports'].map((cat) => (
            <div key={cat} className="p-4 border rounded-lg text-center hover:bg-accent cursor-pointer">
              <div className="text-2xl mb-2">🎮</div>
              <div className="font-medium">{cat}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Tính năng nổi bật</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">🎨 NFT Marketplace</h3>
            <p className="text-muted">
              Mint, mua bán và sưu tập NFT video từ các creators yêu thích
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">⭐ Stars System</h3>
            <p className="text-muted">
              Tip creators, unlock content và tham gia các hoạt động cộng đồng
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">👑 Membership</h3>
            <p className="text-muted">
              Trở thành thành viên VIP để nhận nhiều quyền lợi độc quyền
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
