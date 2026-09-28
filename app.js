const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

// Data awal paket wisata
let tourPackages = [
    {
        id: 1,
        namaPaket: "Bali Hemat 3D2N",
        tujuan: "Bali",
        durasiHari: 3,
        harga: 2750000,
        kuota: 25
    },
    {
        id: 2,
        namaPaket: "Jogja Heritage 2D1N",
        tujuan: "Yogyakarta",
        durasiHari: 2,
        harga: 1500000,
        kuota: 20
    },
    {
        id: 3,
        namaPaket: "Labuan Bajo Adventure 4D3N",
        tujuan: "Labuan Bajo",
        durasiHari: 4,
        harga: 4200000,
        kuota: 15
    }
];

let nextId = 4;

// =========================
// GET /
// =========================
app.get("/", (req, res) => {
    res.status(200).json({
        message: "RESTful API Paket Wisata aktif"
    });
});

// =========================
// GET /tour-packages
// GET /tour-packages?tujuan=Bali
// =========================
app.get("/tour-packages", (req, res) => {
    const { tujuan } = req.query;

    if (tujuan) {
        const hasil = tourPackages.filter(
            item => item.tujuan.toLowerCase() === tujuan.toLowerCase()
        );

        return res.status(200).json(hasil);
    }

    res.status(200).json(tourPackages);
});

// =========================
// GET /tour-packages/:id
// =========================
app.get("/tour-packages/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const data = tourPackages.find(item => item.id === id);

    if (!data) {
        return res.status(404).json({
            status: "error",
            message: `Data dengan id ${id} tidak ditemukan`,
            data: null
        });
    }

    res.status(200).json(data);
});

// =========================
// POST /tour-packages
// =========================
app.post("/tour-packages", (req, res) => {
    const {
        namaPaket,
        tujuan,
        durasiHari,
        harga,
        kuota
    } = req.body;

    // Validasi field wajib
    if (
        !namaPaket ||
        !tujuan ||
        durasiHari === undefined ||
        harga === undefined
    ) {
        return res.status(400).json({
            status: "error",
            message: "Field wajib harus diisi",
            data: null
        });
    }

    const newPackage = {
        id: nextId++,
        namaPaket,
        tujuan,
        durasiHari,
        harga,
        kuota: kuota ?? null
    };

    tourPackages.push(newPackage);

    res.status(201).json({
        status: "success",
        message: "Data berhasil ditambahkan",
        data: newPackage
    });
});

        data: updatedPackage
    });
});

// =========================
// DELETE /tour-packages/:id
// =========================
app.delete("/tour-packages/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = tourPackages.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: "error",
            message: `Data dengan id ${id} tidak ditemukan`,
            data: null
        });
    }

    tourPackages.splice(index, 1);

    res.status(200).json({
        status: "success",
        message: `Data paket wisata dengan id ${id} berhasil dihapus`,
        data: null
    });
});

// =========================
// Endpoint tidak ditemukan
// =========================
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Endpoint tidak ditemukan",
        data: null
    });
});

// =========================
// Menjalankan server
// =========================
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});