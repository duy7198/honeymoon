import { useState } from "react";

const destinations = [
  {
    id: 1, name: "Phú Quốc", region: "Nam", emoji: "🏝️", color: "#0891b2",
    weather: "Cuối mùa mưa, nắng trở lại. 27-31°C, mưa giảm dần cuối tháng 10",
    weatherScore: 4, totalCost: "10-18 triệu", costLevel: 3,
    flight: "1-2.5 triệu khứ hồi (bay 1h từ Tân Sơn Nhất)",
    hotelCost: "6-12 triệu (4 đêm, KS 4★)", foodCost: "1.5-2 triệu", activityCost: "1-2 triệu",
    hotel: "JW Marriott, Vinpearl Resort, InterContinental, La Veranda, Sol by Meliá",
    hotelRange: "1.5-8 triệu/đêm",
    food: "Hải sản tươi sống, gỏi cá trích, bún quậy, bánh canh chả cá, tiêu Phú Quốc, nước mắm truyền thống",
    attractions: "Bãi Sao, VinWonders, Grand World, Thị trấn Hoàng Hôn (Sunset Town), Safari, lặn san hô Hòn Thơm, chợ đêm Dinh Cậu, suối Tranh",
    itinerary: "Ngày 1: Bay từ TPHCM (1h), check-in resort, tắm biển Bãi Dài\nNgày 2: Tour 4 đảo Nam đảo, lặn ngắm san hô\nNgày 3: VinWonders + Safari hoặc Bãi Sao\nNgày 4: Thị trấn Hoàng Hôn (Sunset Town), chợ đêm Dinh Cậu, mua nước mắm, bay về TPHCM",
    reason: "Vogue xếp hạng top honeymoon 2026. Biển đẹp nhất VN, bay chỉ 1h từ TPHCM, giá rẻ mùa thấp điểm, nhiều resort 5★",
    tips: "Cuối tháng 10 thời tiết đẹp dần, giá phòng rẻ hơn mùa cao điểm 30-50%. Book vé Vietjet sớm có thể được giá từ 500K/chiều"
  },
  {
    id: 2, name: "Đà Nẵng", region: "Trung", emoji: "🌉", color: "#dc2626",
    weather: "⚠️ Mùa mưa cao điểm. 23-29°C, ~488mm mưa, nguy cơ bão",
    weatherScore: 2, totalCost: "8-25 triệu", costLevel: 3,
    flight: "1.5-3.5 triệu khứ hồi (bay 1h20 từ TSN)",
    hotelCost: "4-16 triệu (4 đêm)", foodCost: "1.2-2 triệu", activityCost: "1.5-3 triệu",
    hotel: "InterContinental Sơn Trà, Hyatt Regency, Pullman, Fusion Maia, Naman Retreat",
    hotelRange: "1-30 triệu/đêm",
    food: "Mì Quảng, bún chả cá, bánh tráng cuốn thịt heo, bánh xèo, hải sản Mỹ Khê, nem lụi",
    attractions: "Bà Nà Hills - Cầu Vàng, bán đảo Sơn Trà, Ngũ Hành Sơn, biển Mỹ Khê, cầu Rồng phun lửa",
    itinerary: "Ngày 1: Bay từ TPHCM (1h20), check-in, dạo biển Mỹ Khê, cầu Rồng\nNgày 2: Bà Nà Hills trọn ngày\nNgày 3: Sơn Trà + Ngũ Hành Sơn\nNgày 4: Mua sắm, ăn hải sản, bay về TPHCM",
    reason: "Thành phố đáng sống nhất VN, biển-núi-văn hóa, nhà hàng Michelin La Maison 1888. Giá rẻ mùa mưa",
    tips: "⚠️ Tháng 10 mưa NHIỀU NHẤT miền Trung! Giá phòng giảm 40-60%. Nên có kế hoạch dự phòng"
  },
  {
    id: 3, name: "Hội An", region: "Trung", emoji: "🏮", color: "#f59e0b",
    weather: "⚠️ Mùa mưa, nguy cơ ngập lụt. 24-27°C",
    weatherScore: 2, totalCost: "7-15 triệu", costLevel: 2,
    flight: "1.5-3.5 triệu khứ hồi (bay Đà Nẵng + xe 30p ~150K)",
    hotelCost: "3.2-10 triệu (4 đêm)", foodCost: "1-1.5 triệu", activityCost: "800K-2 triệu",
    hotel: "Four Seasons The Nam Hai, Victoria Hội An, Anantara, Palm Garden, Little Riverside",
    hotelRange: "800K-15 triệu/đêm",
    food: "Cao lầu, mì Quảng, cơm gà Hội An, bánh mì Phượng, hoành thánh, chè bắp, bánh bao bánh vạc",
    attractions: "Phố cổ đèn lồng, chùa Cầu, Cù Lao Chàm, Thánh địa Mỹ Sơn, làng rau Trà Quế, thả đèn hoa đăng",
    itinerary: "Ngày 1: Bay TPHCM→Đà Nẵng (1h20), xe 30p đến Hội An, dạo phố cổ, thả đèn hoa đăng\nNgày 2: Cù Lao Chàm lặn biển\nNgày 3: Mỹ Sơn + Trà Quế\nNgày 4: May áo dài, mua sắm, về TPHCM",
    reason: "UNESCO, lãng mạn nhất VN với đèn lồng lung linh, Lễ hội Hoa Đăng rằm, ẩm thực tuyệt vời, chi phí thấp",
    tips: "Lễ hội Hoa Đăng rằm T10 âm lịch rất đẹp. Cần mang áo mưa. Kết hợp Đà Nẵng + Hội An tiện"
  },
  {
    id: 4, name: "Côn Đảo", region: "Nam", emoji: "🐢", color: "#059669",
    weather: "Chuyển mùa, biển lặng dần. 26-30°C, mưa giảm cuối tháng",
    weatherScore: 3, totalCost: "15-35 triệu", costLevel: 4,
    flight: "2-4 triệu khứ hồi (bay 45 phút từ TSN, ít chuyến)",
    hotelCost: "8-25 triệu (4 đêm)", foodCost: "2-4 triệu", activityCost: "1.5-3 triệu",
    hotel: "Six Senses Con Dao (5★), Poulo Condor, Con Dao Resort, Gio Bien Villa",
    hotelRange: "2-50 triệu/đêm",
    food: "Tôm hùm, cua hoàng đế, ốc vú nàng, bào ngư, cháo nhum, gỏi bồn bồn",
    attractions: "Bãi Đầm Trầu, xem rùa đẻ trứng, lặn biển Hòn Bảy Cạnh, Nhà tù Côn Đảo, Nghĩa trang Hàng Dương",
    itinerary: "Ngày 1: Bay từ TPHCM (45 phút!), nhận phòng Six Senses, tắm biển\nNgày 2: Tour lặn biển + xem rùa đẻ trứng\nNgày 3: Di tích lịch sử, Bãi Đầm Trầu\nNgày 4: Spa nghỉ dưỡng, bay về TPHCM",
    reason: "Vogue xếp hạng #5 thế giới cho honeymoon 2026! Bay chỉ 45 phút từ TPHCM. Hoang sơ, riêng tư, Six Senses đẳng cấp",
    tips: "Vé máy bay Côn Đảo hay hết sớm — book trước 2-3 tháng! Mùa rùa đẻ trứng T6-T10"
  },
  {
    id: 5, name: "Đà Lạt", region: "Tây Nguyên", emoji: "🌸", color: "#a855f7",
    weather: "Cuối mùa mưa, se lạnh lãng mạn. 15-24°C",
    weatherScore: 3, totalCost: "5-12 triệu", costLevel: 1,
    flight: "0.8-2.5 triệu khứ hồi (bay 50p) HOẶC xe giường nằm ~400K (6-7h)",
    hotelCost: "2-6 triệu (4 đêm)", foodCost: "800K-1.2 triệu", activityCost: "500K-1.5 triệu",
    hotel: "Ana Mandara Villas, Terracotta Hotel, Swiss-Bélresort, DaLat Palace Heritage",
    hotelRange: "500K-5 triệu/đêm",
    food: "Bánh tráng nướng, lẩu gà lá é, sữa đậu nành nóng, kem bơ, atiso hầm, rượu vang Đà Lạt",
    attractions: "Thung lũng Tình Yêu, Hồ Xuân Hương, Đồi Mộng Mơ, Thiền Viện Trúc Lâm, đỉnh Langbiang, vườn hoa",
    itinerary: "Ngày 1: Bay/xe từ TPHCM, check-in, Hồ Xuân Hương, cafe rooftop\nNgày 2: Langbiang + Thung lũng Tình Yêu\nNgày 3: Thiền viện Trúc Lâm + vườn hoa\nNgày 4: Chợ Đà Lạt, mua đặc sản, về TPHCM",
    reason: "💚 RẺ NHẤT TOP 10! Thành phố ngàn hoa, 15-24°C lãng mạn, kiến trúc Pháp cổ. Đi xe giường nằm tiết kiệm cực kỳ",
    tips: "Đi xe đêm 200K/chiều, tiết kiệm cả vé bay lẫn 1 đêm KS. Tháng 10 mùa thấp điểm giá rất rẻ"
  },
  {
    id: 6, name: "Vịnh Hạ Long", region: "Bắc", emoji: "⛵", color: "#1d4ed8",
    weather: "☀️ Mùa thu đẹp nhất năm! 22-28°C, trời trong, biển lặng",
    weatherScore: 5, totalCost: "12-25 triệu", costLevel: 3,
    flight: "2-4.5 triệu khứ hồi (bay 2h đến Hà Nội) + xe cao tốc 1.5h ~300K",
    hotelCost: "6-15 triệu (du thuyền 2 đêm + KS HN 2 đêm)", foodCost: "1.5-3 triệu", activityCost: "1-2 triệu",
    hotel: "Du thuyền 5★: Heritage Cruises, Paradise Elegance, Stellar of the Seas",
    hotelRange: "3-15 triệu/đêm (du thuyền all-inclusive)",
    food: "Hải sản tươi trên thuyền, chả mực Hạ Long, sá sùng, bún ốc, phở Hà Nội",
    attractions: "Hang Sửng Sốt, đảo Ti Tóp, Vịnh Lan Hạ, chèo kayak, hang Luồn, làng chài Cửa Vạn",
    itinerary: "Ngày 1: Bay TPHCM→Hà Nội (2h), dạo phố cổ mùa thu\nNgày 2: Xe đến Hạ Long (1.5h), lên du thuyền, hoàng hôn trên vịnh\nNgày 3: Kayak + hang động + bơi biển\nNgày 4: Rời thuyền, về Hà Nội, bay về TPHCM",
    reason: "Di sản UNESCO, Kỳ quan thiên nhiên TG. THÁNG 10 = MÙA ĐẸP NHẤT: biển lặng, trời trong. Du thuyền qua đêm cực lãng mạn",
    tips: "Book du thuyền 2 đêm trải nghiệm trọn vẹn. Kết hợp 1 ngày Hà Nội mùa thu cực thơ mộng"
  },
  {
    id: 7, name: "Sa Pa", region: "Bắc", emoji: "🏔️", color: "#365314",
    weather: "☀️ Mùa lúa chín vàng rực rỡ! 12-20°C, khô ráo",
    weatherScore: 5, totalCost: "9-16 triệu", costLevel: 2,
    flight: "2-4.5 triệu khứ hồi (bay 2h đến HN) + xe/tàu đêm 5-6h ~600K",
    hotelCost: "3.2-10 triệu (4 đêm)", foodCost: "1-1.5 triệu", activityCost: "800K-2 triệu",
    hotel: "Topas Ecolodge, Hotel de la Coupole, Pao's Sapa Leisure, BB Sapa Resort",
    hotelRange: "800K-8 triệu/đêm",
    food: "Thắng cố, cá suối nướng, xôi ngũ sắc, thịt trâu gác bếp, rượu San Lùng, lẩu cá tầm",
    attractions: "Ruộng bậc thang Mường Hoa, đỉnh Fansipan, bản Cát Cát, cầu kính Rồng Mây",
    itinerary: "Ngày 1: Bay TPHCM→Hà Nội (2h), tàu/xe đêm đến Sa Pa\nNgày 2: Trek Mường Hoa ngắm lúa chín vàng\nNgày 3: Fansipan cáp treo (nóc nhà Đông Dương)\nNgày 4: Bản Cát Cát, xe về Hà Nội, bay về TPHCM",
    reason: "Tháng 10 RUỘNG BẬC THANG LÚA CHÍN VÀNG — đẹp nhất năm! Se lạnh 12-20°C cực lãng mạn. Văn hóa bản làng độc đáo",
    tips: "Di chuyển xa nhất (bay 2h + xe 5h). Đi tàu đêm tiết kiệm thời gian. Mang áo ấm + giày trekking"
  },
  {
    id: 8, name: "Nha Trang", region: "Trung Nam", emoji: "🏖️", color: "#0ea5e9",
    weather: "⚠️ Đầu mùa mưa. 24-30°C, mưa tăng, biển có sóng",
    weatherScore: 2, totalCost: "8-20 triệu", costLevel: 2,
    flight: "1-2.5 triệu khứ hồi (bay 1h đến Cam Ranh) + xe 35p ~150K",
    hotelCost: "4-12 triệu (4 đêm)", foodCost: "1.2-2 triệu", activityCost: "1-3 triệu",
    hotel: "Six Senses Ninh Vân Bay, Vinpearl, Evason Ana Mandara, Mia Resort, Sheraton",
    hotelRange: "1-40 triệu/đêm",
    food: "Bún sứa, nem nướng Ninh Hòa, bánh căn, bún cá, hải sản Hòn Chồng, yến sào",
    attractions: "Vinpearl Land, Hòn Mun lặn biển, Tháp Bà Ponagar, Hòn Tằm, bùn khoáng nóng",
    itinerary: "Ngày 1: Bay TPHCM→Cam Ranh (1h), xe 35p, tắm bùn khoáng nóng\nNgày 2: Tour 4 đảo hoặc Six Senses Ninh Vân Bay\nNgày 3: Vinpearl Land + Tháp Bà\nNgày 4: Spa, mua sắm, bay về TPHCM",
    reason: "Biển 7km đẹp, Six Senses Ninh Vân Bay đảo riêng. Bay 1h từ TPHCM. Tắm bùn khoáng nóng đôi. Giá rẻ mùa thấp điểm",
    tips: "⚠️ Tháng 10 mưa tăng. Nhưng giá giảm mạnh. Six Senses Ninh Vân Bay trên đảo riêng cực kỳ riêng tư"
  },
  {
    id: 9, name: "Ninh Bình", region: "Bắc", emoji: "🛶", color: "#78716c",
    weather: "Mùa thu đẹp. 22-28°C, ít mưa, mát mẻ",
    weatherScore: 4, totalCost: "6-12 triệu", costLevel: 1,
    flight: "2-4.5 triệu khứ hồi (bay 2h đến HN) + xe 1.5h ~200K",
    hotelCost: "2-5 triệu (4 đêm)", foodCost: "800K-1.2 triệu", activityCost: "500K-1 triệu",
    hotel: "Ninh Binh Hidden Charm, Tam Coc Garden, Emeralda Resort, Hang Múa Ecolodge",
    hotelRange: "500K-3 triệu/đêm",
    food: "Cơm cháy, dê núi tái chanh, ốc núi, cá rô Khánh Thành, miến lươn",
    attractions: "Tràng An (UNESCO), Tam Cốc - Bích Động, chùa Bái Đính, Hang Múa, cố đô Hoa Lư",
    itinerary: "Ngày 1: Bay TPHCM→Hà Nội (2h), xe 1.5h đến Ninh Bình, Tràng An\nNgày 2: Tam Cốc + Hang Múa\nNgày 3: Chùa Bái Đính + Hoa Lư\nNgày 4: Vân Long, về Hà Nội, bay TPHCM",
    reason: "'Hạ Long trên cạn', Di sản UNESCO, bối cảnh King Kong. Chi phí thấp. Thời tiết T10 đẹp. Thuyền trên sông cực lãng mạn",
    tips: "Chi phí thấp nhất nhóm miền Bắc. Kết hợp 1 ngày Hà Nội mùa thu rất thơ mộng"
  },
  {
    id: 10, name: "Vĩnh Hy (Ninh Thuận)", region: "Trung Nam", emoji: "🌅", color: "#b45309",
    weather: "☀️ Nắng đẹp, khô ráo nhất miền Trung! 26-32°C",
    weatherScore: 4, totalCost: "15-60+ triệu", costLevel: 5,
    flight: "1-2.5 triệu khứ hồi (bay 1h đến Cam Ranh) + xe 75p ~500K",
    hotelCost: "12-200+ triệu (4 đêm, Amanoi từ 24tr/đêm)", foodCost: "2-5 triệu", activityCost: "1-3 triệu",
    hotel: "Amanoi (6★ — từ 24 triệu/đêm), Anya Premier, Sailing Club Vĩnh Hy",
    hotelRange: "3-250 triệu/đêm",
    food: "Tôm hùm, cua huỳnh đế, mực vịnh Vĩnh Hy, nho Ninh Thuận, cừu nướng",
    attractions: "Vịnh Vĩnh Hy, VQG Núi Chúa (UNESCO), Hang Rái, bãi cát trắng, vườn nho",
    itinerary: "Ngày 1: Bay TPHCM→Cam Ranh (1h), xe 75p, check-in Amanoi\nNgày 2: Yoga vách núi, kayak, lặn biển\nNgày 3: Hang Rái + vườn nho\nNgày 4: Spa toàn ngày, xe ra Cam Ranh, bay về TPHCM",
    reason: "Resort 6★ Amanoi — nơi Midu nghỉ trăng mật. Riêng tư tuyệt đối trong khu UNESCO. 1/4 vịnh đẹp nhất VN. T10 NẮNG ĐẸP NHẤT miền Trung",
    tips: "Phân khúc SIÊU SANG. Chọn Anya Premier (3-5tr/đêm) nếu muốn tiết kiệm mà vẫn ngắm vịnh"
  }
];

const weatherStars = (s) => "★".repeat(s) + "☆".repeat(5 - s);

export default function App() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? destinations : destinations.filter(d => {
    if (filter === "weather") return d.weatherScore >= 4;
    if (filter === "budget") return d.costLevel <= 2;
    if (filter === "luxury") return d.costLevel >= 4;
    if (filter === "beach") return [1,2,4,8,10].includes(d.id);
    if (filter === "romantic") return [1,3,6].includes(d.id);
    return true;
  });

  return (
    <div style={{ fontFamily: "'Crimson Text','Noto Serif',Georgia,serif", background: "linear-gradient(135deg,#fdf6e3 0%,#fef3c7 30%,#fdf2f8 70%,#ede9fe 100%)", minHeight: "100vh", color: "#1c1917" }}>
      <div style={{ background: "linear-gradient(180deg,rgba(120,53,15,0.08) 0%,transparent 100%)", padding: "32px 20px 20px", textAlign: "center", borderBottom: "1px solid rgba(180,130,60,0.15)" }}>
        <div style={{ fontSize: 13, letterSpacing: 4, color: "#92400e", textTransform: "uppercase", marginBottom: 6 }}>Vietnam Honeymoon Guide 2026</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 4px", background: "linear-gradient(135deg,#92400e,#b45309,#d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.2 }}>Top 10 Nơi Nghỉ Tuần Trăng Mật</h1>
        <div style={{ fontSize: 13, color: "#78716c", marginTop: 4 }}>📅 28–31/10/2026 · 4 ngày 4 đêm · 🛫 Từ TP.HCM</div>
        <div style={{ marginTop: 10, padding: "8px 14px", background: "#fef9c3", borderRadius: 10, fontSize: 12, color: "#854d0e", display: "inline-block", border: "1px solid #fde68a" }}>
          ✅ Tất cả chi phí đã bao gồm vé máy bay/xe khứ hồi từ TP.HCM
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, padding: "14px 16px", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        {[{key:"all",label:"Tất cả"},{key:"weather",label:"☀️ Thời tiết đẹp"},{key:"budget",label:"💰 Tiết kiệm"},{key:"luxury",label:"💎 Sang trọng"},{key:"beach",label:"🏖️ Biển"},{key:"romantic",label:"🏮 Lãng mạn"}].map(f => (
          <button key={f.key} onClick={() => {setFilter(f.key);setSelected(null);}} style={{ padding:"6px 14px", borderRadius:20, border:filter===f.key?"2px solid #b45309":"1px solid #d6d3d1", background:filter===f.key?"#fef3c7":"white", color:filter===f.key?"#92400e":"#57534e", fontSize:13, fontWeight:filter===f.key?700:400, cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit" }}>{f.label}</button>
        ))}
      </div>

      <div style={{ padding: "0 16px 16px" }}>
        {filtered.map(d => (
          <div key={d.id} onClick={() => setSelected(selected===d.id?null:d.id)} style={{ background:"white", borderRadius:16, marginBottom:12, overflow:"hidden", border:selected===d.id?`2px solid ${d.color}`:"1px solid #e7e5e4", boxShadow:selected===d.id?`0 4px 20px ${d.color}22`:"0 1px 4px rgba(0,0,0,0.04)", cursor:"pointer", transition:"all 0.25s" }}>
            <div style={{ display:"flex", alignItems:"center", padding:"14px 16px", gap:12 }}>
              <div style={{ width:48, height:48, borderRadius:12, background:`linear-gradient(135deg,${d.color}18,${d.color}30)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{d.emoji}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                  <span style={{ fontSize:11, background:`${d.color}15`, color:d.color, padding:"2px 8px", borderRadius:10, fontWeight:600 }}>#{destinations.indexOf(d)+1}</span>
                  <span style={{ fontSize:10, color:"#a8a29e", textTransform:"uppercase", letterSpacing:1 }}>{d.region}</span>
                  {d.weatherScore>=4 && <span style={{ fontSize:9, background:"#dcfce7", color:"#166534", padding:"1px 6px", borderRadius:8, fontWeight:600 }}>☀️ T10 đẹp</span>}
                </div>
                <div style={{ fontSize:18, fontWeight:700, marginTop:2, color:"#292524" }}>{d.name}</div>
              </div>
              <div style={{ textAlign:"right", flexShrink:0 }}>
                <div style={{ fontSize:10, color:"#78716c" }}>Trọn gói/người</div>
                <div style={{ fontSize:14, fontWeight:700, color:d.color }}>{d.totalCost}</div>
              </div>
            </div>
            <div style={{ display:"flex", padding:"0 16px 12px", gap:16, fontSize:12 }}>
              <div><span style={{color:"#a8a29e"}}>Thời tiết </span><span style={{color:"#f59e0b"}}>{weatherStars(d.weatherScore)}</span></div>
              <div><span style={{color:"#a8a29e"}}>Phân khúc </span><span style={{color:"#059669",fontWeight:600}}>{d.costLevel<=2?"💚 Tiết kiệm":d.costLevel<=3?"🟡 Trung bình":d.costLevel===4?"🟠 Cao cấp":"🔴 Siêu sang"}</span></div>
            </div>

            {selected===d.id && (
              <div style={{ borderTop:"1px solid #f5f5f4", padding:16, background:"#fafaf9" }}>
                <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:12, padding:12, marginBottom:16 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:"#92400e", marginBottom:8 }}>💰 CHI TIẾT CHI PHÍ (1 người, từ TPHCM)</div>
                  {[{l:"✈️ Vé máy bay/xe khứ hồi",v:d.flight},{l:"🏨 Khách sạn 4 đêm",v:d.hotelCost},{l:"🍜 Ăn uống 4 ngày",v:d.foodCost},{l:"🎯 Tham quan & vé",v:d.activityCost}].map((c,i) => (
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", fontSize:13, borderBottom:i<3?"1px dashed #fde68a":"none" }}>
                      <span style={{color:"#78716c"}}>{c.l}</span>
                      <span style={{fontWeight:600,color:"#44403c",textAlign:"right",maxWidth:"55%"}}>{c.v}</span>
                    </div>
                  ))}
                  <div style={{ display:"flex", justifyContent:"space-between", marginTop:8, paddingTop:8, borderTop:"2px solid #f59e0b", fontSize:15, fontWeight:700 }}>
                    <span style={{color:"#92400e"}}>TỔNG CỘNG</span>
                    <span style={{color:d.color}}>{d.totalCost}</span>
                  </div>
                </div>
                {[{i:"🌤️",l:"Thời tiết T10",v:d.weather},{i:"🏨",l:"Khách sạn gợi ý",v:`${d.hotel}\n📌 Giá: ${d.hotelRange}`},{i:"🍜",l:"Món ăn đặc sản",v:d.food},{i:"📍",l:"Điểm tham quan",v:d.attractions},{i:"📋",l:"Lịch trình 4 ngày (từ TPHCM)",v:d.itinerary},{i:"💕",l:"Tại sao nên đi?",v:d.reason},{i:"💡",l:"Mẹo hay",v:d.tips}].map((item,idx) => (
                  <div key={idx} style={{ marginBottom:14, paddingBottom:idx<6?14:0, borderBottom:idx<6?"1px solid #f0ece8":"none" }}>
                    <div style={{ fontSize:12, fontWeight:700, color:d.color, marginBottom:4, textTransform:"uppercase", letterSpacing:0.5 }}>{item.i} {item.l}</div>
                    <div style={{ fontSize:14, lineHeight:1.6, color:"#44403c", whiteSpace:"pre-line" }}>{item.v}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ margin:"8px 16px 24px", background:"white", borderRadius:16, overflow:"hidden", border:"1px solid #e7e5e4" }}>
        <div style={{ padding:"14px 16px", background:"linear-gradient(135deg,#fef3c7,#fde68a)", borderBottom:"1px solid #fbbf24", fontSize:15, fontWeight:700, color:"#92400e" }}>📊 Bảng So Sánh Nhanh (trọn gói từ TPHCM/người)</div>
        <div style={{ overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
          <table style={{ width:"100%", minWidth:620, borderCollapse:"collapse", fontSize:12 }}>
            <thead><tr style={{background:"#fafaf9"}}>
              {["Địa điểm","Di chuyển","Tổng/người","Thời tiết","Phân khúc"].map(h => (
                <th key={h} style={{ padding:"10px 8px", textAlign:"left", fontWeight:700, color:"#78716c", borderBottom:"2px solid #e7e5e4", whiteSpace:"nowrap", fontSize:11, textTransform:"uppercase", letterSpacing:0.5 }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>{destinations.map((d,i) => (
              <tr key={d.id} style={{ borderBottom:"1px solid #f5f5f4", background:i%2===0?"white":"#fafaf9" }}>
                <td style={{padding:"10px 8px",fontWeight:700,whiteSpace:"nowrap"}}>{d.emoji} {d.name}</td>
                <td style={{padding:"10px 8px",fontSize:11,color:"#78716c"}}>{{1:"Bay 1h",2:"Bay 1h20",3:"Bay 1h20+Xe",4:"Bay 45p",5:"Bay 50p/Xe 6h",6:"Bay 2h+Xe 1.5h",7:"Bay 2h+Xe 5h",8:"Bay 1h+Xe",9:"Bay 2h+Xe 1.5h",10:"Bay 1h+Xe"}[d.id]}</td>
                <td style={{padding:"10px 8px",fontWeight:700,color:d.color}}>{d.totalCost}</td>
                <td style={{padding:"10px 8px",color:"#f59e0b",letterSpacing:1}}>{weatherStars(d.weatherScore)}</td>
                <td style={{padding:"10px 8px",fontSize:11}}>{d.costLevel<=2?"💚 Tiết kiệm":d.costLevel<=3?"🟡 TB":d.costLevel===4?"🟠 Cao cấp":"🔴 Siêu sang"}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>

      <div style={{ margin:"0 16px 24px", padding:16, background:"linear-gradient(135deg,#ecfdf5,#f0fdf4)", borderRadius:16, border:"1px solid #bbf7d0" }}>
        <div style={{ fontSize:15, fontWeight:700, color:"#166534", marginBottom:12 }}>🏆 Gợi Ý Theo Nhu Cầu</div>
        {[
          {c:"🥇 Tổng thể tốt nhất",p:"🏝️ Phú Quốc",d:"Cân bằng giá–thời tiết–trải nghiệm. Thị trấn Hoàng Hôn, VinWonders, biển đẹp. Bay 1h từ TPHCM"},
          {c:"☀️ Thời tiết đẹp nhất T10",p:"⛵ Hạ Long & 🏔️ Sa Pa (5★)",d:"Miền Bắc mùa thu tuyệt đẹp, lúa chín vàng"},
          {c:"💰 Tiết kiệm nhất",p:"🌸 Đà Lạt (5-12tr) & 🛶 Ninh Bình (6-12tr)",d:"Đà Lạt đi xe giường nằm chỉ 400K khứ hồi"},
          {c:"💎 Sang trọng nhất",p:"🌅 Vĩnh Hy (Amanoi 6★) & 🐢 Côn Đảo (Six Senses)",d:"Riêng tư tuyệt đối, đẳng cấp quốc tế"},
          {c:"🏮 Lãng mạn nhất",p:"🏮 Hội An + ⛵ Hạ Long + 🏝️ Phú Quốc",d:"Đèn lồng lung linh, du thuyền dưới trăng, Cầu Hôn hoàng hôn Phú Quốc"},
          {c:"✈️ Gần TPHCM nhất",p:"🐢 Côn Đảo (45p) & 🌸 Đà Lạt (50p/6h xe)",d:"Tiết kiệm thời gian di chuyển tối đa"},
        ].map((r,i) => (
          <div key={i} style={{ marginBottom:i<5?12:0, paddingBottom:i<5?12:0, borderBottom:i<5?"1px solid #d1fae5":"none" }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#059669", marginBottom:2 }}>{r.c}</div>
            <div style={{ fontSize:14, fontWeight:600, color:"#1c1917" }}>{r.p}</div>
            <div style={{ fontSize:12, color:"#6b7280", marginTop:1 }}>{r.d}</div>
          </div>
        ))}
      </div>

      <div style={{ padding:"12px 20px 32px", textAlign:"center", fontSize:11, color:"#a8a29e", lineHeight:1.6 }}>
        💰 Giá tham khảo cho 1 người, trọn gói từ TPHCM: vé bay/xe khứ hồi + KS 4★ + ăn uống + tham quan.
        <br/>👫 Cho cặp đôi: nhân ~×1.6 (vì chia đôi phòng KS).
        <br/>Nên book trước 1-2 tháng để có giá tốt nhất.
        <br/>Nguồn: Vietnam Airlines, Vietjet, BestPrice, Tripadvisor, Vogue, VnExpress — 04/2026
      </div>
    </div>
  );
}
