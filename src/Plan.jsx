import { useState } from "react";

const plans = [
  {
    id: "phuquoc", name: "Phú Quốc", emoji: "🏝️", color: "#0891b2",
    packing: ["Kem chống nắng SPF50+", "Kính bơi, phao bơi", "Áo mưa gấp gọn (mùa mưa T10)", "Dép đi biển + giày thể thao", "Thuốc say sóng (tour đảo)", "Sạc dự phòng chống nước", "Đồ bơi 2-3 bộ", "Mũ rộng vành", "Túi chống nước cho điện thoại"],
    tiers: [
      {
        name: "💚 Tiết kiệm", range: "~8-10 triệu/người",
        flight: { desc: "Vietjet Air SGN→PQC, book sớm 1-2 tháng", price: "800K-1.2tr khứ hồi" },
        hotel: { desc: "KS 3★ gần trung tâm Dương Đông (VD: Mai House, Green Bay)", price: "400-600K/đêm → ~2tr/4 đêm" },
        total: "~8-10 triệu/người (cặp đôi chia phòng ~6.5-8tr)",
        days: [
          { day: "Ngày 1 — Đến & Khám phá Dương Đông", items: [
            { time: "06:00-07:00", act: "Bay SGN → Phú Quốc (1h)", cost: "~500K/chiều" },
            { time: "08:00-09:00", act: "Nhận phòng KS, nghỉ ngơi", cost: "—" },
            { time: "09:30-11:30", act: "Thuê xe máy, dạo Bắc đảo, Gành Dầu", cost: "Xe máy 120K/ngày" },
            { time: "12:00-13:00", act: "Cơm trưa quán địa phương (cơm gà/bún quậy)", cost: "50-80K/phần" },
            { time: "14:00-16:30", act: "Suối Tranh tắm suối + chụp ảnh", cost: "Vé 30K" },
            { time: "17:00-18:30", act: "Ngắm hoàng hôn Dinh Cậu (miễn phí)", cost: "Miễn phí" },
            { time: "19:00-21:00", act: "Chợ đêm Phú Quốc — hải sản nướng, mua nước mắm", cost: "150-250K/người" },
          ]},
          { day: "Ngày 2 — Tour 4 Đảo Nam Đảo", items: [
            { time: "07:30-08:00", act: "Ăn sáng tại KS hoặc bún quậy Dương Đông", cost: "30-50K" },
            { time: "08:30-15:30", act: "Tour 4 đảo ghép (Hòn Thơm, Hòn Mây Rút, lặn san hô, câu cá, ăn trưa trên tàu)", cost: "350-500K/người" },
            { time: "16:00-17:30", act: "Nghỉ ngơi tại KS, tắm biển gần", cost: "Miễn phí" },
            { time: "18:00-20:00", act: "Hải sản tươi quán bình dân ven biển", cost: "150-200K" },
          ]},
          { day: "Ngày 3 — Grand World & Thị trấn Hoàng Hôn", items: [
            { time: "08:00-08:30", act: "Ăn sáng", cost: "30-50K" },
            { time: "09:00-12:00", act: "Grand World — dạo phố Venice, check-in (vào cổng miễn phí)", cost: "Miễn phí" },
            { time: "12:00-13:00", act: "Ăn trưa tại Grand World", cost: "80-120K" },
            { time: "13:30-15:30", act: "Bãi Sao — tắm biển, chụp ảnh (miễn phí vào)", cost: "Miễn phí" },
            { time: "16:00-19:00", act: "Thị trấn Hoàng Hôn — Cầu Hôn ngắm hoàng hôn", cost: "Vé 50-100K + xe điện 15K" },
            { time: "19:30-21:00", act: "Ăn tối quán địa phương", cost: "100-150K" },
          ]},
          { day: "Ngày 4 — Bắc đảo & Bay về", items: [
            { time: "06:30-08:00", act: "Tắm biển Bãi Dài sớm + ăn sáng", cost: "30K" },
            { time: "08:30-10:30", act: "Vườn tiêu Phú Quốc + cơ sở nước mắm truyền thống (miễn phí)", cost: "Miễn phí" },
            { time: "11:00-12:00", act: "Làng chài Hàm Ninh — ghẹ luộc, hàu nướng", cost: "150-200K" },
            { time: "12:30-13:30", act: "Trả phòng, ra sân bay", cost: "—" },
            { time: "15:00-16:00", act: "Bay PQC → SGN", cost: "~500K" },
          ]},
        ]
      },
      {
        name: "🟡 Trung bình", range: "~13-18 triệu/người",
        flight: { desc: "Vietnam Airlines/Bamboo SGN→PQC, giờ đẹp", price: "1.5-2.5tr khứ hồi" },
        hotel: { desc: "Resort 4★ (Sol by Meliá, Novotel, Sunset Sanato)", price: "1.2-2tr/đêm → ~6tr/4 đêm" },
        total: "~13-18 triệu/người (cặp đôi chia phòng ~10-14tr)",
        days: [
          { day: "Ngày 1 — Check-in Resort & Biển", items: [
            { time: "08:00-09:00", act: "Bay SGN → PQC (Vietnam Airlines)", cost: "~1tr/chiều" },
            { time: "10:00-11:00", act: "Xe đón sân bay, nhận phòng resort", cost: "Xe đón ~200K" },
            { time: "11:30-13:00", act: "Ăn trưa tại resort / nhà hàng", cost: "150-200K" },
            { time: "14:00-17:00", act: "Tắm biển riêng tại resort + hồ bơi", cost: "Đã gồm" },
            { time: "17:30-19:00", act: "Sunset Sanato ngắm hoàng hôn + cocktail", cost: "Vé 100K + đồ uống 80K" },
            { time: "19:30-21:00", act: "Hải sản nhà hàng ven biển (Crab House, Xin Chào)", cost: "300-500K/người" },
          ]},
          { day: "Ngày 2 — VinWonders + Safari", items: [
            { time: "07:00-07:30", act: "Buffet sáng tại resort", cost: "Đã gồm" },
            { time: "08:00-16:00", act: "Combo VinWonders + Safari trọn ngày (xe điện, tàu lượn, sở thú)", cost: "Combo 1.4tr/người" },
            { time: "12:00-13:00", act: "Ăn trưa tại VinWonders", cost: "100-150K" },
            { time: "17:00-18:00", act: "Về resort, nghỉ ngơi", cost: "—" },
            { time: "18:30-21:00", act: "Dinner cruise hoặc hải sản chợ đêm Dinh Cậu", cost: "300-400K" },
          ]},
          { day: "Ngày 3 — Cáp treo Hòn Thơm & Sunset Town", items: [
            { time: "07:30-08:30", act: "Buffet sáng + check-out", cost: "Đã gồm" },
            { time: "09:00-13:00", act: "Cáp treo Hòn Thơm + Aquatopia (combo cáp treo)", cost: "Combo 540K" },
            { time: "13:00-14:00", act: "Ăn trưa Hòn Thơm / Sunset Town", cost: "150K" },
            { time: "14:30-16:00", act: "Bãi Sao tắm biển", cost: "Miễn phí" },
            { time: "16:30-19:00", act: "Thị trấn Hoàng Hôn — Cầu Hôn, show Kiss of the Sea", cost: "Vé Cầu Hôn 100K" },
            { time: "19:30-21:00", act: "Ăn tối Sunset Town + dạo phố Amalfi", cost: "200-300K" },
          ]},
          { day: "Ngày 4 — Nghỉ dưỡng & Bay về", items: [
            { time: "07:00-09:00", act: "Spa resort buổi sáng hoặc tắm biển", cost: "Spa ~300-500K" },
            { time: "09:30-11:00", act: "Nhà thùng nước mắm + mua quà đặc sản", cost: "100-200K quà" },
            { time: "11:30-12:30", act: "Brunch tại resort / nhà hàng", cost: "150K" },
            { time: "13:00-14:00", act: "Trả phòng, ra sân bay", cost: "Xe 200K" },
            { time: "15:30-16:30", act: "Bay PQC → SGN", cost: "~1tr" },
          ]},
        ]
      },
      {
        name: "🔴 Cao cấp", range: "~25-40 triệu/người",
        flight: { desc: "Vietnam Airlines hạng thương gia hoặc giờ VIP", price: "3-5tr khứ hồi" },
        hotel: { desc: "Resort 5★ (JW Marriott, InterContinental, La Veranda)", price: "4-8tr/đêm → ~20tr/4 đêm" },
        total: "~25-40 triệu/người (cặp đôi chia phòng ~20-30tr)",
        days: [
          { day: "Ngày 1 — Welcome & Private Beach", items: [
            { time: "09:00-10:00", act: "Bay VNA Business SGN → PQC", cost: "~2tr/chiều" },
            { time: "11:00-12:00", act: "Xe VIP đón sân bay, nhận phòng villa hồ bơi riêng", cost: "Xe VIP đã gồm" },
            { time: "12:30-14:00", act: "Fine dining tại resort (nhà hàng Red Rum / Tempus Fugit JW Marriott)", cost: "500K-1tr" },
            { time: "14:30-17:00", act: "Private beach + hồ bơi riêng villa", cost: "Đã gồm" },
            { time: "17:30-19:00", act: "Sunset cocktail riêng tại sky bar resort", cost: "300-500K" },
            { time: "19:30-21:30", act: "Romantic dinner setup bãi biển riêng", cost: "1-2tr/set" },
          ]},
          { day: "Ngày 2 — Private Island Tour", items: [
            { time: "07:30-08:30", act: "Buffet sáng 5★ tại resort", cost: "Đã gồm" },
            { time: "09:00-15:00", act: "Tour cano riêng 4 đảo + lặn san hô với hướng dẫn + BBQ trên đảo", cost: "2-3.5tr/người" },
            { time: "15:30-17:00", act: "Spa couple tại resort (60 phút)", cost: "1-2tr/cặp" },
            { time: "17:30-19:00", act: "Cầu Hôn Sunset Town — VIP sunset viewing", cost: "100K + xe điện" },
            { time: "19:30-21:30", act: "Dinner at INK 360 rooftop (InterContinental) hoặc nhà hàng Michelin-quality", cost: "800K-1.5tr/người" },
          ]},
          { day: "Ngày 3 — VinWonders VIP & Wellness", items: [
            { time: "08:00-09:00", act: "In-room breakfast", cost: "Đã gồm" },
            { time: "09:30-14:00", act: "VinWonders + Safari combo VIP (fast-pass, xe điện riêng)", cost: "1.4tr + VIP 500K" },
            { time: "14:30-16:00", act: "Cáp treo Hòn Thơm All-in-One (cáp treo + Aquatopia + buffet)", cost: "770K" },
            { time: "16:30-18:30", act: "Thị trấn Hoàng Hôn — show Tinh Hoa Việt Nam + thuyền Venice Grand World", cost: "Show 300K + thuyền 200K" },
            { time: "19:00-21:00", act: "Private BBQ tại villa / fine dining", cost: "1-2tr" },
          ]},
          { day: "Ngày 4 — Spa Day & Departure", items: [
            { time: "07:00-08:00", act: "Yoga bãi biển + swim", cost: "Đã gồm" },
            { time: "08:30-10:00", act: "Full spa treatment (90 phút)", cost: "1.5-3tr/cặp" },
            { time: "10:30-11:30", act: "JW Marriott tour check-in + mua quà luxury (tiêu, nước mắm premium)", cost: "500K quà" },
            { time: "12:00-13:00", act: "Farewell lunch fine dining", cost: "500K-1tr" },
            { time: "14:00", act: "Xe VIP ra sân bay", cost: "Đã gồm" },
            { time: "15:30-16:30", act: "Bay VNA Business PQC → SGN", cost: "~2tr" },
          ]},
        ]
      }
    ]
  },
  {
    id: "halong", name: "Vịnh Hạ Long", emoji: "⛵", color: "#1d4ed8",
    packing: ["Áo ấm mỏng (T10 Hạ Long se lạnh 22-28°C)", "Giày thể thao (leo đảo Ti Tóp)", "Kem chống nắng + kính râm", "Thuốc say sóng", "Ba lô nhỏ chống nước", "Đồ bơi", "Máy ảnh chống nước", "Áo khoác gió (trên thuyền gió lớn)", "Nón / mũ bucket"],
    tiers: [
      {
        name: "💚 Tiết kiệm", range: "~9-12 triệu/người",
        flight: { desc: "Vietjet SGN→HAN, book sớm + xe limousine HN→HL", price: "1.5-2.5tr bay + 200K xe" },
        hotel: { desc: "Du thuyền 3★ (1 đêm) + KS 3★ Hà Nội (2 đêm)", price: "2tr du thuyền + 800K KS" },
        total: "~9-12 triệu/người (cặp chia phòng ~7-9tr)",
        days: [
          { day: "Ngày 1 — Bay đến Hà Nội, phố cổ mùa thu", items: [
            { time: "06:00-08:00", act: "Bay SGN → Nội Bài (2h)", cost: "~1tr/chiều" },
            { time: "09:00-10:00", act: "Xe bus 86 ra phố cổ, nhận phòng KS", cost: "Bus 45K" },
            { time: "10:30-12:00", act: "Dạo Hồ Hoàn Kiếm, Đền Ngọc Sơn", cost: "Vé đền 30K" },
            { time: "12:00-13:00", act: "Phở Lý Quốc Sư / Bún chả Hương Liên", cost: "50-80K" },
            { time: "14:00-16:00", act: "Bảo tàng Lịch sử / Văn Miếu Quốc Tử Giám", cost: "Vé 30K" },
            { time: "16:30-18:00", act: "Cafe trứng Giảng / cà phê phố cổ", cost: "35-50K" },
            { time: "19:00-21:00", act: "Ăn tối phố cổ + bia hơi Tạ Hiện", cost: "100-150K" },
          ]},
          { day: "Ngày 2 — Lên du thuyền Hạ Long", items: [
            { time: "06:30-07:30", act: "Ăn sáng KS", cost: "Đã gồm" },
            { time: "08:00-10:30", act: "Xe limousine Hà Nội → Hạ Long (2.5h)", cost: "200K/người" },
            { time: "11:00-11:30", act: "Lên du thuyền, nhận cabin, welcome drink", cost: "Du thuyền 2tr (all-in)" },
            { time: "12:00-13:00", act: "Ăn trưa trên thuyền (đã gồm)", cost: "Đã gồm" },
            { time: "13:30-15:00", act: "Tham quan Hang Sửng Sốt", cost: "Vé vịnh 310K (đã gồm)" },
            { time: "15:30-16:30", act: "Chèo kayak Hang Luồn", cost: "Đã gồm" },
            { time: "17:00-18:30", act: "Ngắm hoàng hôn trên boong thuyền, cooking class", cost: "Đã gồm" },
            { time: "19:00-20:30", act: "Ăn tối trên thuyền + câu mực đêm", cost: "Đã gồm" },
          ]},
          { day: "Ngày 3 — Vịnh buổi sáng & Về Hà Nội", items: [
            { time: "06:00-06:30", act: "Tai chi trên boong / ngắm bình minh", cost: "Đã gồm" },
            { time: "07:00-08:00", act: "Buffet sáng trên thuyền", cost: "Đã gồm" },
            { time: "08:30-09:30", act: "Tham quan đảo Ti Tóp — leo 400 bậc thang + tắm biển", cost: "Đã gồm" },
            { time: "10:00-11:00", act: "Trả cabin, rời thuyền", cost: "—" },
            { time: "11:30-14:00", act: "Xe limousine về Hà Nội (2.5h)", cost: "200K" },
            { time: "14:30-15:30", act: "Ăn trưa muộn bún ốc / bún đậu", cost: "50-80K" },
            { time: "16:00-18:00", act: "Mua sắm quà phố cổ, ô mai, cốm Vòng", cost: "100-200K quà" },
            { time: "19:00-20:30", act: "Ăn tối Hà Nội (phở cuốn, nem)", cost: "80-120K" },
          ]},
          { day: "Ngày 4 — Hà Nội & Bay về", items: [
            { time: "07:00-08:00", act: "Ăn sáng bánh cuốn / xôi xéo", cost: "30-50K" },
            { time: "08:30-10:30", act: "Lăng Bác + Bảo tàng HCM (miễn phí, đóng T2 & thứ 6)", cost: "Miễn phí" },
            { time: "11:00-12:00", act: "Chùa Một Cột + phố cổ mua sắm cuối", cost: "Miễn phí" },
            { time: "12:30-13:30", act: "Ăn trưa phở / bún chả", cost: "60K" },
            { time: "14:00-15:00", act: "Taxi ra Nội Bài", cost: "Grab ~300K" },
            { time: "17:00-19:00", act: "Bay HAN → SGN", cost: "~1tr" },
          ]},
        ]
      },
      {
        name: "🟡 Trung bình", range: "~15-20 triệu/người",
        flight: { desc: "Vietnam Airlines SGN→HAN giờ đẹp", price: "2.5-3.5tr khứ hồi" },
        hotel: { desc: "Du thuyền 4★ (1 đêm, VD: Orchid Classic, Era Cruise) + KS 4★ HN", price: "2.8-3.5tr du thuyền + 1.5tr KS" },
        total: "~15-20 triệu/người (cặp chia phòng ~12-16tr)",
        days: [
          { day: "Ngày 1 — Hà Nội mùa thu", items: [
            { time: "08:00-10:00", act: "Bay VNA SGN → HAN (2h)", cost: "~1.5tr/chiều" },
            { time: "11:00", act: "Xe đón sân bay, nhận phòng KS 4★ (Silk Path, La Siesta)", cost: "Xe đón 350K" },
            { time: "12:00-13:00", act: "Ăn trưa nhà hàng Việt (Madame Hiên / Cai Mam)", cost: "200-300K" },
            { time: "14:00-16:00", act: "Văn Miếu + Hồ Tây + Chùa Trấn Quốc", cost: "Vé 30K" },
            { time: "16:30-18:00", act: "Cafe Hồ Tây ngắm hoàng hôn", cost: "80K" },
            { time: "19:00-21:00", act: "Dinner nhà hàng mùa thu Hà Nội + đi bộ phố cổ", cost: "300-400K" },
          ]},
          { day: "Ngày 2 — Du thuyền 4★ Hạ Long", items: [
            { time: "07:00-07:30", act: "Buffet sáng KS", cost: "Đã gồm" },
            { time: "08:00-10:30", act: "Xe limousine VIP → Hạ Long (2.5h)", cost: "Đã gồm tour" },
            { time: "11:00", act: "Lên du thuyền 4★, welcome cocktail", cost: "Tour 2.8-3.5tr (all-in)" },
            { time: "12:00-13:30", act: "Lunch buffet hải sản trên thuyền", cost: "Đã gồm" },
            { time: "14:00-15:30", act: "Hang Sửng Sốt + vụng Tùng Sâu", cost: "Đã gồm" },
            { time: "16:00-17:00", act: "Kayak khám phá Hang Luồn + bơi biển", cost: "Đã gồm" },
            { time: "17:30-19:00", act: "Sunset party trên sundeck + cooking class", cost: "Đã gồm" },
            { time: "19:30-21:00", act: "Set dinner 5 món + câu mực đêm + karaoke", cost: "Đã gồm" },
          ]},
          { day: "Ngày 3 — Ti Tóp & Về Hà Nội", items: [
            { time: "06:00-06:30", act: "Tai chi + bình minh trên vịnh", cost: "Đã gồm" },
            { time: "07:00-08:30", act: "Brunch trên thuyền", cost: "Đã gồm" },
            { time: "09:00-10:00", act: "Đảo Ti Tóp — leo đỉnh ngắm toàn cảnh vịnh", cost: "Đã gồm" },
            { time: "10:30-11:00", act: "Check-out, rời thuyền", cost: "—" },
            { time: "11:30-14:00", act: "Xe VIP về Hà Nội", cost: "Đã gồm" },
            { time: "14:30-16:00", act: "Shopping Hàng Đào + mua ô mai, cốm, trà sen", cost: "200K quà" },
            { time: "16:30-18:00", act: "Hoàng thành Thăng Long", cost: "Vé 30K" },
            { time: "19:00-21:00", act: "Dinner nhà hàng Hà Nội (Home Hanoi / Quán Ăn Ngon)", cost: "300-500K" },
          ]},
          { day: "Ngày 4 — Khám phá & Bay về", items: [
            { time: "07:30-08:30", act: "Ăn sáng phở Thìn Bờ Hồ", cost: "60K" },
            { time: "09:00-11:00", act: "Lăng Bác + Chùa Một Cột + Bảo tàng Dân tộc học", cost: "Vé 40K" },
            { time: "11:30-12:30", act: "Ăn trưa bún chả + nem cua bể", cost: "100K" },
            { time: "13:00-14:30", act: "Xe ra Nội Bài", cost: "Grab 350K" },
            { time: "16:00-18:00", act: "Bay VNA HAN → SGN", cost: "~1.5tr" },
          ]},
        ]
      },
      {
        name: "🔴 Cao cấp", range: "~25-35 triệu/người",
        flight: { desc: "VNA Business Class SGN→HAN", price: "4-6tr khứ hồi" },
        hotel: { desc: "Du thuyền 5★ (Heritage, Paradise Elegance, Stellar of the Seas) + KS 5★ HN (Sofitel Legend, Capella)", price: "5-8tr du thuyền + 4-6tr KS" },
        total: "~25-35 triệu/người (cặp chia phòng ~20-28tr)",
        days: [
          { day: "Ngày 1 — Hà Nội sang trọng", items: [
            { time: "09:00-11:00", act: "Bay Business Class SGN → HAN", cost: "~2.5tr/chiều" },
            { time: "12:00", act: "Xe VIP đón, nhận phòng Sofitel Legend Metropole / Capella Hà Nội", cost: "Đã gồm" },
            { time: "13:00-14:00", act: "Fine dining La Badiane / KOTO", cost: "500-800K" },
            { time: "15:00-17:00", act: "Private city tour cyclo + Văn Miếu + phố cổ", cost: "500K-1tr" },
            { time: "17:30-18:30", act: "Afternoon tea tại Sofitel / Capella", cost: "300-500K" },
            { time: "19:00-21:30", act: "Romantic dinner Nhà hàng T.U.N.G Dining (fine dining top HN)", cost: "1-2tr/người" },
          ]},
          { day: "Ngày 2 — Du thuyền 5★", items: [
            { time: "07:30", act: "Buffet sáng 5★ tại KS", cost: "Đã gồm" },
            { time: "08:00-10:30", act: "Xe VIP riêng → Hạ Long", cost: "Đã gồm tour" },
            { time: "11:00", act: "Lên du thuyền 5★ — champagne welcome", cost: "Tour 5-8tr (all-in)" },
            { time: "12:00-13:30", act: "Set lunch hải sản 6 món", cost: "Đã gồm" },
            { time: "14:00-16:00", act: "Hang Sửng Sốt + Kayak Hang Luồn + bơi biển riêng", cost: "Đã gồm" },
            { time: "16:30-18:30", act: "Sundeck sunset + wine tasting", cost: "Đã gồm" },
            { time: "19:00-21:00", act: "Gala dinner 7 món + nhạc sống + câu mực", cost: "Đã gồm" },
          ]},
          { day: "Ngày 3 — Vịnh Lan Hạ & Về", items: [
            { time: "06:00", act: "Yoga bình minh trên sundeck", cost: "Đã gồm" },
            { time: "07:30", act: "Brunch sang trọng", cost: "Đã gồm" },
            { time: "09:00-10:30", act: "Đảo Ti Tóp panoramic view + tắm biển", cost: "Đã gồm" },
            { time: "11:00", act: "Check-out, rời thuyền", cost: "—" },
            { time: "11:30-14:00", act: "Xe VIP về Hà Nội", cost: "Đã gồm" },
            { time: "14:30-16:00", act: "Spa tại Sofitel / Capella", cost: "1-2tr" },
            { time: "17:00-18:00", act: "Shopping cao cấp Tràng Tiền Plaza", cost: "Tùy" },
            { time: "19:00-21:00", act: "Dinner La Maison de l'Opéra / Manzi", cost: "800K-1.5tr" },
          ]},
          { day: "Ngày 4 — Farewell & Bay về", items: [
            { time: "08:00-09:00", act: "Breakfast sang trọng cuối", cost: "Đã gồm" },
            { time: "09:30-11:00", act: "Hoàng thành Thăng Long private guide", cost: "500K guide" },
            { time: "11:30-12:30", act: "Farewell lunch", cost: "400K" },
            { time: "13:00-14:30", act: "Xe VIP ra Nội Bài", cost: "600K" },
            { time: "16:00-18:00", act: "Bay Business HAN → SGN", cost: "~2.5tr" },
          ]},
        ]
      }
    ]
  },
  {
    id: "ninhbinh", name: "Ninh Bình", emoji: "🛶", color: "#78716c",
    packing: ["Giày thể thao (leo Hang Múa 500 bậc)", "Kem chống nắng + mũ", "Chai nước cá nhân", "Áo mưa nhẹ (T10 cuối thu)", "Áo khoác mỏng (22-28°C)", "Quần áo thoáng mát dễ di chuyển", "Pin dự phòng (chụp ảnh nhiều)", "Balo nhỏ gọn", "Tiền mặt (nhiều nơi không nhận thẻ)"],
    tiers: [
      {
        name: "💚 Tiết kiệm", range: "~6-8 triệu/người",
        flight: { desc: "Vietjet SGN→HAN + xe limousine HN→NB", price: "1.5-2.5tr bay + 150K xe" },
        hotel: { desc: "Homestay / KS 2-3★ tại Tam Cốc (Tam Coc Bungalow, Tam Coc Rice Fields)", price: "300-500K/đêm → ~1.5tr/4 đêm" },
        total: "~6-8 triệu/người (cặp chia phòng ~5-6.5tr)",
        days: [
          { day: "Ngày 1 — Đến Ninh Bình & Tràng An", items: [
            { time: "06:00-08:00", act: "Bay SGN → HAN (2h)", cost: "~1tr/chiều" },
            { time: "08:30-10:30", act: "Xe limousine Hà Nội → Ninh Bình (2h)", cost: "150K" },
            { time: "11:00-11:30", act: "Nhận phòng homestay Tam Cốc", cost: "—" },
            { time: "12:00-13:00", act: "Ăn trưa cơm cháy + dê núi quán địa phương", cost: "80-120K" },
            { time: "13:30-16:30", act: "Tràng An — đi thuyền 2.5-3h qua hang động + đền chùa", cost: "Vé 300K (gồm đò)" },
            { time: "17:00-18:00", act: "Về homestay, nghỉ ngơi", cost: "—" },
            { time: "18:30-20:00", act: "Ăn tối quán ven đường (miến lươn, ốc núi)", cost: "60-100K" },
          ]},
          { day: "Ngày 2 — Tam Cốc & Hang Múa", items: [
            { time: "06:30-07:30", act: "Ăn sáng tại homestay", cost: "Đã gồm / 30K" },
            { time: "08:00-10:30", act: "Tam Cốc — thuyền qua 3 hang trên sông Ngô Đồng (1.5-2h)", cost: "Vé gói ~200K" },
            { time: "11:00-12:30", act: "Hang Múa — leo 500 bậc, ngắm toàn cảnh Tam Cốc từ đỉnh", cost: "Vé 100K" },
            { time: "13:00-14:00", act: "Ăn trưa gần Tam Cốc (cơm niêu, dê tái chanh)", cost: "80-100K" },
            { time: "14:30-16:00", act: "Chùa Bích Động + đền Thái Vi (gần Tam Cốc, đi bộ/xe đạp)", cost: "Miễn phí" },
            { time: "16:30-18:00", act: "Đạp xe quanh cánh đồng lúa (thuê homestay)", cost: "Xe đạp 30K" },
            { time: "18:30-20:00", act: "Ăn tối thịt dê 7 món quán nổi tiếng", cost: "120-150K" },
          ]},
          { day: "Ngày 3 — Bái Đính & Hoa Lư", items: [
            { time: "07:00-07:30", act: "Ăn sáng", cost: "30K" },
            { time: "08:00-11:00", act: "Chùa Bái Đính — chùa lớn nhất ĐNA (xe điện + đi bộ)", cost: "Xe điện 50K, vé miễn phí" },
            { time: "11:30-12:30", act: "Ăn trưa gần Bái Đính", cost: "60-80K" },
            { time: "13:00-14:30", act: "Cố đô Hoa Lư — đền vua Đinh, vua Lê", cost: "Miễn phí" },
            { time: "15:00-17:00", act: "Đầm Vân Long — thuyền ngắm voọc mông trắng (yên tĩnh)", cost: "Đò ~100K" },
            { time: "17:30-18:00", act: "Về homestay", cost: "—" },
            { time: "18:30-20:00", act: "Ăn tối + nghỉ ngơi", cost: "80-100K" },
          ]},
          { day: "Ngày 4 — Về Hà Nội & Bay", items: [
            { time: "07:00-08:00", act: "Ăn sáng, trả phòng", cost: "30K" },
            { time: "08:30-09:30", act: "Mua quà Ninh Bình (cơm cháy, nem chua, mắm tép)", cost: "100K quà" },
            { time: "10:00-12:00", act: "Xe limousine NB → Hà Nội", cost: "150K" },
            { time: "12:30-13:30", act: "Ăn trưa Hà Nội cuối (phở / bún chả)", cost: "60K" },
            { time: "14:00-15:00", act: "Ra sân bay Nội Bài", cost: "Grab 300K" },
            { time: "17:00-19:00", act: "Bay HAN → SGN", cost: "~1tr" },
          ]},
        ]
      },
      {
        name: "🟡 Trung bình", range: "~10-14 triệu/người",
        flight: { desc: "Vietnam Airlines SGN→HAN + xe riêng HN→NB", price: "2.5-3.5tr bay + 400K xe" },
        hotel: { desc: "Resort 3-4★ (Emeralda, Tam Coc Garden, Hidden Charm)", price: "1-2tr/đêm → ~5tr/4 đêm" },
        total: "~10-14 triệu/người (cặp chia phòng ~8-11tr)",
        days: [
          { day: "Ngày 1 — Tràng An UNESCO", items: [
            { time: "07:00-09:00", act: "Bay VNA SGN → HAN", cost: "~1.5tr/chiều" },
            { time: "09:30-11:30", act: "Xe riêng Hà Nội → Ninh Bình (1.5h cao tốc)", cost: "400K (xe riêng)" },
            { time: "12:00-12:30", act: "Check-in Emeralda Resort, welcome drink", cost: "—" },
            { time: "12:30-13:30", act: "Ăn trưa tại resort (cơm cháy, dê)", cost: "150-200K" },
            { time: "14:00-17:00", act: "Tràng An đi thuyền tuyến 2 (qua phim trường Kong) — 3h", cost: "Vé 300K" },
            { time: "17:30-18:30", act: "Ngắm hoàng hôn từ resort", cost: "—" },
            { time: "19:00-20:30", act: "Dinner tại resort hoặc nhà hàng Dê Núi 7 món", cost: "250-350K" },
          ]},
          { day: "Ngày 2 — Tam Cốc & Hang Múa", items: [
            { time: "06:30", act: "Buffet sáng tại resort", cost: "Đã gồm" },
            { time: "07:30-10:00", act: "Tam Cốc thuyền + Bích Động (đi sớm tránh đông)", cost: "Vé gói ~200K" },
            { time: "10:30-12:00", act: "Hang Múa — leo đỉnh panorama, chụp ảnh", cost: "Vé 100K" },
            { time: "12:30-13:30", act: "Ăn trưa nhà hàng view đồng lúa", cost: "150K" },
            { time: "14:00-16:00", act: "Đạp xe Tam Cốc → đền Thái Vi → làng quê yên bình", cost: "Xe đạp 50K" },
            { time: "16:30-18:00", act: "Pool time / spa nhẹ tại resort", cost: "Spa 300K" },
            { time: "19:00-20:30", act: "Dinner đặc sản (cá rô Khánh Thành, dê tái chanh)", cost: "200-300K" },
          ]},
          { day: "Ngày 3 — Bái Đính & Vân Long", items: [
            { time: "07:00", act: "Buffet sáng", cost: "Đã gồm" },
            { time: "08:00-11:30", act: "Chùa Bái Đính — xe điện VIP, tham quan khu cổ + mới", cost: "Xe điện VIP 200K" },
            { time: "12:00-13:00", act: "Ăn trưa gần Bái Đính", cost: "100-150K" },
            { time: "13:30-15:30", act: "Đầm Vân Long — thuyền mái che, ngắm voọc mông trắng quý hiếm", cost: "Đò 150K" },
            { time: "16:00-17:00", act: "Cố đô Hoa Lư — đền vua Đinh, vua Lê", cost: "Miễn phí" },
            { time: "17:30-18:30", act: "Về resort, nghỉ ngơi", cost: "—" },
            { time: "19:00-21:00", act: "BBQ dinner tại resort", cost: "300-400K" },
          ]},
          { day: "Ngày 4 — Về HN & Bay", items: [
            { time: "07:00-08:30", act: "Buffet sáng + trả phòng", cost: "Đã gồm" },
            { time: "09:00-10:00", act: "Mua quà Ninh Bình (cơm cháy, rượu Kim Sơn, nem chua)", cost: "150K quà" },
            { time: "10:30-12:00", act: "Xe riêng NB → Hà Nội", cost: "400K" },
            { time: "12:30-13:30", act: "Ăn trưa Hà Nội (phở Thìn / bún chả Hương Liên)", cost: "80K" },
            { time: "14:00-15:30", act: "Taxi ra Nội Bài", cost: "Grab 350K" },
            { time: "17:00-19:00", act: "Bay VNA HAN → SGN", cost: "~1.5tr" },
          ]},
        ]
      },
      {
        name: "🔴 Cao cấp", range: "~18-25 triệu/người",
        flight: { desc: "VNA Business SGN→HAN + xe VIP riêng HN→NB", price: "4-6tr bay + 800K xe VIP" },
        hotel: { desc: "Resort 4-5★ (Ninh Binh Hidden Charm 5★, Emeralda Deluxe) + 1 đêm KS 5★ HN", price: "2-4tr/đêm → ~10tr/4 đêm" },
        total: "~18-25 triệu/người (cặp chia phòng ~15-20tr)",
        days: [
          { day: "Ngày 1 — Premium Tràng An", items: [
            { time: "09:00-11:00", act: "Bay Business SGN → HAN", cost: "~2.5tr/chiều" },
            { time: "11:30-13:00", act: "Xe VIP → Ninh Bình (1.5h), check-in Hidden Charm 5★", cost: "Xe VIP 800K" },
            { time: "13:00-14:00", act: "Lunch tại resort (set menu đặc sản)", cost: "300-500K" },
            { time: "14:30-17:30", act: "Tràng An thuyền riêng (mua 4-5 vé cho thuyền private)", cost: "Vé 300K×4 = 1.2tr/thuyền" },
            { time: "18:00-19:00", act: "Cocktail sunset tại pool bar resort", cost: "200K" },
            { time: "19:30-21:00", act: "Private dinner với dê 7 món + rượu vang", cost: "500-800K" },
          ]},
          { day: "Ngày 2 — Tam Cốc VIP & Wellness", items: [
            { time: "07:00", act: "In-room breakfast", cost: "Đã gồm" },
            { time: "08:00-10:00", act: "Tam Cốc thuyền riêng (đi sớm, ít người)", cost: "Vé 200K + thuyền riêng 500K" },
            { time: "10:30-12:00", act: "Hang Múa leo đỉnh + chụp ảnh professional (nếu có)", cost: "Vé 100K" },
            { time: "12:30-13:30", act: "Fine lunch tại resort", cost: "300K" },
            { time: "14:00-16:00", act: "Spa couple 90 phút tại resort", cost: "1-1.5tr/cặp" },
            { time: "16:30-18:00", act: "Đạp xe electric quanh cánh đồng + đền Thái Vi", cost: "100K" },
            { time: "19:00-21:00", act: "Romantic dinner bên hồ sen tại resort", cost: "500-800K" },
          ]},
          { day: "Ngày 3 — Bái Đính VIP & Hà Nội", items: [
            { time: "07:30", act: "Buffet sáng 5★", cost: "Đã gồm" },
            { time: "08:30-11:30", act: "Chùa Bái Đính — xe điện VIP + hướng dẫn riêng", cost: "Xe VIP 4tr/chuyến hoặc xe thường 200K" },
            { time: "12:00-13:00", act: "Ăn trưa + trả phòng", cost: "200K" },
            { time: "13:30-15:30", act: "Xe VIP NB → Hà Nội, nhận phòng Sofitel/Capella", cost: "Xe 800K, KS ~3-5tr/đêm" },
            { time: "16:00-17:30", act: "Afternoon tea Sofitel / spa", cost: "300-500K" },
            { time: "18:00-20:00", act: "Private Hà Nội food tour (street food + history)", cost: "800K-1.2tr/cặp" },
          ]},
          { day: "Ngày 4 — Hà Nội Luxury & Departure", items: [
            { time: "08:00-09:00", act: "Breakfast 5★", cost: "Đã gồm" },
            { time: "09:30-11:00", act: "Private cyclo tour phố cổ + shopping luxury", cost: "500K" },
            { time: "11:30-12:30", act: "Farewell lunch fine dining Hà Nội", cost: "500K-1tr" },
            { time: "13:00-14:30", act: "Xe VIP ra Nội Bài", cost: "600K" },
            { time: "16:00-18:00", act: "Bay Business HAN → SGN", cost: "~2.5tr" },
          ]},
        ]
      }
    ]
  }
];

export default function HoneymoonPlan() {
  const [dest, setDest] = useState("phuquoc");
  const [tier, setTier] = useState(0);
  const [openDay, setOpenDay] = useState(0);
  const plan = plans.find(p => p.id === dest);
  const t = plan.tiers[tier];

  return (
    <div style={{ fontFamily:"'Crimson Text','Noto Serif',Georgia,serif", background:"linear-gradient(135deg,#fdf6e3 0%,#fef3c7 30%,#fdf2f8 70%,#ede9fe 100%)", minHeight:"100vh", color:"#1c1917" }}>
      <div style={{ background:"linear-gradient(180deg,rgba(120,53,15,0.08) 0%,transparent 100%)", padding:"28px 16px 16px", textAlign:"center", borderBottom:"1px solid rgba(180,130,60,0.15)" }}>
        <div style={{ fontSize:11, letterSpacing:4, color:"#92400e", textTransform:"uppercase", marginBottom:4 }}>Honeymoon Detailed Plan 2026</div>
        <h1 style={{ fontSize:22, fontWeight:700, margin:"0 0 4px", background:"linear-gradient(135deg,#92400e,#b45309,#d97706)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Lịch Trình Chi Tiết Từng Giờ</h1>
        <div style={{ fontSize:12, color:"#78716c" }}>📅 28–31/10/2026 · 4N4Đ · 🛫 Từ TP.HCM · 3 gói giá</div>
      </div>

      {/* Destination tabs */}
      <div style={{ display:"flex", gap:6, padding:"12px 12px 0", overflowX:"auto" }}>
        {plans.map(p => (
          <button key={p.id} onClick={() => { setDest(p.id); setTier(0); setOpenDay(0); }}
            style={{ flex:1, padding:"10px 8px", borderRadius:12, border:dest===p.id?`2px solid ${p.color}`:"1px solid #d6d3d1", background:dest===p.id?"white":"#fafaf9", fontSize:13, fontWeight:dest===p.id?700:400, cursor:"pointer", fontFamily:"inherit", color:dest===p.id?p.color:"#57534e", textAlign:"center", minWidth:90 }}>
            <div style={{ fontSize:20 }}>{p.emoji}</div>
            <div>{p.name}</div>
          </button>
        ))}
      </div>

      {/* Tier selector */}
      <div style={{ display:"flex", gap:6, padding:"10px 12px", overflowX:"auto" }}>
        {plan.tiers.map((t,i) => (
          <button key={i} onClick={() => { setTier(i); setOpenDay(0); }}
            style={{ flex:1, padding:"8px 6px", borderRadius:10, border:tier===i?`2px solid ${plan.color}`:"1px solid #e7e5e4", background:tier===i?`${plan.color}10`:"white", fontSize:11, fontWeight:tier===i?700:400, cursor:"pointer", fontFamily:"inherit", color:tier===i?plan.color:"#78716c", textAlign:"center" }}>
            <div style={{ fontSize:12, fontWeight:700 }}>{t.name.split(" ")[0]}</div>
            <div style={{ marginTop:2, fontSize:10 }}>{t.range}</div>
          </button>
        ))}
      </div>

      {/* Summary card */}
      <div style={{ margin:"0 12px 8px", padding:12, background:"#fffbeb", border:"1px solid #fde68a", borderRadius:12 }}>
        <div style={{ fontSize:13, fontWeight:700, color:"#92400e", marginBottom:6 }}>📋 TỔNG QUAN GÓI {t.name}</div>
        <div style={{ fontSize:12, color:"#44403c", lineHeight:1.7 }}>
          <div>✈️ <b>Bay:</b> {t.flight.desc} — <span style={{color:plan.color,fontWeight:600}}>{t.flight.price}</span></div>
          <div>🏨 <b>Lưu trú:</b> {t.hotel.desc} — <span style={{color:plan.color,fontWeight:600}}>{t.hotel.price}</span></div>
          <div style={{ marginTop:6, padding:"6px 10px", background:"#fef3c7", borderRadius:8, fontWeight:700, color:"#92400e", fontSize:14, textAlign:"center" }}>💰 TỔNG: {t.total}</div>
        </div>
      </div>

      {/* Packing list */}
      <div style={{ margin:"0 12px 8px", padding:12, background:"white", border:"1px solid #e7e5e4", borderRadius:12 }}>
        <div style={{ fontSize:12, fontWeight:700, color:plan.color, marginBottom:6 }}>🎒 VẬT DỤNG CẦN ĐEM THEO</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
          {plan.packing.map((item,i) => (
            <span key={i} style={{ fontSize:11, background:"#f5f5f4", padding:"3px 8px", borderRadius:8, color:"#44403c" }}>☑️ {item}</span>
          ))}
        </div>
      </div>

      {/* Day-by-day */}
      <div style={{ padding:"0 12px 20px" }}>
        {t.days.map((day,di) => (
          <div key={di} style={{ marginBottom:8 }}>
            <button onClick={() => setOpenDay(openDay===di?-1:di)}
              style={{ width:"100%", padding:"12px 14px", borderRadius:openDay===di?"12px 12px 0 0":"12px", border:`1px solid ${openDay===di?plan.color:"#e7e5e4"}`, borderBottom:openDay===di?`2px solid ${plan.color}`:"1px solid #e7e5e4", background:openDay===di?"white":"#fafaf9", cursor:"pointer", fontFamily:"inherit", textAlign:"left", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <span style={{ fontSize:11, background:`${plan.color}15`, color:plan.color, padding:"2px 8px", borderRadius:8, fontWeight:700, marginRight:8 }}>Ngày {di+1}</span>
                <span style={{ fontSize:13, fontWeight:600, color:"#292524" }}>{day.day.split("—")[1]?.trim() || day.day}</span>
              </div>
              <span style={{ fontSize:16, color:"#a8a29e" }}>{openDay===di?"▲":"▼"}</span>
            </button>
            {openDay===di && (
              <div style={{ background:"white", border:`1px solid ${plan.color}`, borderTop:"none", borderRadius:"0 0 12px 12px", padding:"8px 0" }}>
                {day.items.map((item,ii) => (
                  <div key={ii} style={{ display:"flex", padding:"8px 12px", borderBottom:ii<day.items.length-1?"1px solid #f5f5f4":"none", gap:8, alignItems:"flex-start" }}>
                    <div style={{ width:56, flexShrink:0, fontSize:11, fontWeight:700, color:plan.color, paddingTop:1 }}>{item.time.split("-")[0]}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, color:"#292524", lineHeight:1.4 }}>{item.act}</div>
                    </div>
                    <div style={{ flexShrink:0, fontSize:11, fontWeight:600, color:item.cost==="Miễn phí"?"#16a34a":item.cost==="Đã gồm"?"#059669":item.cost==="—"?"#a8a29e":"#b45309", textAlign:"right", maxWidth:100 }}>{item.cost}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ padding:"8px 16px 32px", textAlign:"center", fontSize:10, color:"#a8a29e", lineHeight:1.6 }}>
        💰 Giá tham khảo 04/2026, có thể thay đổi theo mùa.
        <br/>Nguồn: VnExpress, BestPrice, Traveloka, Vinwonders, Tràng An, BQL Vịnh Hạ Long.
      </div>
    </div>
  );
}
