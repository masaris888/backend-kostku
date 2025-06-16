-- membuat tabel kamar dengan kolom id, nama, lokasi, dan harga.
CREATE TABLE IF NOT EXISTS kamar (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL,
  lokasi TEXT NOT NULL,
  harga INTEGER NOT NULL
);
