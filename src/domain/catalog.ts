import type { LocalizedText } from "./i18n";
export type { Language, LocalizedText } from "./i18n";

export type SizeKey = "6x3" | "9x3" | "12x3";
export type WallMaterial = "aluminum" | "wood" | "rockwool" | "graphite";
export type DayMode = "day" | "night";

export type AddonKey =
  | "doorMain"
  | "windowStandard"
  | "balcony"
  | "bathroomSuite"
  | "toilet"
  | "shower"
  | "vanity"
  | "kitchen"
  | "stove"
  | "sink"
  | "fridge"
  | "bedroom"
  | "queenBed"
  | "wardrobe"
  | "sofa"
  | "desk"
  | "airConditioner"
  | "smartHome"
  | "solarRoof"
  | "waterHeater"
  | "floorHeating";

export const baseFrames: Record<
  SizeKey,
  { label: LocalizedText; width: number; depth: number; height: number; price: number; weight: number }
> = {
  "6x3": { label: { en: "6m x 3m Compact", zh: "6米 x 3米紧凑型", es: "6m x 3m Compacta", fr: "6m x 3m Compact", de: "6m x 3m Kompakt", ar: "6م x 3م مدمج", ru: "6м x 3м компакт", pt: "6m x 3m Compacta", ja: "6m x 3m コンパクト", ko: "6m x 3m 컴팩트" }, width: 6, depth: 3, height: 3, price: 12800, weight: 3.8 },
  "9x3": { label: { en: "9m x 3m Family", zh: "9米 x 3米家庭型", es: "9m x 3m Familiar", fr: "9m x 3m Famille", de: "9m x 3m Familie", ar: "9م x 3م عائلي", ru: "9м x 3м семейный", pt: "9m x 3m Familiar", ja: "9m x 3m ファミリー", ko: "9m x 3m 패밀리" }, width: 9, depth: 3, height: 3, price: 16800, weight: 5.2 },
  "12x3": { label: { en: "12m x 3m Premium", zh: "12米 x 3米旗舰型", es: "12m x 3m Premium", fr: "12m x 3m Premium", de: "12m x 3m Premium", ar: "12م x 3م فاخر", ru: "12м x 3м премиум", pt: "12m x 3m Premium", ja: "12m x 3m プレミアム", ko: "12m x 3m 프리미엄" }, width: 12, depth: 3.2, height: 3.1, price: 21800, weight: 6.7 },
};

export const wallMaterials: Record<
  WallMaterial,
  { label: LocalizedText; price: number; color: string; trim: string; roughness: number; metalness: number }
> = {
  aluminum: {
    label: { en: "Aluminum Composite", zh: "铝复合外墙板", es: "Aluminio compuesto", fr: "Aluminium composite", de: "Aluminium-Verbund", ar: "ألمنيوم مركب", ru: "Алюминиевый композит", pt: "Aluminio composto", ja: "アルミ複合パネル", ko: "알루미늄 복합 패널" },
    price: 1800,
    color: "#d9dde1",
    trim: "#7b858e",
    roughness: 0.5,
    metalness: 0.25,
  },
  wood: {
    label: { en: "Wood Grain Panel", zh: "木纹装饰板", es: "Panel veta madera", fr: "Panneau effet bois", de: "Holzdekor-Paneel", ar: "لوح بنقشة خشب", ru: "Панель под дерево", pt: "Painel amadeirado", ja: "木目パネル", ko: "우드 그레인 패널" },
    price: 2600,
    color: "#9d7048",
    trim: "#4b3424",
    roughness: 0.72,
    metalness: 0.05,
  },
  rockwool: {
    label: { en: "Rockwool Sandwich Panel", zh: "岩棉夹芯板", es: "Panel sandwich lana roca", fr: "Panneau sandwich laine de roche", de: "Steinwolle-Sandwichpaneel", ar: "لوح ساندويتش صوف صخري", ru: "Сэндвич-панель минвата", pt: "Painel sanduiche la de rocha", ja: "ロックウール断熱パネル", ko: "암면 샌드위치 패널" },
    price: 2200,
    color: "#e6e1d7",
    trim: "#8b8f87",
    roughness: 0.85,
    metalness: 0.03,
  },
  graphite: {
    label: { en: "Graphite Metal Panel", zh: "石墨金属板", es: "Panel metal grafito", fr: "Panneau metal graphite", de: "Graphit-Metallpaneel", ar: "لوح معدني جرافيت", ru: "Графитовая металл-панель", pt: "Painel metal grafite", ja: "グラファイト金属パネル", ko: "그래파이트 메탈 패널" },
    price: 3100,
    color: "#44494f",
    trim: "#171b20",
    roughness: 0.42,
    metalness: 0.35,
  },
};

const cat = {
  openings: { en: "Openings", zh: "门窗", es: "Aberturas", fr: "Ouvertures", de: "Offnungen", ar: "الفتحات", ru: "Проемы", pt: "Aberturas", ja: "開口部", ko: "개구부" },
  exterior: { en: "Exterior", zh: "外部模块", es: "Exterior", fr: "Exterieur", de: "Aussen", ar: "الخارج", ru: "Экстерьер", pt: "Exterior", ja: "外部", ko: "외부" },
  bathroom: { en: "Bathroom", zh: "卫浴", es: "Bano", fr: "Salle de bain", de: "Bad", ar: "الحمام", ru: "Санузел", pt: "Banheiro", ja: "バスルーム", ko: "욕실" },
  kitchen: { en: "Kitchen", zh: "厨房", es: "Cocina", fr: "Cuisine", de: "Kuche", ar: "المطبخ", ru: "Кухня", pt: "Cozinha", ja: "キッチン", ko: "주방" },
  bedroom: { en: "Bedroom", zh: "卧室", es: "Dormitorio", fr: "Chambre", de: "Schlafzimmer", ar: "غرفة النوم", ru: "Спальня", pt: "Quarto", ja: "寝室", ko: "침실" },
  living: { en: "Living", zh: "客厅", es: "Sala", fr: "Salon", de: "Wohnen", ar: "المعيشة", ru: "Гостиная", pt: "Sala", ja: "リビング", ko: "거실" },
  systems: { en: "Systems", zh: "系统设备", es: "Sistemas", fr: "Systemes", de: "Systeme", ar: "الانظمة", ru: "Системы", pt: "Sistemas", ja: "設備", ko: "시스템" },
} satisfies Record<string, LocalizedText>;

export const addons: Record<
  AddonKey,
  { label: LocalizedText; sku: string; unitPrice: number; max: number; category: LocalizedText }
> = {
  doorMain: { label: { en: "Main Door", zh: "入户大门", es: "Puerta principal", fr: "Porte principale", de: "Eingangstur", ar: "الباب الرئيسي", ru: "Входная дверь", pt: "Porta principal", ja: "玄関ドア", ko: "현관문" }, sku: "DR-001", unitPrice: 580, max: 2, category: cat.openings },
  windowStandard: { label: { en: "Standard Window", zh: "标准窗", es: "Ventana estandar", fr: "Fenetre standard", de: "Standardfenster", ar: "نافذة قياسية", ru: "Стандартное окно", pt: "Janela padrao", ja: "標準窓", ko: "표준 창" }, sku: "WN-001", unitPrice: 320, max: 8, category: cat.openings },
  balcony: { label: { en: "Panoramic Balcony", zh: "全景阳台", es: "Balcon panoramico", fr: "Balcon panoramique", de: "Panorama-Balkon", ar: "شرفة بانورامية", ru: "Панорамный балкон", pt: "Varanda panoramica", ja: "パノラマバルコニー", ko: "파노라마 발코니" }, sku: "BC-001", unitPrice: 3600, max: 1, category: cat.exterior },
  bathroomSuite: { label: { en: "Independent Bathroom", zh: "独立卫生间", es: "Bano independiente", fr: "Salle de bain independante", de: "Separates Bad", ar: "حمام مستقل", ru: "Отдельный санузел", pt: "Banheiro independente", ja: "独立バスルーム", ko: "독립 욕실" }, sku: "BT-100", unitPrice: 4200, max: 1, category: cat.bathroom },
  toilet: { label: { en: "Smart Toilet", zh: "智能马桶", es: "Inodoro inteligente", fr: "Toilette intelligente", de: "Smart Toilette", ar: "مرحاض ذكي", ru: "Умный унитаз", pt: "Vaso inteligente", ja: "スマートトイレ", ko: "스마트 변기" }, sku: "BT-011", unitPrice: 760, max: 1, category: cat.bathroom },
  shower: { label: { en: "Shower Cabin", zh: "淋浴间", es: "Cabina de ducha", fr: "Cabine de douche", de: "Duschkabine", ar: "كابينة دش", ru: "Душевая кабина", pt: "Cabine de banho", ja: "シャワーブース", ko: "샤워 부스" }, sku: "BT-012", unitPrice: 880, max: 1, category: cat.bathroom },
  vanity: { label: { en: "Vanity Cabinet", zh: "浴室柜", es: "Mueble lavabo", fr: "Meuble vasque", de: "Waschtischschrank", ar: "خزانة مغسلة", ru: "Тумба умывальника", pt: "Gabinete de pia", ja: "洗面キャビネット", ko: "세면대 수납장" }, sku: "BT-013", unitPrice: 520, max: 1, category: cat.bathroom },
  kitchen: { label: { en: "Kitchen Zone", zh: "厨房功能区", es: "Zona de cocina", fr: "Zone cuisine", de: "Kuchenbereich", ar: "منطقة المطبخ", ru: "Кухонная зона", pt: "Area de cozinha", ja: "キッチンエリア", ko: "주방 구역" }, sku: "KT-100", unitPrice: 1600, max: 1, category: cat.kitchen },
  stove: { label: { en: "Induction Stove", zh: "电磁灶台", es: "Cocina induccion", fr: "Plaque induction", de: "Induktionskochfeld", ar: "موقد حث", ru: "Индукционная плита", pt: "Fogao de inducao", ja: "IHコンロ", ko: "인덕션" }, sku: "KT-011", unitPrice: 430, max: 1, category: cat.kitchen },
  sink: { label: { en: "Kitchen Sink", zh: "厨房水槽", es: "Fregadero", fr: "Evier cuisine", de: "Kuchenspule", ar: "حوض مطبخ", ru: "Кухонная мойка", pt: "Pia de cozinha", ja: "キッチンシンク", ko: "주방 싱크대" }, sku: "KT-012", unitPrice: 360, max: 1, category: cat.kitchen },
  fridge: { label: { en: "Mini Fridge", zh: "小冰箱", es: "Mini nevera", fr: "Mini refrigerateur", de: "Mini-Kuhlschrank", ar: "ثلاجة صغيرة", ru: "Мини-холодильник", pt: "Mini geladeira", ja: "ミニ冷蔵庫", ko: "미니 냉장고" }, sku: "KT-013", unitPrice: 680, max: 1, category: cat.kitchen },
  bedroom: { label: { en: "Bedroom Partition", zh: "卧室隔断", es: "Tabique dormitorio", fr: "Cloison chambre", de: "Schlafzimmer-Trennwand", ar: "فاصل غرفة النوم", ru: "Перегородка спальни", pt: "Divisoria do quarto", ja: "寝室パーティション", ko: "침실 파티션" }, sku: "BD-100", unitPrice: 1280, max: 1, category: cat.bedroom },
  queenBed: { label: { en: "Queen Bed", zh: "双人床", es: "Cama queen", fr: "Lit queen", de: "Queen-Bett", ar: "سرير مزدوج", ru: "Кровать queen", pt: "Cama queen", ja: "クイーンベッド", ko: "퀸 침대" }, sku: "BD-011", unitPrice: 950, max: 1, category: cat.bedroom },
  wardrobe: { label: { en: "Wardrobe", zh: "衣柜", es: "Armario", fr: "Armoire", de: "Kleiderschrank", ar: "خزانة ملابس", ru: "Шкаф", pt: "Guarda-roupa", ja: "ワードローブ", ko: "옷장" }, sku: "BD-012", unitPrice: 720, max: 2, category: cat.bedroom },
  sofa: { label: { en: "Compact Sofa", zh: "双人沙发", es: "Sofa compacto", fr: "Canape compact", de: "Kompaktsofa", ar: "اريكة مدمجة", ru: "Компактный диван", pt: "Sofa compacto", ja: "コンパクトソファ", ko: "컴팩트 소파" }, sku: "LV-011", unitPrice: 690, max: 1, category: cat.living },
  desk: { label: { en: "Work Desk", zh: "办公桌", es: "Escritorio", fr: "Bureau", de: "Schreibtisch", ar: "مكتب عمل", ru: "Рабочий стол", pt: "Mesa de trabalho", ja: "ワークデスク", ko: "업무용 책상" }, sku: "LV-012", unitPrice: 420, max: 1, category: cat.living },
  airConditioner: { label: { en: "Air Conditioner", zh: "空调", es: "Aire acondicionado", fr: "Climatisation", de: "Klimaanlage", ar: "مكيف هواء", ru: "Кондиционер", pt: "Ar condicionado", ja: "エアコン", ko: "에어컨" }, sku: "HV-011", unitPrice: 1050, max: 2, category: cat.systems },
  smartHome: { label: { en: "Smart Home Kit", zh: "智能家居套件", es: "Kit hogar inteligente", fr: "Kit maison intelligente", de: "Smart-Home-Kit", ar: "مجموعة المنزل الذكي", ru: "Комплект умного дома", pt: "Kit casa inteligente", ja: "スマートホームキット", ko: "스마트홈 키트" }, sku: "SM-001", unitPrice: 1350, max: 1, category: cat.systems },
  solarRoof: { label: { en: "Solar Roof Pack", zh: "屋顶光伏包", es: "Pack solar techo", fr: "Pack solaire toit", de: "Solar-Dachpaket", ar: "حزمة سقف شمسي", ru: "Солнечная крыша", pt: "Pacote solar telhado", ja: "屋根ソーラーパック", ko: "지붕 태양광 패키지" }, sku: "SR-001", unitPrice: 2950, max: 1, category: cat.systems },
  waterHeater: { label: { en: "Water Heater", zh: "热水器", es: "Calentador de agua", fr: "Chauffe-eau", de: "Warmwasserbereiter", ar: "سخان مياه", ru: "Водонагреватель", pt: "Aquecedor de agua", ja: "給湯器", ko: "온수기" }, sku: "HV-012", unitPrice: 560, max: 1, category: cat.systems },
  floorHeating: { label: { en: "Floor Heating", zh: "地暖系统", es: "Suelo radiante", fr: "Chauffage au sol", de: "Fussbodenheizung", ar: "تدفئة ارضية", ru: "Теплый пол", pt: "Aquecimento de piso", ja: "床暖房", ko: "바닥 난방" }, sku: "HV-013", unitPrice: 1750, max: 1, category: cat.systems },
};
