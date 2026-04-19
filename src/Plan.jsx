import { useState } from "react";

// ===== NINH BÌNH HONEYMOON — 5N4Đ LÃNG MẠN =====
const plan = {
  name: "Ninh Bình",
  emoji: "🛶",
  color: "#78716c",
  accent: "#b45309",
  vibe: "Hạ Long trên cạn · Cố đô ngàn năm · Đồng lúa vàng",
  tagline: "Thuyền Tràng An · Đỉnh Hang Múa · Phố cổ lên đèn",
  dates: "27–31/10/2026",
  duration: "5 ngày 4 đêm",
  from: "TP.HCM",
  tier: {
    name: "🟡 Lãng Mạn",
    range: "~12–17tr/người · Cặp đôi ~10–14tr/người",
    flight: "VNA SGN↔HAN giờ đẹp · 2.5–3.5tr khứ hồi",
    hotel: "Resort 4★: Emeralda / Tam Coc Garden / Hidden Charm / Lasen Village",
    hotelPrice: "1.2–2tr/đêm · Tổng ~6tr/4đ",
    transport: "Xe riêng HN↔NB · 400K/chiều",
    total: "💰 10–14tr/người · ~24–32tr cho cặp đôi"
  },
};

const days = [
  {
    id: 0,
    title: "Ngày 1 — Di Sản Tràng An",
    subtitle: "🛫 Bay từ SGN · Check-in resort · Thuyền Tràng An 3h",
    highlight: "🛶 Tràng An tuyến 2 — thuê thuyền riêng cho 2",
    items: [
      { t: "07:00–09:00", act: "✈️ VNA SGN → HAN", note: "Chọn chuyến sáng sớm để tối đa hoá ngày 1", cost: "~1.5tr/chiều" },
      { t: "09:30–11:30", act: "🚐 Xe riêng HN → NB (1.5h)", note: "Đón tận cổng Nội Bài · Nghỉ trạm Ninh Bình ăn nhẹ", cost: "400K/ng" },
      { t: "12:00–13:00", act: "🏨 Check-in resort 4★ (Emeralda / Lasen Village)", note: "Yêu cầu honeymoon setup trước (hoa, nến, trái cây)", cost: "—" },
      { t: "13:00–14:00", act: "🍽️ Set lunch đặc sản — dê tái chanh, cơm cháy sốt dê", note: "Quán gợi ý: Dê 1969 / Áp Xuân Vinh / Chính Thu", cost: "220–280K/ng" },
      { t: "14:30–17:30", act: "🛶 Tràng An tuyến 2 — thuyền riêng 3h", note: "⚠️ ĐẶT VÉ ONLINE TỪ TỐI TRƯỚC · Ăn no + đi vệ sinh trước khi lên thuyền", cost: "300K × 2 + thuê riêng 600K + tip 100K" },
      { t: "17:45–18:30", act: "☕ Offy Highlands Tràng An — sunset cocktail", note: "View ra Bến An cực đẹp, có ổ điện sạc pin", cost: "120K/ly" },
      { t: "19:00–21:00", act: "🕯️ Romantic dinner resort — dê 7 món + rượu vang", note: "Đặt bàn view hồ sen/cánh đồng lúa", cost: "450–550K/ng" },
    ],
    tips: [
      "🎫 Vé Tràng An: mua online tại www.trangan.vn tối trước, tránh xếp hàng sáng",
      "🚻 3 tiếng trên thuyền không có toilet — đi trước khi lên",
      "🍱 Được mang đồ ăn nhẹ lên thuyền (nước, trái cây, bánh ngọt)",
      "💵 Chuẩn bị tiền lẻ 50–100K tip cô/chú lái đò (tự nguyện)",
    ],
  },
  {
    id: 1,
    title: "Ngày 2 — Tam Cốc & Ngọa Long",
    subtitle: "🌅 Sông Ngô Đồng · Leo 500 bậc · Hoàng hôn",
    highlight: "🏔️ Hang Múa hoàng hôn 'Ngọa Long' — khoảnh khắc đẹp nhất",
    items: [
      { t: "07:00–07:30", act: "🥐 Buffet sáng resort", note: "Ăn chắc bụng trước khi leo núi", cost: "Đã gồm" },
      { t: "08:00–10:30", act: "🛶 Tam Cốc thuyền đôi sông Ngô Đồng", note: "Đi sớm vắng, sương khói thơ mộng · Mùa lúa vàng T5–6 đẹp nhất", cost: "Vé 200K + tip 50K" },
      { t: "11:00–12:30", act: "🏔️ Hang Múa — chinh phục 500 bậc", note: "💪 Giày thể thao êm · 📸 Chụp couple 'Ngọa Long' panoramic trên đỉnh", cost: "Vé 100K" },
      { t: "13:00–14:00", act: "🍽️ Cơm niêu view đồng lúa", note: "Nhà hàng Trung Tuyết / Hoàng Giang Tam Cốc", cost: "180–220K/ng" },
      { t: "14:30–16:30", act: "💆 Couple spa resort 90 phút", note: "Hot stone / aromatherapy / thảo dược", cost: "800K–1.2tr/cặp" },
      { t: "17:00–18:30", act: "🚲 Đạp xe đôi sunset qua ruộng lúa → đền Thái Vi", note: "Quãng đường bằng phẳng, dễ đi · Thuê ~30K/chiếc", cost: "60K" },
      { t: "19:00–21:00", act: "🕯️ Candle-light dinner bên hồ sen resort", note: "Yêu cầu set menu romantic + bánh kỷ niệm", cost: "500–700K/ng" },
    ],
    tips: [
      "🌅 Ngắm hoàng hôn Hang Múa đẹp hơn bình minh — lên khoảng 16:00 để 17:30 có vị trí đẹp",
      "👟 500 bậc đá không dốc nhưng hơi trơn — giày bám là bắt buộc",
      "📸 Đỉnh Hang Múa có 2 hướng chụp: rồng đá (Ngọa Long) + toàn cảnh Tam Cốc",
      "💧 Mang 1 chai nước 500ml, trên đỉnh không có chỗ mua",
    ],
  },
  {
    id: 2,
    title: "Ngày 3 — Tâm Linh & Tuyệt Tình Cốc",
    subtitle: "🪷 Chùa chuông gió · 💎 Nước xanh ngọc bích",
    highlight: "💎 Tuyệt Tình Cốc — góc ảnh couple signature",
    items: [
      { t: "07:30–08:30", act: "🥐 Buffet sáng thong thả", note: "Sáng nay đi tâm linh nên mặc áo kín đáo", cost: "Đã gồm" },
      { t: "09:00–11:00", act: "🪷 Địa Tạng Phi Lai Tự (cách ~45 phút)", note: "Chùa chuông gió chữa lành · Ảnh áo dài couple · Mặc áo tay dài, quần dài", cost: "Miễn phí + xe 300K khứ hồi" },
      { t: "11:30–12:30", act: "🍽️ Lunch gỏi cá nhệch Kim Sơn / bánh đa cá rô đồng", note: "Đặc sản khó tìm ở chỗ khác", cost: "200K/ng" },
      { t: "13:30–15:30", act: "💎 Tuyệt Tình Cốc (Động Am Tiên)", note: "Nước xanh ngọc bích · Góc ảnh cặp đôi viral TikTok · Vé khá rẻ", cost: "Vé 45K/ng" },
      { t: "16:00–17:30", act: "🪷 Chùa Bích Động", note: "Mùa hoa súng T10–12 cực đẹp · Trèo lên tầng 3 ngắm toàn cảnh", cost: "Vé 20K" },
      { t: "18:00–19:00", act: "☕ 007 Đam Khê Specialty Coffee Tam Cốc", note: "Cafe/matcha ổn nhất Tam Cốc theo review", cost: "100K/cặp" },
      { t: "19:30–21:30", act: "🕯️ Fine dinner 7 Bridges", note: "Đồ ăn ngon, không gian đẹp, hợp ngồi nhâm nhi tối", cost: "400–550K/ng" },
    ],
    tips: [
      "🧥 Địa Tạng Phi Lai Tự và Bích Động là chùa — bắt buộc áo kín đáo",
      "📸 Tuyệt Tình Cốc: đi sáng 8–10h hoặc chiều 14–16h ánh sáng đẹp nhất",
      "🚗 3 điểm cách nhau 30–60 phút nên cần xe riêng hoặc Grab cả ngày",
      "💒 Nếu thuê áo dài trước, Địa Tạng Phi Lai Tự là background đẹp nhất",
    ],
  },
  {
    id: 3,
    title: "Ngày 4 — Bái Đính & Phố Cổ Đêm",
    subtitle: "🏛️ Chùa lớn nhất ĐNA · 🏮 Hoa Lư lên đèn",
    highlight: "🏮 Phố cổ Hoa Lư ban đêm — lãng mạn như Hội An",
    items: [
      { t: "07:30–08:30", act: "🥐 Buffet sáng", note: "Hôm nay di chuyển nhiều, ăn no", cost: "Đã gồm" },
      { t: "09:00–11:30", act: "🏛️ Chùa Bái Đính — quần thể lớn nhất ĐNA", note: "Xe điện VIP (không đi bộ, rộng lắm) · Áo dài tay, quần dài", cost: "Xe điện 250K + vé 50K" },
      { t: "12:00–13:00", act: "🍽️ Lunch ốc núi hấp sả + dê nướng tảng", note: "Quán gần Bái Đính có đặc sản ốc núi độc đáo", cost: "180–220K/ng" },
      { t: "14:00–16:00", act: "🛶 Đầm Vân Long — thuyền mái che", note: "Yên tĩnh tuyệt đối · May mắn sẽ thấy voọc quần đùi trắng quý hiếm", cost: "Đò riêng 200K/cặp" },
      { t: "16:30–17:30", act: "📸 Bãi đá Tràng An — chụp ảnh cưới concept", note: "Tìm 'Rìa Tràng An — Điểm chụp ảnh cưới đẹp' trên Google Maps", cost: "—" },
      { t: "18:30–20:00", act: "🏮 Phố cổ Hoa Lư lên đèn + chèo thuyền đôi", note: "Đẹp như Hội An · Chèo thuyền buổi tối dưới đèn lồng cực lãng mạn", cost: "Thuyền 80K/cặp" },
      { t: "20:30–22:00", act: "🔥 Dinner nướng phố cổ — 1988 BBQ / Nướng Gasu / Gogi", note: "Vừa ăn vừa ngắm view phố cổ đêm", cost: "300–400K/ng" },
    ],
    tips: [
      "👕 Bái Đính rất rộng — không mua xe điện sẽ phải đi bộ 3km dưới nắng",
      "🙏 Để giày ở cửa chính điện khi vào thắp hương",
      "🐒 Voọc ở Vân Long chỉ xuất hiện sáng sớm 5–7h hoặc chiều 16–18h",
      "🎆 Phố cổ Hoa Lư tổ chức lễ hội đèn lồng cuối tuần — check lịch trước",
    ],
  },
  {
    id: 4,
    title: "Ngày 5 — Brunch & Bay Về",
    subtitle: "🥐 Sisterfields · 🎁 Quà Cố Đô · ✈️ SGN",
    highlight: "🥐 Sisterfields brunch — Sunday Treat chia tay Ninh Bình",
    items: [
      { t: "08:00–09:00", act: "🥐 Buffet sáng cuối + trả phòng", note: "Check-out trễ 12h (yêu cầu trước)", cost: "Đã gồm" },
      { t: "09:30–11:00", act: "🎁 Mua quà — cơm cháy, mắm tép, rượu Kim Sơn, nem chua Yên Mạc", note: "Chợ Ninh Bình hoặc siêu thị đặc sản Hoa Lư", cost: "200–300K" },
      { t: "11:30–13:00", act: "🥐 Brunch Sisterfields — Sunday Treat", note: "Brunch ngon, khẩu phần lớn, quán xinh chụp ảnh đẹp · 150K/set", cost: "200K/ng" },
      { t: "13:30–15:30", act: "🚐 Xe riêng NB → HN", note: "Có thể dừng nghỉ ở Phủ Lý ăn nhẹ", cost: "400K" },
      { t: "16:00–17:30", act: "🚕 Ra sân bay Nội Bài", note: "Grab hoặc xe dịch vụ", cost: "350K" },
      { t: "19:00–21:00", act: "✈️ VNA HAN → SGN", note: "Check-in online trước 2h", cost: "~1.5tr" },
    ],
    tips: [
      "📦 Cơm cháy dễ vỡ — gói hành lý ký gửi cẩn thận",
      "🍶 Rượu Kim Sơn >100ml phải ký gửi, không mang lên cabin",
      "⏰ Chuyến bay chiều tối thì trưa có thể đi Sisterfields thong thả",
      "💾 Tải ảnh về điện thoại/cloud ngay trên xe về HN cho chắc",
    ],
  },
];

const packing = [
  { icon: "👟", item: "Giày thể thao êm chân (Hang Múa 500 bậc)" },
  { icon: "👗", item: "Áo dài couple + váy chụp đồng lúa" },
  { icon: "🧕", item: "Áo kín đáo tay dài (Bái Đính, Bích Động)" },
  { icon: "🧴", item: "Kem chống nắng SPF50+ · nón lá cho thuyền" },
  { icon: "💧", item: "Chai nước cá nhân · tiền lẻ tip lái đò" },
  { icon: "🔋", item: "Pin dự phòng · cáp sạc · thẻ nhớ máy ảnh" },
  { icon: "🧥", item: "Áo khoác mỏng (sáng sớm 22–25°C tháng 10)" },
  { icon: "💍", item: "Nhẫn/nước hoa/đồ đẹp cho dinner lãng mạn" },
];

const foodMap = {
  "🐐 Dê núi": ["Dê 1969 (mới, rộng)", "Áp Xuân Vinh", "Thành Long", "Chính Thu"],
  "🔥 Nướng/Lẩu": ["1988 BBQ (phố cổ)", "Nướng Gasu", "Gogi", "Thanh Phong (lẩu bò)"],
  "☕ Cafe & Matcha": ["At Where Cafe", "DRIP by haimuoibon", "Offy Highlands Tràng An", "007 Đam Khê Specialty Coffee"],
  "🥐 Brunch/Fine": ["Sisterfields", "7 Bridges", "Starbucks Tràng An (trước 8h)"],
};

const souvenirs = [
  "🍚 Cơm cháy chà bông — đặc sản trứ danh",
  "🍶 Rượu nếp Kim Sơn — quốc tửu của Việt Nam",
  "🦐 Mắm tép Gia Viễn — tinh tuý Ninh Bình",
  "🥟 Nem chua Yên Mạc — dai ngon đặc biệt",
];

const proTips = [
  { icon: "🎫", tip: "Đặt vé Tràng An online tối trước — tránh xếp hàng 2h sáng" },
  { icon: "🚻", tip: "Đi vệ sinh TRƯỚC khi lên thuyền Tràng An — 3 tiếng không có toilet" },
  { icon: "🍱", tip: "Ăn sáng chắc bụng + mang đồ ăn nhẹ lên thuyền (đừng mang lẩu 😄)" },
  { icon: "🚣", tip: "Thuyền Tràng An tối đa 4–5 người — cặp đôi có thể thuê riêng như private yacht" },
  { icon: "🌅", tip: "Hang Múa hoàng hôn (16–18h) đẹp hơn bình minh — ánh sáng vàng lên núi" },
  { icon: "📸", tip: "Tuyệt Tình Cốc: đi sáng 8–10h ánh sáng phản chiếu lên nước xanh đẹp nhất" },
  { icon: "🏮", tip: "Phố cổ Hoa Lư ban đêm đẹp như Hội An — chèo thuyền dưới đèn lồng" },
  { icon: "⛔", tip: "KHÔNG đi: Thung Ui (chưa hoàn thiện) · Trại Gấu Phú Long (chỉ 1–2 con)" },
];

const momentsForTwo = [
  { emoji: "🚣‍♀️", title: "Thuyền riêng Tràng An", desc: "Thuê cả thuyền chỉ 2 người — 3 tiếng trôi qua hang động giữa non nước" },
  { emoji: "🌅", title: "Hoàng hôn Ngọa Long", desc: "Đỉnh Hang Múa lúc 17:30 — rồng đá + ruộng lúa vàng" },
  { emoji: "🪷", title: "Chuông gió Địa Tạng", desc: "Chùa yên bình, ảnh áo dài couple nổi bần bật trên nền xanh" },
  { emoji: "💎", title: "Tuyệt Tình Cốc", desc: "Nước xanh ngọc bích — góc ảnh cưới signature TikTok-viral" },
  { emoji: "🚲", title: "Đạp xe đôi Tam Cốc", desc: "Ruộng lúa, đền cổ, sông nhỏ — chill nhất hành trình" },
  { emoji: "🏮", title: "Đêm phố cổ Hoa Lư", desc: "Chèo thuyền dưới đèn lồng — phiên bản Hội An của Bắc Bộ" },
];

const budget = [
  { label: "✈️ Bay VNA SGN↔HAN (2 người)", cost: "5–7tr" },
  { label: "🚐 Xe riêng HN↔NB (khứ hồi + Nội Bài)", cost: "1.1tr" },
  { label: "🏨 Resort 4★ 4 đêm (cặp đôi)", cost: "6–8tr" },
  { label: "🍽️ Ăn uống 5 ngày (nhà hàng/fine dining)", cost: "4–5tr" },
  { label: "🎫 Vé tham quan + thuê thuyền riêng", cost: "1.5–2tr" },
  { label: "💆 Couple spa 90 phút", cost: "1tr" },
  { label: "☕ Cafe, phố cổ, quà", cost: "1.5tr" },
  { label: "📋 Tổng cho CẶP ĐÔI", cost: "~20–26tr", bold: true },
];

export default function HoneymoonPlan() {
  const [openDay, setOpenDay] = useState(0);

  const bg = "linear-gradient(135deg,#fdf6e3 0%,#fef3c7 30%,#fdf2f8 70%,#ede9fe 100%)";
  const serif = "'Crimson Text','Noto Serif',Georgia,serif";

  return (
    <div style={{ fontFamily: serif, background: bg, minHeight: "100vh", color: "#1c1917" }}>
      {/* HERO */}
      <div style={{ background: "linear-gradient(180deg,rgba(120,53,15,0.08) 0%,transparent 100%)", padding: "28px 16px 20px", textAlign: "center", borderBottom: "1px solid rgba(180,130,60,0.15)" }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: "#92400e", textTransform: "uppercase", marginBottom: 6 }}>Honeymoon Plan 2026</div>
        <div style={{ fontSize: 44, marginBottom: 4 }}>{plan.emoji}</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 6px", background: "linear-gradient(135deg,#92400e,#b45309,#d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {plan.name} — Trăng Mật Cố Đô
        </h1>
        <div style={{ fontSize: 13, color: "#78716c", fontStyle: "italic", marginBottom: 8 }}>{plan.tagline}</div>
        <div style={{ fontSize: 12, color: "#78716c" }}>📅 {plan.dates} · ⏳ {plan.duration} · 🛫 Từ {plan.from} · 💕 Cặp đôi</div>
      </div>

      {/* GÓI LÃNG MẠN */}
      <div style={{ margin: "16px 12px 8px", padding: 16, background: "linear-gradient(135deg,#fffbeb,#fef3c7)", border: "1px solid #fde68a", borderRadius: 14, boxShadow: "0 2px 8px rgba(180,130,60,0.08)" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#92400e", marginBottom: 10 }}>📋 GÓI {plan.tier.name}</div>
        <div style={{ fontSize: 13, color: "#44403c", lineHeight: 1.8 }}>
          <div>✈️ <b>Bay:</b> {plan.tier.flight}</div>
          <div>🚐 <b>Xe:</b> {plan.tier.transport}</div>
          <div>🏨 <b>Lưu trú:</b> {plan.tier.hotel}</div>
          <div style={{ fontSize: 12, color: "#78716c", marginLeft: 22 }}>{plan.tier.hotelPrice}</div>
        </div>
        <div style={{ marginTop: 10, padding: "10px 12px", background: "#fef3c7", borderRadius: 10, fontWeight: 700, color: "#92400e", fontSize: 14, textAlign: "center" }}>
          {plan.tier.total}
        </div>
      </div>

      {/* MOMENTS CHO 2 */}
      <div style={{ margin: "16px 12px", padding: 14, background: "linear-gradient(135deg,#fdf2f8,#fce7f3)", border: "1px solid #fbcfe8", borderRadius: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#9f1239", marginBottom: 10 }}>💕 Moments Dành Cho Hai Người</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {momentsForTwo.map((m, i) => (
            <div key={i} style={{ padding: 10, background: "white", borderRadius: 10, border: "1px solid #fce7f3" }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{m.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#9f1239", marginBottom: 3 }}>{m.title}</div>
              <div style={{ fontSize: 11, color: "#78716c", lineHeight: 1.5 }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* LỊCH TRÌNH */}
      <div style={{ margin: "20px 12px 8px" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#92400e", marginBottom: 10, textAlign: "center", letterSpacing: 2 }}>
          ━━ LỊCH TRÌNH CHI TIẾT ━━
        </div>
        {days.map((day) => {
          const isOpen = openDay === day.id;
          return (
            <div key={day.id} style={{ marginBottom: 10, background: "white", borderRadius: 14, border: `1px solid ${isOpen ? plan.accent : "#e7e5e4"}`, overflow: "hidden", boxShadow: isOpen ? "0 4px 12px rgba(180,90,20,0.12)" : "0 1px 3px rgba(0,0,0,0.04)" }}>
              <button
                onClick={() => setOpenDay(isOpen ? -1 : day.id)}
                style={{ width: "100%", padding: "14px 14px", background: isOpen ? "linear-gradient(135deg,#fffbeb,#fef3c7)" : "white", border: "none", cursor: "pointer", fontFamily: serif, textAlign: "left" }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: plan.accent, marginBottom: 4 }}>
                  {day.title} {isOpen ? "▼" : "▶"}
                </div>
                <div style={{ fontSize: 12, color: "#78716c", marginBottom: 6 }}>{day.subtitle}</div>
                <div style={{ fontSize: 11, color: "#a8a29e", fontStyle: "italic" }}>✨ {day.highlight}</div>
              </button>

              {isOpen && (
                <div style={{ padding: "4px 14px 14px" }}>
                  {day.items.map((it, idx) => (
                    <div key={idx} style={{ display: "flex", gap: 10, padding: "10px 0", borderTop: idx === 0 ? "1px dashed #e7e5e4" : "1px dashed #f5f5f4" }}>
                      <div style={{ flexShrink: 0, width: 76, fontSize: 10, color: plan.accent, fontWeight: 700, paddingTop: 2 }}>{it.t}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: "#1c1917", lineHeight: 1.5, marginBottom: 3 }}>{it.act}</div>
                        {it.note && <div style={{ fontSize: 11, color: "#78716c", lineHeight: 1.5, fontStyle: "italic" }}>{it.note}</div>}
                        <div style={{ fontSize: 10, color: "#a8a29e", marginTop: 3 }}>💰 {it.cost}</div>
                      </div>
                    </div>
                  ))}
                  {day.tips && day.tips.length > 0 && (
                    <div style={{ marginTop: 10, padding: 10, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#166534", marginBottom: 6 }}>💡 Pro tips cho ngày này</div>
                      {day.tips.map((tip, i) => (
                        <div key={i} style={{ fontSize: 11, color: "#14532d", lineHeight: 1.6, marginBottom: 3 }}>• {tip}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* BẢN ĐỒ ẨM THỰC */}
      <div style={{ margin: "20px 12px 8px", padding: 14, background: "white", borderRadius: 14, border: "1px solid #e7e5e4" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#92400e", marginBottom: 10 }}>🍽️ Bản Đồ Ẩm Thực Cố Đô</div>
        {Object.entries(foodMap).map(([cat, list]) => (
          <div key={cat} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#44403c", marginBottom: 4 }}>{cat}</div>
            <div style={{ fontSize: 11, color: "#78716c", lineHeight: 1.7 }}>{list.join(" · ")}</div>
          </div>
        ))}
        <div style={{ marginTop: 12, padding: 10, background: "#fffbeb", borderRadius: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>🎁 Quà mang về</div>
          {souvenirs.map((s, i) => (
            <div key={i} style={{ fontSize: 11, color: "#78716c", lineHeight: 1.7 }}>{s}</div>
          ))}
        </div>
      </div>

      {/* PACKING LIST */}
      <div style={{ margin: "8px 12px", padding: 14, background: "white", borderRadius: 14, border: "1px solid #e7e5e4" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#92400e", marginBottom: 10 }}>🎒 Packing List Couple</div>
        {packing.map((p, i) => (
          <div key={i} style={{ fontSize: 12, color: "#44403c", lineHeight: 1.9, display: "flex", gap: 8 }}>
            <span style={{ width: 22 }}>{p.icon}</span>
            <span>{p.item}</span>
          </div>
        ))}
      </div>

      {/* PRO TIPS */}
      <div style={{ margin: "8px 12px", padding: 14, background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", borderRadius: 14, border: "1px solid #bbf7d0" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#166534", marginBottom: 10 }}>💡 Pro Tips Từ Người Đi Rồi</div>
        {proTips.map((p, i) => (
          <div key={i} style={{ fontSize: 12, color: "#14532d", lineHeight: 1.6, marginBottom: 7, display: "flex", gap: 8 }}>
            <span style={{ width: 22, flexShrink: 0 }}>{p.icon}</span>
            <span>{p.tip}</span>
          </div>
        ))}
      </div>

      {/* BUDGET */}
      <div style={{ margin: "8px 12px", padding: 14, background: "white", borderRadius: 14, border: "1px solid #e7e5e4" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#92400e", marginBottom: 10 }}>💰 Dự Trù Chi Phí (cặp đôi, 5N4Đ)</div>
        {budget.map((b, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: i === 0 ? "none" : b.bold ? "2px solid #92400e" : "1px dashed #e7e5e4", fontSize: 12, fontWeight: b.bold ? 700 : 400, color: b.bold ? "#92400e" : "#44403c" }}>
            <span>{b.label}</span>
            <span style={{ fontWeight: 700 }}>{b.cost}</span>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{ padding: "16px 16px 32px", textAlign: "center", fontSize: 10, color: "#a8a29e", lineHeight: 1.7 }}>
        <div style={{ marginBottom: 4 }}>💍 Made with love for a sweet honeymoon in Ninh Bình</div>
        <div>Giá tham khảo 04/2026 · Nguồn: TikTok tips, Tràng An, VnExpress, BestPrice</div>
      </div>
    </div>
  );
}
