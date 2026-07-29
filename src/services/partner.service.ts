import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";

export interface PartnerItem {
  id: string;
  name: string;
  logo: string;
  website?: string;
  category?: string;
}

export const MOCK_PARTNERS: PartnerItem[] = [
  {
    id: "1",
    name: "VTV",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_1_VTV_x_4iQf7Uo.png",
  },
  {
    id: "2",
    name: "Lotte",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_2_Lotte_0qK3XmI9d.png",
  },
  {
    id: "3",
    name: "Sungroup",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_3_Sungroup_198bZqD1Z.png",
  },
  {
    id: "4",
    name: "Samsung",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_4_Samsung_GkUqZndzH.png",
  },
  {
    id: "5",
    name: "Petrolimex",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_5_Petrolimex_WkZqndzHq.png",
  },
  {
    id: "6",
    name: "VinGroup",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_6_VinGroup_7j123M2uX.png",
  },
  {
    id: "7",
    name: "Hòa Phát",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_7_H_a_Ph_t_CEEu7cuAi.png",
  },
  {
    id: "8",
    name: "FLC",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_8_FLC_6AbRU5Hn7.png",
  },
  {
    id: "9",
    name: "Đường sắt Việt Nam",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_9____ng_s_t_Vi_t_Nam_GWtAuoGoM.png",
  },
  {
    id: "10",
    name: "Phúc Lộc",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_10_Ph_c_L_c_QjNAuP74l.png",
  },
  {
    id: "11",
    name: "Silk Path",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_11_Silk_Path_hj9kCu0AB.png",
  },
  {
    id: "12",
    name: "Hòa Bình",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_12_H_a_B_nh_BuwZtgxyx.png",
  },
  {
    id: "13",
    name: "Six Senses",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_13_Six_Senses_F9_hWUhkj.png",
  },
  {
    id: "14",
    name: "DELTA",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_14_DELTA_fX_ay-Xmc.png",
  },
  {
    id: "15",
    name: "GIZA",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_15_GIZA_CQEv9ag_1.png",
  },
  {
    id: "16",
    name: "Tân Á Đại Thành",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_16_T_n_____i_Th_nh_-pMVvHSEK.png",
  },
  {
    id: "17",
    name: "Hoàng Thịnh Đạt",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_17_Ho_ng_Th_nh___t_26B94if9g.png",
  },
  {
    id: "18",
    name: "NOVA Land",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_18_NOVA_Land_wEm8sZiLu.png",
  },
  {
    id: "19",
    name: "NOVASIA Energy",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_19_NOVASIA_Energy_LEEbUgAUm.png",
  },
  {
    id: "20",
    name: "Tuần Châu",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_20_Tu_n_Ch_u_chjgzX7AQ.png",
  },
  {
    id: "21",
    name: "CIENCO8",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_21_CIENCO8_gulYCOJLV.png",
  },
  {
    id: "22",
    name: "Flamingo",
    logo: "https://ik.imagekit.io/po0s6zxoj/vdcd/partners/partner_22_Flamingo_ybTMXBhlH.png",
  },
];

export async function fetchPartnersFromApi(): Promise<PartnerItem[]> {
  if (USE_MOCK_DATA) {
    return MOCK_PARTNERS;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/partners`, { cache: "no-store" });
    if (res.ok) {
      const body = await res.json();
      const items = body.data || body;
      if (Array.isArray(items) && items.length > 0) {
        return items.map((p) => ({
          id: p.id,
          name: p.name,
          logo: p.logo || "/images/placeholder-logo.png",
          website: p.websiteUrl || p.website,
          category: p.category || "Đối tác chiến lược",
        }));
      }
    }
  } catch (err) {
    console.warn("Failed to fetch partners from API, fallback to mock:", err);
  }
  return MOCK_PARTNERS;
}
