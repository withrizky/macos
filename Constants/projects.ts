export interface Project {
    id: string;
    name: string;
    type: string;
    src: string;
    alt: string;
    url: string;
    description: string;
    technologies: string[];
    category: string;
    year: string;
    features: string[];
    isFavorite?: boolean;
}

export const projects: Project[] = [
    {
      id: "project-macos",
      name: "Sistem Management Internal Dealer Honda",
      type: "Android Project",
      src: "https://withrizky.github.io/officialweb/assets/images/portfolio/web_app/aplikasi%20management%20internal%20honda%20terang%20anugrah.jpeg",
      alt: "Macintosh OS portfolio",
      url: "https://withrizky.github.io/officialweb",
      description: "Sistem management internal dealer untuk mendukung proses internal dealer supaya lebih efisien dan transparan, berbasis web(admin) dan aplikasi android",
      technologies: ["Flutter", "PHP(RestAPI)", "Bootstrap(Admin Web)"],
      category: "Hybrid Project",
      year: "2025",
      features: [
        "Proses Evaluasi KPI Otomatis Berbasis AI",
        "Pengajuan Cuti, Resign dan Barang",
        "Proses Approve Oleh Web Admin",
        "Proses Pelatihan Karyawan Dalam APK"
      ],
      isFavorite: true
    },
    {
      id: "project-climecache",
      name: "Aplikasi Field Collection(Finance)",
      type: "Android Project",
      src: "https://withrizky.github.io/officialweb/assets/images/portfolio/web_app/custom%20app%20field%20collection.jpeg",
      alt: "ClimeCache",
      url: "https://withrizky.github.io/officialweb",
      description: "Aplikasi Untuk Mendukung Proses Pekerjaan Field Collection.",
      technologies: ["Flutter", "Go(Rest API)"],
      category: "Android App",
      year: "2025",
      features: [
        "Fitur Pengecekan Geo Lokasi Untuk Melakukan Validasi Dengan User",
        "Fitur Rekap Dan Update Data Pelanggan",
        "Fitur Pengecekan FakeGPS & Anti Root"
      ],
      isFavorite: true
    }
  ];
  
