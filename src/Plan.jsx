import { useState, useEffect, useRef } from "react";

// =============== DATA ===============
const plan = {
  name: "Ninh Bình",
  emoji: "🛶",
  color: "#78716c",
  accent: "#b45309",
  vibe: "Hạ Long trên cạn · Cố đô ngàn năm · Đồng lúa vàng",
  tagline: "Thuyền Tràng An · Đỉnh Hang Múa · Phố cổ lên đèn",
  dates: "27–31/10/2026",
  startDate: "2026-10-27",
  endDate: "2026-10-31",
  duration: "4 ngày 4 đêm",
  from: "TP.HCM",
  tier: {
    name: "🟡 Lãng Mạn",
    range: "~12–17tr/người · Cặp đôi ~10–14tr/người",
    flight: "VNA SGN↔HAN giờ đẹp · 2.5–3.5tr khứ hồi",
    hotel: "Resort 4★: Emeralda / Tam Coc Garden / Hidden Charm / Lasen Village",
    hotelPrice: "1.2–2tr/đêm · Tổng ~6tr/4đ",
    transport: "Xe riêng HN↔NB · 400K/chiều",
    total: "💰 10–14tr/người · ~24–32tr cho cặp đôi",
  },
};

const quickStats = [
  { icon: "🌡️", label: "Thời tiết T10", value: "22–28°C", sub: "Mát, ít mưa" },
  { icon: "🛣️", label: "Khoảng cách", value: "95km", sub: "HN → NB · 1.5h" },
  { icon: "🌅", label: "Bình minh/Hoàng hôn", value: "5:45 / 17:30", sub: "Tháng 10" },
  { icon: "💵", label: "Tiền tệ", value: "VND", sub: "1USD ≈ 24,500đ" },
  { icon: "🗣️", label: "Ngôn ngữ", value: "Tiếng Việt", sub: "+ English ở resort" },
  { icon: "🔌", label: "Ổ cắm", value: "Type A/C", sub: "220V · 50Hz" },
];

const days = [
  {
    id: 0,
    title: "Ngày 1 — Di Sản Tràng An",
    dateLabel: "27/10 · Thứ Ba",
    subtitle: "🛫 Bay từ SGN · Check-in resort · Thuyền Tràng An 3h",
    highlight: "🛶 Tràng An tuyến 2 — thuê thuyền riêng cho 2",
    outfit: "Áo dài nhẹ / váy maxi chụp thuyền · Giày thể thao êm · Nón lá",
    weather: "Sáng mát 22°C · Trưa nắng 27°C · Chiều có thể mưa rào nhẹ",
    planB: "Nếu mưa to: đổi Tràng An sang ngày 2, dành hôm nay đi chùa Bái Đính (có mái che)",
    items: [
      { t: "07:00–09:00", act: "✈️ VNA SGN → HAN", note: "VN246 06:00→08:10 / VN248 07:00→09:10 · Đặt ghế 18A/B cho view", cost: "~1.5tr/chiều" },
      { t: "09:30–11:30", act: "🚐 Xe riêng HN → NB (1.5h)", note: "Đón tận cổng Nội Bài · Dừng trạm Phủ Lý nếu cần · Xe limousine 9 chỗ", cost: "400K/ng" },
      { t: "12:00–13:00", act: "🏨 Check-in resort 4★ (Emeralda / Lasen Village)", note: "Yêu cầu honeymoon setup trước (hoa, nến, trái cây, bong bóng)", cost: "—" },
      { t: "13:00–14:00", act: "🍽️ Set lunch đặc sản — dê tái chanh, cơm cháy sốt dê", note: "Quán gợi ý: Dê 1969 / Áp Xuân Vinh / Chính Thu · Gọi trước để đặt bàn view", cost: "220–280K/ng" },
      { t: "14:30–17:30", act: "🛶 Tràng An tuyến 2 — thuyền riêng 3h", note: "⚠️ ĐẶT VÉ ONLINE TỪ TỐI TRƯỚC · Ăn no + đi vệ sinh trước khi lên thuyền · Tuyến 2 qua hang Sáng, hang Tối, hang Địa Linh", cost: "300K × 2 + thuê riêng 600K + tip 100K" },
      { t: "17:45–18:30", act: "☕ Offy Highlands Tràng An — sunset cocktail", note: "View ra Bến An cực đẹp, có ổ điện sạc pin · Thử Tràng An Latte", cost: "120K/ly" },
      { t: "19:00–21:00", act: "🕯️ Romantic dinner resort — dê 7 món + rượu vang", note: "Đặt bàn view hồ sen/cánh đồng lúa · Yêu cầu bánh kỷ niệm", cost: "450–550K/ng" },
    ],
    tips: [
      "🎫 Vé Tràng An: mua online tại www.trangan.vn tối trước, tránh xếp hàng sáng",
      "🚻 3 tiếng trên thuyền không có toilet — đi trước khi lên",
      "🍱 Được mang đồ ăn nhẹ lên thuyền (nước, trái cây, bánh ngọt)",
      "💵 Chuẩn bị tiền lẻ 50–100K tip cô/chú lái đò (tự nguyện)",
    ],
    journalPrompt: "Cảm giác đầu tiên khi chiếc thuyền rẽ vào hang tối Tràng An là gì? Điều nào khiến em nhớ nhất về ngày đầu tiên ở cố đô?",
  },
  {
    id: 1,
    title: "Ngày 2 — Tam Cốc & Ngọa Long",
    dateLabel: "28/10 · Thứ Tư",
    subtitle: "🌅 Sông Ngô Đồng · Leo 500 bậc · Hoàng hôn",
    highlight: "🏔️ Hang Múa hoàng hôn 'Ngọa Long' — khoảnh khắc đẹp nhất",
    outfit: "Đồ thể thao nhẹ · Giày bám tốt (leo núi) · Áo khoác mỏng sáng sớm",
    weather: "Sáng 21°C · Trưa 28°C · Chiều có gió nhẹ trên núi",
    planB: "Nếu mưa: thay Hang Múa bằng Thung Nham (vườn chim có mái che) + spa dài hơn",
    items: [
      { t: "07:00–07:30", act: "🥐 Buffet sáng resort", note: "Ăn chắc bụng trước khi leo núi · Thử phở Ninh Bình nếu có", cost: "Đã gồm" },
      { t: "08:00–10:30", act: "🛶 Tam Cốc thuyền đôi sông Ngô Đồng", note: "Đi sớm vắng, sương khói thơ mộng · Mùa lúa vàng T5–6 đẹp nhất · T10 lúa xanh mướt", cost: "Vé 200K + tip 50K" },
      { t: "11:00–12:30", act: "🏔️ Hang Múa — chinh phục 500 bậc", note: "💪 Giày thể thao êm · 📸 Chụp couple 'Ngọa Long' panoramic trên đỉnh", cost: "Vé 100K" },
      { t: "13:00–14:00", act: "🍽️ Cơm niêu view đồng lúa", note: "Nhà hàng Trung Tuyết / Hoàng Giang Tam Cốc · Cơm niêu cá kho tộ", cost: "180–220K/ng" },
      { t: "14:30–16:30", act: "💆 Couple spa resort 90 phút", note: "Hot stone / aromatherapy / thảo dược · Yêu cầu phòng đôi", cost: "800K–1.2tr/cặp" },
      { t: "17:00–18:30", act: "🚲 Đạp xe đôi sunset qua ruộng lúa → đền Thái Vi", note: "Quãng đường bằng phẳng, dễ đi · Thuê ~30K/chiếc · Đền Thái Vi thờ nhà Trần", cost: "60K" },
      { t: "19:00–21:00", act: "🕯️ Candle-light dinner bên hồ sen resort", note: "Yêu cầu set menu romantic + bánh kỷ niệm", cost: "500–700K/ng" },
    ],
    tips: [
      "🌅 Ngắm hoàng hôn Hang Múa đẹp hơn bình minh — lên khoảng 16:00 để 17:30 có vị trí đẹp",
      "👟 500 bậc đá không dốc nhưng hơi trơn — giày bám là bắt buộc",
      "📸 Đỉnh Hang Múa có 2 hướng chụp: rồng đá (Ngọa Long) + toàn cảnh Tam Cốc",
      "💧 Mang 1 chai nước 500ml, trên đỉnh không có chỗ mua",
    ],
    journalPrompt: "Khi đứng trên đỉnh Hang Múa, thế giới dưới chân mình nhìn như thế nào? Điều gì khiến em muốn nắm tay người bên cạnh chặt hơn?",
  },
  {
    id: 2,
    title: "Ngày 3 — Tâm Linh & Tuyệt Tình Cốc",
    dateLabel: "29/10 · Thứ Năm",
    subtitle: "🪷 Chùa chuông gió · 💎 Nước xanh ngọc bích",
    highlight: "💎 Tuyệt Tình Cốc — góc ảnh couple signature",
    outfit: "Áo dài cặp đôi (chùa) · Thay váy/quần lịch sự sau · Khăn choàng nếu cần",
    weather: "Cả ngày 22–27°C · Khô ráo · Lý tưởng để chụp ảnh",
    planB: "Nếu mưa: Tuyệt Tình Cốc vẫn đẹp trong mưa nhẹ (nước càng xanh), bỏ Bích Động",
    items: [
      { t: "07:30–08:30", act: "🥐 Buffet sáng thong thả", note: "Sáng nay đi tâm linh nên mặc áo kín đáo", cost: "Đã gồm" },
      { t: "09:00–11:00", act: "🪷 Địa Tạng Phi Lai Tự (cách ~45 phút, huyện Thanh Liêm, Hà Nam)", note: "Chùa chuông gió chữa lành · Ảnh áo dài couple · Mặc áo tay dài, quần dài · Giày dễ tháo", cost: "Miễn phí + xe 300K khứ hồi" },
      { t: "11:30–12:30", act: "🍽️ Lunch gỏi cá nhệch Kim Sơn / bánh đa cá rô đồng", note: "Đặc sản khó tìm ở chỗ khác · Nhà hàng Hoa Lư Tửu Quán nổi tiếng", cost: "200K/ng" },
      { t: "13:30–15:30", act: "💎 Tuyệt Tình Cốc (Động Am Tiên)", note: "Nước xanh ngọc bích · Góc ảnh cặp đôi viral TikTok · Legend: Thái hậu Dương Vân Nga tu hành", cost: "Vé 45K/ng" },
      { t: "16:00–17:30", act: "🪷 Chùa Bích Động", note: "Mùa hoa súng T10–12 cực đẹp · Trèo lên tầng 3 ngắm toàn cảnh", cost: "Vé 20K" },
      { t: "18:00–19:00", act: "☕ 007 Đam Khê Specialty Coffee Tam Cốc", note: "Cafe/matcha ổn nhất Tam Cốc theo review · Chủ quán là fan máy ảnh", cost: "100K/cặp" },
      { t: "19:30–21:30", act: "🕯️ Fine dinner 7 Bridges", note: "Đồ ăn ngon, không gian đẹp, hợp ngồi nhâm nhi tối · Đặt bàn trước", cost: "400–550K/ng" },
    ],
    tips: [
      "🧥 Địa Tạng Phi Lai Tự và Bích Động là chùa — bắt buộc áo kín đáo",
      "📸 Tuyệt Tình Cốc: đi sáng 8–10h hoặc chiều 14–16h ánh sáng đẹp nhất",
      "🚗 3 điểm cách nhau 30–60 phút nên cần xe riêng hoặc Grab cả ngày",
      "💒 Nếu thuê áo dài trước, Địa Tạng Phi Lai Tự là background đẹp nhất",
    ],
    journalPrompt: "Tiếng chuông gió ở Địa Tạng đã nói với em điều gì? Nếu dừng lại thật lâu ở Tuyệt Tình Cốc, em muốn gửi ước nguyện gì cho hai người?",
  },
  {
    id: 3,
    title: "Ngày 4 — Bái Đính & Phố Cổ Đêm",
    dateLabel: "30/10 · Thứ Sáu",
    subtitle: "🏛️ Chùa lớn nhất ĐNA · 🏮 Hoa Lư lên đèn",
    highlight: "🏮 Phố cổ Hoa Lư ban đêm — lãng mạn như Hội An",
    outfit: "Sáng: áo kín đáo cho chùa · Tối: váy/đồ đẹp chụp phố cổ đèn lồng",
    weather: "Sáng 22°C nắng · Trưa 28°C · Đêm mát 20°C (đem áo khoác)",
    planB: "Nếu mưa: bỏ Vân Long, dành cả chiều ở phố cổ cafe + đèn lồng indoor",
    items: [
      { t: "07:30–08:30", act: "🥐 Buffet sáng", note: "Hôm nay di chuyển nhiều, ăn no", cost: "Đã gồm" },
      { t: "09:00–11:30", act: "🏛️ Chùa Bái Đính — quần thể lớn nhất ĐNA", note: "Xe điện VIP (không đi bộ, rộng lắm) · Áo dài tay, quần dài · Thờ Phật Thích Ca bằng đồng nặng 100 tấn", cost: "Xe điện 250K + vé 50K" },
      { t: "12:00–13:00", act: "🍽️ Lunch ốc núi hấp sả + dê nướng tảng", note: "Quán gần Bái Đính có đặc sản ốc núi độc đáo", cost: "180–220K/ng" },
      { t: "14:00–16:00", act: "🛶 Đầm Vân Long — thuyền mái che", note: "Yên tĩnh tuyệt đối · May mắn sẽ thấy voọc quần đùi trắng quý hiếm · Núi Mèo Cào đẹp", cost: "Đò riêng 200K/cặp" },
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
    journalPrompt: "Dưới ánh đèn lồng phố cổ Hoa Lư, điều gì ở người bên cạnh khiến em thấy quen thuộc mà vẫn mới lạ? Kỷ niệm nào của ngày hôm nay sẽ đi cùng em về sau?",
  },
  {
    id: 4,
    title: "Ngày 5 — Ăn Sáng & Bay Về",
    dateLabel: "31/10 · Thứ Bảy",
    subtitle: "🥐 Ăn sáng cuối · 🚐 Về Nội Bài · ✈️ Bay SGN",
    highlight: "☕ Buổi sáng thong thả cuối cùng tại Ninh Bình",
    outfit: "Đồ thoải mái đi máy bay · Dép dễ tháo ở security check",
    weather: "Sáng mát 21°C · Trưa 27°C · Nội Bài có thể nóng ẩm",
    planB: "Nếu bay chiều tối: dậy muộn hơn, ăn sáng thong thả 9h, xe đi 11h",
    items: [
      { t: "07:30–08:30", act: "🥐 Buffet sáng cuối tại resort", note: "Ăn thong thả, ngắm resort lần cuối · Chụp ảnh kỷ niệm quanh hồ sen", cost: "Đã gồm" },
      { t: "08:30–09:00", act: "🧳 Trả phòng + xếp hành lý lên xe", note: "Kiểm tra kỹ tủ, ngăn kéo, két an toàn · Tip nhân viên 50–100K", cost: "—" },
      { t: "09:00–11:00", act: "🚐 Xe riêng NB → Nội Bài (~2h)", note: "Có thể dừng mua quà dọc đường (cơm cháy, mắm tép) hoặc ăn nhẹ ở Phủ Lý", cost: "500K (đi thẳng sân bay)" },
      { t: "11:30–12:30", act: "🛫 Check-in sân bay Nội Bài", note: "Đi trước giờ bay 2h · Ký gửi rượu Kim Sơn (>100ml)", cost: "—" },
      { t: "13:00–15:00", act: "✈️ VNA HAN → SGN (VN229 13:00→15:10)", note: "Nghỉ ngơi, xem lại ảnh chuyến đi trên máy bay", cost: "~1.5tr" },
    ],
    tips: [
      "📦 Cơm cháy dễ vỡ — gói hành lý ký gửi cẩn thận",
      "🍶 Rượu Kim Sơn >100ml phải ký gửi, không mang lên cabin",
      "💾 Tải ảnh về điện thoại/cloud ngay trên xe về HN cho chắc",
      "🎁 Nếu không mua quà ngày 4, có thể dừng dọc đường NB → HN",
    ],
    journalPrompt: "Nếu phải chọn 1 khoảnh khắc duy nhất của 4 ngày này để lưu lại mãi mãi, em chọn điều gì? Hai người muốn quay lại Ninh Bình khi nào?",
  },
];

const locationGuide = [
  {
    id: "trangan",
    name: "Tràng An",
    emoji: "🛶",
    category: "Di sản UNESCO",
    ticket: "250K/ng · Online rẻ hơn 20K",
    hours: "07:00–16:00 (thuyền cuối 15:00)",
    dress: "Áo khoác mỏng · Nón lá · Giày bệt",
    legend: "Quần thể di sản kép UNESCO 2014 — 48 hang động, 31 thung lũng. Truyền thuyết gắn với vua Đinh Tiên Hoàng và Cố đô Hoa Lư.",
    bestTime: "07:30–10:00 (sáng sớm) hoặc 14:00–16:30 (chiều)",
    photoTips: "Ngồi đầu thuyền · Chụp khi vào/ra khỏi hang (ánh sáng chuyển đẹp)",
    avoid: "Cuối tuần, lễ Tết — đông kinh khủng",
  },
  {
    id: "hangmua",
    name: "Hang Múa",
    emoji: "🏔️",
    category: "Điểm ngắm cảnh",
    ticket: "100K/ng",
    hours: "06:00–18:00",
    dress: "Đồ thể thao · Giày bám tốt · Nón chống nắng",
    legend: "Tương truyền là nơi vua Trần xem các cung nữ múa → tên 'Hang Múa'. 500 bậc đá lên 2 đỉnh: đỉnh rồng (Ngọa Long) và đỉnh lớn.",
    bestTime: "16:00–18:00 (hoàng hôn) hoặc 05:30–07:00 (bình minh)",
    photoTips: "Đỉnh rồng cho ảnh 'Ngọa Long' nổi tiếng · Đỉnh lớn view toàn Tam Cốc",
    avoid: "10:00–15:00 (nắng gắt, không bóng râm)",
  },
  {
    id: "diatangchuathi",
    name: "Địa Tạng Phi Lai Tự",
    emoji: "🪷",
    category: "Chùa tâm linh",
    ticket: "Miễn phí",
    hours: "06:00–18:00",
    dress: "Tay dài, quần dài, giày dễ tháo · Không quần short/áo hai dây",
    legend: "Xây dựng từ cuối thế kỷ 20 tại Hà Nam (gần biên giới NB). Nổi tiếng với hàng nghìn chuông gió treo khắp khuôn viên — tạo âm thanh chữa lành.",
    bestTime: "08:00–10:00 (ít khách, ánh sáng lá cây đẹp)",
    photoTips: "Background chuông gió · Lối đi lá vàng · Tượng Địa Tạng",
    avoid: "Ngày rằm, mùng 1 âm — rất đông phật tử",
  },
  {
    id: "tuyettinh",
    name: "Tuyệt Tình Cốc (Động Am Tiên)",
    emoji: "💎",
    category: "Thắng cảnh tự nhiên",
    ticket: "45K/ng",
    hours: "07:00–17:30",
    dress: "Váy/đồ đẹp chụp ảnh · Giày dễ đi (vào động)",
    legend: "Hồ nước xanh ngọc bích giữa núi đá vôi — nơi Thái hậu Dương Vân Nga (vợ vua Đinh) tu hành sau khi nhường ngôi cho Lê Hoàn.",
    bestTime: "08:00–10:00 (nước phản chiếu trời xanh rõ nhất)",
    photoTips: "Chụp từ trên cầu bê tông nhìn xuống hồ · Couple ngồi ven hồ",
    avoid: "Trời âm u — nước không xanh đẹp",
  },
  {
    id: "baidinh",
    name: "Chùa Bái Đính",
    emoji: "🏛️",
    category: "Quần thể tâm linh",
    ticket: "50K + xe điện 60K/lượt",
    hours: "06:00–21:00",
    dress: "Áo tay dài · Quần dài (không legging ôm)",
    legend: "Quần thể chùa lớn nhất Đông Nam Á · Pho tượng Phật bằng đồng dát vàng nặng 100 tấn · Hành lang La Hán dài 3km với 500 pho tượng.",
    bestTime: "06:30–09:00 (mát, ít khách)",
    photoTips: "Hành lang La Hán · Tháp chuông · Tượng Phật ngoài trời",
    avoid: "Lễ hội Xuân (T1–T3 âm) — hàng vạn người",
  },
  {
    id: "phocohoalu",
    name: "Phố cổ Hoa Lư",
    emoji: "🏮",
    category: "Phố đêm",
    ticket: "Miễn phí vào · Thuyền 40–80K",
    hours: "16:00–23:00 (đèn lên 18:30)",
    dress: "Váy/đồ đẹp · Giày dép thoải mái",
    legend: "Mô phỏng Cố đô Hoa Lư thời Đinh-Tiền Lê · Nhiều hoạt động: chèo thuyền, cầu đèn lồng, hàng ẩm thực, cafe.",
    bestTime: "18:30–21:00 (đèn lên + ít oi)",
    photoTips: "Cầu đèn lồng · Thuyền dưới ánh đèn · Phố đi bộ",
    avoid: "Chiều mưa — đèn nước không lung linh",
  },
];

const photoShotList = [
  { id: "ps1", emoji: "🛶", shot: "Thuyền Tràng An giữa hang tối", day: 1 },
  { id: "ps2", emoji: "🏔️", shot: "Couple trên đỉnh Hang Múa ('Ngọa Long')", day: 2 },
  { id: "ps3", emoji: "🌾", shot: "Đạp xe đôi giữa ruộng lúa Tam Cốc", day: 2 },
  { id: "ps4", emoji: "🪷", shot: "Áo dài couple tại Địa Tạng Phi Lai Tự", day: 3 },
  { id: "ps5", emoji: "💎", shot: "Nước xanh ngọc Tuyệt Tình Cốc từ trên cầu", day: 3 },
  { id: "ps6", emoji: "🏛️", shot: "Hành lang La Hán chùa Bái Đính", day: 4 },
  { id: "ps7", emoji: "🛶", shot: "Thuyền yên bình Đầm Vân Long", day: 4 },
  { id: "ps8", emoji: "🏮", shot: "Đèn lồng phố cổ Hoa Lư đêm", day: 4 },
  { id: "ps9", emoji: "🥘", shot: "Flatlay mâm cơm cháy + dê 7 món", day: 1 },
  { id: "ps10", emoji: "🌅", shot: "Hoàng hôn từ Offy Highlands view Bến An", day: 1 },
  { id: "ps11", emoji: "☕", shot: "Matcha latte + bàn tay đôi 007 Đam Khê", day: 3 },
  { id: "ps12", emoji: "🕯️", shot: "Candle-light dinner bên hồ sen resort", day: 2 },
];

const flights = [
  { code: "VN246", route: "SGN → HAN", time: "06:00 → 08:10", price: "~1.5tr", note: "Đi — giờ sớm, tối đa ngày đầu" },
  { code: "VN248", route: "SGN → HAN", time: "07:00 → 09:10", price: "~1.5tr", note: "Đi — giờ đẹp, dễ dậy hơn" },
  { code: "VN250", route: "SGN → HAN", time: "08:00 → 10:10", price: "~1.6tr", note: "Đi — giờ thoải mái, tốn nửa ngày" },
  { code: "VN263", route: "HAN → SGN", time: "20:00 → 22:00", price: "~1.5tr", note: "Về — bay tối, có thể ăn Sisterfields trưa" },
  { code: "VN269", route: "HAN → SGN", time: "22:00 → 00:10", price: "~1.4tr", note: "Về — khuya, tiết kiệm nhưng mệt" },
];

const resorts = [
  {
    name: "Emeralda Resort Ninh Bình",
    stars: 4,
    price: "1.8–2.5tr/đêm",
    location: "Vân Long · 10km từ Tam Cốc",
    amenities: "Villa bungalow · Spa · Hồ bơi · Nhà hàng Việt/Âu · Xe đạp miễn phí",
    vibe: "Làng quê Bắc Bộ cổ kính, kiến trúc mái ngói",
    pros: "Yên tĩnh · Spa tốt · Đồ ăn ngon",
    cons: "Xa trung tâm Tam Cốc (15 phút xe)",
    phone: "0229 365 8333",
  },
  {
    name: "Tam Coc Garden Resort",
    stars: 4,
    price: "1.5–2tr/đêm",
    location: "Tam Cốc · Gần Hang Múa",
    amenities: "Bungalow · Hồ bơi · Spa · Yoga · Đạp xe",
    vibe: "Garden zen, xanh mát, rất couple-friendly",
    pros: "Gần Hang Múa · Setup honeymoon đẹp · Yên tĩnh",
    cons: "Giá cao · Restaurant hơi giới hạn",
    phone: "0229 381 8555",
  },
  {
    name: "Hidden Charm Resort & Spa",
    stars: 5,
    price: "2–3tr/đêm",
    location: "Tam Cốc trung tâm",
    amenities: "Bungalow view núi · Spa premium · 2 hồ bơi · Nhà hàng 2 loại",
    vibe: "Sang trọng nhất Tam Cốc",
    pros: "Phòng đẹp · Dịch vụ 5★ · View núi tuyệt",
    cons: "Đắt · Đông vào cuối tuần",
    phone: "0229 388 9999",
  },
  {
    name: "Lasen Village Tam Cốc",
    stars: 4,
    price: "1.2–1.6tr/đêm",
    location: "Tam Cốc · Gần phố cổ Hoa Lư",
    amenities: "Phòng view núi · Spa · Hồ bơi · Cafe",
    vibe: "Resort mới, hiện đại, giá hợp lý",
    pros: "Trung tâm · Giá hợp lý · Phòng mới",
    cons: "Mới mở, ít review",
    phone: "0229 395 6789",
  },
];

const preTripChecklist = [
  { id: "pre1", phase: "📅 30 ngày trước", item: "Đặt vé máy bay (sớm rẻ hơn 30%)" },
  { id: "pre2", phase: "📅 30 ngày trước", item: "Đặt phòng resort + yêu cầu honeymoon setup" },
  { id: "pre3", phase: "📅 30 ngày trước", item: "Đặt xe limousine/private car HN↔NB" },
  { id: "pre4", phase: "📅 14 ngày trước", item: "Mua bảo hiểm du lịch nội địa" },
  { id: "pre5", phase: "📅 14 ngày trước", item: "Thuê/mua áo dài couple (nếu cần)" },
  { id: "pre6", phase: "📅 14 ngày trước", item: "Đặt bàn fine dining ngày 2,3,5 (Sisterfields)" },
  { id: "pre7", phase: "📅 7 ngày trước", item: "Đổi tiền mặt 2–3tr tiền lẻ" },
  { id: "pre8", phase: "📅 7 ngày trước", item: "Test pin dự phòng + sạc đủ pin máy ảnh" },
  { id: "pre9", phase: "📅 7 ngày trước", item: "Đặt vé Tràng An online" },
  { id: "pre10", phase: "📅 1 ngày trước", item: "Pack theo packing list · Check thời tiết" },
  { id: "pre11", phase: "📅 1 ngày trước", item: "Check-in online VNA · In vé phòng trường hợp" },
  { id: "pre12", phase: "📅 1 ngày trước", item: "Charge điện thoại + pin dự phòng 100%" },
  { id: "pre13", phase: "🛫 Ngày đi", item: "Đến sân bay trước 2h · Uống ít nước trước bay" },
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
  { icon: "💊", item: "Túi y tế nhỏ: Panadol, dầu gió, thuốc say xe" },
  { icon: "📸", item: "Máy ảnh + ống kính góc rộng (chụp cảnh hùng vĩ)" },
  { icon: "🥤", item: "Bình giữ nhiệt (thời tiết se lạnh, trà/cafe nóng)" },
  { icon: "🪪", item: "CCCD/Passport · Vé máy bay · Bảo hiểm in giấy" },
];

const foodMap = {
  "🐐 Dê núi": ["Dê 1969 (mới, rộng)", "Áp Xuân Vinh", "Thành Long", "Chính Thu"],
  "🔥 Nướng/Lẩu": ["1988 BBQ (phố cổ)", "Nướng Gasu", "Gogi", "Thanh Phong (lẩu bò)"],
  "☕ Cafe & Matcha": ["At Where Cafe", "DRIP by haimuoibon", "Offy Highlands Tràng An", "007 Đam Khê Specialty Coffee"],
  "🥐 Brunch/Fine": ["Sisterfields (Sunday Treat 150K)", "7 Bridges", "Starbucks Tràng An (trước 8h)"],
  "🍜 Đặc sản sáng": ["Miến lươn Ninh Bình", "Bún mọc Tố Nhu", "Phở gia truyền"],
};

const souvenirs = [
  { icon: "🍚", name: "Cơm cháy chà bông", price: "50–120K/túi", for: "Đồng nghiệp, bạn bè" },
  { icon: "🍶", name: "Rượu nếp Kim Sơn", price: "150–500K/chai", for: "Bố, chú, bác" },
  { icon: "🦐", name: "Mắm tép Gia Viễn", price: "80–150K/hũ", for: "Mẹ, dì" },
  { icon: "🥟", name: "Nem chua Yên Mạc", price: "100–200K/gói", for: "Anh em thân thiết" },
  { icon: "🫖", name: "Trà sen Hoa Lư", price: "200–500K/hộp", for: "Người lớn tuổi" },
  { icon: "🎨", name: "Tranh thêu Văn Lâm", price: "300K–2tr", for: "Kỷ niệm phòng cưới" },
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
  { icon: "💵", tip: "Mang tiền mặt — nhiều quán nhỏ không chấp nhận thẻ/QR" },
  { icon: "📱", tip: "Tải Grab + Be + Xanh SM — NB có dịch vụ đầy đủ" },
  { icon: "🗺️", tip: "Tải offline map Google Maps vùng Ninh Bình trước khi đi" },
  { icon: "📶", tip: "Mua SIM 4G Viettel ~50K/tuần nếu lo wifi resort yếu" },
];

const momentsForTwo = [
  { emoji: "🚣‍♀️", title: "Thuyền riêng Tràng An", desc: "Thuê cả thuyền chỉ 2 người — 3 tiếng trôi qua hang động giữa non nước" },
  { emoji: "🌅", title: "Hoàng hôn Ngọa Long", desc: "Đỉnh Hang Múa lúc 17:30 — rồng đá + ruộng lúa vàng" },
  { emoji: "🪷", title: "Chuông gió Địa Tạng", desc: "Chùa yên bình, ảnh áo dài couple nổi bần bật trên nền xanh" },
  { emoji: "💎", title: "Tuyệt Tình Cốc", desc: "Nước xanh ngọc bích — góc ảnh cưới signature TikTok-viral" },
  { emoji: "🚲", title: "Đạp xe đôi Tam Cốc", desc: "Ruộng lúa, đền cổ, sông nhỏ — chill nhất hành trình" },
  { emoji: "🏮", title: "Đêm phố cổ Hoa Lư", desc: "Chèo thuyền dưới đèn lồng — phiên bản Hội An của Bắc Bộ" },
  { emoji: "🕯️", title: "Candle-light dinner", desc: "Bên hồ sen resort — đặt trước bánh kỷ niệm" },
  { emoji: "💆", title: "Couple spa 90 phút", desc: "Hot stone + aromatherapy — thư giãn sau ngày dài" },
];

const budget = [
  { label: "✈️ Bay VNA SGN↔HAN (2 người)", cost: "5–7tr" },
  { label: "🚐 Xe riêng HN↔NB (khứ hồi + Nội Bài)", cost: "1.1tr" },
  { label: "🏨 Resort 4★ 4 đêm (cặp đôi)", cost: "6–8tr" },
  { label: "🍽️ Ăn uống 4 ngày (nhà hàng/fine dining)", cost: "4–5tr" },
  { label: "🎫 Vé tham quan + thuê thuyền riêng", cost: "1.5–2tr" },
  { label: "💆 Couple spa 90 phút", cost: "1tr" },
  { label: "☕ Cafe, phố cổ, quà", cost: "1.5tr" },
  { label: "📋 Tổng cho CẶP ĐÔI", cost: "~20–26tr", bold: true },
];

const emergency = [
  { icon: "🚓", name: "Cảnh sát", number: "113" },
  { icon: "🚒", name: "Cứu hỏa", number: "114" },
  { icon: "🚑", name: "Cấp cứu", number: "115" },
  { icon: "🏥", name: "BV Đa khoa NB", number: "0229 389 4222" },
  { icon: "🗺️", name: "Trung tâm Du lịch NB", number: "0229 387 3381" },
  { icon: "✈️", name: "VNA Tổng đài", number: "1900 1100" },
  { icon: "🚕", name: "Xanh SM (đặt xe)", number: "Tải app" },
  { icon: "🇻🇳", name: "Cứu hộ du lịch quốc gia", number: "18001022" },
];

// =============== HELPERS ===============
const safeStorage = {
  get: (key) => {
    try { return JSON.parse(localStorage.getItem(key) || "null"); } catch { return null; }
  },
  set: (key, val) => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  },
};

const getDaysUntil = (dateStr) => {
  const target = new Date(dateStr + "T00:00:00");
  const now = new Date();
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
};

// =============== UI PRIMITIVES ===============
const Section = ({ title, icon, gradient, children, id }) => (
  <div id={id} style={{ margin: "16px 12px", padding: 14, background: gradient || "white", borderRadius: 14, border: "1px solid #e7e5e4", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
    <div style={{ fontSize: 14, fontWeight: 700, color: "#92400e", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
      <span>{icon}</span><span>{title}</span>
    </div>
    {children}
  </div>
);

const Collapsible = ({ title, subtitle, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: 8, background: "white", borderRadius: 10, border: `1px solid ${open ? "#b45309" : "#e7e5e4"}`, overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "10px 12px", background: open ? "#fffbeb" : "white", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#44403c" }}>{title} {open ? "▼" : "▶"}</div>
        {subtitle && <div style={{ fontSize: 11, color: "#78716c", marginTop: 2 }}>{subtitle}</div>}
      </button>
      {open && <div style={{ padding: "8px 12px 12px" }}>{children}</div>}
    </div>
  );
};

// =============== MAIN COMPONENT ===============
export default function HoneymoonPlan() {
  const [openDay, setOpenDay] = useState(0);
  const [shots, setShots] = useState({});
  const [checklist, setChecklist] = useState({});
  const [journal, setJournal] = useState({});
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    setShots(safeStorage.get("nb_shots") || {});
    setChecklist(safeStorage.get("nb_checklist") || {});
    setJournal(safeStorage.get("nb_journal") || {});
    setDaysLeft(getDaysUntil(plan.startDate));
  }, []);

  const toggleShot = (id) => {
    const next = { ...shots, [id]: !shots[id] };
    setShots(next);
    safeStorage.set("nb_shots", next);
  };

  const toggleCheck = (id) => {
    const next = { ...checklist, [id]: !checklist[id] };
    setChecklist(next);
    safeStorage.set("nb_checklist", next);
  };

  const updateJournal = (dayId, text) => {
    const next = { ...journal, [dayId]: text };
    setJournal(next);
    safeStorage.set("nb_journal", next);
  };

  const bg = "linear-gradient(135deg,#fdf6e3 0%,#fef3c7 30%,#fdf2f8 70%,#ede9fe 100%)";
  const serif = "'Crimson Text','Noto Serif',Georgia,serif";

  const shotCount = Object.values(shots).filter(Boolean).length;
  const checkCount = Object.values(checklist).filter(Boolean).length;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const tocItems = [
    { id: "overview", label: "Tổng quan", icon: "📋" },
    { id: "itinerary", label: "Lịch trình", icon: "📅" },
    { id: "locations", label: "Địa điểm", icon: "🗺️" },
    { id: "food", label: "Ẩm thực", icon: "🍽️" },
    { id: "photos", label: "Shot list", icon: "📸" },
    { id: "flights", label: "Chuyến bay", icon: "✈️" },
    { id: "resorts", label: "Lưu trú", icon: "🏨" },
    { id: "packing", label: "Đồ đạc", icon: "🎒" },
    { id: "checklist", label: "Pre-trip", icon: "✅" },
    { id: "budget", label: "Chi phí", icon: "💰" },
    { id: "journal", label: "Nhật ký", icon: "📝" },
    { id: "emergency", label: "SOS", icon: "🆘" },
  ];

  return (
    <div style={{ fontFamily: serif, background: bg, minHeight: "100vh", color: "#1c1917" }}>
      {/* ===== HERO ===== */}
      <div style={{ background: "linear-gradient(180deg,rgba(120,53,15,0.08) 0%,transparent 100%)", padding: "28px 16px 20px", textAlign: "center", borderBottom: "1px solid rgba(180,130,60,0.15)" }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: "#92400e", textTransform: "uppercase", marginBottom: 6 }}>Honeymoon Plan 2026</div>
        <div style={{ fontSize: 44, marginBottom: 4 }}>{plan.emoji}</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 6px", background: "linear-gradient(135deg,#92400e,#b45309,#d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {plan.name} — Trăng Mật Cố Đô
        </h1>
        <div style={{ fontSize: 13, color: "#78716c", fontStyle: "italic", marginBottom: 10 }}>{plan.tagline}</div>
        <div style={{ fontSize: 12, color: "#78716c", marginBottom: 10 }}>📅 {plan.dates} · ⏳ {plan.duration} · 🛫 Từ {plan.from} · 💕 Cặp đôi</div>
        {daysLeft > 0 && (
          <div style={{ display: "inline-block", padding: "8px 16px", background: "linear-gradient(135deg,#fef3c7,#fde68a)", borderRadius: 20, border: "1px solid #fbbf24" }}>
            <span style={{ fontSize: 12, color: "#92400e" }}>⏰ Còn </span>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#b45309" }}>{daysLeft}</span>
            <span style={{ fontSize: 12, color: "#92400e" }}> ngày đến chuyến đi</span>
          </div>
        )}
      </div>

      {/* ===== TABLE OF CONTENTS (Sticky Nav) ===== */}
      <div style={{ position: "sticky", top: 47, zIndex: 50, background: "rgba(253,246,227,0.95)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(180,130,60,0.15)", padding: "8px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 6, padding: "0 12px", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          {tocItems.map(t => (
            <button key={t.id} onClick={() => scrollTo(t.id)} style={{ flexShrink: 0, padding: "6px 10px", borderRadius: 16, border: "1px solid #e7e5e4", background: "white", fontSize: 11, color: "#78716c", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ===== QUICK STATS ===== */}
      <div style={{ margin: "16px 12px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          {quickStats.map((s, i) => (
            <div key={i} style={{ padding: 10, background: "white", borderRadius: 10, border: "1px solid #e7e5e4", textAlign: "center" }}>
              <div style={{ fontSize: 20, marginBottom: 2 }}>{s.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#44403c" }}>{s.value}</div>
              <div style={{ fontSize: 9, color: "#78716c", marginTop: 2 }}>{s.label}</div>
              <div style={{ fontSize: 9, color: "#a8a29e" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== OVERVIEW / GÓI LÃNG MẠN ===== */}
      <Section id="overview" title={`GÓI ${plan.tier.name}`} icon="📋" gradient="linear-gradient(135deg,#fffbeb,#fef3c7)">
        <div style={{ fontSize: 13, color: "#44403c", lineHeight: 1.8 }}>
          <div>✈️ <b>Bay:</b> {plan.tier.flight}</div>
          <div>🚐 <b>Xe:</b> {plan.tier.transport}</div>
          <div>🏨 <b>Lưu trú:</b> {plan.tier.hotel}</div>
          <div style={{ fontSize: 12, color: "#78716c", marginLeft: 22 }}>{plan.tier.hotelPrice}</div>
        </div>
        <div style={{ marginTop: 10, padding: "10px 12px", background: "#fef3c7", borderRadius: 10, fontWeight: 700, color: "#92400e", fontSize: 14, textAlign: "center" }}>
          {plan.tier.total}
        </div>
      </Section>

      {/* ===== MOMENTS CHO 2 ===== */}
      <Section title="Moments Dành Cho Hai Người" icon="💕" gradient="linear-gradient(135deg,#fdf2f8,#fce7f3)">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {momentsForTwo.map((m, i) => (
            <div key={i} style={{ padding: 10, background: "white", borderRadius: 10, border: "1px solid #fce7f3" }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{m.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#9f1239", marginBottom: 3 }}>{m.title}</div>
              <div style={{ fontSize: 11, color: "#78716c", lineHeight: 1.5 }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== ITINERARY ===== */}
      <div id="itinerary" style={{ margin: "20px 12px 8px" }}>
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: plan.accent, marginBottom: 4 }}>
                    {day.title} {isOpen ? "▼" : "▶"}
                  </div>
                  <div style={{ fontSize: 10, color: "#a8a29e" }}>{day.dateLabel}</div>
                </div>
                <div style={{ fontSize: 12, color: "#78716c", marginBottom: 6 }}>{day.subtitle}</div>
                <div style={{ fontSize: 11, color: "#a8a29e", fontStyle: "italic" }}>✨ {day.highlight}</div>
              </button>

              {isOpen && (
                <div style={{ padding: "4px 14px 14px" }}>
                  {/* Day meta */}
                  <div style={{ marginBottom: 10, padding: 10, background: "#f5f5f4", borderRadius: 8, fontSize: 11, color: "#57534e" }}>
                    <div>👗 <b>Outfit:</b> {day.outfit}</div>
                    <div style={{ marginTop: 3 }}>🌦️ <b>Thời tiết:</b> {day.weather}</div>
                    <div style={{ marginTop: 3 }}>☔ <b>Kế hoạch B:</b> {day.planB}</div>
                  </div>

                  {/* Items */}
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

                  {/* Tips */}
                  {day.tips && day.tips.length > 0 && (
                    <div style={{ marginTop: 10, padding: 10, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#166534", marginBottom: 6 }}>💡 Pro tips cho ngày này</div>
                      {day.tips.map((tip, i) => (
                        <div key={i} style={{ fontSize: 11, color: "#14532d", lineHeight: 1.6, marginBottom: 3 }}>• {tip}</div>
                      ))}
                    </div>
                  )}

                  {/* Journal prompt */}
                  <div style={{ marginTop: 10, padding: 10, background: "#fdf2f8", border: "1px solid #fbcfe8", borderRadius: 10 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#9f1239", marginBottom: 6 }}>📝 Nhật ký ngày {day.id + 1}</div>
                    <div style={{ fontSize: 11, color: "#78716c", fontStyle: "italic", marginBottom: 6 }}>{day.journalPrompt}</div>
                    <textarea
                      value={journal[day.id] || ""}
                      onChange={(e) => updateJournal(day.id, e.target.value)}
                      placeholder="Viết kỷ niệm của ngày này..."
                      style={{ width: "100%", minHeight: 60, padding: 8, fontSize: 11, fontFamily: serif, border: "1px solid #fbcfe8", borderRadius: 8, background: "white", resize: "vertical", boxSizing: "border-box" }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ===== LOCATION GUIDE ===== */}
      <Section id="locations" title="Cẩm Nang Địa Điểm" icon="🗺️">
        <div style={{ fontSize: 11, color: "#78716c", marginBottom: 10, fontStyle: "italic" }}>Bấm vào từng địa điểm để xem giờ mở cửa, dress code, legend, góc chụp đẹp</div>
        {locationGuide.map((loc) => (
          <Collapsible
            key={loc.id}
            title={`${loc.emoji} ${loc.name}`}
            subtitle={`${loc.category} · ${loc.ticket}`}
          >
            <div style={{ fontSize: 11, color: "#44403c", lineHeight: 1.7 }}>
              <div>🕐 <b>Giờ mở:</b> {loc.hours}</div>
              <div>🎫 <b>Vé:</b> {loc.ticket}</div>
              <div>👗 <b>Dress code:</b> {loc.dress}</div>
              <div style={{ marginTop: 6, padding: 8, background: "#fef3c7", borderRadius: 6 }}>
                <b>📜 Legend:</b> {loc.legend}
              </div>
              <div style={{ marginTop: 6 }}>🌅 <b>Thời gian đẹp nhất:</b> {loc.bestTime}</div>
              <div>📸 <b>Góc chụp:</b> {loc.photoTips}</div>
              <div style={{ color: "#dc2626" }}>⚠️ <b>Tránh:</b> {loc.avoid}</div>
            </div>
          </Collapsible>
        ))}
      </Section>

      {/* ===== PHOTO SHOT LIST ===== */}
      <Section id="photos" title={`Photo Shot List (${shotCount}/${photoShotList.length})`} icon="📸" gradient="linear-gradient(135deg,#eff6ff,#dbeafe)">
        <div style={{ fontSize: 11, color: "#1e40af", marginBottom: 10, fontStyle: "italic" }}>Check ✅ khi đã chụp được. Trạng thái lưu trên thiết bị.</div>
        {photoShotList.map((p) => (
          <div
            key={p.id}
            onClick={() => toggleShot(p.id)}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", borderRadius: 8, cursor: "pointer", background: shots[p.id] ? "#dcfce7" : "transparent", marginBottom: 4, transition: "background 0.2s" }}
          >
            <div style={{ fontSize: 14, width: 20, height: 20, borderRadius: 4, border: `2px solid ${shots[p.id] ? "#16a34a" : "#d6d3d1"}`, background: shots[p.id] ? "#16a34a" : "white", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0 }}>
              {shots[p.id] ? "✓" : ""}
            </div>
            <div style={{ fontSize: 16 }}>{p.emoji}</div>
            <div style={{ flex: 1, fontSize: 12, color: "#44403c", textDecoration: shots[p.id] ? "line-through" : "none" }}>
              {p.shot}
            </div>
            <div style={{ fontSize: 9, color: "#a8a29e" }}>N{p.day}</div>
          </div>
        ))}
      </Section>

      {/* ===== FOOD MAP ===== */}
      <Section id="food" title="Bản Đồ Ẩm Thực Cố Đô" icon="🍽️">
        {Object.entries(foodMap).map(([cat, list]) => (
          <div key={cat} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#44403c", marginBottom: 4 }}>{cat}</div>
            <div style={{ fontSize: 11, color: "#78716c", lineHeight: 1.7 }}>{list.join(" · ")}</div>
          </div>
        ))}
      </Section>

      {/* ===== SOUVENIRS ===== */}
      <Section title="Quà Đặc Sản Mang Về" icon="🎁" gradient="linear-gradient(135deg,#fffbeb,#fef3c7)">
        {souvenirs.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderTop: i === 0 ? "none" : "1px dashed #fde68a" }}>
            <div style={{ fontSize: 20, width: 28 }}>{s.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e" }}>{s.name}</div>
              <div style={{ fontSize: 10, color: "#78716c" }}>💰 {s.price} · 🎯 {s.for}</div>
            </div>
          </div>
        ))}
      </Section>

      {/* ===== FLIGHTS ===== */}
      <Section id="flights" title="Chuyến Bay Gợi Ý" icon="✈️">
        <div style={{ fontSize: 11, color: "#78716c", marginBottom: 10, fontStyle: "italic" }}>VNA có giờ bay đa dạng · Đặt trước 30 ngày giá tốt nhất</div>
        {flights.map((f, i) => (
          <div key={i} style={{ padding: "8px 10px", borderBottom: i < flights.length - 1 ? "1px dashed #e7e5e4" : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1e40af" }}>{f.code}</div>
              <div style={{ fontSize: 11, color: "#78716c" }}>{f.price}</div>
            </div>
            <div style={{ fontSize: 11, color: "#44403c" }}>{f.route} · {f.time}</div>
            <div style={{ fontSize: 10, color: "#a8a29e", fontStyle: "italic" }}>{f.note}</div>
          </div>
        ))}
      </Section>

      {/* ===== RESORTS ===== */}
      <Section id="resorts" title="Lưu Trú Gợi Ý (4–5★)" icon="🏨">
        {resorts.map((r, i) => (
          <Collapsible
            key={i}
            title={`${"⭐".repeat(r.stars)} ${r.name}`}
            subtitle={`${r.price} · ${r.location}`}
          >
            <div style={{ fontSize: 11, color: "#44403c", lineHeight: 1.8 }}>
              <div>🏨 <b>Tiện nghi:</b> {r.amenities}</div>
              <div>✨ <b>Vibe:</b> {r.vibe}</div>
              <div style={{ color: "#166534" }}>👍 <b>Ưu điểm:</b> {r.pros}</div>
              <div style={{ color: "#dc2626" }}>👎 <b>Nhược điểm:</b> {r.cons}</div>
              <div>📞 <b>Liên hệ:</b> {r.phone}</div>
            </div>
          </Collapsible>
        ))}
      </Section>

      {/* ===== PACKING ===== */}
      <Section id="packing" title="Packing List Couple" icon="🎒">
        {packing.map((p, i) => (
          <div key={i} style={{ fontSize: 12, color: "#44403c", lineHeight: 1.9, display: "flex", gap: 8 }}>
            <span style={{ width: 22 }}>{p.icon}</span>
            <span>{p.item}</span>
          </div>
        ))}
      </Section>

      {/* ===== PRO TIPS ===== */}
      <Section title="Pro Tips Từ Người Đi Rồi" icon="💡" gradient="linear-gradient(135deg,#f0fdf4,#dcfce7)">
        {proTips.map((p, i) => (
          <div key={i} style={{ fontSize: 12, color: "#14532d", lineHeight: 1.6, marginBottom: 7, display: "flex", gap: 8 }}>
            <span style={{ width: 22, flexShrink: 0 }}>{p.icon}</span>
            <span>{p.tip}</span>
          </div>
        ))}
      </Section>

      {/* ===== PRE-TRIP CHECKLIST ===== */}
      <Section id="checklist" title={`Pre-Trip Checklist (${checkCount}/${preTripChecklist.length})`} icon="✅" gradient="linear-gradient(135deg,#faf5ff,#ede9fe)">
        <div style={{ fontSize: 11, color: "#6b21a8", marginBottom: 10, fontStyle: "italic" }}>Check list chuẩn bị trước chuyến đi · Trạng thái lưu trên thiết bị</div>
        {preTripChecklist.map((c, i) => {
          const showPhase = i === 0 || preTripChecklist[i - 1].phase !== c.phase;
          return (
            <div key={c.id}>
              {showPhase && <div style={{ fontSize: 11, fontWeight: 700, color: "#6b21a8", marginTop: i === 0 ? 0 : 10, marginBottom: 4 }}>{c.phase}</div>}
              <div
                onClick={() => toggleCheck(c.id)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px", borderRadius: 6, cursor: "pointer", background: checklist[c.id] ? "#dcfce7" : "transparent" }}
              >
                <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${checklist[c.id] ? "#16a34a" : "#d6d3d1"}`, background: checklist[c.id] ? "#16a34a" : "white", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                  {checklist[c.id] ? "✓" : ""}
                </div>
                <div style={{ fontSize: 11, color: "#44403c", textDecoration: checklist[c.id] ? "line-through" : "none" }}>
                  {c.item}
                </div>
              </div>
            </div>
          );
        })}
      </Section>

      {/* ===== BUDGET ===== */}
      <Section id="budget" title="Dự Trù Chi Phí (cặp đôi, 4N4Đ)" icon="💰">
        {budget.map((b, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: i === 0 ? "none" : b.bold ? "2px solid #92400e" : "1px dashed #e7e5e4", fontSize: 12, fontWeight: b.bold ? 700 : 400, color: b.bold ? "#92400e" : "#44403c" }}>
            <span>{b.label}</span>
            <span style={{ fontWeight: 700 }}>{b.cost}</span>
          </div>
        ))}
      </Section>

      {/* ===== JOURNAL SUMMARY (read-only view of all journal entries) ===== */}
      <Section id="journal" title="Nhật Ký Hành Trình" icon="📝" gradient="linear-gradient(135deg,#fdf2f8,#fce7f3)">
        <div style={{ fontSize: 11, color: "#9f1239", marginBottom: 10, fontStyle: "italic" }}>Viết trực tiếp trong mỗi ngày ở phần lịch trình · Tổng hợp ở đây</div>
        {days.map(d => (
          <div key={d.id} style={{ marginBottom: 10, padding: 10, background: "white", borderRadius: 8, border: "1px solid #fce7f3" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#9f1239", marginBottom: 4 }}>{d.title}</div>
            <div style={{ fontSize: 11, color: journal[d.id] ? "#44403c" : "#a8a29e", fontStyle: journal[d.id] ? "normal" : "italic", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
              {journal[d.id] || "(Chưa có nhật ký)"}
            </div>
          </div>
        ))}
      </Section>

      {/* ===== EMERGENCY ===== */}
      <Section id="emergency" title="Liên Hệ Khẩn Cấp" icon="🆘" gradient="linear-gradient(135deg,#fef2f2,#fecaca)">
        <div style={{ fontSize: 11, color: "#991b1b", marginBottom: 10, fontStyle: "italic" }}>Lưu sẵn vào điện thoại trước khi đi</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {emergency.map((e, i) => (
            <a key={i} href={`tel:${e.number.replace(/\D/g, "")}`} style={{ padding: 10, background: "white", borderRadius: 8, border: "1px solid #fecaca", textDecoration: "none", display: "block" }}>
              <div style={{ fontSize: 16 }}>{e.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#991b1b", marginTop: 2 }}>{e.name}</div>
              <div style={{ fontSize: 11, color: "#dc2626", fontFamily: "monospace" }}>{e.number}</div>
            </a>
          ))}
        </div>
      </Section>

      {/* ===== FOOTER ===== */}
      <div style={{ padding: "24px 16px 40px", textAlign: "center", fontSize: 10, color: "#a8a29e", lineHeight: 1.7 }}>
        <div style={{ fontSize: 24, marginBottom: 8 }}>💍 · 🛶 · 🏮</div>
        <div style={{ marginBottom: 4, fontStyle: "italic", color: "#78716c" }}>"Hai người · Một hành trình · Muôn vàn kỷ niệm"</div>
        <div style={{ marginBottom: 4 }}>Made with ❤️ for a sweet honeymoon in Ninh Bình</div>
        <div>Giá tham khảo 04/2026 · Nguồn: TikTok tips, Tràng An, VnExpress, BestPrice</div>
      </div>
    </div>
  );
}
